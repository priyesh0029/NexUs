"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRepositoryMongoDB = void 0;
const adminModels_1 = __importDefault(require("../models/adminModels"));
const adminRepositoryMongoDB = () => {
    const findByProperty = async (params) => {
        console.log("admin111111 : ", params);
        const admin = await adminModels_1.default.find({
            $or: [{ userName: params }, { email: params }],
        });
        console.log("user : ", admin.length);
        return admin;
    };
    return {
        findByProperty
    };
};
exports.adminRepositoryMongoDB = adminRepositoryMongoDB;
