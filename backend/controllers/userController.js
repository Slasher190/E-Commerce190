import express from "express";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middleware/error.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { sendCookie } from "../utils/features.js";
import cloudinary from "cloudinary";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { generateResetPasswordToken } from "../utils/features.js";
// login
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // console.log(req.files.avatar, " ---data");
    if (!req.files || !req.files.avatar) {
      return next(new ErrorHandler("Avatar image is required.", 400));
    }
    const avatarImage = req.files.avatar; // Access the uploaded image file

    // Save the image locally
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDirectory = dirname(currentFilePath);
    const localDirectory = path.join(currentDirectory, "../static/img");
    const localPath = path.join(localDirectory, avatarImage.name);
    await avatarImage.mv(localPath);

    // Upload the image to Cloudinary
    const myCloud = await cloudinary.v2.uploader.upload(localPath, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    console.log(myCloud, "...data");
    // Delete the temporary file
    await fs.promises.unlink(localPath);
    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exists", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashedPassword,
      avatar: {
        public_id: myCloud?.public_id,
        url: myCloud?.secure_url,
      },
    });

    sendCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid Username or Password", 400));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid Username or Password", 400));
    }
    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

// Forgot Password
export const forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  // Get resetPassword Token
  const resetToken = generateResetPasswordToken(user);
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  // console.log(resetToken, " ... token");
  try {
    res.json({
      success: true,
      user,
      resetPasswordUrl,
      message,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
};

//reset Password
export const resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(
        new ErrorHandler(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password does not match", 400));
    }
    user.password = req.body.password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save;
    sendCookie(user, res, `Your Password Reset Successful`, 200);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res, next) => {
  // console.log("log -- out");
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Develpoment" ? false : true,
      })
      .json({
        success: true,
        user: req.user,
      });
  } catch (error) {
    next(error);
  }
};

//get user detail

export const getUserDetails = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// update Password
export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select(
      "+password"
    );
    const isPasswordMatched = bcrypt.compare(
      user.password,
      req.body.oldPassword
    );
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password Doest Not Match", 400));
    }
    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    sendCookie(user, res, `Password Updated Successful`, 200);
  } catch (error) {
    return next(error);
  }
};

//update Profile
export const updateProfile = async (req, res, next) => {
  try {
    const newUserData = {
      email: req.body.email,
      name: req.body.name,
    };
    if (req.body.avatar !== "") {
      const user = await User.findById(req.user._id);
      const imageId = user.avatar.public_id;
      await cloudinary.v2.uploader.destroy(imageId);
      const avatarImage = req.files.avatar; // Access the uploaded image file

      // Save the image locally
      const currentFilePath = fileURLToPath(import.meta.url);
      const currentDirectory = dirname(currentFilePath);
      const localDirectory = path.join(currentDirectory, "../static/img");
      const localPath = path.join(localDirectory, avatarImage.name);
      await avatarImage.mv(localPath);

      // Upload the image to Cloudinary
      const myCloud = await cloudinary.v2.uploader.upload(localPath, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });
      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

//Admin Panel - get all users
export const getAllUser = async (req, res, next) => {
  try {
    // console.log(req.query)
    ///api/v1/admin/users?page=1&limit=10
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const users = await User.find().skip(startIndex).limit(limit);
    const totalUsers = await User.countDocuments();

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    };

    res.status(200).json({
      success: true,
      pagination,
      users,
    });
  } catch (error) {
    return next(error);
  }
};

//Admin -get Single User or UserDetail
export const getSingleUser = async (req, res, next) => {
  try {
    console.log(req.params.id, "...hello");
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(
        new ErrorHandler(`User doest not exist with Id: ${req.params.id}`)
      );
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(error);
  }
};

//Admin update particular user
export const updateUserRole = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
    await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

// Admi -delete particular User
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ErrorHandler("User Not Found", 404));
    }
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    return next(error);
  }
};