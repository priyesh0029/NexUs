import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { userTypeRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository";
import { userTypeDbRepository } from "../../application/repositories/userDbRepositories";
import { authServiceInterfaceType } from "../../application/services/authServiceInterface";
import { authServiceType } from "../../framework/services/authServices";
import { registerUser } from "../../application/useCases/addUser";

export const authControllers = (
  authServiceInterfaceApp: authServiceInterfaceType,
  authService: authServiceType,
  userDbRepo: userTypeDbRepository,
  userDbRepoImpl: userTypeRepositoryMongoDB
) => {
  const userRepoDb = userDbRepo(userDbRepoImpl());
  const authServices = authServiceInterfaceApp(authService());

  //user Register
  const userRegister = asyncHandler(async (req: Request, res: Response) => {
    const user = req.body;
    console.log(user);

    await registerUser(user, userRepoDb, authServices).then((token) => {
      console.log("toeken agfter registartion : ", token);
      res.json({
        status: "success",
        message: "User registered",
        token,
      });
    });
  });

  return {
    userRegister,
  };
};
