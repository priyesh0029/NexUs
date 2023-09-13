import { post } from "../../../../types/postTypes/postTypes";
import Comment from "../models/commentModel";
import Post from "../models/postModel";
import mongoose from "mongoose";
import User from "../models/userModel";

export const postRepositoryMongoDb = () => {
  //to create a post

  const createPost = async (post: post) => {
    const user = await User.findOne(
      { _id: post.userId },
      { _id: 0, userName: 1 }
    );
    if (user !== null) {
      const postDetails = {
        postedUser: user.userName,
        description: post.caption,
        imgNames: post.filenames,
      };
      const newPost = new Post(postDetails);
      return await newPost.save();
    }
  };

  //getallposts

  const getAllposts = async () => {
    // return await Post.find().sort({ createdAt: -1 });
    const posts = await Post.aggregate([
      {
        $match:
          {
            postDeleted: false,
          },
      },
      {
        $lookup: {
          from: "users",
          localField: "postedUser",
          foreignField: "userName",
          as: "results",
        },
      },
      {
        $unwind: {
          path: "$results",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          postedUser: 1,
          description: 1,
          imgNames: 1,
          isBlocked: 1,
          liked: 1,
          reports: 1,
          createdAt: 1,
          updatedAt: 1,
          dp: "$results.dp",
        },
      },
      {
        $unwind: {
          path: "$liked",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "liked",
          foreignField: "userName",
          as: "likedUsers",
        },
      },
      {
        $unwind: {
          path: "$likedUsers",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          postedUser: {
            $first: "$postedUser",
          },
          description: {
            $first: "$description",
          },
          imgNames: {
            $first: "$imgNames",
          },
          isBlocked: {
            $first: "$isBlocked",
          },
          dp: {
            $first: "$dp",
          },
          liked: {
            $push: {
              userName: "$likedUsers.userName",
              dp: "$likedUsers.dp",
            },
          },
          reports: {
            $first: "$reports",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
        },
      },
      {
        $project: {
          _id: 1,
          postedUser: 1,
          description: 1,
          imgNames: 1,
          isBlocked: 1,
          dp: 1,
          liked: {
            $cond: {
              if: {
                $eq: [
                  {
                    $type: {
                      $arrayElemAt: ["$liked", 0],
                    },
                  },
                  "object",
                ],
              },
              then: {
                $filter: {
                  input: "$liked",
                  as: "like",
                  cond: {
                    $ne: ["$$like", {}],
                  },
                },
              },
              else: "$liked",
            },
          },
          reports: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    return posts;
  };

  //to handleLike

  const handleLike = async (postDetails: { user: string; postId: string }) => {
    const { user, postId } = postDetails;
    const postID = new mongoose.Types.ObjectId(postId);

    const liked = await Post.findOne({
      _id: postID,
      liked: { $elemMatch: { $eq: user } },
    });
    console.log("liked :", liked);

    if (liked) {
      const like = await Post.updateOne(
        { _id: postID },
        { $pull: { liked: user } }
      );
      console.log("like 1:", like);
      if (like.modifiedCount === 1) {
        return { status: true, user: user, state: "removed" };
      }
    } else {
      const like = await Post.updateOne(
        { _id: postID },
        { $push: { liked: user } }
      );
      console.log("like 2 :", like);
      if (like.modifiedCount === 1) {
        return { status: true, user: user, state: "added" };
      }
    }

    return false; // Return false if the update operation didn't succeed
  };

  // to adda comment

  const postComment = async (commentDeatils: {
    comment: string;
    user: string;
    postId: string;
  }) => {
    const { comment, user, postId } = commentDeatils;
    const postID = new mongoose.Types.ObjectId(postId);

    const newComment = new Comment({
      postId: postID,
      userName: user,
      comment: comment,
    });

    const postedComment = await newComment.save();
    console.log("user register complete :", postedComment);
    return postedComment;
  };

  //to get all comment

  const getAllComments = async (postId: string) => {
    const postID = new mongoose.Types.ObjectId(postId);
    const postComment = await Comment.aggregate([
      {
        $match: {
          postId: postID,
          delete:false
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userName",
          foreignField: "userName",
          as: "commentedUser",
        },
      },
      {
        $unwind: {
          path: "$commentedUser",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$liked",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "liked",
          foreignField: "userName",
          as: "commentLikedUser",
        },
      },
      {
        $unwind: {
          path: "$commentLikedUser",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          postId: {
            $first: "$postId",
          },
          userName: {
            $first: "$userName",
          },
          comment: {
            $first: "$comment",
          },
          dp: {
            $first: "$commentedUser.dp",
          },
          liked: {
            $push: {
              userName: "$commentLikedUser.userName",
              dp: "$commentLikedUser.dp",
            },
          },
          reply: {
            $first: "$reply",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
        },
      },
      {
        $project: {
          _id: 1,
          postId: 1,
          userName: 1,
          comment: 1,
          dp: 1,
          liked: {
            $cond: {
              if: {
                $eq: [
                  {
                    $type: {
                      $arrayElemAt: ["$liked", 0],
                    },
                  },
                  "object",
                ],
              },
              then: {
                $filter: {
                  input: "$liked",
                  as: "like",
                  cond: {
                    $ne: ["$$like", {}],
                  },
                },
              },
              else: "$liked",
            },
          },
          reply: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $sort: {
          createdAt: -1, // Sort by createdAt field in descending order
        },
      },
    ]);
    return postComment;
  };

  //to get all replies of a comment

  const getAllCommentReplies = async (commentId: string) => {
    const commentID = new mongoose.Types.ObjectId(commentId);

    const commentReplies = await Comment.aggregate([
      {
        $match: {
          _id: commentID,
          delete: false,
        },
      },
      {
        $unwind: {
          path: "$reply",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match:
          {
            "reply.delete": false,
          },
      },
      {
        $lookup: {
          from: "users",
          localField: "reply.userName",
          foreignField: "userName",
          as: "repliedUser",
        },
      },
      {
        $unwind: {
          path: "$repliedUser",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: "$reply.liked",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "reply.liked",
          foreignField: "userName",
          as: "replyLikedUser",
        },
      },
      {
        $unwind: {
          path: "$replyLikedUser",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$reply._id",
          commentId: {
            $first: "$_id",
          },
          userName: {
            $first: "$reply.userName",
          },
          comment: {
            $first: "$reply.comment",
          },
          dp: {
            $first: "$repliedUser.dp",
          },
          liked: {
            $push: {
              userName: "$replyLikedUser.userName",
              dp: "$replyLikedUser.dp",
            },
          },
          createdAt: {
            $first: "$reply.createdAt",
          },
          updatedAt: {
            $first: "$reply.updatedAt",
          },
        },
      },
      {
        $project: {
          _id: 1,
          commentId: 1,
          userName: 1,
          comment: 1,
          dp: 1,
          liked: {
            $cond: {
              if: {
                $eq: [
                  {
                    $type: {
                      $arrayElemAt: ["$liked", 0],
                    },
                  },
                  "object",
                ],
              },
              then: {
                $filter: {
                  input: "$liked",
                  as: "like",
                  cond: {
                    $ne: ["$$like", {}],
                  },
                },
              },
              else: "$liked",
            },
          },
          reply: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $sort: {
          createdAt: -1, // Sort by createdAt field in descending order
        },
      },
    ]);
    return commentReplies;
  };

  // to handle comment like

  const handleCommentLike = async (commentDetails: {
    user: string;
    commentId: string;
  }) => {
    const { user, commentId } = commentDetails;
    const commentID = new mongoose.Types.ObjectId(commentId);

    const liked = await Comment.findOne({
      _id: commentID,
      liked: { $elemMatch: { $eq: user } },
    });
    console.log("liked :", liked);

    if (liked) {
      const like = await Comment.updateOne(
        { _id: commentID },
        { $pull: { liked: user } }
      );
      console.log("like 1:", like);
      if (like.modifiedCount === 1) {
        return { status: true, user: user, state: "removed" };
      }
    } else {
      const like = await Comment.updateOne(
        { _id: commentID },
        { $push: { liked: user } }
      );
      console.log("like 2 :", like);
      if (like.modifiedCount === 1) {
        return { status: true, user: user, state: "added" };
      }
    }

    return false; // Return false if the update operation didn't succeed
  };

  //to add a comment reply

  const postReply = async (commentDeatils: {
    comment: string;
    user: string;
    commentId: string;
  }) => {
    const { comment, user, commentId } = commentDeatils;
    const commentID = new mongoose.Types.ObjectId(commentId);

    const newReply = {
      userName: user,
      comment: comment,
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
  };

  //manage like of a reply

  const handleReplyLike = async (replyLikeDetails: {
    user: string;
    replyId: string;
    commentId: string;
  }) => {
    const { user, replyId, commentId } = replyLikeDetails;
    const replyID = new mongoose.Types.ObjectId(replyId);
    const commentID = new mongoose.Types.ObjectId(commentId);

    const comment = await Comment.findOne({ _id: commentId });
    console.log("comment :", comment);

    if (comment) {
      const replyIndex = comment.reply.findIndex(
        (reply) => reply._id?.toString() === replyID.toString()
      );

      if (replyIndex !== -1) {
        const reply = comment.reply[replyIndex];

        if (reply.liked.includes(user)) {
          const updateResult = await Comment.updateOne(
            { _id: commentID, "reply._id": replyID },
            { $pull: { "reply.$.liked": user } }
          );

          if (updateResult.modifiedCount === 1) {
            return { status: true, user: user, state: "removed" };
          }
        } else {
          const updateResult = await Comment.updateOne(
            { _id: commentID, "reply._id": replyID },
            { $addToSet: { "reply.$.liked": user } }
          );

          if (updateResult.modifiedCount === 1) {
            return { status: true, user: user, state: "added" };
          }
        }
      }
    }

    return false;
  };

  //to get users post profile
  const getUserPosts = async (user: string) => {
    // const posts = await Post.find({ postedUser: user }).sort({ createdAt: -1 });
    const posts = await Post.aggregate([
      {
        $match: {
          postedUser: user,
        },
      },
      {
        $match:
          {
            postDeleted: false,
          },
      },
      {
        $lookup: {
          from: "users",
          localField: "postedUser",
          foreignField: "userName",
          as: "results",
        },
      },
      {
        $unwind: {
          path: "$results",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          postedUser: 1,
          description: 1,
          imgNames: 1,
          isBlocked: 1,
          liked: 1,
          reports: 1,
          createdAt: 1,
          updatedAt: 1,
          dp: "$results.dp",
        },
      },
      {
        $unwind: {
          path: "$liked",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "liked",
          foreignField: "userName",
          as: "likedUsers",
        },
      },
      {
        $unwind: {
          path: "$likedUsers",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          postedUser: {
            $first: "$postedUser",
          },
          description: {
            $first: "$description",
          },
          imgNames: {
            $first: "$imgNames",
          },
          isBlocked: {
            $first: "$isBlocked",
          },
          dp: {
            $first: "$dp",
          },
          liked: {
            $push: {
              userName: "$likedUsers.userName",
              dp: "$likedUsers.dp",
            },
          },
          reports: {
            $first: "$reports",
          },
          createdAt: {
            $first: "$createdAt",
          },
          updatedAt: {
            $first: "$updatedAt",
          },
        },
      },
      {
        $project: {
          _id: 1,
          postedUser: 1,
          description: 1,
          imgNames: 1,
          isBlocked: 1,
          dp: 1,
          liked: {
            $cond: {
              if: {
                $eq: [
                  {
                    $type: {
                      $arrayElemAt: ["$liked", 0],
                    },
                  },
                  "object",
                ],
              },
              then: {
                $filter: {
                  input: "$liked",
                  as: "like",
                  cond: {
                    $ne: ["$$like", {}],
                  },
                },
              },
              else: "$liked",
            },
          },
          reports: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    return posts;
  };

  //to edit users post

  const editUserPost = async(postId:string,description:string,userId:string)=>{
    const userID = new mongoose.Types.ObjectId(userId);
    const user = await User.findOne(
      { _id: userID },
      { _id: 0, userName: 1 }
    );
    console.log("user beforre edit post : ",user);
    
    if (user !== null) {
      const postID = new mongoose.Types.ObjectId(postId);
      const updatedPost = await Post.findOneAndUpdate(
        { _id: postID ,postedUser : user.userName},
        { $set: { description: description } },
        { new: true,projection: { description: 1, _id: 0 } }
      );
      console.log("updated post after query : ",updatedPost);
      return updatedPost
    }else{

      return false
    }
  }

  //to delete comment

  const deleteComment = async(commentId:string)=>{
    const commentID = new mongoose.Types.ObjectId(commentId);
    const CommentDetails = await Comment.findOneAndUpdate(
      { _id: commentID },
      { $set: { delete: true } },
      { new: true,projection: { comment: 1 } }
    );
    console.log("user beforre edit post : ",CommentDetails);
    
    if (CommentDetails !== null) {
      console.log("updated post after query : ",CommentDetails.comment);
      return CommentDetails
    }else{
      return false
    }
  }
  
  // to delete reply 

  const deleteReply = async(commentId:string,replyId:string)=>{
    const commentID = new mongoose.Types.ObjectId(commentId);
    const replyID = new mongoose.Types.ObjectId(replyId);
    const replyDetails = await Comment.findOneAndUpdate(
      { _id: commentID, "reply._id" : replyID },
      { $set: {"reply.$.delete": true } },  
      { new: true }
    );
    console.log("user after delete reply : ",replyDetails);
    
    if (replyDetails !== null) {
      return replyId
    }else{
      return false
    }
  }

    // to delete Post 

    const deletePost = async(postId : string)=>{
      const postID = new mongoose.Types.ObjectId(postId);
      console.log("delete post db repositiry : ",postID);
      
      const [post, comment] = await Promise.all([
        Post.updateOne(
          { _id: postID },
          { $set: {postDeleted: true } }
        ),
        Comment.updateMany(
          { postId: postID },
          { $set: { delete: true,"reply.$[].delete": true } }
        ),
      ])
      if (post.modifiedCount === 1 && comment.modifiedCount === comment.matchedCount) {
        return true
      }else{
        return false
      }

    }


  return {
    createPost,
    getAllposts,
    handleLike,
    postComment,
    getAllComments,
    handleCommentLike,
    postReply,
    handleReplyLike,
    getUserPosts,
    getAllCommentReplies,
    editUserPost,
    deleteComment,
    deleteReply,
    deletePost
  };
};

export type postRepositoryMongoDbType = typeof postRepositoryMongoDb;
