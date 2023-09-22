import { Application, Router } from "express";
import authRouter from "./auth";
import postRouter from "./post";
import userAuthMiddleware from '../middleware/authMiddleware'
import homeRouter from "./home";
import userSettings from "./user";
import chatRouter from "./chat";


const routes = (app: Application, router: Router) => {
  app.use("/api/auth", authRouter(router));
  app.use("/api/post",userAuthMiddleware,postRouter(router))
  app.use("/api/home",userAuthMiddleware,homeRouter(router))
  app.use("/api/user",userAuthMiddleware,userSettings(router))
  app.use("/api/chat",userAuthMiddleware,chatRouter(router))

};

export default routes;
