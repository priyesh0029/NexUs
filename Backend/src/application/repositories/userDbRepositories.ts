import { userTypeRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository"

export const userDbRepository = (repository:ReturnType<userTypeRepositoryMongoDB>)=>{
    const findByProperty = async(params:string)=> await repository.findByProperty(params)
    const findByNumber = async(params:string)=> await repository.findByNumber(params)
    const RegisterUser = async(userEntity:{}) => await repository.addUser(userEntity);
    const uploadDp = async(user:string,filename:string)=> await repository.uploadDp(user,filename)
    return{
        findByProperty,
        findByNumber,
        RegisterUser,
        uploadDp
    }
}

export type userTypeDbRepository = typeof userDbRepository