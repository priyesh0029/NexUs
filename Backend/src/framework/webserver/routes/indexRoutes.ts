import { Application, Router } from "express";
import authRouter from "./auth";
import postRouter from "./post";
import authMiddleware from "../middleware/authMiddleware";
import homeRouter from "./home";
import userSettings from "./user";
import chatRouter from "./chat";
import adminRouter from "./admin";
import adminAuthRouter from "./adminAuth";

const routes = (app: Application, router: Router) => {
  app.use("/api/auth", authRouter(router));
  app.use("/api/post", authMiddleware("user"), postRouter(router));
  app.use("/api/home", authMiddleware("user"), homeRouter(router));
  app.use("/api/user", authMiddleware("user"), userSettings(router));
  app.use("/api/chat", authMiddleware("user"), chatRouter(router));
  app.use("/api/adminAuth",adminAuthRouter(router));
  app.use("/api/admin", authMiddleware("admin"),adminRouter(router));
};

export default routes;
