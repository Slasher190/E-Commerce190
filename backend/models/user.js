import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: {
    type: String,
    requird: true,
  },
  email: {
    type: String,
    requird: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});
export const User = mongoose.model("User", schema);
