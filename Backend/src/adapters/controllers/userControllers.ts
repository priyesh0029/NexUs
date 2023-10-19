import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import {
  amendGender,
  findUser,
  followHandle,
  handleCheckPassword,
  handleDeactivateAccount,
  handleDeleteAccount,
  handleNewPassword,
  handleReportUser,
  postDp,
  savePostHandle,
  updateProfileHandle,
  userSearch,
  usersList,
} from "../../application/useCases/user/user";
import AppError from "../../utilities/appError";
import { HttpStatus } from "../../types/httpStatus";
import { userTypeDbRepository } from "../../application/repositories/userDbRepositories";
import { userTypeRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository";
import { authServiceInterfaceType } from "../../application/services/authServiceInterface";
import { authServiceType } from "../../framework/services/authServices";

export const userControllers = (
  userDbRepo: userTypeDbRepository,
  userDbRepoImpl: userTypeRepositoryMongoDB,
  authServiceInterfaceApp: authServiceInterfaceType,
  authService: authServiceType
) => {
  const postRepo = userDbRepo(userDbRepoImpl());
  const authServices = authServiceInterfaceApp(authService());

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
    const user = req.params.user;
    console.log("user by username : ", user);
    await findUser(user, postRepo).then((user) => {
      console.log("contollers new  post response : ", user);

      res.status(200).json({
        status: "success",
        user,
      });
    });
  });

  //to search all users

  const searchUser = asyncHandler(async (req: Request, res: Response) => {
    const user = req.query.user;
    const userId = req.query.userId;
    console.log("user by username : ", user);
    if (typeof user === "string" && typeof userId === "string") {
      await userSearch(user,userId, postRepo).then((users) => {
        console.log("contollers search user response : ", users);

        res.status(200).json({
          status: "success",
          users,
        });
      });
    } else {
      throw new AppError(
        ` Error while searching user .try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //to get userslist

  const getUsersList = asyncHandler(async (req: Request, res: Response) => {
    const user = req.query.user;
    if (typeof user === "string") {
      await usersList(user, postRepo).then((users) => {
        console.log(
          "contollers search userslist response  1111111222222222222222222222222222222: ",
          users
        );

        res.status(200).json({
          status: "success",
          users,
        });
      });
    } else {
      throw new AppError(
        ` Error while fetching userslist.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //to handle follow unfollow requests

  const handleFollows = asyncHandler(async (req: Request, res: Response) => {
    const users = req.body;
    console.log("contollers search handleFollows req.body.users: ", users);
    const searchedUser = users.searchedUser;
    const loginedUser = users.loginedUser;

    if (typeof searchedUser === "string" && typeof loginedUser === "string") {
      await followHandle(searchedUser, loginedUser, postRepo).then((users) => {
        console.log(
          "contollers search userslist response  1111111222222222222222222222222222222: ",
          users
        );

        res.status(200).json({
          status: "success",
          users,
        });
      });
    } else {
      throw new AppError(
        ` Error while handling follow unfollow requests.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //to handle save post

  const savePost = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.body;
    const userId = req.query.userId;
    console.log("contollers save post postDetails : ", postId, userId);
    if (typeof postId === "string" && typeof userId === "string") {
      await savePostHandle(postId, userId, postRepo).then((savedPost) => {
        console.log("contollers all post response : ", savedPost);

        res.status(200).json({
          status: "success",
          savedPost,
        });
      });
    } else {
      throw new AppError(
        ` Error while saving post.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //to amend gender

  const changeGender = asyncHandler(async (req: Request, res: Response) => {
    const { gender } = req.body
    const userId = req.query.userId;
    console.log("contollers change Gender : ", gender,userId);
    if (typeof gender === "string" && typeof userId === "string") {
      await amendGender(gender,userId, postRepo).then((gender) => {
        console.log(
          "contollers gender response  1111111222222222222222222222222222222: ",
          gender
        );

        res.status(200).json({
          status: "success",
          gender,
        });
      });
    } else {
      throw new AppError(
        ` Error while changing gender.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //update profile

  const updateProfile = asyncHandler(async (req: Request, res: Response) => {
    const { name,bio,dob } = req.body.userData
    const userId = req.query.userId;
    console.log("contollersupdateProfile : ", req.body.userData);
    if (typeof name === "string" && typeof dob === "string" && typeof bio === "string" && typeof userId === "string") {
      await updateProfileHandle(name,bio,dob,userId, postRepo).then((profileupdate) => {
        console.log(
          "contollers gender response  1111111222222222222222222222222222222: ",
          profileupdate
        );

        res.status(200).json({
          status: "success",
          profileupdate,
        });
      });
    } else {
      throw new AppError(
        ` Error while updating profile.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //check password
  const checkPassword = asyncHandler(async (req: Request, res: Response) => {
    const {password} = req.body
    const userId = req.query.userId;
    console.log("contollersupdateProfile : ", password);
    if (typeof password === "string" && typeof userId === "string") {
      await handleCheckPassword(password,userId, postRepo,authServices).then((password) => {
        console.log(
          "contollers gender response  1111111222222222222222222222222222222: ",
          password
        );

        res.status(200).json({
          status: "success",
          password,
        });
      });
    } else {
      throw new AppError(
        ` Error while updating profile.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //set new password
  const newPassword = asyncHandler(async (req: Request, res: Response) => {
    const {password} = req.body
    const userId = req.query.userId;
    console.log("contollersupdateProfile : ", password);
    if (typeof password === "string" && typeof userId === "string") {
      await handleNewPassword(password,userId, postRepo,authServices).then((password) => {
        console.log(
          "contollers gender response  1111111222222222222222222222222222222: ",
          password
        );

        res.status(200).json({
          status: "success",
          password,
        });
      });
    } else {
      throw new AppError(
        ` Error while updating profile.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //deactivateAccount

  const deactivateAccount = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.query.userId;
    if (typeof userId === "string") {
      await handleDeactivateAccount(userId, postRepo).then((deactivate) => {
        console.log(
          "contollers gender response  1111111222222222222222222222222222222: ",
          deactivate
        );

        res.status(200).json({
          status: "success",
          deactivate,
        });
      });
    } else {
      throw new AppError(
        ` Error while deactivating account.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //deleteAccount

  const deleteAccount = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.query.userId;
    if (typeof userId === "string") {
      await handleDeleteAccount(userId, postRepo).then((deleted) => {
        console.log(
          "contollers gender response  1111111222222222222222222222222222222: ",
          deleted
        );

        res.status(200).json({
          status: "success",
          deleted,
        });
      });
    } else {
      throw new AppError(
        ` Error while deactivating account.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //to report a user

  const reportUser = asyncHandler(async (req: Request, res: Response) => {
    const { userId, report } = req.body;
    const loggedUser = req.query.userId;
    console.log("contollers report comment : ", report, userId,loggedUser);
    if (
      typeof loggedUser === "string" &&
      typeof report === "string" &&
      typeof userId === "string"
    ) {
      await handleReportUser(loggedUser, report, userId, postRepo).then(
        (reported) => {
          console.log("contollers report comment response : ", reported);

          res.status(200).json({
            status: "success",
            reported,
          });
        }
      );
    } else {
      throw new AppError(
        ` Error while reporting the user.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });



  return {
    changedp,
    getUser,
    searchUser,
    getUsersList,
    handleFollows,
    savePost,
    changeGender,
    updateProfile,
    checkPassword,
    newPassword,
    deactivateAccount,
    deleteAccount,
    reportUser
  };
};
