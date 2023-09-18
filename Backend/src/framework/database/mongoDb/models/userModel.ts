import mongoose, { Schema, model } from "mongoose";

// schema for users
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    password: {
      type: String,
      minlength: 3,
    },
    dp: {
      type: String,
    },
    bio: {
      type: String,
    },
    gender: {
      type: String,
    },
    isBlock: {
      type: Boolean,
      default: false,
    },
    accountDeactive: {
      type: Boolean,
      default: false,
    },
    blockedUsers: [String],
    blockingUsers: [String],
    savedPost: [String],
    followers: [String],
    following: [String],
    requests: [String],
    requested: [String],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
