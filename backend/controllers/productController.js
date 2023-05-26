import { Product } from "../models/productModel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cloudinary from "cloudinary";
import ErrorHandler from "../middleware/error.js";
// Admin - create product
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category } = req.body;
    const images = req.files.images;
    let imgArr = [];
    for (let image of images) {
      let avatarImage = image; // Access the uploaded image file

      // Save the image locally
      let currentFilePath = fileURLToPath(import.meta.url);
      let currentDirectory = dirname(currentFilePath);
      let localDirectory = path.join(currentDirectory, "../static/img");
      let localPath = path.join(localDirectory, avatarImage.name);
      await avatarImage.mv(localPath);

      // Upload the image to Cloudinary
      let myCloud = await cloudinary.v2.uploader.upload(localPath, {
        folder: "products",
        width: 150,
        crop: "scale",
      });
      imgArr.push({
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      });
      await fs.promises.unlink(localPath);
    }
    const product = await Product.create({
      name,
      description,
      price,
      category,
      images: imgArr,
      user: req.user._id,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return next(error);
  }
};

// Get All the Products


// Admin - All Products
export const getAdminProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {}
};
// Update Product - Admin
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
    const images = req.files.images;
    let imgArr = [];
    if (images.length > 0) {
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
      for (let image of images) {
        let avatarImage = image; // Access the uploaded image file

        // Save the image locally
        let currentFilePath = fileURLToPath(import.meta.url);
        let currentDirectory = dirname(currentFilePath);
        let localDirectory = path.join(currentDirectory, "../static/img");
        let localPath = path.join(localDirectory, avatarImage.name);
        await avatarImage.mv(localPath);

        // Upload the image to Cloudinary
        let myCloud = await cloudinary.v2.uploader.upload(localPath, {
          folder: "products",
          width: 150,
          crop: "scale",
        });
        imgArr.push({
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        });
        await fs.promises.unlink(localPath);
      }
    }
    req.body.images = imgArr;
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
    for (let i = 0; i < product.images.length; i++) {
      cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Product is not found"));
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {}
};

export const createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating,
      comment,
    };
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (isReviewed) {
      // update
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      // created new one
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }
    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

export const getProductReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id);
    if (!product) {
      return next(new ErrorHandler("Product not Found", 404));
    }
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {}
};

export const deleteReview = async (req, res, next) => {
  try {
    const product = Product.findById(req.query.productId);
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
    const avg =
      reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviews.length;
    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};

// optimised Version of above deletion
export const deleteReviewOptimised = async (req, res, next) => {
  try {
    const { productId, id } = req.query;

    const product = await Product.findOneAndUpdate(
      { _id: productId, "reviews._id": id },
      {
        $pull: { reviews: { _id: id } },
        $inc: { numOfReviews: -1 },
      },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    const avg =
      product.reviews.reduce((sum, rev) => sum + rev.rating, 0) /
      product.numOfReviews;

    product.ratings = avg;

    await product.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(error);
  }
};