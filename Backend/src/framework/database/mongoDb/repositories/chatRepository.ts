import { log } from "console";
import Chat from "../models/chatModel";
import User from "../models/userModel";

export const chatRepositoryMongoDb = () => {
  //Handle access Or CreateChat
  const accessOrCreateChatHandle = async (user: string, userId: string) => {
    const isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: userId } } },
        { users: { $elemMatch: { $eq: user } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .populate("latestMessage.sender", "name dp userName");

    console.log("isChat accessOrCreateChatHandle mongo db query : ", isChat);

    if (isChat.length > 0) {
      return isChat[0];
    } else {
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [userId, user],
      };
      const createdChat = await Chat.create(chatData);

      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      return fullChat;
    }
  };

  //handle or access  group chat

  const accessOrCreateGroupChatHandle = async (
    users: string[],
    userId: string
  ) => {
    const groupChatUsers = users;
    groupChatUsers.push(userId);
    console.log(groupChatUsers, typeof groupChatUsers);
    try {
      const groupChat = await Chat.create({
        chatName: "Group Chat",
        isGroupChat: true,
        users: groupChatUsers,
        groupAdmin: userId,
      });

      const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

        return fullGroupChat
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  //to get all chats of user

  const getChatsOfUser = async (userId: string) => {
    try {
      const results = await Chat.find({
        users: { $elemMatch: { $eq: userId } },
      })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .populate("latestMessage.sender", "name dp userName")
        .sort({ updatedAt: -1 });

      console.log("results of get all user chats: ", results);

      return results; // Return the array of chat documents
    } catch (error) {
      console.error(error);
      return false; // Return false in case of an error
    }
  };

  return {
    accessOrCreateChatHandle,
    accessOrCreateGroupChatHandle,
    getChatsOfUser,
  };
};

export type chatRepositoryMongoDbType = typeof chatRepositoryMongoDb;
