"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServiceInterface = void 0;
const authServiceInterface = (services) => {
    //password encryption
    const encryptPassword = async (password) => {
        return await services.encryptPassword(password);
    };
    //generate token
    const generateToken = async (payload) => {
        return await services.generateToken(payload);
    };
    //password compare
    const comparePassword = async (password, hashedPassword) => {
        return await services.comparePassword(password, hashedPassword);
    };
    return {
        encryptPassword,
        generateToken,
        comparePassword,
    };
};
exports.authServiceInterface = authServiceInterface;
