import { Application, Router } from "express";
import authRouter from "./auth";
import postRouter from "./post";
import userAuthMiddleware from '../middleware/authMiddleware'
import homeRouter from "./home";
import userSettings from "./user";


const routes = (app: Application, router: Router) => {
  app.use("/api/auth", authRouter(router));
  app.use("/api/post",userAuthMiddleware,postRouter(router))
  app.use("/api/home",userAuthMiddleware,homeRouter(router))
  app.use("/api/user",userAuthMiddleware,userSettings(router))

};

export default routes;
