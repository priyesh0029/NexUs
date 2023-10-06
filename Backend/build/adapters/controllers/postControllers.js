"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postControllers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const post_1 = require("../../application/useCases/post/post");
const appError_1 = __importDefault(require("../../utilities/appError"));
const httpStatus_1 = require("../../types/httpStatus");
const postControllers = (postRepository, postRepoMongoImp) => {
    const postRepo = postRepository(postRepoMongoImp());
    //createPost
    const createPost = (0, express_async_handler_1.default)(async (req, res) => {
        let media = req?.files;
        let filenames;
        if (media !== undefined && media.length !== 0) {
            filenames = media.map((element) => element.filename);
        }
        const userId = req.query.userId;
        const { caption } = req.body;
        console.log("postvfrom frontend : ", req.files, filenames, caption, userId);
        if (typeof userId === "string") {
            const postDetails = { filenames, caption, userId };
            await (0, post_1.postCreate)(postDetails, postRepo).then((newPost) => {
                console.log("contollers new  post response : ", newPost);
                res.status(200).json({
                    status: "success",
                    newPost,
                });
            });
        }
    });
    //getAllPosts
    const getAllPost = (0, express_async_handler_1.default)(async (req, res) => {
        await (0, post_1.getAllPosts)(postRepo).then((allPosts) => {
            console.log("contollers all post response : ", allPosts, req.query.userId);
            res.status(200).json({
                status: "success",
                allPosts,
            });
        });
    });
    //to handle like
    const handleLike = (0, express_async_handler_1.default)(async (req, res) => {
        const postDetail = req.body;
        console.log("contollers like postDetails : ", postDetail);
        await (0, post_1.likeHandler)(postDetail, postRepo).then((response) => {
            console.log("contollers like response : ", response);
            res.status(200).json({
                status: "success",
                response,
            });
        });
    });
    const postComment = (0, express_async_handler_1.default)(async (req, res) => {
        const commentDeatils = req.body;
        console.log("contollers like commentDeatils : ", commentDeatils);
        await (0, post_1.addComment)(commentDeatils, postRepo).then((newComment) => {
            console.log("contollers like response : ", newComment);
            res.status(200).json({
                status: "success",
                newComment,
            });
        });
    });
    //to get all comments of a ppost
    const getComments = (0, express_async_handler_1.default)(async (req, res) => {
        const postId = req.query.param;
        console.log("contollers like comment postiD : ", typeof postId);
        if (typeof postId === "string")
            await (0, post_1.getAllComment)(postId, postRepo).then((comments) => {
                console.log("contollers get all comments  response 1111111111111111: ", comments);
                res.status(200).json({
                    status: "success",
                    comments,
                });
            });
    });
    //to get all replies of a comment
    const getAllCommentReplies = (0, express_async_handler_1.default)(async (req, res) => {
        const commentId = req.query.commentId;
        console.log("contollers like comment postiD : ", typeof commentId);
        if (typeof commentId === "string")
            await (0, post_1.allCommentReplies)(commentId, postRepo).then((replies) => {
                console.log("contollers get all replies of a comment  response : ", replies);
                res.status(200).json({
                    status: "success",
                    replies,
                });
            });
    });
    const commentLike = (0, express_async_handler_1.default)(async (req, res) => {
        const commentDetail = req.body;
        console.log("contollers like postDetails : ", commentDetail);
        await (0, post_1.commentLikeHandler)(commentDetail, postRepo).then((response) => {
            console.log("contollers like response : ", response);
            res.status(200).json({
                status: "success",
                response,
            });
        });
    });
    const replycomment = (0, express_async_handler_1.default)(async (req, res) => {
        const commentDeatils = req.body;
        console.log("contollers like commentDeatils : ", commentDeatils);
        await (0, post_1.addReply)(commentDeatils, postRepo).then((newComment) => {
            console.log("contollers like response : ", newComment);
            res.status(200).json({
                status: "success",
                newComment,
            });
        });
    });
    //manage like to a reply
    const replylike = (0, express_async_handler_1.default)(async (req, res) => {
        const replyLikeDetail = req.body;
        console.log("contollers like postDetails : ", replyLikeDetail);
        await (0, post_1.replyLikeHandler)(replyLikeDetail, postRepo).then((state) => {
            console.log("contollers like response : ", state);
            res.status(200).json({
                status: "success",
                state,
            });
        });
    });
    //to get all posts by user
    const getUserPosts = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.query.param;
        if (typeof user === "string") {
            await (0, post_1.userPosts)(user, postRepo).then((posts) => {
                console.log("contollers all post response : ", posts);
                res.status(200).json({
                    status: "success",
                    posts,
                });
            });
        }
        else {
            throw new appError_1.default(` Error occured fetching posts of ${user}.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to get all saved post by user
    const getUserSavedPost = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.query.userId;
        if (typeof userId === "string") {
            await (0, post_1.userSavedPosts)(userId, postRepo).then((posts) => {
                console.log("contollers all post response : ", posts);
                res.status(200).json({
                    status: "success",
                    posts,
                });
            });
        }
        else {
            throw new appError_1.default(` Error occured fetching saved posts.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to edit post
    const updatePost = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId, description } = req.body;
        const userId = req.query.userId;
        if (typeof postId === "string" &&
            typeof description === "string" &&
            typeof userId === "string") {
            console.log("contollers edit post postDetails : ", postId, description, userId);
            await (0, post_1.editPost)(postId, description, userId, postRepo).then((post) => {
                console.log("contollers all post response : ", post);
                res.status(200).json({
                    status: "success",
                    post,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while updating post.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to delete comment
    const deleteComment = (0, express_async_handler_1.default)(async (req, res) => {
        const { commentId } = req.body;
        if (typeof commentId === "string") {
            console.log("contollers delete comment : ", commentId);
            await (0, post_1.handleCommentDelete)(commentId, postRepo).then((comment) => {
                console.log("contollers all post response : ", comment);
                res.status(200).json({
                    status: "success",
                    comment,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while deleting comment.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to delete Reply
    const deleteReply = (0, express_async_handler_1.default)(async (req, res) => {
        const { commentId, ReplyId } = req.body;
        console.log("contollers delete reply : ", commentId, ReplyId);
        if (typeof commentId === "string" && typeof ReplyId === "string") {
            await (0, post_1.handleDeleteReply)(commentId, ReplyId, postRepo).then((reply) => {
                console.log("contollers all post response : ", reply);
                res.status(200).json({
                    status: "success",
                    reply,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while deleting reply.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to delete Post
    const deletePost = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId } = req.body;
        console.log("contollers delete post : ", postId);
        if (typeof postId === "string") {
            await (0, post_1.handleDeletePost)(postId, postRepo).then((post) => {
                console.log("contollers all post response : ", post);
                res.status(200).json({
                    status: "success",
                    post,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while deleting post.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to report post
    const reportPost = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId, report } = req.body;
        const userId = req.query.userId;
        console.log("contollers report post : ", postId, report, userId);
        if (typeof postId === "string" &&
            typeof report === "string" &&
            typeof userId === "string") {
            await (0, post_1.handleReportPost)(postId, report, userId, postRepo).then((reported) => {
                console.log("contollers all post response : ", reported);
                res.status(200).json({
                    status: "success",
                    reported,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while deleting post.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to report comment
    const reportComment = (0, express_async_handler_1.default)(async (req, res) => {
        const { commentId, report } = req.body;
        const userId = req.query.userId;
        console.log("contollers report comment : ", commentId, report, userId);
        if (typeof commentId === "string" &&
            typeof report === "string" &&
            typeof userId === "string") {
            await (0, post_1.handleReportComment)(commentId, report, userId, postRepo).then((reported) => {
                console.log("contollers report comment response : ", reported);
                res.status(200).json({
                    status: "success",
                    reported,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while deleting post.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to report reply
    const reportReply = (0, express_async_handler_1.default)(async (req, res) => {
        const { commentId, replyId, report } = req.body;
        const userId = req.query.userId;
        console.log("contollers report post : ", commentId, replyId, report, userId);
        if (typeof commentId === "string" &&
            typeof replyId === "string" &&
            typeof report === "string" &&
            typeof userId === "string") {
            await (0, post_1.handleReportReply)(commentId, replyId, report, userId, postRepo).then((reported) => {
                console.log("contollers all post response : ", reported);
                res.status(200).json({
                    status: "success",
                    reported,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while deleting post.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
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
        getUserSavedPost,
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
exports.postControllers = postControllers;
