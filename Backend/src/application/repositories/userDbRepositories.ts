import { userTypeRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository"

export const userDbRepository = (repository:ReturnType<userTypeRepositoryMongoDB>)=>{

}

export type userTypeDbRepository = typeof userDbRepository