"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRepositoryMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const adminModels_1 = __importDefault(require("../models/adminModels"));
const commentModel_1 = __importDefault(require("../models/commentModel"));
const postModel_1 = __importDefault(require("../models/postModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const adminRepositoryMongoDB = () => {
    const findByProperty = async (params) => {
        console.log("admin111111 : ", params);
        const admin = await adminModels_1.default.find({
            $or: [{ userName: params }, { email: params }],
        });
        console.log("user : ", admin.length);
        return admin;
    };
    const adminDashBoardDetails = async () => {
        try {
            const totalUsers = await userModel_1.default.count();
            console.log(totalUsers);
            const totalReportedPosts = await postModel_1.default.count({
                reports: { $exists: true, $not: { $size: 0 } },
            });
            const totalReportedComments = await commentModel_1.default.count({
                reports: { $exists: true, $not: { $size: 0 } },
            });
            const result = await commentModel_1.default.aggregate([
                {
                    $unwind: {
                        path: "$reply",
                    },
                },
                {
                    $match: {
                        "reply.reports": {
                            $not: {
                                $size: 0,
                            },
                        },
                    },
                },
                {
                    $group: {
                        _id: null,
                        count: {
                            $sum: 1,
                        },
                    },
                },
            ]);
            const totalReportedReplies = result[0] ? result[0].count : 0;
            const totalReportedUsers = await userModel_1.default.count({
                reports: { $exists: true, $not: { $size: 0 } },
            });
            const response = [
                { "Total Users": totalUsers },
                { "Reported Posts": totalReportedPosts },
                { "Reported Comments": totalReportedComments + totalReportedReplies },
                // { 'Reported Replies': totalReportedReplies },
                { "Reported Users": totalReportedUsers },
            ];
            return response;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    const getUserRegperWeekData = async () => {
        try {
            function getStartAndEndOfWeek() {
                const currentDate = new Date(); // Current date
                const dayOfWeek = currentDate.getUTCDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
                const startOfWeek = new Date(currentDate); // Clone the current date
                const endOfWeek = new Date(currentDate); // Clone the current date
                // Calculate the start of the week (Sunday)
                startOfWeek.setUTCDate(currentDate.getUTCDate() - dayOfWeek);
                startOfWeek.setUTCHours(0, 0, 0, 0);
                // Calculate the end of the week (Saturday)
                endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6);
                endOfWeek.setUTCHours(23, 59, 59, 999);
                return { startOfWeek, endOfWeek };
            }
            // Example of how to use the function:
            const { startOfWeek, endOfWeek } = getStartAndEndOfWeek();
            console.log("Start of the week:", startOfWeek.toISOString()); // Sunday
            console.log("End of the week:", endOfWeek.toISOString());
            const daysOfWeek = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ];
            // Perform the aggregation
            const aggregationPipeline = await userModel_1.default.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: startOfWeek,
                            $lt: endOfWeek,
                        },
                    },
                },
                {
                    $group: {
                        _id: {
                            $switch: {
                                branches: [
                                    {
                                        case: { $eq: [{ $dayOfWeek: "$createdAt" }, 1] },
                                        then: "Sunday",
                                    },
                                    {
                                        case: { $eq: [{ $dayOfWeek: "$createdAt" }, 2] },
                                        then: "Monday",
                                    },
                                    {
                                        case: { $eq: [{ $dayOfWeek: "$createdAt" }, 3] },
                                        then: "Tuesday",
                                    },
                                    {
                                        case: { $eq: [{ $dayOfWeek: "$createdAt" }, 4] },
                                        then: "Wednesday",
                                    },
                                    {
                                        case: { $eq: [{ $dayOfWeek: "$createdAt" }, 5] },
                                        then: "Thursday",
                                    },
                                    {
                                        case: { $eq: [{ $dayOfWeek: "$createdAt" }, 6] },
                                        then: "Friday",
                                    },
                                    {
                                        case: { $eq: [{ $dayOfWeek: "$createdAt" }, 7] },
                                        then: "Saturday",
                                    },
                                ],
                                default: "Unknown",
                            },
                        },
                        count: { $sum: 1 },
                    },
                },
            ]);
            // Create a map for faster lookups
            const resultMap = new Map(aggregationPipeline.map((item) => [item._id, item]));
            // Merge results with all days of the week
            const mergedResults = daysOfWeek.map((day) => ({
                _id: day,
                count: (resultMap.get(day) || { count: 0 }).count,
            }));
            console.log("aggregationPipeline:", mergedResults);
            return mergedResults;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    //get user gender data chart details
    const getUserGenderData = async () => {
        try {
            const genders = userModel_1.default.aggregate([
                {
                    $group: {
                        _id: "$gender",
                        count: {
                            $sum: 1,
                        },
                    },
                },
            ]);
            console.log("genders : ", genders);
            return genders;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    //get user age data chart details
    const getUsersAgeData = async () => {
        try {
            const usersAgeData = userModel_1.default.aggregate([
                {
                    $match: {
                        dob: { $exists: true }, // Filter documents with the dob field
                    },
                },
                {
                    $addFields: {
                        dobDate: { $toDate: "$dob" }, // Convert the dob string to a date
                    },
                },
                {
                    $addFields: {
                        dobYear: { $year: { date: "$dobDate", timezone: "UTC" } }, // Extract the year from the DOB
                    },
                },
                {
                    $addFields: {
                        age: { $subtract: [{ $year: new Date() }, "$dobYear"] }, // Calculate the age
                    },
                },
                {
                    $group: {
                        _id: "$age",
                        count: { $sum: 1 }, // Count documents in each age group
                    },
                },
                {
                    $sort: { _id: 1 }, // Sort the results by age
                },
            ]);
            console.log("genders : ", usersAgeData);
            return usersAgeData;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    //to get all users user details for list
    const getallUsersDetails = async () => {
        try {
            const usersList = await userModel_1.default.find({}, {
                name: 1,
                userName: 1,
                phoneNumber: 1,
                email: 1,
                createdAt: 1,
                dp: 1,
                reports: 1,
                isBlock: 1,
            });
            return usersList;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    //to handle blok and unblock user
    const handleBlockUnblockUser = async (userId) => {
        try {
            const userDetails = await userModel_1.default.findOne({
                _id: userId,
            });
            console.log("userDetails :", userDetails);
            if (userDetails !== null && userDetails.isBlock) {
                const unblock = await userModel_1.default.updateOne({ _id: userId }, { $set: { isBlock: false } });
                console.log("unblock 1:", unblock);
                if (unblock.modifiedCount === 1) {
                    return { status: true, state: "unblocked" };
                }
            }
            else {
                const blocked = await userModel_1.default.updateOne({ _id: userId }, { $set: { isBlock: true } });
                console.log("blocked :", blocked);
                if (blocked.modifiedCount === 1) {
                    return { status: true, state: "blocked" };
                }
            }
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    //to get all report of user
    const getUserAllReports = async (userId) => {
        try {
            const userID = new mongoose_1.default.Types.ObjectId(userId);
            const userReports = await userModel_1.default.aggregate([
                {
                    $match: {
                        _id: userID,
                    },
                },
                {
                    $unwind: {
                        path: "$reports",
                    },
                },
                {
                    $project: {
                        reports: 1,
                        userName: 1,
                        name: 1,
                        dp: 1,
                        email: 1,
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "reports.reportedUser",
                        foreignField: "userName",
                        as: "results",
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        userName: {
                            $first: "$userName",
                        },
                        name: {
                            $first: "$name",
                        },
                        dp: {
                            $first: "$dp",
                        },
                        email: {
                            $first: "$email",
                        },
                        reports: {
                            $push: {
                                reportedUserUname: {
                                    $first: "$results.userName",
                                },
                                reportedUserName: {
                                    $first: "$results.name",
                                },
                                dp: {
                                    $first: "$results.dp",
                                },
                                reason: "$reports.report",
                                createdAt: "$reports.createdAt",
                            },
                        },
                    },
                },
            ]);
            return userReports;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    //to get all post list details
    const getallPostDetails = async () => {
        try {
            const allPostsList = await postModel_1.default.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "postedUser",
                        foreignField: "userName",
                        as: "users",
                    },
                },
                {
                    $group: {
                        _id: null,
                        allPosts: {
                            $push: {
                                postId: "$_id",
                                postedUserName: {
                                    $first: "$users.name",
                                },
                                postedUserUName: {
                                    $first: "$users.userName",
                                },
                                postedUserDp: {
                                    $first: "$users.dp",
                                },
                                postedEmail: {
                                    $first: "$users.email",
                                },
                                reports: {
                                    $sum: {
                                        $size: "$reports",
                                    },
                                },
                                isBlocked: "$isBlocked",
                                postContent: "$imgNames",
                                description: "$description",
                                createdAt: "$createdAt",
                                updatedAt: "$updatedAt",
                            },
                        },
                    },
                },
            ]);
            console.log("allPostsList : ", allPostsList[0].allPosts);
            return allPostsList[0].allPosts;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    //to handle blok and unblock post
    const handleBlockUnblockPost = async (postId) => {
        console.log("postId : ", postId);
        try {
            const postDetails = await postModel_1.default.findOne({
                _id: postId,
            });
            console.log("postDetails :", postDetails);
            if (postDetails !== null && postDetails.isBlocked) {
                const unblock = await postModel_1.default.updateOne({ _id: postId }, { $set: { isBlocked: false } });
                console.log("unblock 1:", unblock);
                if (unblock.modifiedCount === 1) {
                    return { status: true, state: "unblocked" };
                }
            }
            else {
                const blocked = await postModel_1.default.updateOne({ _id: postId }, { $set: { isBlocked: true } });
                console.log("blocked :", blocked);
                if (blocked.modifiedCount === 1) {
                    return { status: true, state: "blocked" };
                }
            }
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    //to get all report of user
    const getPostAllReports = async (postId) => {
        try {
            const postID = new mongoose_1.default.Types.ObjectId(postId);
            const PostReports = await postModel_1.default.aggregate([
                {
                    $match: {
                        _id: postID,
                    },
                },
                {
                    $unwind: {
                        path: "$reports",
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "postedUser",
                        foreignField: "userName",
                        as: "users",
                    },
                },
                {
                    $unwind: {
                        path: "$users",
                    },
                },
                {
                    $project: {
                        reports: 1,
                        users: 1,
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "reports.reportedUser",
                        foreignField: "userName",
                        as: "results",
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        userName: {
                            $first: "$users.userName",
                        },
                        name: {
                            $first: "$users.name",
                        },
                        dp: {
                            $first: "$users.dp",
                        },
                        email: {
                            $first: "$users.email",
                        },
                        reports: {
                            $push: {
                                reportedUserUname: {
                                    $first: "$results.userName",
                                },
                                reportedUserName: {
                                    $first: "$results.name",
                                },
                                dp: {
                                    $first: "$results.dp",
                                },
                                reason: "$reports.report",
                                createdAt: "$reports.createdAt",
                            },
                        },
                    },
                },
            ]);
            return PostReports;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    //to get all comments reports
    const getallCommentReports = async () => {
        try {
            const allReportedComments = await commentModel_1.default.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "userName",
                        foreignField: "userName",
                        as: "commenteUsers",
                    },
                },
                {
                    $unwind: {
                        path: "$commenteUsers",
                    },
                },
                {
                    $lookup: {
                        from: "posts",
                        localField: "postId",
                        foreignField: "_id",
                        as: "posts",
                    },
                },
                {
                    $unwind: {
                        path: "$posts",
                    },
                },
                {
                    $unwind: {
                        path: "$reports",
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "posts.postedUser",
                        foreignField: "userName",
                        as: "postedUsers",
                    },
                },
                {
                    $unwind: {
                        path: "$postedUsers",
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "reports.reportedUser",
                        foreignField: "userName",
                        as: "reportedUsers",
                    },
                },
                {
                    $project: {
                        commenteUsers: 1,
                        posts: 1,
                        postedUsers: 1,
                        reports: 1,
                        comment: 1,
                        createdAt: 1,
                        reportedUsers: 1,
                        isBlocked: 1,
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        post: {
                            $first: "$posts.imgNames",
                        },
                        postedUserUname: {
                            $first: "$postedUsers.userName",
                        },
                        postedUserName: {
                            $first: "$postedUsers.name",
                        },
                        postedUserDp: {
                            $first: "$postedUsers.dp",
                        },
                        comment: {
                            $first: "$comment",
                        },
                        commentCreated: {
                            $first: "$createdAt",
                        },
                        commetedUserUname: {
                            $first: "$commenteUsers.userName",
                        },
                        commetedUserName: {
                            $first: "$commenteUsers.name",
                        },
                        commetedUserDp: {
                            $first: "$commenteUsers.dp",
                        },
                        commetedUserEmail: {
                            $first: "$commenteUsers.email",
                        },
                        isBlocked: {
                            $first: "$isBlocked",
                        },
                        reports: {
                            $push: {
                                reportedUserUname: {
                                    $first: "$reportedUsers.userName",
                                },
                                reportedUserName: {
                                    $first: "$reportedUsers.name",
                                },
                                dp: {
                                    $first: "$reportedUsers.dp",
                                },
                                reason: "$reports.report",
                                createdAt: "$reports.createdAt",
                            },
                        },
                    },
                },
            ]);
            return allReportedComments;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    //to handle block or unblock a comment
    const handleBlockUnblockComment = async (commentId) => {
        console.log("commentId : ", commentId);
        try {
            const commnetDetails = await commentModel_1.default.findOne({
                _id: commentId,
            });
            console.log("postDetails :", commnetDetails);
            if (commnetDetails !== null && commnetDetails.isBlocked) {
                const unblock = await commentModel_1.default.updateOne({ _id: commentId }, { $set: { isBlocked: false } });
                console.log("unblock 1:", unblock);
                if (unblock.modifiedCount === 1) {
                    return { status: true, state: "unblocked" };
                }
            }
            else {
                const blocked = await commentModel_1.default.updateOne({ _id: commentId }, { $set: { isBlocked: true } });
                console.log("blocked :", blocked);
                if (blocked.modifiedCount === 1) {
                    return { status: true, state: "blocked" };
                }
            }
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    // to get all reports of replies
    const getallReplyReports = async () => {
        try {
            const allReportedReplies = await commentModel_1.default.aggregate([
                {
                    $unwind: {
                        path: "$reply",
                    },
                },
                {
                    $match: {
                        $expr: {
                            $gt: [
                                {
                                    $size: "$reply.reports",
                                },
                                0,
                            ],
                        },
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "reply.userName",
                        foreignField: "userName",
                        as: "repliedUsers",
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "userName",
                        foreignField: "userName",
                        as: "commenteUsers",
                    },
                },
                {
                    $unwind: {
                        path: "$commenteUsers",
                    },
                },
                {
                    $lookup: {
                        from: "posts",
                        localField: "postId",
                        foreignField: "_id",
                        as: "posts",
                    },
                },
                {
                    $unwind: {
                        path: "$posts",
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "posts.postedUser",
                        foreignField: "userName",
                        as: "postedUsers",
                    },
                },
                {
                    $unwind: {
                        path: "$postedUsers",
                    },
                },
                {
                    $unwind: {
                        path: "$repliedUsers",
                    },
                },
                {
                    $unwind: {
                        path: "$reply.reports",
                    },
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "reply.reports.reportedUser",
                        foreignField: "userName",
                        as: "replyReportedUsers",
                    },
                },
                {
                    $unwind: {
                        path: "$replyReportedUsers",
                    },
                },
                {
                    $project: {
                        commenteUsers: 1,
                        posts: 1,
                        postedUsers: 1,
                        replyReportedUsers: 1,
                        repliedUsers: 1,
                        comment: 1,
                        "reply._id": 1,
                        "reply.isBlocked": 1,
                        "reply.comment": 1,
                        "reply.reports.report": 1,
                        "reply.reports.createdAt": 1,
                    },
                },
                {
                    $group: {
                        _id: "$_id",
                        post: {
                            $first: "$posts.imgNames",
                        },
                        postedUserUname: {
                            $first: "$postedUsers.userName",
                        },
                        postedUserName: {
                            $first: "$postedUsers.name",
                        },
                        postedUserDp: {
                            $first: "$postedUsers.dp",
                        },
                        comment: {
                            $first: "$comment",
                        },
                        commetedUserUname: {
                            $first: "$commenteUsers.userName",
                        },
                        commetedUserName: {
                            $first: "$commenteUsers.name",
                        },
                        commetedUserDp: {
                            $first: "$commenteUsers.dp",
                        },
                        replyId: {
                            $first: "$reply._id",
                        },
                        repliedUserName: {
                            $first: "$repliedUsers.name",
                        },
                        repliedUserUname: {
                            $first: "$repliedUsers.userName",
                        },
                        repliedUserDp: {
                            $first: "$repliedUsers.dp",
                        },
                        repliedUserEmail: {
                            $first: "$repliedUsers.email",
                        },
                        replyCreatedAt: {
                            $first: "$reply.reports.createdAt",
                        },
                        isBlocked: {
                            $first: "$reply.isBlocked",
                        },
                        replyComment: {
                            $first: "$reply.comment",
                        },
                        reports: {
                            $push: {
                                reportedUserUname: "$replyReportedUsers.name",
                                reportedUserName: "$replyReportedUsers.userName",
                                dp: "$replyReportedUsers.dp",
                                reason: "$reply.reports.report",
                                createdAt: "$reply.reports.createdAt",
                            },
                        },
                    },
                },
            ]);
            return allReportedReplies;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    //to handle block or unblock a reply
    const handleBlockUnblockReply = async (commentId, replyId) => {
        console.log("commentId, replyId : ", commentId, replyId);
        try {
            const replyDetails = await commentModel_1.default.findOne({
                _id: commentId,
                "reply._id": replyId,
            }, {
                "reply.$": 1,
                _id: 0,
            });
            console.log("replyDetails :", replyDetails);
            if (replyDetails !== null && replyDetails.reply[0].isBlocked) {
                const unblock = await commentModel_1.default.updateOne({ _id: commentId, "reply._id": replyId }, { $set: { "reply.$.isBlocked": false } });
                console.log("unblock 1:", unblock);
                if (unblock.modifiedCount === 1) {
                    return { status: true, state: "unblocked" };
                }
            }
            else {
                const blocked = await commentModel_1.default.updateOne({ _id: commentId, "reply._id": replyId }, { $set: { "reply.$.isBlocked": true } });
                console.log("blocked :", blocked);
                if (blocked.modifiedCount === 1) {
                    return { status: true, state: "blocked" };
                }
            }
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    // to get all user count for the yearly chart in admin dashboard
    const getyearlyUserCountInfo = async () => {
        try {
            const monthsOfYear = Array.from({ length: 12 }, (_, i) => i + 1); // Array representing months 1 to 12
            const aggregationPipeline = await userModel_1.default.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(new Date().getFullYear(), 0, 1),
                            $lt: new Date(new Date().getFullYear() + 1, 0, 1), // Start of the next year
                        },
                    },
                },
                {
                    $group: {
                        _id: {
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" }, // Extract the month
                        },
                        count: { $sum: 1 }, // Count the number of users in each group
                    },
                },
                {
                    $sort: { "_id.year": 1, "_id.month": 1 }, // Sort the results by year and month
                },
            ]);
            const resultWithZeroCounts = monthsOfYear.map((month) => {
                const matchingMonth = aggregationPipeline.find((item) => item._id.month === month);
                return matchingMonth ? matchingMonth.count : 0;
            });
            console.log("Newly joined users per month in the current year:", 
            // groupedResults,
            resultWithZeroCounts);
            return resultWithZeroCounts;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    // to get all post count for the yearly chart in admin dashboard
    const getyearlyPostCountInfo = async () => {
        try {
            const monthsOfYear = Array.from({ length: 12 }, (_, i) => i + 1); // Array representing months 1 to 12
            const aggregationPipeline = await postModel_1.default.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: new Date(new Date().getFullYear(), 0, 1),
                            $lt: new Date(new Date().getFullYear() + 1, 0, 1), // Start of the next year
                        },
                    },
                },
                {
                    $group: {
                        _id: {
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" }, // Extract the month
                        },
                        count: { $sum: 1 }, // Count the number of users in each group
                    },
                },
                {
                    $sort: { "_id.year": 1, "_id.month": 1 }, // Sort the results by year and month
                },
            ]);
            const resultWithZeroCounts = monthsOfYear.map((month) => {
                const matchingMonth = aggregationPipeline.find((item) => item._id.month === month);
                return matchingMonth ? matchingMonth.count : 0;
            });
            console.log("Newly added post per month in the current year:", 
            // groupedResults,
            resultWithZeroCounts);
            return resultWithZeroCounts;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    };
    return {
        findByProperty,
        adminDashBoardDetails,
        getUserRegperWeekData,
        getUserGenderData,
        getUsersAgeData,
        getallUsersDetails,
        handleBlockUnblockUser,
        getUserAllReports,
        getallPostDetails,
        handleBlockUnblockPost,
        getPostAllReports,
        getallCommentReports,
        handleBlockUnblockComment,
        getallReplyReports,
        handleBlockUnblockReply,
        getyearlyUserCountInfo,
        getyearlyPostCountInfo,
    };
};
exports.adminRepositoryMongoDB = adminRepositoryMongoDB;
