import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utilities/appError";
import { userTypeDbRepository } from "../../repositories/userDbRepositories";

export const postDp = async (
  user: string,
  filename: string,
  repository: ReturnType<userTypeDbRepository>
) => {
  return await repository.uploadDp(user,filename).then((response) => {
    if (!response) {
      throw new AppError(
        "Error occured while uploading profile picture.try again..!",
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};


export const findUser = async (
  user: string,
  repository: ReturnType<userTypeDbRepository>
) => {
  return await repository.findByProperty(user).then((response) => {
    if (!response) {
      throw new AppError(
        "Error occured while loading thiis page.try again..!",
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};


export const userSearch = async (
  user: string,
  repository: ReturnType<userTypeDbRepository>
) => {
  return await repository.searchUserbyChar(user).then((response) => {
    if (!response) {
      throw new AppError(
        "Error occured while searching users.try again..!",
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};

//to get users list

export const usersList = async (
  user:string,
  repository: ReturnType<userTypeDbRepository>
) => {
  return await repository.getUsersList(user).then((response) => {
    if (!response) {
      throw new AppError(
        "Error occured while loading users.try again..!",
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};

//to handle follow unfollow requests

export const followHandle = async (
  searchedUser:string,
  loginedUser:string,
  repository: ReturnType<userTypeDbRepository>
) => {
  return await repository.handleFollowUnfollow(searchedUser,loginedUser).then((response) => {
    if (!response) {
      throw new AppError(
        "Error occured while loading users.try again..!",
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};


//to handle save post 

export const savePostHandle =  async (
  postId: string,
  userId :string,
  repository: ReturnType<userTypeDbRepository>
) => {
  return await repository.handleSavePost(postId,userId).then((response) => {
    if (!response) {
      throw new AppError(
        ` Error occured while saving post.please try again..!`,
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};
