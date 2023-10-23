"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepositoryMongoDb = void 0;
const commentModel_1 = __importDefault(require("../models/commentModel"));
const postModel_1 = __importDefault(require("../models/postModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../models/userModel"));
const postRepositoryMongoDb = () => {
    //to create a post
    const createPost = async (post) => {
        const userID = new mongoose_1.default.Types.ObjectId(post.userId);
        const user = await userModel_1.default.findOne({ _id: userID }, { _id: 0, userName: 1 });
        if (user !== null) {
            const postDetails = {
                postedUser: user.userName,
                description: post.caption,
                imgNames: post.filenames,
            };
            const newPost = new postModel_1.default(postDetails);
            return await newPost.save();
        }
    };
    //getallposts
    const getAllposts = async () => {
        // return await Post.find().sort({ createdAt: -1 });
        const posts = await postModel_1.default.aggregate([
            {
                $match: {
                    postDeleted: false,
                    isBlocked: false,
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
                $match: {
                    "results.accountDeactive": false,
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
                            deactive: "$likedUsers.accountDeactive",
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
    const handleLike = async (postDetails) => {
        const { user, postId } = postDetails;
        const postID = new mongoose_1.default.Types.ObjectId(postId);
        const liked = await postModel_1.default.findOne({
            _id: postID,
            liked: { $elemMatch: { $eq: user } },
        });
        console.log("liked :", liked);
        if (liked) {
            const like = await postModel_1.default.updateOne({ _id: postID }, { $pull: { liked: user } });
            console.log("like 1:", like);
            if (like.modifiedCount === 1) {
                return { status: true, user: user, state: "removed" };
            }
        }
        else {
            const like = await postModel_1.default.updateOne({ _id: postID }, { $push: { liked: user } });
            console.log("like 2 :", like);
            if (like.modifiedCount === 1) {
                return { status: true, user: user, state: "added" };
            }
        }
        return false; // Return false if the update operation didn't succeed
    };
    // to adda comment
    const postComment = async (commentDeatils) => {
        const { comment, user, postId } = commentDeatils;
        const postID = new mongoose_1.default.Types.ObjectId(postId);
        const newComment = new commentModel_1.default({
            postId: postID,
            userName: user,
            comment: comment,
        });
        const postedComment = await newComment.save();
        console.log("user register complete :", postedComment);
        return postedComment;
    };
    //to get all comment
    const getAllComments = async (postId) => {
        const postID = new mongoose_1.default.Types.ObjectId(postId);
        const postComment = await commentModel_1.default.aggregate([
            {
                $match: {
                    postId: postID,
                    delete: false,
                    isBlocked: false,
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
                $match: {
                    "commentedUser.accountDeactive": false,
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
                        $first: "$commentedUser.userName",
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
                            deactive: "$commentLikedUser.accountDeactive",
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
    const getAllCommentReplies = async (commentId) => {
        const commentID = new mongoose_1.default.Types.ObjectId(commentId);
        const commentReplies = await commentModel_1.default.aggregate([
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
                $match: {
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
                $match: {
                    "repliedUser.accountDeactive": false,
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
                        $first: "$repliedUser.userName",
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
                            deactive: "$replyLikedUser.accountDeactive",
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
    const handleCommentLike = async (commentDetails) => {
        const { user, commentId } = commentDetails;
        const commentID = new mongoose_1.default.Types.ObjectId(commentId);
        const liked = await commentModel_1.default.findOne({
            _id: commentID,
            liked: { $elemMatch: { $eq: user } },
        });
        console.log("liked :", liked);
        if (liked) {
            const like = await commentModel_1.default.updateOne({ _id: commentID }, { $pull: { liked: user } });
            console.log("like 1:", like);
            if (like.modifiedCount === 1) {
                return { status: true, user: user, state: "removed" };
            }
        }
        else {
            const like = await commentModel_1.default.updateOne({ _id: commentID }, { $push: { liked: user } });
            console.log("like 2 :", like);
            if (like.modifiedCount === 1) {
                return { status: true, user: user, state: "added" };
            }
        }
        return false; // Return false if the update operation didn't succeed
    };
    //to add a comment reply
    const postReply = async (commentDeatils) => {
        const { comment, user, commentId } = commentDeatils;
        const commentID = new mongoose_1.default.Types.ObjectId(commentId);
        const newReply = {
            userName: user,
            comment: comment,
        };
        const postedReply = await commentModel_1.default.findOneAndUpdate({ _id: commentID }, { $push: { reply: newReply } }, { new: true });
        if (postedReply !== null) {
            console.log("user postedReply complete :", postedReply);
            return postedReply;
        }
        else {
            return false;
        }
    };
    //manage like of a reply
    const handleReplyLike = async (replyLikeDetails) => {
        const { user, replyId, commentId } = replyLikeDetails;
        const replyID = new mongoose_1.default.Types.ObjectId(replyId);
        const commentID = new mongoose_1.default.Types.ObjectId(commentId);
        const comment = await commentModel_1.default.findOne({ _id: commentId });
        console.log("comment :", comment);
        if (comment) {
            const replyIndex = comment.reply.findIndex((reply) => reply._id?.toString() === replyID.toString());
            if (replyIndex !== -1) {
                const reply = comment.reply[replyIndex];
                if (reply.liked.includes(user)) {
                    const updateResult = await commentModel_1.default.updateOne({ _id: commentID, "reply._id": replyID }, { $pull: { "reply.$.liked": user } });
                    if (updateResult.modifiedCount === 1) {
                        return { status: true, user: user, state: "removed" };
                    }
                }
                else {
                    const updateResult = await commentModel_1.default.updateOne({ _id: commentID, "reply._id": replyID }, { $addToSet: { "reply.$.liked": user } });
                    if (updateResult.modifiedCount === 1) {
                        return { status: true, user: user, state: "added" };
                    }
                }
            }
        }
        return false;
    };
    //to get users post profile
    const getUserPosts = async (user) => {
        // const posts = await Post.find({ postedUser: user }).sort({ createdAt: -1 });
        const posts = await postModel_1.default.aggregate([
            {
                $match: {
                    postedUser: user,
                },
            },
            {
                $match: {
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
    //to get users saved post on profile
    const getUserPostSaved = async (userId) => {
        const userID = new mongoose_1.default.Types.ObjectId(userId);
        const savedPosts = await userModel_1.default.aggregate([
            {
                $match: {
                    _id: userID,
                },
            },
            {
                $unwind: {
                    path: "$savedPost",
                },
            },
            {
                $project: {
                    savedPost: {
                        $toObjectId: "$savedPost",
                    },
                },
            },
            {
                $lookup: {
                    from: "posts",
                    localField: "savedPost",
                    foreignField: "_id",
                    as: "savedPosts",
                },
            },
            {
                $unwind: {
                    path: "$savedPosts",
                },
            },
            {
                $match: {
                    "savedPosts.postDeleted": false,
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "savedPosts.postedUser",
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
                    _id: "$savedPosts._id",
                    postedUser: "$savedPosts.postedUser",
                    description: "$savedPosts.description",
                    imgNames: "$savedPosts.imgNames",
                    isBlocked: "$savedPosts.isBlocked",
                    liked: "$savedPosts.liked",
                    reports: "$savedPosts.reports",
                    createdAt: "$savedPosts.createdAt",
                    updatedAt: "$savedPosts.updatedAt",
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
        console.log("savedPosts : ", savedPosts);
        return savedPosts;
    };
    //to edit users post
    const editUserPost = async (postId, description, userId) => {
        const userID = new mongoose_1.default.Types.ObjectId(userId);
        const user = await userModel_1.default.findOne({ _id: userID }, { _id: 0, userName: 1 });
        console.log("user beforre edit post : ", user);
        if (user !== null) {
            const postID = new mongoose_1.default.Types.ObjectId(postId);
            const updatedPost = await postModel_1.default.findOneAndUpdate({ _id: postID, postedUser: user.userName }, { $set: { description: description } }, { new: true, projection: { description: 1, _id: 0 } });
            console.log("updated post after query : ", updatedPost);
            return updatedPost;
        }
        else {
            return false;
        }
    };
    //to delete comment
    const deleteComment = async (commentId) => {
        const commentID = new mongoose_1.default.Types.ObjectId(commentId);
        const CommentDetails = await commentModel_1.default.findOneAndUpdate({ _id: commentID }, { $set: { delete: true } }, { new: true, projection: { comment: 1 } });
        console.log("user beforre edit post : ", CommentDetails);
        if (CommentDetails !== null) {
            console.log("updated post after query : ", CommentDetails.comment);
            return CommentDetails;
        }
        else {
            return false;
        }
    };
    // to delete reply
    const deleteReply = async (commentId, replyId) => {
        const commentID = new mongoose_1.default.Types.ObjectId(commentId);
        const replyID = new mongoose_1.default.Types.ObjectId(replyId);
        const replyDetails = await commentModel_1.default.findOneAndUpdate({ _id: commentID, "reply._id": replyID }, { $set: { "reply.$.delete": true } }, { new: true });
        console.log("user after delete reply : ", replyDetails);
        if (replyDetails !== null) {
            return replyId;
        }
        else {
            return false;
        }
    };
    // to delete Post
    const deletePost = async (postId) => {
        const postID = new mongoose_1.default.Types.ObjectId(postId);
        console.log("delete post db repositiry : ", postID);
        const [post, comment] = await Promise.all([
            postModel_1.default.updateOne({ _id: postID }, { $set: { postDeleted: true } }),
            commentModel_1.default.updateMany({ postId: postID }, { $set: { delete: true, "reply.$[].delete": true } }),
        ]);
        if (post.modifiedCount === 1 &&
            comment.modifiedCount === comment.matchedCount) {
            return true;
        }
        else {
            return false;
        }
    };
    //to report a post
    const postReport = async (postId, reportComment, userId) => {
        const postID = new mongoose_1.default.Types.ObjectId(postId);
        const userID = new mongoose_1.default.Types.ObjectId(userId);
        const user = await userModel_1.default.findOne({ _id: userID }, { _id: 0, userName: 1 });
        if (user !== null) {
            const reportObj = {
                reportedUser: user.userName,
                report: reportComment,
            };
            const checkReport = await postModel_1.default.findOne({
                _id: postID,
                reports: {
                    $elemMatch: {
                        reportedUser: user.userName,
                        report: reportComment,
                    },
                },
            });
            if (checkReport === null) {
                const updatedReport = await postModel_1.default.updateOne({ _id: postID }, { $push: { reports: reportObj } });
                if (updatedReport.modifiedCount === 1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    //to report a comment
    const commentReport = async (commentId, reportComment, userId) => {
        const commentID = new mongoose_1.default.Types.ObjectId(commentId);
        const userID = new mongoose_1.default.Types.ObjectId(userId);
        const user = await userModel_1.default.findOne({ _id: userID }, { _id: 0, userName: 1 });
        if (user !== null) {
            const reportObj = {
                reportedUser: user.userName,
                report: reportComment,
            };
            const checkReport = await commentModel_1.default.findOne({
                _id: commentID,
                reports: {
                    $elemMatch: {
                        reportedUser: user.userName,
                        report: reportComment,
                    },
                },
            });
            if (checkReport === null) {
                const updatedReport = await commentModel_1.default.updateOne({ _id: commentID }, { $push: { reports: reportObj } });
                if (updatedReport.modifiedCount === 1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
    //to report a reply
    const replyReport = async (commentId, replyId, reportComment, userId) => {
        const commentID = new mongoose_1.default.Types.ObjectId(commentId);
        const replyID = new mongoose_1.default.Types.ObjectId(replyId);
        const userID = new mongoose_1.default.Types.ObjectId(userId);
        const user = await userModel_1.default.findOne({ _id: userID }, { _id: 0, userName: 1 });
        if (user !== null) {
            const reportObj = {
                reportedUser: user.userName,
                report: reportComment,
            };
            const checkReport = await commentModel_1.default.findOne({
                _id: commentID,
                reply: {
                    $elemMatch: {
                        _id: replyID,
                        reports: {
                            $elemMatch: {
                                reportedUser: user.userName,
                                report: reportComment,
                            },
                        },
                    },
                },
            });
            console.log("check report of reply : ", checkReport);
            if (checkReport === null) {
                const updatedReport = await commentModel_1.default.updateOne({
                    _id: commentID,
                    reply: {
                        $elemMatch: {
                            _id: replyID,
                        },
                    },
                }, { $push: { "reply.$.reports": reportObj } });
                if (updatedReport.modifiedCount === 1) {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    };
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
        getUserPostSaved,
        getAllCommentReplies,
        editUserPost,
        deleteComment,
        deleteReply,
        deletePost,
        postReport,
        commentReport,
        replyReport,
    };
};
exports.postRepositoryMongoDb = postRepositoryMongoDb;
