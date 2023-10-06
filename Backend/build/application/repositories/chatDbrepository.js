"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRepositoryInterface = void 0;
const chatRepositoryInterface = (repository) => {
    //handle Access Or CreateChat
    const handleAccessOrCreateChat = async (user, userId) => await repository.accessOrCreateChatHandle(user, userId);
    //handle Access Or CreateChat
    const handleAccessOrCreateGroupChat = async (users, userId) => await repository.accessOrCreateGroupChatHandle(users, userId);
    // get all users chat
    const usersChatFetch = async (userId) => await repository.getChatsOfUser(userId);
    //to sent a new message
    const handleNewMessage = async (content, chatId, userId) => await repository.newMessageHandle(content, chatId, userId);
    //to fetch all messages of a chat
    const allChatMessages = async (chatId) => await repository.getChatAllMessages(chatId);
    //to save chat notifications
    const chatNotificationSave = async (chatId, userId) => await repository.handleSaveChatNotificatons(chatId, userId);
    //to remove chat notifications
    const chatNotificationRemove = async (chatId, userId) => await repository.handleRemoveChatNotificatons(chatId, userId);
    //to get all chat notifications
    const allChatNotifications = async (userId) => await repository.handleAllChatNotificatons(userId);
    //handle  add new  membets to the group chat 
    const handleAddNewUsersGroupChat = async (users, chatId) => await repository.addNewMembersToGroupChat(users, chatId);
    //to handle new chat name 
    const handleNewChatName = async (newName, chatId) => await repository.newChatName(newName, chatId);
    //to handle Remove User From group Chat
    const handleRemoveUserFromChat = async (chatId, chatUserId) => await repository.removeUserFromChatHandle(chatId, chatUserId);
    //to handle Leave User From Chat
    const handleLeaveUserFromChat = async (chatId, userId) => await repository.leaveUserFromChatHandle(chatId, userId);
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
exports.chatRepositoryInterface = chatRepositoryInterface;
