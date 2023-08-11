import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { userTypeRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository";
import { userTypeDbRepository } from "../../application/repositories/userDbRepositories";
import { authServiceInterfaceType } from "../../application/services/authServiceInterface";
import { authServiceType } from "../../framework/services/authServices";
import { loginUser, registerUser } from "../../application/useCases/auths/userAuths";

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
      res.json({
        status: "success",
        message: "User registered",
        token,
      });
    });
  });

  //userLogin

  const userLogin = asyncHandler(async(req:Request,res:Response)=>{
    const user = req.body;
    console.log(user);

    await loginUser(user,userRepoDb,authServices).then((token)=>{
      console.log("response",token);
      res.json({
        status: "success",
        message: "User registered",
        token: token
      });
    })

  })

  return {
    userRegister,
    userLogin
  };
};
