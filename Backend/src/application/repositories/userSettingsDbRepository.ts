import { userSettingsTypeRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userSettingsRepository"


export const userSettingsDbRepository = (repository:ReturnType<userSettingsTypeRepositoryMongoDB>)=>{
   
    return{
      
    }
}

export type userSettingsTypeDbRepository = typeof userSettingsDbRepository