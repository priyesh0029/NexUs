import asyncHandler from "express-async-handler";
import { postRepositoryInterfaceType } from "../../application/repositories/postDbrepository";
import { postRepositoryMongoDbType } from "../../framework/database/mongoDb/repositories/postRepository";
import { Request, Response } from "express";
import { getAllPosts, postCreate } from "../../application/useCases/post/post";

export const postControllers = (
    postRepository : postRepositoryInterfaceType,
    postRepoMongoImp : postRepositoryMongoDbType
    )=>{
    const postRepo = postRepository(postRepoMongoImp())

    //createPost
    const createPost = asyncHandler(async(req:Request,res:Response)=>{
       

            let media = req?.files
            let filenames
            if( media !==undefined && media.length !==0){

                filenames = (media as Express.Multer.File[]).map(element=>element.filename)
            }
            const {caption,userName} = req.body
            console.log("postvfrom frontend : ",req.files,filenames, caption,userName);
            const postDetails = {filenames,caption,userName}
            await postCreate(postDetails,postRepo).then((newPost)=>{
                console.log("contollers new  post response : ", newPost);
                
                res.status(200).json({
                    status: 'upload-success',
                    newPost
                })
            })
        
    })

    //getAllPosts

    const getAllPost = asyncHandler(async(req:Request,res:Response)=>{
        await getAllPosts(postRepo).then((allPosts)=>{
            console.log("contollers all post response : ", allPosts);

            res.status(200).json({
                status: "success",
                allPosts
            })
        })
    })

    return{
        createPost,
        getAllPost
    }
}

