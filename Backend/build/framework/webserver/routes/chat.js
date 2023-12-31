"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chatDbrepository_1 = require("../../../application/repositories/chatDbrepository");
const chatRepository_1 = require("../../database/mongoDb/repositories/chatRepository");
const chatControllers_1 = require("../../../adapters/controllers/chatControllers");
const chatRouter = (router) => {
    const controllers = (0, chatControllers_1.chatControllers)(chatDbrepository_1.chatRepositoryInterface, chatRepository_1.chatRepositoryMongoDb);
    router.post('/createOrAccessChat', controllers.createOrAccessChat);
    router.post('/createOrAccessGroupChat', controllers.createOrAccessGroupChat);
    router.get('/getUserChats', controllers.getUserChats);
    router.post('/newMessage', controllers.newMessage);
    router.get('/fetchallmessages', controllers.fetchallmessages);
    router.get('/saveChatNotification', controllers.saveChatNotification);
    router.get('/removeChatNotification', controllers.removeChatNotification);
    router.get('/getChatNotifications', controllers.getChatNotifications);
    router.patch('/addPeopleToGroupChat', controllers.addPeopleToGroupChat);
    router.patch('/changeGroupChatName', controllers.changeGroupChatName);
    router.patch('/removeFromGroupChat', controllers.removeFromChat);
    router.patch('/leaveGroupChat', controllers.leaveGroupChat);
    return router;
};
exports.default = chatRouter;
