"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveUserFromGroupChat = exports.removeUserFromGroupChat = exports.amendGroupChatName = exports.newMembersAddGrpChat = exports.handleAllChatNotifications = exports.handleChatNotificationRemove = exports.handleChatNotificationSave = exports.fetchAllChatMessages = exports.sentNewMessage = exports.fetchUserChats = exports.accessOrCreateGroupChat = exports.accessOrCreateChat = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utilities/appError"));
//access Or Create single Chat
const accessOrCreateChat = async (user, loggedUser, repository) => {
    return await repository.handleAccessOrCreateChat(user, loggedUser).then((chat) => {
        if (!chat) {
            throw new appError_1.default("Error occured while loading chats.please refresh the page and try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return chat;
    });
};
exports.accessOrCreateChat = accessOrCreateChat;
//accessOrCreateGroupChat
const accessOrCreateGroupChat = async (users, loggedUser, repository) => {
    return await repository.handleAccessOrCreateGroupChat(users, loggedUser).then((groupChat) => {
        if (!groupChat) {
            throw new appError_1.default("Error occured while loading chats.please refresh the page and try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return groupChat;
    });
};
exports.accessOrCreateGroupChat = accessOrCreateGroupChat;
//fetch User Chats
const fetchUserChats = async (loggedUser, repository) => {
    return await repository.usersChatFetch(loggedUser).then((allChats) => {
        if (!allChats) {
            throw new appError_1.default("Error occured while loading chats.please refresh the page and try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return allChats;
    });
};
exports.fetchUserChats = fetchUserChats;
//sent a new Message
const sentNewMessage = async (content, chatId, userId, repository) => {
    return await repository.handleNewMessage(content, chatId, userId).then((newMessage) => {
        if (!newMessage) {
            throw new appError_1.default("Error occured while loading mesages.please refresh the page and try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return newMessage;
    });
};
exports.sentNewMessage = sentNewMessage;
//fetch all messages of a chat
const fetchAllChatMessages = async (chatId, repository) => {
    return await repository.allChatMessages(chatId).then((newMessage) => {
        if (!newMessage) {
            throw new appError_1.default("Error occured while loading mesages.please refresh the page and try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return newMessage;
    });
};
exports.fetchAllChatMessages = fetchAllChatMessages;
// to save chat notificaitons
const handleChatNotificationSave = async (chatId, userId, repository) => {
    return await repository.chatNotificationSave(chatId, userId).then((notification) => {
        if (!notification) {
            throw new appError_1.default("Error occured while saving chat notifications.please refresh the page and try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return notification;
    });
};
exports.handleChatNotificationSave = handleChatNotificationSave;
// to reemove chat notificaitons
const handleChatNotificationRemove = async (chatId, userId, repository) => {
    return await repository.chatNotificationRemove(chatId, userId).then((notification) => {
        if (!notification) {
            throw new appError_1.default("Error occured while remiving chat notifications.please refresh the page and try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return notification;
    });
};
exports.handleChatNotificationRemove = handleChatNotificationRemove;
// to get all chat notificaitons
const handleAllChatNotifications = async (userId, repository) => {
    return await repository.allChatNotifications(userId).then((notification) => {
        if (!notification) {
            throw new appError_1.default("Error occured while remiving chat notifications.please refresh the page and try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return notification;
    });
};
exports.handleAllChatNotifications = handleAllChatNotifications;
//to add new members to the group chat 
const newMembersAddGrpChat = async (users, chatId, repository) => {
    return await repository.handleAddNewUsersGroupChat(users, chatId).then((groupChat) => {
        if (!groupChat) {
            throw new appError_1.default("Error occured while adding new members to the group chat.please refresh the page and try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return groupChat;
    });
};
exports.newMembersAddGrpChat = newMembersAddGrpChat;
//to handle new chat name 
const amendGroupChatName = async (newName, chatId, repository) => {
    return await repository.handleNewChatName(newName, chatId).then((groupChat) => {
        if (!groupChat) {
            throw new appError_1.default("Error occured while adding new members to the group chat.please refresh the page and try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return groupChat;
    });
};
exports.amendGroupChatName = amendGroupChatName;
//to handle remove UserFrom group Chat
const removeUserFromGroupChat = async (chatId, chatUserId, repository) => {
    return await repository.handleRemoveUserFromChat(chatId, chatUserId).then((groupChat) => {
        if (!groupChat) {
            throw new appError_1.default("Error occured while adding new members to the group chat.please refresh the page and try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return groupChat;
    });
};
exports.removeUserFromGroupChat = removeUserFromGroupChat;
//to handle leave User From GroupChat
const leaveUserFromGroupChat = async (chatId, userId, repository) => {
    return await repository.handleLeaveUserFromChat(chatId, userId).then((groupChat) => {
        if (!groupChat) {
            throw new appError_1.default("Error occured while leaving the group chat.please refresh the page and try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return groupChat;
    });
};
exports.leaveUserFromGroupChat = leaveUserFromGroupChat;
