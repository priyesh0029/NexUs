import { Router } from "express";
import { userControllers } from "../../../adapters/controllers/userControllers";
import { uploadsProfilePictureMulter } from "../middleware/multer";
import { userDbRepository } from "../../../application/repositories/userDbRepositories";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";

const user = (router: Router) => {
  const controllers = userControllers(userDbRepository, userRepositoryMongoDB);

  router.post("/changedp", uploadsProfilePictureMulter, controllers.changedp);

  router.get('/user/:user',controllers.getUser)

  return router;
};

export default user;
