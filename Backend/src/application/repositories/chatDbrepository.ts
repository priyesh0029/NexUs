import { chatRepositoryMongoDbType } from "../../framework/database/mongoDb/repositories/chatRepository";

export const chatRepositoryInterface = (
  repository: ReturnType<chatRepositoryMongoDbType>
) => {
  //handle Access Or CreateChat
  const handleAccessOrCreateChat = async (user: string, userId: string) =>
    await repository.accessOrCreateChatHandle(user, userId);

  //handle Access Or CreateChat
  const handleAccessOrCreateGroupChat = async (
    users: string[],
    userId: string
  ) => await repository.accessOrCreateGroupChatHandle(users, userId);

  // get all users chat
  const usersChatFetch = async (userId: string) =>
    await repository.getChatsOfUser(userId);

  //to sent a new message

  const handleNewMessage = async (
    content: string,
    chatId: string,
    userId: string
  ) => await repository.newMessageHandle(content, chatId, userId);

  //to fetch all messages of a chat

  const allChatMessages = async (chatId: string) =>
    await repository.getChatAllMessages(chatId);

  //to save chat notifications

  const chatNotificationSave = async (chatId: string, userId: string) =>
    await repository.handleSaveChatNotificatons(chatId, userId);

  //to remove chat notifications

  const chatNotificationRemove = async (chatId: string, userId: string) =>
    await repository.handleRemoveChatNotificatons(chatId, userId);

  //to get all chat notifications

  const allChatNotifications = async ( userId: string) =>
    await repository.handleAllChatNotificatons(userId);

    
  //handle  add new  membets to the group chat 
  const handleAddNewUsersGroupChat = async (
    users: string[],
    chatId: string
  ) => await repository.addNewMembersToGroupChat(users, chatId);

  //to handle new chat name 
  const handleNewChatName = async (
    newName: string,
    chatId: string
  ) => await repository.newChatName(newName, chatId);

   //to handle Remove User From group Chat
   const handleRemoveUserFromChat = async (
    chatId: string,
    chatUserId:string
  ) => await repository.removeUserFromChatHandle(chatId,chatUserId);

  //to handle Leave User From Chat
  const handleLeaveUserFromChat = async (
    chatId: string,
    userId:string
  ) => await repository.leaveUserFromChatHandle(chatId,userId);


  return {
    handleAccessOrCreateChat,
    handleAccessOrCreateGroupChat,
    usersChatFetch,
    handleNewMessage,
    allChatMessages,
    chatNotificationSave,
    chatNotificationRemove,
    allChatNotifications,
    handleAddNewUsersGroupChat,
    handleNewChatName,
    handleRemoveUserFromChat,
    handleLeaveUserFromChat
  };
};

export type chatRepositoryInterfaceType = typeof chatRepositoryInterface;
