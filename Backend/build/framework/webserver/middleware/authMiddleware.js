"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utilities/appError"));
const authServices_1 = require("../../services/authServices");
// const userAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   let token: string | null = null;
//   console.log("Entered to middleware");
//   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
//     token = req.headers.authorization.split(" ")[1];
//     token = token.replace(/"/g, ""); // Remove double quotes from the token
//   }
//   if (!token) {
//     throw new AppError("Token not found", HttpStatus.UNAUTHORIZED);
//   }
//   try {
//     const { payload }: any = authServices().verifyToken(token);
//     console.log("verified token : ", payload);
//     const{id,role} = payload
//     req.query.userId = id
//     if (role === 'admin') {
//       return adminRouteHandler(req, res, next);
//     } else if (role === 'user') {
//       return userRouteHandler(req, res, next);
//     }
//     if(payload) next(); // Call next to proceed to the next middleware or route handler
//   } catch (error) {
//     console.log(error);
//     throw new AppError("Unauthorized user", HttpStatus.UNAUTHORIZED);
//   }
// };
const userAuthMiddleware = (rolehere) => {
    return (req, res, next) => {
        let token = null;
        console.log("Entered to middleware");
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
            token = token.replace(/"/g, ""); // Remove double quotes from the token
        }
        if (!token) {
            throw new appError_1.default("Token not found", httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        try {
            const { payload } = (0, authServices_1.authServices)().verifyToken(token);
            console.log("verified token : ", payload);
            const { id, role } = payload;
            req.query.userId = id;
            if (role === rolehere) {
                next();
            }
            else if (role === rolehere) {
                next();
            }
            // if(payload) next(); // Call next to proceed to the next middleware or route handler
        }
        catch (error) {
            console.log(error);
            throw new appError_1.default("Unauthorized user", httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
    };
};
exports.default = userAuthMiddleware;
