import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { findUser, postDp } from "../../application/useCases/user/user";
import AppError from "../../utilities/appError";
import { HttpStatus } from "../../types/httpStatus";
import { userTypeDbRepository } from "../../application/repositories/userDbRepositories";
import { userTypeRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository";

export const userControllers = (
  userDbRepo: userTypeDbRepository,
  userDbRepoImpl: userTypeRepositoryMongoDB
) => {
  const postRepo = userDbRepo(userDbRepoImpl());

  //change profile picture of user
  const changedp = asyncHandler(async (req: Request, res: Response) => {
    const media = req?.file;
    const user = req.body.userName;
    let filename;
    if (
      media !== undefined &&
      media !== null &&
      typeof media.filename === "string"
    ) {
      filename = media.filename;

      console.log("contollers like profilr photo : ", user, filename);
      await postDp(user, filename, postRepo).then((dp) => {
        console.log("contollers new  post response : ", dp);

        res.status(200).json({
          status: "success",
          dp,
        });
      });
    } else {
      throw new AppError(
        "Error occured while uploading profile picture.try again..!",
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //to find user by username

  const getUser = asyncHandler(async (req: Request, res: Response) => {
    const user = req.params.user
    console.log("user by username : ",user);
    await findUser(user,postRepo).then((user) => {
      console.log("contollers new  post response : ", user);
      
      res.status(200).json({
        status: "success",
        user,
      });
    });
  });
  return {
    changedp,
    getUser,
  };
};
