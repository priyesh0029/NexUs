import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

const expressConfig = (app: Application) => {
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  cloudinary.config({
    cloud_name: "dsinpyvxb",
    api_key: "684988441571688",
    api_secret: "khe2yZ1Pack2_JqCNCw-fv03aNI",
  });
};

export default expressConfig;
