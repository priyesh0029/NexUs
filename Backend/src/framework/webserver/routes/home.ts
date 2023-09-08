import { Router } from "express";
import { postControllers } from "../../../adapters/controllers/postControllers";
import { postRepositoryInterface } from "../../../application/repositories/postDbrepository";
import { postRepositoryMongoDb } from "../../database/mongoDb/repositories/postRepository";


const homeRouter = (router:Router)=>{

        const controllers = postControllers(
            postRepositoryInterface,
            postRepositoryMongoDb
        )


        router.get('/',controllers.getAllPost)
        
        



    return router
}

export default homeRouter