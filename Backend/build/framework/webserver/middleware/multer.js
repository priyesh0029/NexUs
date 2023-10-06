"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsProfilePictureMulter = exports.uploadsMulter = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const options = {
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'posts',
        allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
        public_id: (req, file) => {
            console.log(file, 'fileisssss');
            const originalname = file.originalname.split('.');
            return `image-${Date.now()}-${originalname[0]}`;
        }
    }
};
const profilePictureOptions = {
    cloudinary: cloudinary_1.v2,
    params: {
        folder: 'profile-pictures',
        allowed_formats: ['jpg', 'jpeg', 'png', 'svg', 'webp'],
        public_id: (req, file) => {
            console.log(file, 'propic file');
            const originalname = file.originalname.split('.');
            return `profile-image-${Date.now()}-${originalname[0]}`;
        }
    }
};
const store = new multer_storage_cloudinary_1.CloudinaryStorage(options);
const profilePictureStore = new multer_storage_cloudinary_1.CloudinaryStorage(profilePictureOptions);
const uploadsMulter = (0, multer_1.default)({ storage: store }).array('image', 5);
exports.uploadsMulter = uploadsMulter;
const uploadsProfilePictureMulter = (0, multer_1.default)({ storage: profilePictureStore }).single('dp');
exports.uploadsProfilePictureMulter = uploadsProfilePictureMulter;
