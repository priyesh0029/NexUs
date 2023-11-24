import { Router } from "express";
import { adminAuthControllers } from "../../../adapters/controllers/adminControllers";
import { authServiceInterface } from "../../../application/services/authServiceInterface";
import { authServices } from "../../services/authServices";
import { adminDbRepository } from "../../../application/repositories/adminDbRepository";
import { adminRepositoryMongoDB } from "../../database/mongoDb/repositories/adminRepository";

const adminAuthRouter = (router: Router) => {
  const controllers = adminAuthControllers(
    authServiceInterface,
    authServices,
    adminDbRepository,
    adminRepositoryMongoDB
  );

  router.post("/adminlogin", controllers.getAdminLogin);

  return router;
};

export default adminAuthRouter;
