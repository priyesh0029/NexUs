import { Application, Router } from "express";
import authRouter from "./auth";
import postRouter from "./post";
import userAuthMiddleware from '../middleware/authMiddleware'


const routes = (app: Application, router: Router) => {
  app.use("/api/auth", authRouter(router));
  app.use("/api/post",userAuthMiddleware,postRouter(router))
};

export default routes;
