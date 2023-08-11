import { Application, Router } from "express";
import authRouter from "./auth";
import postRouter from "./post";

const routes = (app: Application, router: Router) => {
  app.use("/api/auth", authRouter(router));
  app.use("/api/post",postRouter(router))
  
};

export default routes;
