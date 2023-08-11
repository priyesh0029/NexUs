import { HttpStatus } from "../../../types/httpStatus";
import { post } from "../../../types/postTypes/postTypes";
import AppError from "../../../utilities/appError";
import { postRepositoryInterfaceType } from "../../repositories/postDbrepository";

export const postCreate = async (
  postDetails: post,
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.uploadPost(postDetails).then((newPost)=>{
    //  console.log("newPost usecases : ",newPost);
     if(newPost === null){
        throw new AppError('Uploading failed', HttpStatus.BAD_REQUEST)
     }
     return newPost
   })
};

export const getAllPosts = async(repository: ReturnType<postRepositoryInterfaceType>)=>{
    return await repository.getAllPosts().then((allPosts)=>{
        if(allPosts.length === 0){
            throw new AppError('Error occured while loading posts.try again..!', HttpStatus.BAD_REQUEST)
        }
        return allPosts
    })
}
