"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authControllers_1 = require("../../../adapters/controllers/authControllers");
const userDbRepositories_1 = require("../../../application/repositories/userDbRepositories");
const userRepository_1 = require("../../database/mongoDb/repositories/userRepository");
const authServiceInterface_1 = require("../../../application/services/authServiceInterface");
const authServices_1 = require("../../services/authServices");
const authRouter = (router) => {
    const controllers = (0, authControllers_1.authControllers)(authServiceInterface_1.authServiceInterface, authServices_1.authServices, userDbRepositories_1.userDbRepository, userRepository_1.userRepositoryMongoDB);
    router.post('/register', controllers.userRegister);
    router.post('/login', controllers.userLogin);
    router.post('/checkEmail', controllers.checkEmail);
    return router;
};
exports.default = authRouter;
