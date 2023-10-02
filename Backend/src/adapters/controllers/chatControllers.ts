import asyncHandler from "express-async-handler";
import { chatRepositoryInterfaceType } from "../../application/repositories/chatDbrepository";
import { chatRepositoryMongoDbType } from "../../framework/database/mongoDb/repositories/chatRepository";
import { Request, Response } from "express";
import AppError from "../../utilities/appError";
import { HttpStatus } from "../../types/httpStatus";
import {
  accessOrCreateChat,
  accessOrCreateGroupChat,
  amendGroupChatName,
  fetchAllChatMessages,
  fetchUserChats,
  handleAllChatNotifications,
  handleChatNotificationRemove,
  handleChatNotificationSave,
  newMembersAddGrpChat,
  removeUserFromGroupChat,
  sentNewMessage,
} from "../../application/useCases/chats/chats";

export const chatControllers = (
  chatRepositoryInf: chatRepositoryInterfaceType,
  chatRepoMongoImp: chatRepositoryMongoDbType
) => {
  const chatRepo = chatRepositoryInf(chatRepoMongoImp());

  //create Or AccessChat

  const createOrAccessChat = asyncHandler(
    async (req: Request, res: Response) => {
      const user = req.body.user;
      const userId = req.query.userId;
      console.log("createOrAccessChat user : ", user);
      if (typeof user === "string" && typeof userId === "string") {
        await accessOrCreateChat(user, userId, chatRepo).then((chat) => {
          console.log("contollers all post response : ", chat);

          res.status(200).json({
            status: "success",
            chat,
          });
        });
      } else {
        throw new AppError(
          ` Error while senting message.try again..!`,
          HttpStatus.BAD_REQUEST
        );
      }
    }
  );
  //create Or create Or Access GroupChat

  const createOrAccessGroupChat = asyncHandler(
    async (req: Request, res: Response) => {
      const users = req.body.users;
      const userId = req.query.userId;
      if (Array.isArray(users) && typeof userId === "string") {
        console.log("createOrAccessChat user : ", users, typeof users);
        await accessOrCreateGroupChat(users, userId, chatRepo).then(
          (groupChat) => {
            console.log("contollers all post response : ", groupChat);

            res.status(200).json({
              status: "success",
              groupChat,
            });
          }
        );
      } else {
        throw new AppError(
          ` Error while senting message.try again..!`,
          HttpStatus.BAD_REQUEST
        );
      }
    }
  );

  //to get all chats of user
  const getUserChats = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.query.userId;
    console.log("createOrAccessChat user : ", userId);
    if (typeof userId === "string") {
      await fetchUserChats(userId, chatRepo).then((allChats) => {
        console.log("contollers all post response : ", allChats);

        res.status(200).json({
          status: "success",
          allChats,
        });
      });
    } else {
      throw new AppError(
        ` Error while fetching user chat.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //to sent a new message
  const newMessage = asyncHandler(async (req: Request, res: Response) => {
    const { content, chatId } = req.body;
    const userId = req.query.userId;
    console.log("createOrAccessChat user : ", content, chatId);
    if (
      typeof content === "string" &&
      typeof chatId === "string" &&
      typeof userId === "string"
    ) {
      await sentNewMessage(content, chatId, userId, chatRepo).then(
        (newMessage) => {
          console.log("contollers all post response : ", newMessage);

          res.status(200).json({
            status: "success",
            newMessage,
          });
        }
      );
    } else {
      throw new AppError(
        ` Error while fetching user chat.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //to fetch all messages
  const fetchallmessages = asyncHandler(async (req: Request, res: Response) => {
    const { chatId } = req.query;
    console.log("chat id of fetch all messages  : ", chatId);
    if (typeof chatId === "string") {
      await fetchAllChatMessages(chatId, chatRepo).then((allMessages) => {
        console.log("contollers all post response : ", allMessages);

        res.status(200).json({
          status: "success",
          allMessages,
        });
      });
    } else {
      throw new AppError(
        ` Error while fetching user chat.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //to save chat notificataions
  const saveChatNotification = asyncHandler(
    async (req: Request, res: Response) => {
      const { chatId, userId } = req.query;
      console.log("chat id of fetch all messages  : ", chatId, userId);
      if (typeof chatId === "string" && typeof userId === "string") {
        await handleChatNotificationSave(chatId, userId, chatRepo).then(
          (notification) => {
            console.log("contollers all post response : ", notification);

            res.status(200).json({
              status: "success",
              notification,
            });
          }
        );
      } else {
        throw new AppError(
          ` Error while fetching user chat notifications.try again..!`,
          HttpStatus.BAD_REQUEST
        );
      }
    }
  );

  ///to remove Chat notification

  const removeChatNotification = asyncHandler(
    async (req: Request, res: Response) => {
      const { chatId, userId } = req.query;
      console.log("chat id of fetch all messages  : ", chatId, userId);
      if (typeof chatId === "string" && typeof userId === "string") {
        await handleChatNotificationRemove(chatId, userId, chatRepo).then(
          (notification) => {
            console.log("contollers all post response : ", notification);

            res.status(200).json({
              status: "success",
              notification,
            });
          }
        );
      } else {
        throw new AppError(
          ` Error while fetching user chat notifications.try again..!`,
          HttpStatus.BAD_REQUEST
        );
      }
    }
  );

  ///to get all  Chat notification

  const getChatNotifications = asyncHandler(
    async (req: Request, res: Response) => {
      const { userId } = req.query;
      console.log("chat id of fetch all messages  : ", userId);
      if (typeof userId === "string") {
        await handleAllChatNotifications(userId, chatRepo).then(
          (notification) => {
            console.log("contollers all post response : ", notification);

            res.status(200).json({
              status: "success",
              notification,
            });
          }
        );
      } else {
        throw new AppError(
          ` Error while fetching user chat notifications.try again..!`,
          HttpStatus.BAD_REQUEST
        );
      }
    }
  );

  //add People To GroupChat

  const addPeopleToGroupChat = asyncHandler(
    async (req: Request, res: Response) => {
      const {newUsers,chatId} = req.body
      if (Array.isArray(newUsers) && typeof chatId === "string") {
        console.log("createOrAccessChat user : ", newUsers, typeof newUsers);
        await newMembersAddGrpChat(newUsers, chatId, chatRepo).then(
          (newUsers) => {
            console.log("contollers all post response : ", newUsers);

            res.status(200).json({
              status: "success",
              newUsers,
            });
          }
        );
      } else {
        throw new AppError(
          ` Error while adding people to group chat.try again..!`,
          HttpStatus.BAD_REQUEST
        );
      }
    }
  );

  // to change group chat name 

  const changeGroupChatName = asyncHandler(
    async (req: Request, res: Response) => {
      const {newName,chatId} = req.body
      if (typeof newName === "string" && typeof chatId === "string") {
        await amendGroupChatName(newName, chatId, chatRepo).then(
          (chat) => {
            console.log("contollers all post response : ", chat);

            res.status(200).json({
              status: "success",
              chat,
            });
          }
        );
      } else {
        throw new AppError(
          ` Error while changing chat name.try again..!`,
          HttpStatus.BAD_REQUEST
        );
      }
    }
  );

  // to remove a member From Chat

  const removeFromChat = asyncHandler(
    async (req: Request, res: Response) => {
      const {chatId,chatUserId} = req.body
      if (typeof chatId === "string" && typeof chatUserId === "string") {
        await removeUserFromGroupChat( chatId,chatUserId,chatRepo).then(
          (chat) => {
            console.log("to remove a member From Chat : ", chat);

            res.status(200).json({
              status: "success",
              chat,
            });
          }
        );
      } else {
        throw new AppError(
          ` Error while removing member from chat.try again..!`,
          HttpStatus.BAD_REQUEST
        );
      }
    }
  );


  return {
    createOrAccessChat,
    getUserChats,
    createOrAccessGroupChat,
    newMessage,
    fetchallmessages,
    saveChatNotification,
    removeChatNotification,
    getChatNotifications,
    addPeopleToGroupChat,
    changeGroupChatName,
    removeFromChat
  };
};
