import { post } from "../../../../types/postTypes/postTypes";
import Comment from "../models/commentModel";
import Post from "../models/postModel";
import mongoose from "mongoose"

export const postRepositoryMongoDb = () => {
  const createPost = async (post: post) => {
    const postDetails = {
      postedUser: post.userName,
      description: post.caption,
      imgNames: post.filenames,
    };
    const newPost = new Post(postDetails)
    return await newPost.save()
  };

  //getallposts

  const getAllposts = async ()=>{
    return await Post.find().sort({ createdAt: -1 });
  }

  //to handleLike

  const handleLike = async (postDetails: {
    user: string;
    postId: string;
  }) => {
    const { user, postId } = postDetails;
    const postID = new mongoose.Types.ObjectId(postId);
  
    const liked = await Post.findOne({
      _id: postID,
      liked: { $elemMatch: { $eq: user } }
    });
  console.log("liked :",liked);
  
    if (liked) {
      const like = await Post.updateOne(
        { _id: postID },
        { $pull: { liked: user } }
      );
      console.log("like 1:",like);
      if (like.modifiedCount === 1) {
        return {status : true,user : user,state :'removed'};
      }
    } else {
      const like = await Post.updateOne(
        { _id: postID },
        { $push: { liked: user } }
      );
      console.log("like 2 :",like);
      if (like.modifiedCount === 1) {
        return {status : true,user : user,state :'added'};
      }
    }
  
    return false; // Return false if the update operation didn't succeed
  };

  // to adda comment 

  const postComment = async(commentDeatils: {
    comment: string;
    user: string;
    postId: string;
  })=>{
    const {comment,user,postId} = commentDeatils
    const postID = new mongoose.Types.ObjectId(postId);
    
    const newComment = new Comment({
      postId: postID,
      userName: user,
      comment: comment
    });

    const postedComment = await  newComment.save();
    console.log("user register complete :", postedComment);
    return postedComment;
  }
  
  const getAllComments = async(postId:string)=>{
    const postID = new mongoose.Types.ObjectId(postId);
    const allComments = await Comment.find({postId : postID})
    return allComments
  }

  // to handle comment like

  const handleCommentLike = async (commentDetails: {
    user: string;
    commentId: string;
  }) => {
    const { user, commentId } = commentDetails;
    const commentID = new mongoose.Types.ObjectId(commentId);
  
    const liked = await Comment.findOne({
      _id: commentID,
      liked: { $elemMatch: { $eq: user } }
    });
  console.log("liked :",liked);
  
    if (liked) {
      const like = await Comment.updateOne(
        { _id: commentID },
        { $pull: { liked: user } }
      );
      console.log("like 1:",like);
      if (like.modifiedCount === 1) {
        return {status : true,user : user,state :'removed'};
      }
    } else {
      const like = await Comment.updateOne(
        { _id: commentID },
        { $push: { liked: user } }
      );
      console.log("like 2 :",like);
      if (like.modifiedCount === 1) {
        return {status : true,user : user,state :'added'};
      }
    }
  
    return false; // Return false if the update operation didn't succeed
  };

  //to add a comment reply 

  const postReply = async(commentDeatils: {
    comment: string;
    user: string;
    commentId: string;
  })=>{
    const {comment,user,commentId} = commentDeatils
    const commentID = new mongoose.Types.ObjectId(commentId);
    
    const newReply ={
      userName: user,
      comment: comment
    };

    const postedReply = await Comment.findOneAndUpdate(
      { _id: commentID },
      { $push: { reply: newReply } },
      { new: true }
    );
    
    if (postedReply !== null) {
      console.log("user postedReply complete :", postedReply);
      return postedReply;
    } else {
      return false;
    }
   
  }

//manage like of a reply

const handleReplyLike = async (replyLikeDetails: {
  user: string;
  replyId: string;
  commentId: string;
}) => {
  const { user,replyId, commentId } = replyLikeDetails;
  const replyID = new mongoose.Types.ObjectId(replyId);
  const commentID = new mongoose.Types.ObjectId(commentId);

  const comment = await Comment.findOne({ _id: commentId });
  console.log("comment :",comment);
  

if (comment) {
  const replyIndex = comment.reply.findIndex(
    (reply) => reply._id?.toString() === replyID.toString()
  );

  if (replyIndex !== -1) {
    const reply = comment.reply[replyIndex];

    if (reply.liked.includes(user)) {
      const updateResult = await Comment.updateOne(
        { _id: commentID, 'reply._id': replyID },
        { $pull: { 'reply.$.liked': user } }
      );

      if (updateResult.modifiedCount === 1) {
        return { status: true, user: user, state: 'removed' };
      }
    } else {
      const updateResult = await Comment.updateOne(
        { _id: commentID, 'reply._id': replyID },
        { $addToSet: { 'reply.$.liked': user } }
      );

      if (updateResult.modifiedCount === 1) {
        return { status: true, user: user, state: 'added' };
      }
    }
  }
}

return false; 
   
};

  return {
    createPost,
    getAllposts,
    handleLike,
    postComment,
    getAllComments,
    handleCommentLike,
    postReply,
    handleReplyLike
  };
};

export type postRepositoryMongoDbType = typeof postRepositoryMongoDb;
