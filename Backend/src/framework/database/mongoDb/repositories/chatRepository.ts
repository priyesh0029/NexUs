import { log } from "console";
import Chat from "../models/chatModel";
import User from "../models/userModel";
import Message from "../models/messageModel";

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
    groupChatUsers.unshift(userId);
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
        .populate("groupAdmin", "name dp userName _id");

      return fullGroupChat;
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
        .populate("groupAdmin", "name dp userName _id")
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

  // to sent a new message

  const newMessageHandle = async (
    content: string,
    chatId: string,
    userId: string
  ) => {
    try {
      const newMessage = {
        sender: userId,
        content: content,
        chatId: chatId,
      };

      let message = await Message.create(newMessage);
      message = await message.populate("sender", "userName dp");
      message = await message.populate("chatId");
      message = await User.populate(message, {
        path: "chatId.users",
        select: "userName dp",
      });
      await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
      console.log("Message Created and Populated:", message);

      return message;
    } catch (error) {
      console.error(error);
      return false; // Return false in case of an error
    }
  };

  //to get all messages of a chat

  const getChatAllMessages = async (chatId: string) => {
    try {
      const allMessages = await Message.find({ chatId: chatId })
        .populate("sender", "userName dp")
        .populate("chatId");

      return allMessages;
    } catch (error) {
      console.error(error);
      return false; // Return false in case of an error
    }
  };

  //to handle save chat notifications

  const handleSaveChatNotificatons = async (chatId: string, userId: string) => {
    try {
      const notificationExist = await User.findOne({
        _id: userId,
        notifications: { $elemMatch: { $eq: chatId } },
      });
      console.log("notificationExist :", notificationExist);

      if (!notificationExist) {
        const addNotification = await User.updateOne(
          { _id: userId },
          { $push: { notifications: chatId } }
        );
        console.log("addNotification :", addNotification);
        if (addNotification.modifiedCount === 1) {
          return true;
        }
      } else {
        return "already added";
      }
    } catch (error) {
      return false; // Return false if the update operation didn't succeed
    }
  };

  //to handle remove chat notifications

  const handleRemoveChatNotificatons = async (
    chatId: string,
    userId: string
  ) => {
    try {
      // const notificationExist = await User.findOne({
      //   _id: userId,
      //   notifications: { $elemMatch: { $eq: chatId } },
      // });
      // console.log("notificationExist :", notificationExist);

      // if (notificationExist) {
      const removeNotification = await User.findOneAndUpdate(
        { _id: userId, notifications: { $elemMatch: { $eq: chatId } } },
        { $pull: { notifications: chatId } }
      );
      if (removeNotification) {
        console.log("removeNotification:", removeNotification.notifications);
        return true;
      } else {
        return "alreadyremoved";
      }
      // }
      //  else {
      //   return "already removed";
      // }
    } catch (error) {
      return false; // Return false if the update operation didn't succeed
    }
  };

  //to get all chat notifications

  const handleAllChatNotificatons = async (userId: string) => {
    try {
      const notifications = await User.findOne(
        {
          _id: userId,
        },
        { _id: 0, notifications: 1 }
      );
      console.log("notificationExist :", notifications);
      return notifications;
    } catch (error) {
      return false; // Return false if the update operation didn't succeed
    }
  };

  // to add new members to the gruoup chat

  const addNewMembersToGroupChat = async (users: string[], chatId: string) => {
    console.log("addNewMembersToGroupChat : ", users, chatId);
    const userArray = users;
    try {
      const addNewUsers = await Chat.findOneAndUpdate(
        { _id: chatId, users: { $nin: userArray } },
        { $push: { users: { $each: userArray } } }
      );

      console.log("addNewUsers addNewMembersToGroupChat : ", addNewUsers);

      const groupChatUsers = await Chat.findOne({ _id: chatId })
        .populate("users", "-password")
        .populate("groupAdmin", "name dp userName _id");

      return groupChatUsers;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  //to handle new chat name

  const newChatName = async (newName: string, chatId: string) => {
    console.log("handle new chat name  : ", newName, chatId);
    try {
      const UpdatedNewChatName = await Chat.updateOne(
        { _id: chatId },
        { $set: { chatName: newName } }
      );

      console.log("handle new chat name  : ", UpdatedNewChatName);

      if (UpdatedNewChatName.modifiedCount === 1) {
        const groupChatUsers = await Chat.findOne({ _id: chatId })
          .populate("users", "-password")
          .populate("groupAdmin", "name dp userName _id");

        return groupChatUsers;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  //to remove User From group Chat

  const removeUserFromChatHandle = async (
    chatId: string,
    chatUserId: string
  ) => {
    console.log(" remove User From group Chat  : ", chatUserId);
    try {
      const removeUserFromGrpChat = await Chat.updateOne(
        { _id: chatId },
        { $pull: { users: chatUserId } }
      );

      console.log(" remove User From group Chat : ", removeUserFromGrpChat);
      if (removeUserFromGrpChat.modifiedCount === 1) {
        const groupChatUsers = await Chat.findOne({ _id: chatId })
          .populate("users", "-password")
          .populate("groupAdmin", "name dp userName _id");

        return groupChatUsers;
      }else{
        return false
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return {
    accessOrCreateChatHandle,
    accessOrCreateGroupChatHandle,
    getChatsOfUser,
    newMessageHandle,
    getChatAllMessages,
    handleSaveChatNotificatons,
    handleRemoveChatNotificatons,
    handleAllChatNotificatons,
    addNewMembersToGroupChat,
    newChatName,
    removeUserFromChatHandle,
  };
};

export type chatRepositoryMongoDbType = typeof chatRepositoryMongoDb;
