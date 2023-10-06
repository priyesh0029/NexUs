"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const authServices = () => {
    //passwordEncryption
    const encryptPassword = async (password) => {
        const salt = await bcryptjs_1.default.genSalt(10);
        password = await bcryptjs_1.default.hash(password, salt);
        return password;
    };
    //generate token
    const generateToken = async (payload) => {
        if (config_1.default.JWT_SECRET) {
            const token = await jsonwebtoken_1.default.sign({ payload }, config_1.default.JWT_SECRET, {
                expiresIn: "5d",
            });
            return token;
        }
        else {
            throw new Error("JWT_TOKEN_KEY is undefined");
        }
    };
    //comparePassword
    const comparePassword = async (password, hasedPassword) => {
        return await bcryptjs_1.default.compare(password, hasedPassword);
    };
    const verifyToken = (token) => {
        if (config_1.default.JWT_SECRET) {
            const isVerify = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
            return isVerify;
        }
    };
    return {
        encryptPassword,
        generateToken,
        comparePassword,
        verifyToken
    };
};
exports.authServices = authServices;
