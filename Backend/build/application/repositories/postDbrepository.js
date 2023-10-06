"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepositoryInterface = void 0;
const postRepositoryInterface = (repository) => {
    const uploadPost = async (post) => await repository.createPost(post);
    const getAllPosts = async () => await repository.getAllposts();
    const handleLike = async (postDetails) => await repository.handleLike(postDetails);
    const postComment = async (commentDeatils) => await repository.postComment(commentDeatils);
    //to get all comments of a post
    const getAllComments = async (postId) => await repository.getAllComments(postId);
    //to get all comments of a post
    const getAllCommentReplies = async (commentId) => await repository.getAllCommentReplies(commentId);
    //manage like of a comment
    const handleCommentLike = async (commentDetails) => await repository.handleCommentLike(commentDetails);
    //add reply to a comment
    const postReply = async (commentDeatils) => await repository.postReply(commentDeatils);
    //manage like of a reply
    const handleReplyLike = async (replyLikeDetails) => await repository.handleReplyLike(replyLikeDetails);
    //to get all  posts of user
    const getUserPosts = async (user) => await repository.getUserPosts(user);
    //to get all saved posts of user
    const getUserSavedPosts = async (user) => await repository.getUserPostSaved(user);
    //to edit users post
    const editUserPost = async (postId, description, userId) => await repository.editUserPost(postId, description, userId);
    //to delete comment
    const commentDelete = async (commentId) => await repository.deleteComment(commentId);
    //to delete reply
    const ReplytDelete = async (commentId, ReplyId) => await repository.deleteReply(commentId, ReplyId);
    //to delete post
    const postDelete = async (postId) => await repository.deletePost(postId);
    //to report a post
    const reportPost = async (postId, report, userId) => await repository.postReport(postId, report, userId);
    //to report a comment
    const reportComment = async (commentId, report, userId) => await repository.commentReport(commentId, report, userId);
    //to report a reply
    const reportReply = async (commentId, replyId, report, userId) => await repository.replyReport(commentId, replyId, report, userId);
    return {
        uploadPost,
        getAllPosts,
        handleLike,
        postComment,
        getAllComments,
        handleCommentLike,
        postReply,
        handleReplyLike,
        getUserPosts,
        getUserSavedPosts,
        getAllCommentReplies,
        editUserPost,
        commentDelete,
        ReplytDelete,
        postDelete,
        reportPost,
        reportComment,
        reportReply
    };
};
exports.postRepositoryInterface = postRepositoryInterface;
