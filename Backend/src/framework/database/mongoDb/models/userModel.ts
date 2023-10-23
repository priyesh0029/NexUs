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
    },
    dp: {
      type: String,
    },
    bio: {
      type: String,
    },
    dob: {
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
    notifications :[String],
    blockedUsers: [String],
    blockingUsers: [String],
    savedPost: [String],
    followers: [String],
    following: [String],
    requests: [String],
    requested: [String],
    reports: [{
      reportedUser : {
        type: String,
        required: true,
      },
      report : {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    }],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
