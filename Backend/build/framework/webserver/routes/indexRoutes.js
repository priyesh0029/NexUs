"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const post_1 = __importDefault(require("./post"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const home_1 = __importDefault(require("./home"));
const user_1 = __importDefault(require("./user"));
const chat_1 = __importDefault(require("./chat"));
const admin_1 = __importDefault(require("./admin"));
const adminAuth_1 = __importDefault(require("./adminAuth"));
const routes = (app, router) => {
    app.use("/api/auth", (0, auth_1.default)(router));
    app.use("/api/post", (0, authMiddleware_1.default)("user"), (0, post_1.default)(router));
    app.use("/api/home", (0, authMiddleware_1.default)("user"), (0, home_1.default)(router));
    app.use("/api/user", (0, authMiddleware_1.default)("user"), (0, user_1.default)(router));
    app.use("/api/chat", (0, authMiddleware_1.default)("user"), (0, chat_1.default)(router));
    app.use("/api/adminAuth", (0, adminAuth_1.default)(router));
    app.use("/api/admin", (0, authMiddleware_1.default)("admin"), (0, admin_1.default)(router));
};
exports.default = routes;
