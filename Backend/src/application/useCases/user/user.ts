import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utilities/appError";
import { userTypeDbRepository } from "../../repositories/userDbRepositories";
import { authServiceInterfaceType } from "../../services/authServiceInterface";

export const postDp = async (
  user: string,
  filename: string,
  repository: ReturnType<userTypeDbRepository>
) => {
  return await repository.uploadDp(user, filename).then((response) => {
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
  userId:string,
  repository: ReturnType<userTypeDbRepository>
) => {
  return await repository.searchUserbyChar(user,userId).then((response) => {
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
  user: string,
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
  searchedUser: string,
  loginedUser: string,
  repository: ReturnType<userTypeDbRepository>
) => {
  return await repository
    .handleFollowUnfollow(searchedUser, loginedUser)
    .then((response) => {
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

export const savePostHandle = async (
  postId: string,
  userId: string,
  repository: ReturnType<userTypeDbRepository>
) => {
  return await repository.handleSavePost(postId, userId).then((response) => {
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

//to handle save post

export const amendGender = async (
  gender: string,
  userId: string,
  repository: ReturnType<userTypeDbRepository>
) => {
  return await repository.genderAmend(gender, userId).then((response) => {
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

//to handle update Profile

export const updateProfileHandle = async (
  name: string,
  bio: string,
  userId: string,
  repository: ReturnType<userTypeDbRepository>
) => {
  return await repository
    .handleUpdateProfile(name, bio, userId)
    .then((response) => {
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

// to handleCheckPassword

export const handleCheckPassword = async (
  password: string,
  userId: string,
  repository: ReturnType<userTypeDbRepository>,
  authService: ReturnType<authServiceInterfaceType>
) => {
  return await repository.findById(userId).then((user) => {
    console.log("login details of user :", user[0].password);
    if (user.length === 0) {
      throw new AppError(
        `passwor validation failed.try again after login ...`,
        HttpStatus.UNAUTHORIZED
      );
    }
    return authService
      .comparePassword(password, user[0].password)
      .then(async (status) => {
        if (!status) {
          throw new AppError(
            `Incorrect password.try again!`,
            HttpStatus.UNAUTHORIZED
          );
        }
        return status;
      });
  });
};

// to handleCheckPassword

export const handleNewPassword = async (
  password: string,
  userId: string,
  repository: ReturnType<userTypeDbRepository>,
  authService: ReturnType<authServiceInterfaceType>
) => {
  return await authService.encryptPassword(password).then(async(password) => {
    if (password.length === 0) {
      throw new AppError(
        `something went wrong.try again..`,
        HttpStatus.UNAUTHORIZED
      )
    }
    return await repository.changePassword(userId, password).then((response) => {
      if (!response) {
        throw new AppError(
          `something went wrong.try again..`,
          HttpStatus.UNAUTHORIZED
        );
      }
      console.log("changePassword: ", response);
      
      return response;
    });
      
    })
};


//to handle deactivate account

export const handleDeactivateAccount = async (
  userId: string,
  repository: ReturnType<userTypeDbRepository>,
) => {

    return await repository.deactivateAccount(userId).then((response) => {
      if (!response) {
        throw new AppError(
          `something went wrong while deactivating account.try again..`,
          HttpStatus.UNAUTHORIZED
        );
      }
      console.log("deactivateAccount: ", response);
      
      return response;
    });
      
};

//to handle delete Account

export const handleDeleteAccount = async (
  userId: string,
  repository: ReturnType<userTypeDbRepository>,
) => {

    return await repository.deleteAccount(userId).then((response) => {
      if (!response) {
        throw new AppError(
          `something went wrong while deleting account.try again..`,
          HttpStatus.UNAUTHORIZED
        );
      }
      console.log("deactivateAccount: ", response);
      
      return response;
    });
      
};


//to report a user 

export const handleReportUser =  async (
  loggedUser: string,
  report:string,
  userId:string,
  repository: ReturnType<userTypeDbRepository>
) => {
  return await repository.reportUserHandle(loggedUser,report,userId).then((response) => {
    if (!response) {
      throw new AppError(
        ` Error occured while reporting user.please try again..!`,
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};