"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const replySchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    delete: {
        type: Boolean,
        default: false,
        required: true
    },
    reports: [{
            reportedUser: {
                type: String,
                required: true,
            },
            report: {
                type: String,
                required: true,
            }
        }],
    liked: [String], // Specify the type as an array of strings
}, { timestamps: true });
const commentSchema = new mongoose_1.Schema({
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    delete: {
        type: Boolean,
        default: false,
        required: true
    },
    reports: [{
            reportedUser: {
                type: String,
                required: true,
            },
            report: {
                type: String,
                required: true,
            }
        }],
    liked: [String],
    reply: [replySchema],
}, { timestamps: true });
const Comment = (0, mongoose_1.model)('Comments', commentSchema);
exports.default = Comment;
