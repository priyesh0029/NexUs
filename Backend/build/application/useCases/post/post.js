"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReportReply = exports.handleReportComment = exports.handleReportPost = exports.handleDeletePost = exports.handleDeleteReply = exports.handleCommentDelete = exports.editPost = exports.userSavedPosts = exports.userPosts = exports.replyLikeHandler = exports.addReply = exports.commentLikeHandler = exports.allCommentReplies = exports.getAllComment = exports.addComment = exports.likeHandler = exports.getAllPosts = exports.postCreate = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utilities/appError"));
const postCreate = async (postDetails, repository) => {
    return await repository.uploadPost(postDetails).then((newPost) => {
        //  console.log("newPost usecases : ",newPost);
        if (newPost === null) {
            throw new appError_1.default("Uploading failed", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return newPost;
    });
};
exports.postCreate = postCreate;
const getAllPosts = async (repository) => {
    return await repository.getAllPosts().then((allPosts) => {
        if (allPosts.length === 0) {
            throw new appError_1.default("Error occured while loading posts.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return allPosts;
    });
};
exports.getAllPosts = getAllPosts;
const likeHandler = async (postDetails, repository) => {
    return await repository.handleLike(postDetails).then((response) => {
        if (!response) {
            throw new appError_1.default("Error occured while liking posts.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.likeHandler = likeHandler;
const addComment = async (commentDeatils, repository) => {
    return await repository.postComment(commentDeatils).then((response) => {
        console.log("response of commmet usecase : ", response);
        return response;
    });
};
exports.addComment = addComment;
//to get all comments of a post
const getAllComment = async (postId, repository) => {
    return await repository.getAllComments(postId).then((response) => {
        return response;
    });
};
exports.getAllComment = getAllComment;
//to get all replies of a comment
const allCommentReplies = async (commentId, repository) => {
    return await repository.getAllCommentReplies(commentId).then((response) => {
        return response;
    });
};
exports.allCommentReplies = allCommentReplies;
//manage likes of a comment
const commentLikeHandler = async (commentDetails, repository) => {
    return await repository.handleCommentLike(commentDetails).then((response) => {
        if (!response) {
            throw new appError_1.default("Error occured while liking posts.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.commentLikeHandler = commentLikeHandler;
//to add a reply to a comment
const addReply = async (commentDeatils, repository) => {
    return await repository.postReply(commentDeatils).then((response) => {
        if (!response) {
            throw new appError_1.default("Error occured while replying the comment.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.addReply = addReply;
//manage like to a reply
const replyLikeHandler = async (replyLikeDetail, repository) => {
    return await repository.handleReplyLike(replyLikeDetail).then((response) => {
        if (!response) {
            throw new appError_1.default("Error occured while liking posts.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.replyLikeHandler = replyLikeHandler;
//to get users post
const userPosts = async (user, repository) => {
    return await repository.getUserPosts(user).then((response) => {
        if (!response) {
            throw new appError_1.default(` Error occured fetching posts of ${user}.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.userPosts = userPosts;
//to get users saved posts
const userSavedPosts = async (user, repository) => {
    return await repository.getUserSavedPosts(user).then((response) => {
        if (!response) {
            throw new appError_1.default(` Error occured fetching posts of ${user}.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.userSavedPosts = userSavedPosts;
//t edit post
const editPost = async (postId, description, userId, repository) => {
    return await repository.editUserPost(postId, description, userId).then((response) => {
        if (!response) {
            throw new appError_1.default(` Error occured while editing post.please try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.editPost = editPost;
//to delete comment
const handleCommentDelete = async (commentId, repository) => {
    return await repository.commentDelete(commentId).then((response) => {
        if (!response) {
            throw new appError_1.default(` Error occured whiledeleting comment.please try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.handleCommentDelete = handleCommentDelete;
//to delete Reply
const handleDeleteReply = async (commentId, ReplyId, repository) => {
    return await repository.ReplytDelete(commentId, ReplyId).then((response) => {
        if (!response) {
            throw new appError_1.default(` Error occured while deleting reply.please try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.handleDeleteReply = handleDeleteReply;
//to delete Post
const handleDeletePost = async (postId, repository) => {
    return await repository.postDelete(postId).then((response) => {
        if (!response) {
            throw new appError_1.default(` Error occured while deleting post.please try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.handleDeletePost = handleDeletePost;
//to report a post 
const handleReportPost = async (postId, report, userId, repository) => {
    return await repository.reportPost(postId, report, userId).then((response) => {
        if (!response) {
            throw new appError_1.default(` Error occured while reporting post.please try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.handleReportPost = handleReportPost;
//to report a commenet 
const handleReportComment = async (commentId, report, userId, repository) => {
    return await repository.reportComment(commentId, report, userId).then((response) => {
        if (!response) {
            throw new appError_1.default(` Error occured while reporting comment.please try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.handleReportComment = handleReportComment;
//to report a reply 
const handleReportReply = async (commentId, replyId, report, userId, repository) => {
    return await repository.reportReply(commentId, replyId, report, userId).then((response) => {
        if (!response) {
            throw new appError_1.default(` Error occured while reporting comment.please try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.handleReportReply = handleReportReply;
