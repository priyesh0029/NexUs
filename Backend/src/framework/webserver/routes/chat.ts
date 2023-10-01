import { Router } from "express";
import { chatRepositoryInterface } from "../../../application/repositories/chatDbrepository";
import { chatRepositoryMongoDb } from "../../database/mongoDb/repositories/chatRepository";
import { chatControllers } from "../../../adapters/controllers/chatControllers";

const chatRouter = (router: Router) => {
  const controllers = chatControllers(
    chatRepositoryInterface,
    chatRepositoryMongoDb
  );

  router.post('/createOrAccessChat',controllers.createOrAccessChat)

  router.post('/createOrAccessGroupChat',controllers.createOrAccessGroupChat)

  router.get('/getUserChats',controllers.getUserChats)

  router.post('/newMessage',controllers.newMessage) 

  router.get('/fetchallmessages',controllers.fetchallmessages) 

  router.get('/saveChatNotification',controllers.saveChatNotification) 

  router.get('/removeChatNotification',controllers.removeChatNotification) 

  router.get('/getChatNotifications',controllers.getChatNotifications) 

  router.patch('/addPeopleToGroupChat',controllers.addPeopleToGroupChat) 







  return router;
};

export default chatRouter;
