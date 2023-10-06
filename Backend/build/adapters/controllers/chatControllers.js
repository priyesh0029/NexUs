"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatControllers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const appError_1 = __importDefault(require("../../utilities/appError"));
const httpStatus_1 = require("../../types/httpStatus");
const chats_1 = require("../../application/useCases/chats/chats");
const chatControllers = (chatRepositoryInf, chatRepoMongoImp) => {
    const chatRepo = chatRepositoryInf(chatRepoMongoImp());
    //create Or AccessChat
    const createOrAccessChat = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.body.user;
        const userId = req.query.userId;
        console.log("createOrAccessChat user : ", user);
        if (typeof user === "string" && typeof userId === "string") {
            await (0, chats_1.accessOrCreateChat)(user, userId, chatRepo).then((chat) => {
                console.log("contollers all post response : ", chat);
                res.status(200).json({
                    status: "success",
                    chat,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while senting message.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //create Or create Or Access GroupChat
    const createOrAccessGroupChat = (0, express_async_handler_1.default)(async (req, res) => {
        const users = req.body.users;
        const userId = req.query.userId;
        if (Array.isArray(users) && typeof userId === "string") {
            console.log("createOrAccessChat user : ", users, typeof users);
            await (0, chats_1.accessOrCreateGroupChat)(users, userId, chatRepo).then((groupChat) => {
                console.log("contollers all post response : ", groupChat);
                res.status(200).json({
                    status: "success",
                    groupChat,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while senting message.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to get all chats of user
    const getUserChats = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.query.userId;
        console.log("createOrAccessChat user : ", userId);
        if (typeof userId === "string") {
            await (0, chats_1.fetchUserChats)(userId, chatRepo).then((allChats) => {
                console.log("contollers all post response : ", allChats);
                res.status(200).json({
                    status: "success",
                    allChats,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while fetching user chat.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to sent a new message
    const newMessage = (0, express_async_handler_1.default)(async (req, res) => {
        const { content, chatId } = req.body;
        const userId = req.query.userId;
        console.log("createOrAccessChat user : ", content, chatId);
        if (typeof content === "string" &&
            typeof chatId === "string" &&
            typeof userId === "string") {
            await (0, chats_1.sentNewMessage)(content, chatId, userId, chatRepo).then((newMessage) => {
                console.log("contollers all post response : ", newMessage);
                res.status(200).json({
                    status: "success",
                    newMessage,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while fetching user chat.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to fetch all messages
    const fetchallmessages = (0, express_async_handler_1.default)(async (req, res) => {
        const { chatId } = req.query;
        console.log("chat id of fetch all messages  : ", chatId);
        if (typeof chatId === "string") {
            await (0, chats_1.fetchAllChatMessages)(chatId, chatRepo).then((allMessages) => {
                console.log("contollers all post response : ", allMessages);
                res.status(200).json({
                    status: "success",
                    allMessages,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while fetching user chat.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to save chat notificataions
    const saveChatNotification = (0, express_async_handler_1.default)(async (req, res) => {
        const { chatId, userId } = req.query;
        console.log("chat id of fetch all messages  : ", chatId, userId);
        if (typeof chatId === "string" && typeof userId === "string") {
            await (0, chats_1.handleChatNotificationSave)(chatId, userId, chatRepo).then((notification) => {
                console.log("contollers all post response : ", notification);
                res.status(200).json({
                    status: "success",
                    notification,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while fetching user chat notifications.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    ///to remove Chat notification
    const removeChatNotification = (0, express_async_handler_1.default)(async (req, res) => {
        const { chatId, userId } = req.query;
        console.log("chat id of fetch all messages  : ", chatId, userId);
        if (typeof chatId === "string" && typeof userId === "string") {
            await (0, chats_1.handleChatNotificationRemove)(chatId, userId, chatRepo).then((notification) => {
                console.log("contollers all post response : ", notification);
                res.status(200).json({
                    status: "success",
                    notification,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while fetching user chat notifications.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    ///to get all  Chat notification
    const getChatNotifications = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId } = req.query;
        console.log("chat id of fetch all messages  : ", userId);
        if (typeof userId === "string") {
            await (0, chats_1.handleAllChatNotifications)(userId, chatRepo).then((notification) => {
                console.log("contollers all post response : ", notification);
                res.status(200).json({
                    status: "success",
                    notification,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while fetching user chat notifications.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //add People To GroupChat
    const addPeopleToGroupChat = (0, express_async_handler_1.default)(async (req, res) => {
        const { newUsers, chatId } = req.body;
        if (Array.isArray(newUsers) && typeof chatId === "string") {
            console.log("createOrAccessChat user : ", newUsers, typeof newUsers);
            await (0, chats_1.newMembersAddGrpChat)(newUsers, chatId, chatRepo).then((newUsers) => {
                console.log("contollers all post response : ", newUsers);
                res.status(200).json({
                    status: "success",
                    newUsers,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while adding people to group chat.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    // to change group chat name 
    const changeGroupChatName = (0, express_async_handler_1.default)(async (req, res) => {
        const { newName, chatId } = req.body;
        if (typeof newName === "string" && typeof chatId === "string") {
            await (0, chats_1.amendGroupChatName)(newName, chatId, chatRepo).then((chat) => {
                console.log("contollers all post response : ", chat);
                res.status(200).json({
                    status: "success",
                    chat,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while changing chat name.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    // to remove a member From Chat
    const removeFromChat = (0, express_async_handler_1.default)(async (req, res) => {
        const { chatId, chatUserId } = req.body;
        if (typeof chatId === "string" && typeof chatUserId === "string") {
            await (0, chats_1.removeUserFromGroupChat)(chatId, chatUserId, chatRepo).then((chat) => {
                console.log("to remove a member From Chat : ", chat);
                res.status(200).json({
                    status: "success",
                    chat,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while removing member from chat.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    // to leave from Group Chat
    const leaveGroupChat = (0, express_async_handler_1.default)(async (req, res) => {
        const { chatId } = req.body;
        const userId = req.query.userId;
        if (typeof chatId === "string" && typeof userId === "string") {
            await (0, chats_1.leaveUserFromGroupChat)(chatId, userId, chatRepo).then((chat) => {
                console.log("to leave User From a GroupChat : ", chat);
                res.status(200).json({
                    status: "success",
                    chat,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while leaving group chat.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
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
        removeFromChat,
        leaveGroupChat
    };
};
exports.chatControllers = chatControllers;
