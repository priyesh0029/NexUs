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

//to get all comments of a post
export const getAllComment = async (
  postId: string,
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.getAllComments(postId).then((response) => {
    return response;
  });
};

//to get all replies of a comment
export const allCommentReplies = async (
  commentId: string,
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.getAllCommentReplies(commentId).then((response) => {
    return response;
  });
};


//manage likes of a comment
export const commentLikeHandler = async (
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
    replyId: string;
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

//to get users post

export const userPosts = async (
  user: string,
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.getUserPosts(user).then((response) => {
    if (!response) {
      throw new AppError(
        ` Error occured fetching posts of ${user}.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};

//to get users saved posts

export const userSavedPosts = async (
  user: string,
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.getUserSavedPosts(user).then((response) => {
    if (!response) {
      throw new AppError(
        ` Error occured fetching posts of ${user}.try again..!`,
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};

//t edit post

export const editPost =  async (
  postId: string,
  description:string,
  userId :string,
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.editUserPost(postId,description,userId).then((response) => {
    if (!response) {
      throw new AppError(
        ` Error occured while editing post.please try again..!`,
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};

//to delete comment

export const handleCommentDelete =  async (
  commentId: string,
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.commentDelete(commentId).then((response) => {
    if (!response) {
      throw new AppError(
        ` Error occured whiledeleting comment.please try again..!`,
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};

//to delete Reply

export const handleDeleteReply =  async (
  commentId: string,
  ReplyId:string,
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.ReplytDelete(commentId,ReplyId).then((response) => {
    if (!response) {
      throw new AppError(
        ` Error occured while deleting reply.please try again..!`,
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};


//to delete Post

export const handleDeletePost =  async (
  postId: string,
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.postDelete(postId).then((response) => {
    if (!response) {
      throw new AppError(
        ` Error occured while deleting post.please try again..!`,
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};

//to report a post 

export const handleReportPost =  async (
  postId: string,
  report:string,
  userId:string,
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.reportPost(postId,report,userId).then((response) => {
    if (!response) {
      throw new AppError(
        ` Error occured while reporting post.please try again..!`,
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};

//to report a commenet 

export const handleReportComment =  async (
  commentId: string,
  report:string,
  userId:string,
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.reportComment(commentId,report,userId).then((response) => {
    if (!response) {
      throw new AppError(
        ` Error occured while reporting comment.please try again..!`,
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};

//to report a reply 

export const handleReportReply =  async (
  commentId: string,
  replyId:string,
  report:string,
  userId:string,
  repository: ReturnType<postRepositoryInterfaceType>
) => {
  return await repository.reportReply(commentId,replyId,report,userId).then((response) => {
    if (!response) {
      throw new AppError(
        ` Error occured while reporting comment.please try again..!`,
        HttpStatus.BAD_REQUEST
      );
    } else {
      return response;
    }
  });
};