import asyncHandler from "express-async-handler";
import { chatRepositoryInterfaceType } from "../../application/repositories/chatDbrepository";
import { chatRepositoryMongoDbType } from "../../framework/database/mongoDb/repositories/chatRepository";
import { Request, Response } from "express";
import AppError from "../../utilities/appError";
import { HttpStatus } from "../../types/httpStatus";
import { accessOrCreateChat, fetchUserChats } from "../../application/useCases/chats/chats";

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

  //to get all chats of user
  const getUserChats = asyncHandler(async(req:Request,res:Response)=>{
    const userId = req.query.userId;
    console.log("createOrAccessChat user : ", userId);
    if ( typeof userId === "string") {
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
  }) 

  return {
    createOrAccessChat,
    getUserChats
  };
};


