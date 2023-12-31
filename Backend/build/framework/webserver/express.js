"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cloudinary_1 = require("cloudinary");
const expressConfig = (app) => {
    app.use((0, morgan_1.default)("dev"));
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    cloudinary_1.v2.config({
        cloud_name: "dsinpyvxb",
        api_key: "684988441571688",
        api_secret: "khe2yZ1Pack2_JqCNCw-fv03aNI",
    });
};
exports.default = expressConfig;
