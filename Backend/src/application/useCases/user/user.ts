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
