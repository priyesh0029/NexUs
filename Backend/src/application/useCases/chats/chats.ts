import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utilities/appError";
import { chatRepositoryInterfaceType } from "../../repositories/chatDbrepository";

export const accessOrCreateChat = async (
  user: string,
  loggedUser: string,
  repository: ReturnType<chatRepositoryInterfaceType>
) => {
  return await repository.handleAccessOrCreateChat(user,loggedUser).then((chat) => {
    if (!chat) {
      throw new AppError(
        "Error occured while loading chats.please refresh the page and try again..!",
        HttpStatus.BAD_REQUEST
      );
    }
    return chat;
  });
};

export const fetchUserChats = async (
    loggedUser: string,
    repository: ReturnType<chatRepositoryInterfaceType>
  ) => {
    return await repository.usersChatFetch(loggedUser).then((allChats) => {
      if (!allChats) {
        throw new AppError(
          "Error occured while loading chats.please refresh the page and try again..!",
          HttpStatus.BAD_REQUEST
        );
      }
      return allChats;
    });
  };
