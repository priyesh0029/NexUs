import { Router } from "express";
import { postControllers } from "../../../adapters/controllers/postControllers";
import { postRepositoryInterface } from "../../../application/repositories/postDbrepository";
import { postRepositoryMongoDb } from "../../database/mongoDb/repositories/postRepository";
import {uploadsMulter} from "../middleware/multer";

const postRouter = (router:Router)=>{

        const controllers = postControllers(
            postRepositoryInterface,
            postRepositoryMongoDb
        )

        router.post('/create',uploadsMulter,controllers.createPost)

        router.get('/',controllers.getAllPost)

        router.post('/like',controllers.handleLike)

        router.post('/comment',controllers.postComment)

        router.get('/allcomments',controllers.getComments)

        router.get('/allcommentReplies',controllers.getAllCommentReplies)

        router.post('/commentlike',controllers.commentLike)

        router.post('/replycomment',controllers.replycomment)

        router.post('/replylike',controllers.replylike)

        router.get('/userposts',controllers.getUserPosts)

        router.post('/updatepost',controllers.updatePost)

        router.patch('/deletecomment',controllers.deleteComment)

        router.patch('/deleteReply',controllers.deleteReply)

        router.patch('/deletePost',controllers.deletePost)

        router.patch('/reportPost',controllers.reportPost)


        



    return router
}

export default postRouter