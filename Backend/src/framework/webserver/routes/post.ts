import { Router } from "express";
import { postControllers } from "../../../adapters/controllers/postControllers";
import { postRepositoryInterface } from "../../../application/repositories/postDbrepository";
import { postRepositoryMongoDb } from "../../database/mongoDb/repositories/postRepository";
import uploadsMulter from "../middleware/multer";

const postRouter = (router:Router)=>{

        const controllers = postControllers(
            postRepositoryInterface,
            postRepositoryMongoDb
        )

        router.post('/create',uploadsMulter,controllers.createPost)

        router.get('/',controllers.getAllPost)

    return router
}

export default postRouter