import mongoose, { Schema, model } from "mongoose";

// schema for users
const adminSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    
    password: {
      type: String,
      minlength: 3,
    },
  },
  { timestamps: true,
  toJSON:{
    transform(doc,ret){
      delete ret.password
    }
  }}
);

const Admin = model("Admin", adminSchema);

export default Admin;
