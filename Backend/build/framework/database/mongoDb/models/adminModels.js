"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// schema for users
const adminSchema = new mongoose_1.Schema({
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
}, { timestamps: true,
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
        }
    } });
const Admin = (0, mongoose_1.model)("Admin", adminSchema);
exports.default = Admin;
