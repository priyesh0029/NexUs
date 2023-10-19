"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuths_1 = require("../../application/useCases/auths/userAuths");
const authControllers = (authServiceInterfaceApp, authService, userDbRepo, userDbRepoImpl) => {
    const userRepoDb = userDbRepo(userDbRepoImpl());
    const authServices = authServiceInterfaceApp(authService());
    //user Register
    const userRegister = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.body;
        console.log(user);
        await (0, userAuths_1.registerUser)(user, userRepoDb, authServices).then((token) => {
            res.json({
                status: "success",
                message: "User registered",
                token,
            });
        });
    });
    //userLogin
    const userLogin = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.body;
        console.log(user);
        await (0, userAuths_1.loginUser)(user, userRepoDb, authServices).then((token) => {
            console.log("response", token);
            res.json({
                status: "success",
                message: "User registered",
                token: token
            });
        });
    });
    //check email for google login
    const checkEmail = (0, express_async_handler_1.default)(async (req, res) => {
        const { email } = req.body;
        console.log("email : ", email, req.body);
        await (0, userAuths_1.handleCheckEmail)(email, userRepoDb).then((user) => {
            console.log("response", user);
            res.json({
                status: "success",
                message: "checked email status successfully",
                user: user
            });
        });
    });
    return {
        userRegister,
        userLogin,
        checkEmail
    };
};
exports.authControllers = authControllers;
