import { userSettingsTypeDbRepository } from "../../application/repositories/userSettingsDbRepository";
import { userSettingsTypeRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userSettingsRepository";

export const userSettingsControllers = (
    userSettingsRepository: userSettingsTypeDbRepository,
    userSettingsRepoMongoImp: userSettingsTypeRepositoryMongoDB
  ) => {
    const postRepo = userSettingsRepository(userSettingsRepoMongoImp());

    const changedp = ()=>{

    }
    return{
       changedp 
    }
  }  