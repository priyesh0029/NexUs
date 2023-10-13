"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const connection_1 = __importDefault(require("./framework/database/mongoDb/connection"));
const express_2 = __importDefault(require("./framework/webserver/express"));
const server_1 = __importDefault(require("./framework/webserver/server"));
const errorHandlingMiddleware_1 = __importDefault(require("./framework/webserver/middleware/errorHandlingMiddleware"));
const appError_1 = __importDefault(require("./utilities/appError"));
const indexRoutes_1 = __importDefault(require("./framework/webserver/routes/indexRoutes"));
const socket_io_1 = require("socket.io");
const webSocket_1 = __importDefault(require("./framework/websocket/webSocket"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    pingTimeout: 60000,
    cors: {
        // origin: process.env.SOCKET_SERVER,
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
// connect socket.io
(0, webSocket_1.default)(io);
// connecting database
(0, connection_1.default)();
// calling express configuration
(0, express_2.default)(app);
// starting the server 
(0, server_1.default)(server).startServer();
// routes
(0, indexRoutes_1.default)(app, express_1.default.Router());
// catch 404 and forwarding to error handler
app.use(errorHandlingMiddleware_1.default);
app.all('*', (req, res, next) => {
    next(new appError_1.default('Not found', 404));
});
