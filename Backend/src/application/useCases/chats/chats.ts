import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utilities/appError";
import { chatRepositoryInterfaceType } from "../../repositories/chatDbrepository";

//access Or Create single Chat
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


//accessOrCreateGroupChat

export const accessOrCreateGroupChat = async (
  users: string[],
  loggedUser: string,
  repository: ReturnType<chatRepositoryInterfaceType>
) => {
  return await repository.handleAccessOrCreateGroupChat(users,loggedUser).then((groupChat) => {
    if (!groupChat) {
      throw new AppError(
        "Error occured while loading chats.please refresh the page and try again..!",
        HttpStatus.BAD_REQUEST
      );
    }
    return groupChat;
  });
};

//fetch User Chats
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
//sent a new Message

export const sentNewMessage = async (
  content: string,
  chatId: string,
  userId: string,
  repository: ReturnType<chatRepositoryInterfaceType>
) => {
  return await repository.handleNewMessage(content,chatId,userId).then((newMessage) => {
    if (!newMessage) {
      throw new AppError(
        "Error occured while loading mesages.please refresh the page and try again..!",
        HttpStatus.BAD_REQUEST
      );
    }
    return newMessage;
  });
};

//fetch all messages of a chat

export const fetchAllChatMessages = async (
  chatId: string,
  repository: ReturnType<chatRepositoryInterfaceType>
) => {
  return await repository.allChatMessages(chatId).then((newMessage) => {
    if (!newMessage) {
      throw new AppError(
        "Error occured while loading mesages.please refresh the page and try again..!",
        HttpStatus.BAD_REQUEST
      );
    }
    return newMessage;
  });
};

// to save chat notificaitons

export const handleChatNotificationSave = async (
  chatId: string,
  userId : string,
  repository: ReturnType<chatRepositoryInterfaceType>
) => {
  return await repository.chatNotificationSave(chatId,userId).then((notification) => {
    if (!notification) {
      throw new AppError(
        "Error occured while saving chat notifications.please refresh the page and try again..!",
        HttpStatus.BAD_REQUEST
      );
    }
    return notification;
  });
};



// to reemove chat notificaitons

export const handleChatNotificationRemove = async (
  chatId: string,
  userId : string,
  repository: ReturnType<chatRepositoryInterfaceType>
) => {
  return await repository.chatNotificationRemove(chatId,userId).then((notification) => {
    if (!notification) {
      throw new AppError(
        "Error occured while remiving chat notifications.please refresh the page and try again..!",
        HttpStatus.BAD_REQUEST
      );
    }
    return notification;
  });
};

// to get all chat notificaitons

export const handleAllChatNotifications = async (
  userId : string,
  repository: ReturnType<chatRepositoryInterfaceType>
) => {
  return await repository.allChatNotifications(userId).then((notification) => {
    if (!notification) {
      throw new AppError(
        "Error occured while remiving chat notifications.please refresh the page and try again..!",
        HttpStatus.BAD_REQUEST
      );
    }
    return notification;
  });
};

//to add new members to the group chat 

export const newMembersAddGrpChat = async (
  users: string[],
  chatId: string,
  repository: ReturnType<chatRepositoryInterfaceType>
) => {
  return await repository.handleAddNewUsersGroupChat(users,chatId).then((groupChat) => {
    if (!groupChat) {
      throw new AppError(
        "Error occured while adding new members to the group chat.please refresh the page and try again..!",
        HttpStatus.BAD_REQUEST
      );
    }
    return groupChat;
  });
};

//to handle new chat name 

export const amendGroupChatName = async (
  newName: string,
  chatId: string,
  repository: ReturnType<chatRepositoryInterfaceType>
) => {
  return await repository.handleNewChatName(newName,chatId).then((groupChat) => {
    if (!groupChat) {
      throw new AppError(
        "Error occured while adding new members to the group chat.please refresh the page and try again..!",
        HttpStatus.BAD_REQUEST
      );
    }
    return groupChat;
  });
};

//to handle remove UserFrom group Chat

export const removeUserFromGroupChat = async (
  chatId: string,
  chatUserId: string,
  repository: ReturnType<chatRepositoryInterfaceType>
) => {
  return await repository.handleRemoveUserFromChat(chatId,chatUserId).then((groupChat) => {
    if (!groupChat) {
      throw new AppError(
        "Error occured while adding new members to the group chat.please refresh the page and try again..!",
        HttpStatus.BAD_REQUEST
      );
    }
    return groupChat;
  });
};

//to handle leave User From GroupChat

export const leaveUserFromGroupChat = async (
  chatId: string,
  userId: string,
  repository: ReturnType<chatRepositoryInterfaceType>
) => {
  return await repository.handleLeaveUserFromChat(chatId,userId).then((groupChat) => {
    if (!groupChat) {
      throw new AppError(
        "Error occured while leaving the group chat.please refresh the page and try again..!",
        HttpStatus.BAD_REQUEST
      );
    }
    return groupChat;
  });
};