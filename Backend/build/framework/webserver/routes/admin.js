"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adminControllers_1 = require("../../../adapters/controllers/adminControllers");
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const authServices_1 = require("../../services/authServices");
const adminDbRepository_1 = require("../../../application/repositories/adminDbRepository");
const adminRepository_1 = require("../../database/mongoDb/repositories/adminRepository");
const adminRouter = (router) => {
    const controllers = (0, adminControllers_1.adminAuthControllers)(authServiceInterface_1.authServiceInterface, authServices_1.authServices, adminDbRepository_1.adminDbRepository, adminRepository_1.adminRepositoryMongoDB);
    router.post('/adminlogin', controllers.getAdminLogin);
    return router;
};
exports.default = adminRouter;
