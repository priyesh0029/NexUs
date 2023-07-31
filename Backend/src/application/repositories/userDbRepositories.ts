import { userTypeRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository"

export const userDbRepository = (repository:ReturnType<userTypeRepositoryMongoDB>)=>{
    const findByProperty = async(params:string)=> await repository.findByProperty(params)
    const findByNumber = async(params:string)=> await repository.findByNumber(params)
    const RegisterUser = async(userEntity:{}) => await repository.addUser(userEntity);
    return{
        findByProperty,
        findByNumber,
        RegisterUser
    }
}

export type userTypeDbRepository = typeof userDbRepository