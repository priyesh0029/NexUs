import { Router } from "express";
import { userControllers } from "../../../adapters/controllers/userControllers";
import { uploadsProfilePictureMulter } from "../middleware/multer";
import { userDbRepository } from "../../../application/repositories/userDbRepositories";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";

const user = (router: Router) => {
  const controllers = userControllers(userDbRepository, userRepositoryMongoDB);

  router.post("/changedp", uploadsProfilePictureMulter, controllers.changedp);

  router.get('/user/:user',controllers.getUser)

  router.get('/search',controllers.searchUser)

  router.get('/usersList',controllers.getUsersList)

  router.post('/followhandle',controllers.handleFollows)

  router.post('/savepost',controllers.savePost)


  return router;
};

export default user;
