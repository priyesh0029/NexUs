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

  //to get all chats of user

  const getChatsOfUser = async (userId: string) => {
    try {
      const results = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
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
    getChatsOfUser,
  };
};

export type chatRepositoryMongoDbType = typeof chatRepositoryMongoDb;
