import { Router } from "express";
import { userControllers } from "../../../adapters/controllers/userControllers";
import { uploadsProfilePictureMulter } from "../middleware/multer";
import { userDbRepository } from "../../../application/repositories/userDbRepositories";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";
import { authServiceInterface } from "../../../application/services/authServiceInterface";
import { authServices } from "../../services/authServices";

const user = (router: Router) => {
  const controllers = userControllers(
    userDbRepository,
    userRepositoryMongoDB,
    authServiceInterface,
    authServices
  );

  router.post("/changedp", uploadsProfilePictureMulter, controllers.changedp);

  router.get("/user/:user", controllers.getUser);

  router.get("/search", controllers.searchUser);

  router.get("/usersList", controllers.getUsersList);

  router.post("/followhandle", controllers.handleFollows);

  router.post("/savepost", controllers.savePost);

  router.patch("/changeGender", controllers.changeGender);

  router.patch("/updateProfile", controllers.updateProfile);

  router.patch("/checkPassword", controllers.checkPassword);

  router.patch("/newPassword", controllers.newPassword);


  return router;
};

export default user;
