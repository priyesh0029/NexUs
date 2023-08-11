import { postRepositoryMongoDbType } from "../../framework/database/mongoDb/repositories/postRepository"
import { post } from "../../types/postTypes/postTypes"



export const postRepositoryInterface = (repository:ReturnType<postRepositoryMongoDbType>)=>{
    const uploadPost = async(post:post) => await repository.createPost(post)
    const getAllPosts =async()=> await repository.getAllposts()
    return{
        uploadPost,
        getAllPosts
    }
}

export type postRepositoryInterfaceType = typeof postRepositoryInterface