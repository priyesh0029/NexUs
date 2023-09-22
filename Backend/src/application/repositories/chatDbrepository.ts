import { chatRepositoryMongoDbType } from "../../framework/database/mongoDb/repositories/chatRepository"

export const chatRepositoryInterface = ( repository : ReturnType<chatRepositoryMongoDbType>)=>{

    return{

    }
}

export type chatRepositoryInterfaceType = typeof chatRepositoryInterface