"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Schema of Post
const postSchema = new mongoose_1.Schema({
    postedUser: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    imgNames: Array,
    isBlocked: {
        type: Boolean,
        default: false,
    },
    postDeleted: {
        type: Boolean,
        default: false,
        required: true,
    },
    liked: [],
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
}, { timestamps: true });
const Post = (0, mongoose_1.model)("Post", postSchema);
exports.default = Post;
