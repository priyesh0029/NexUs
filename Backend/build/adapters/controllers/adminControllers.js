"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthControllers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const adminAuths_1 = require("../../application/useCases/admin/adminAuths");
const adminAuthControllers = (authServiceInterfaceApp, authService, adminDbRepo, adminDbRepoImpl) => {
    const adminRepoDb = adminDbRepo(adminDbRepoImpl());
    const authServices = authServiceInterfaceApp(authService());
    //AdminLogin
    const getAdminLogin = (0, express_async_handler_1.default)(async (req, res) => {
        const admin = req.body;
        console.log("admindata i n controllers :", admin);
        await (0, adminAuths_1.loginAdmin)(admin, adminRepoDb, authServices).then((adminDetails) => {
            console.log("response", adminDetails);
            res.json({
                status: "success",
                message: "admin loggedin successfully",
                adminDetails: adminDetails
            });
        });
    });
    return {
        getAdminLogin
    };
};
exports.adminAuthControllers = adminAuthControllers;
