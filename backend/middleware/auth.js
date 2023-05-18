import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401))
    //  res.status(404).json({
    //   success: false,
    //   message: "Login First",
    // });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   console.log(decoded, "tok-decode");
  req.user = await User.findById(decoded._id);
  next();
};

