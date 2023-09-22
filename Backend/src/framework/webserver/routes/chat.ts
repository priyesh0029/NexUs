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

  router.get('/getUserChats',controllers.getUserChats)


  return router;
};

export default chatRouter;
