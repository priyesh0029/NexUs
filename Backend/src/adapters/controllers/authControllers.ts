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
  const authServices  = authServiceInterfaceApp(authService())

  const userRegister = asyncHandler(async (req: Request, res: Response) => {
      const user = req.body
      console.log(user);

      const token = await registerUser(user, userRepoDb, authServices);
  });

  return {
    userRegister,
  };
};
