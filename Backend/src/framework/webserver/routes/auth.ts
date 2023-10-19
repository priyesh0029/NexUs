import { Router } from "express";
import {authControllers} from '../../../adapters/controllers/authControllers'
import { userDbRepository } from "../../../application/repositories/userDbRepositories";
import { userRepositoryMongoDB } from "../../database/mongoDb/repositories/userRepository";
import { authServiceInterface } from "../../../application/services/authServiceInterface";
import { authServices } from "../../services/authServices";

const authRouter = (router: Router) => {

    const controllers = authControllers(
        authServiceInterface,
        authServices,
        userDbRepository,
        userRepositoryMongoDB,
       
    )

    router.post('/register', controllers.userRegister)
    router.post('/login', controllers.userLogin)
    router.post('/checkEmail', controllers.checkEmail)


    return router
};

export default authRouter;
