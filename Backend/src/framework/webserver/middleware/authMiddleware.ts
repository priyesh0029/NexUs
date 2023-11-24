import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utilities/appError";
import { authServices } from "../../services/authServices";

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

const userAuthMiddleware = (rolehere: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let token: string | null = null;
    console.log("Entered to middleware");

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
      token = token.replace(/"/g, ""); // Remove double quotes from the token
    }

    if (!token) {
      throw new AppError("Token not found", HttpStatus.UNAUTHORIZED);
    }

    try {
      const { payload }: any = authServices().verifyToken(token);
      console.log("verified token : ", payload);
      const { id, role } = payload;
      req.query.userId = id;
      if (role === rolehere) {
        next();
      } else if (role === rolehere) {
        next();
      }

      // if(payload) next(); // Call next to proceed to the next middleware or route handler
    } catch (error) {
      console.log(error);

      throw new AppError("Unauthorized user", HttpStatus.UNAUTHORIZED);
    }
  };
};

export default userAuthMiddleware;
