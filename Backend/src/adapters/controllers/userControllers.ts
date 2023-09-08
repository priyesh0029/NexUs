import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { findUser, followHandle, postDp, savePostHandle, userSearch, usersList } from "../../application/useCases/user/user";
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

  //to search all users

  const searchUser = asyncHandler(async (req: Request, res: Response) => {
    const user = req.query.user
    console.log("user by username : ",user);
    if(typeof user === 'string'){

      await userSearch(user,postRepo).then((users) => {
        console.log("contollers search user response : ", users);
        
        res.status(200).json({
          status: "success",
          users,
        });
      });
    }
  });

  //to get userslist

  const getUsersList = asyncHandler(async (req: Request, res: Response) => {
    const user = req.query.user
    if(typeof user === 'string'){
      await usersList(user,postRepo).then((users) => {
        console.log("contollers search userslist response  1111111222222222222222222222222222222: ", users);
        
        res.status(200).json({
          status: "success",
          users,
        });
      });
    }
    
  });

  //to handle follow unfollow requests

  const handleFollows = asyncHandler(async (req: Request, res: Response) => {
    const users = req.body
    console.log("contollers search handleFollows req.body.users: ", users);
    const searchedUser = users.searchedUser
    const loginedUser = users.loginedUser

    if(typeof searchedUser === 'string'  && typeof loginedUser === 'string'){
      await followHandle(searchedUser,loginedUser,postRepo).then((users) => {
        console.log("contollers search userslist response  1111111222222222222222222222222222222: ", users);
        
        res.status(200).json({
          status: "success",
          users,
        });
      });
    }
    
  });

  //to handle save post

  
  const savePost = asyncHandler(async(req :Request,res : Response)=>{
    const {postId} = req.body
    const userId = req.query.userId
    console.log("contollers save post postDetails : ", postId,userId);
    if (typeof postId === "string" && typeof userId === 'string') {
      await savePostHandle(postId,userId,postRepo).then((savedPost) => {
        console.log("contollers all post response : ", savedPost);

        res.status(200).json({
          status: "success",
          savedPost,
        });
      });
    }else {
      throw new AppError(
        ` Error while saving post.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  })

  return {
    changedp,
    getUser,
    searchUser,
    getUsersList,
    handleFollows,
    savePost
  };
};
