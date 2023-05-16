import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requird: [true, "Please Enter Your Name"],
    maxLength: [30, "Name Cannot Be More Than 30 Character"],
    minLength: [4, "name Cannot Be Less Than 4 Character"],
  },
  email: {
    type: String,
    requird: [true, "Please Enter Your Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});
export const User = mongoose.model("User", userSchema);
