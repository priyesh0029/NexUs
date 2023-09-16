import asyncHandler from "express-async-handler";
import { postRepositoryInterfaceType } from "../../application/repositories/postDbrepository";
import { postRepositoryMongoDbType } from "../../framework/database/mongoDb/repositories/postRepository";
import { Request, Response } from "express";
import {
  addComment,
  addReply,
  allCommentReplies,
  commentLikeHandler,
  editPost,
  getAllComment,
  getAllPosts,
  handleCommentDelete,
  handleDeletePost,
  handleDeleteReply,
  handleReportComment,
  handleReportPost,
  handleReportReply,
  likeHandler,
  postCreate,
  replyLikeHandler,
  userPosts,
} from "../../application/useCases/post/post";
import AppError from "../../utilities/appError";
import { HttpStatus } from "../../types/httpStatus";

export const postControllers = (
  postRepository: postRepositoryInterfaceType,
  postRepoMongoImp: postRepositoryMongoDbType
) => {
  const postRepo = postRepository(postRepoMongoImp());

  //createPost
  const createPost = asyncHandler(async (req: Request, res: Response) => {
    let media = req?.files;
    let filenames;
    if (media !== undefined && media.length !== 0) {
      filenames = (media as Express.Multer.File[]).map(
        (element) => element.filename
      );
    }
    const userId = req.query.userId;
    const { caption } = req.body;
    console.log("postvfrom frontend : ", req.files, filenames, caption, userId);
    if (typeof userId === "string") {
      const postDetails = { filenames, caption, userId };
      await postCreate(postDetails, postRepo).then((newPost) => {
        console.log("contollers new  post response : ", newPost);

        res.status(200).json({
          status: "success",
          newPost,
        });
      });
    }
  });

  //getAllPosts

  const getAllPost = asyncHandler(async (req: Request, res: Response) => {
    await getAllPosts(postRepo).then((allPosts) => {
      console.log(
        "contollers all post response : ",
        allPosts,
        req.query.userId
      );

      res.status(200).json({
        status: "success",
        allPosts,
      });
    });
  });

  //to handle like

  const handleLike = asyncHandler(async (req: Request, res: Response) => {
    const postDetail = req.body;
    console.log("contollers like postDetails : ", postDetail);
    await likeHandler(postDetail, postRepo).then((response) => {
      console.log("contollers like response : ", response);

      res.status(200).json({
        status: "success",
        response,
      });
    });
  });

  const postComment = asyncHandler(async (req: Request, res: Response) => {
    const commentDeatils = req.body;
    console.log("contollers like commentDeatils : ", commentDeatils);
    await addComment(commentDeatils, postRepo).then((newComment) => {
      console.log("contollers like response : ", newComment);

      res.status(200).json({
        status: "success",
        newComment,
      });
    });
  });

  //to get all comments of a ppost

  const getComments = asyncHandler(async (req: Request, res: Response) => {
    const postId = req.query.param;
    console.log("contollers like comment postiD : ", typeof postId);
    if (typeof postId === "string")
      await getAllComment(postId, postRepo).then((comments) => {
        console.log(
          "contollers get all comments  response 1111111111111111: ",
          comments
        );

        res.status(200).json({
          status: "success",
          comments,
        });
      });
  });

  //to get all replies of a comment

  const getAllCommentReplies = asyncHandler(
    async (req: Request, res: Response) => {
      const commentId = req.query.commentId;
      console.log("contollers like comment postiD : ", typeof commentId);
      if (typeof commentId === "string")
        await allCommentReplies(commentId, postRepo).then((replies) => {
          console.log(
            "contollers get all replies of a comment  response : ",
            replies
          );

          res.status(200).json({
            status: "success",
            replies,
          });
        });
    }
  );

  const commentLike = asyncHandler(async (req: Request, res: Response) => {
    const commentDetail = req.body;
    console.log("contollers like postDetails : ", commentDetail);
    await commentLikeHandler(commentDetail, postRepo).then((response) => {
      console.log("contollers like response : ", response);

      res.status(200).json({
        status: "success",
        response,
      });
    });
  });

  const replycomment = asyncHandler(async (req: Request, res: Response) => {
    const commentDeatils = req.body;
    console.log("contollers like commentDeatils : ", commentDeatils);
    await addReply(commentDeatils, postRepo).then((newComment) => {
      console.log("contollers like response : ", newComment);

      res.status(200).json({
        status: "success",
        newComment,
      });
    });
  });

  //manage like to a reply

  const replylike = asyncHandler(async (req: Request, res: Response) => {
    const replyLikeDetail = req.body;
    console.log("contollers like postDetails : ", replyLikeDetail);
    await replyLikeHandler(replyLikeDetail, postRepo).then((state) => {
      console.log("contollers like response : ", state);

      res.status(200).json({
        status: "success",
        state,
      });
    });
  });

  //to get all posts by user

  const getUserPosts = asyncHandler(async (req: Request, res: Response) => {
    const user = req.query.param;
    if (typeof user === "string") {
      await userPosts(user, postRepo).then((posts) => {
        console.log("contollers all post response : ", posts);

        res.status(200).json({
          status: "success",
          posts,
        });
      });
    } else {
      throw new AppError(
        ` Error occured fetching posts of ${user}.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //to edit post

  const updatePost = asyncHandler(async (req: Request, res: Response) => {
    const { postId, description } = req.body;
    const userId = req.query.userId;
    if (
      typeof postId === "string" &&
      typeof description === "string" &&
      typeof userId === "string"
    ) {
      console.log(
        "contollers edit post postDetails : ",
        postId,
        description,
        userId
      );
      await editPost(postId, description, userId, postRepo).then((post) => {
        console.log("contollers all post response : ", post);

        res.status(200).json({
          status: "success",
          post,
        });
      });
    } else {
      throw new AppError(
        ` Error while updating post.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //to delete comment

  const deleteComment = asyncHandler(async (req: Request, res: Response) => {
    const { commentId } = req.body;
    if (typeof commentId === "string") {
      console.log("contollers delete comment : ", commentId);
      await handleCommentDelete(commentId, postRepo).then((comment) => {
        console.log("contollers all post response : ", comment);

        res.status(200).json({
          status: "success",
          comment,
        });
      });
    } else {
      throw new AppError(
        ` Error while deleting comment.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //to delete Reply

  const deleteReply = asyncHandler(async (req: Request, res: Response) => {
    const { commentId, ReplyId } = req.body;
    console.log("contollers delete reply : ", commentId, ReplyId);
    if (typeof commentId === "string" && typeof ReplyId === "string") {
      await handleDeleteReply(commentId, ReplyId, postRepo).then((reply) => {
        console.log("contollers all post response : ", reply);

        res.status(200).json({
          status: "success",
          reply,
        });
      });
    } else {
      throw new AppError(
        ` Error while deleting reply.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //to delete Post

  const deletePost = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.body;
    console.log("contollers delete post : ", postId);
    if (typeof postId === "string") {
      await handleDeletePost(postId, postRepo).then((post) => {
        console.log("contollers all post response : ", post);

        res.status(200).json({
          status: "success",
          post,
        });
      });
    } else {
      throw new AppError(
        ` Error while deleting post.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //to report post

  const reportPost = asyncHandler(async (req: Request, res: Response) => {
    const { postId, report } = req.body;
    const userId = req.query.userId;
    console.log("contollers report post : ", postId, report, userId);
    if (
      typeof postId === "string" &&
      typeof report === "string" &&
      typeof userId === "string"
    ) {
      await handleReportPost(postId, report, userId, postRepo).then(
        (reported) => {
          console.log("contollers all post response : ", reported);

          res.status(200).json({
            status: "success",
            reported,
          });
        }
      );
    } else {
      throw new AppError(
        ` Error while deleting post.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //to report comment

  const reportComment = asyncHandler(async (req: Request, res: Response) => {
    const { commentId, report } = req.body;
    const userId = req.query.userId;
    console.log("contollers report comment : ", commentId, report, userId);
    if (
      typeof commentId === "string" &&
      typeof report === "string" &&
      typeof userId === "string"
    ) {
      await handleReportComment(commentId, report, userId, postRepo).then(
        (reported) => {
          console.log("contollers report comment response : ", reported);

          res.status(200).json({
            status: "success",
            reported,
          });
        }
      );
    } else {
      throw new AppError(
        ` Error while deleting post.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  //to report reply

  const reportReply = asyncHandler(async (req: Request, res: Response) => {
    const { commentId,replyId, report } = req.body;
    const userId = req.query.userId;
    console.log("contollers report post : ", commentId,replyId,report,userId);
    if (
      typeof commentId === "string" &&
      typeof replyId === "string" &&
      typeof report === "string" &&
      typeof userId === "string"
    ) {
      await handleReportReply(commentId,replyId,report, userId, postRepo).then(
        (reported) => {
          console.log("contollers all post response : ", reported);

          res.status(200).json({
            status: "success",
            reported,
          });
        }
      );
    } else {
      throw new AppError(
        ` Error while deleting post.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }
  });

  return {
    createPost,
    getAllPost,
    handleLike,
    postComment,
    getComments,
    commentLike,
    replycomment,
    replylike,
    getUserPosts,
    getAllCommentReplies,
    updatePost,
    deleteComment,
    deleteReply,
    deletePost,
    reportPost,
    reportComment,
    reportReply
  };
};
