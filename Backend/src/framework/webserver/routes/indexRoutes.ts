import { Application, Router } from "express";
import authRouter from "./auth";

const routes = (app: Application, router: Router) => {
  app.use("/api/auth", authRouter(router));

  
};

export default routes;
