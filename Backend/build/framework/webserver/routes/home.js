"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postControllers_1 = require("../../../adapters/controllers/postControllers");
const postDbrepository_1 = require("../../../application/repositories/postDbrepository");
const postRepository_1 = require("../../database/mongoDb/repositories/postRepository");
const homeRouter = (router) => {
    const controllers = (0, postControllers_1.postControllers)(postDbrepository_1.postRepositoryInterface, postRepository_1.postRepositoryMongoDb);
    router.get('/', controllers.getAllPost);
    return router;
};
exports.default = homeRouter;
