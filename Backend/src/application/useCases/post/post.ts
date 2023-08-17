import { HttpStatus } from "../../../types/httpStatus";
import { post } from "../../../types/postTypes/postTypes";
import AppError from "../../../utilities/appError";
import { postRepositoryInterfaceType } from "../../repositories/postDbrepository";

export const postCreate = async (
  postDetails: post,
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.uploadPost(postDetails).then((newPost) => {
    //  console.log("newPost usecases : ",newPost);
    if (newPost === null) {
      throw new AppError("Uploading failed", HttpStatus.BAD_REQUEST);
    }
    return newPost;
  });
};

export const getAllPosts = async (
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.getAllPosts().then((allPosts) => {
    if (allPosts.length === 0) {
      throw new AppError(
        "Error occured while loading posts.try again..!",
        HttpStatus.BAD_REQUEST
      );
    }
    return allPosts;
  });
};

export const likeHandler = async (
  postDetails: {
    user: string;
    postId: string;
  },
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.handleLike(postDetails).then((response) => {
    if (!response) {
      throw new AppError(
        "Error occured while liking posts.try again..!",
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};

export const addComment = async (
  commentDeatils: {
    comment: string;
    user: string;
    postId: string;
  },
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.postComment(commentDeatils).then((response) => {
    console.log("response of commmet usecase : ", response);
    return response;
  });
};

export const getAllComment = async (
  postId: string,
  repository: ReturnType<postRepositoryInterfaceType>
) => {
    return await repository.getAllComments(postId).then((response) => {
      console.log("response of get all commmets usecase : ", response);
      return response;
    });
};

//manage likes of a comment
export const commentLikeHandler  = async (
  commentDetails: {
    user: string;
    commentId: string;
  },
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.handleCommentLike(commentDetails).then((response) => {
    if (!response) {
      throw new AppError(
        "Error occured while liking posts.try again..!",
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};

//to add a reply to a comment
export const addReply = async (
  commentDeatils: {
    comment: string;
    user: string;
    commentId: string;
  },
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.postReply(commentDeatils).then((response) => {
    if (!response) {
      throw new AppError(
        "Error occured while replying the comment.try again..!",
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};

//manage like to a reply

export const replyLikeHandler = async (
  replyLikeDetail: {
    user: string;
    replyId :string
    commentId: string;
  },
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.handleReplyLike(replyLikeDetail).then((response) => {
    if (!response) {
      throw new AppError(
        "Error occured while liking posts.try again..!",
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};