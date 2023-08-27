import { Router } from "express";
import { userSettingsControllers } from "../../../adapters/controllers/userSettingsControllers";
import { userSettingsDbRepository } from "../../../application/repositories/userSettingsDbRepository";
import { userSettingsRepositoryMongoDB } from "../../database/mongoDb/repositories/userSettingsRepository";


const userSettings = (router:Router)=>{

        const controllers = userSettingsControllers(
            userSettingsDbRepository,
            userSettingsRepositoryMongoDB
        )


        router.get('/changedp',controllers.changedp)




    return router
}

export default userSettings