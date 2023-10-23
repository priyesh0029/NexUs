"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthControllers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const adminAuths_1 = require("../../application/useCases/admin/adminAuths");
const appError_1 = __importDefault(require("../../utilities/appError"));
const httpStatus_1 = require("../../types/httpStatus");
const adminAuthControllers = (authServiceInterfaceApp, authService, adminDbRepo, adminDbRepoImpl) => {
    const adminRepoDb = adminDbRepo(adminDbRepoImpl());
    const authServices = authServiceInterfaceApp(authService());
    //AdminLogin
    const getAdminLogin = (0, express_async_handler_1.default)(async (req, res) => {
        const admin = req.body;
        console.log("admindata i n controllers :", admin);
        await (0, adminAuths_1.loginAdmin)(admin, adminRepoDb, authServices).then((adminDetails) => {
            console.log("response", adminDetails);
            res.json({
                status: "success",
                message: "admin loggedin successfully",
                adminDetails: adminDetails
            });
        });
    });
    const getAdminDashboard = (0, express_async_handler_1.default)(async (req, res) => {
        await (0, adminAuths_1.adminDashboard)(adminRepoDb).then((dashBoardInfos) => {
            console.log("response", dashBoardInfos);
            res.json({
                status: "success",
                message: "admin loggedin successfully",
                dashBoardInfos: dashBoardInfos
            });
        });
    });
    const getUserRegPerWeeek = (0, express_async_handler_1.default)(async (req, res) => {
        await (0, adminAuths_1.handleUserRegperWeek)(adminRepoDb).then((userRegperWeek) => {
            console.log("response", userRegperWeek);
            res.json({
                status: "success",
                message: "got user registation per week successfully",
                userRegperWeek: userRegperWeek
            });
        });
    });
    const getGenders = (0, express_async_handler_1.default)(async (req, res) => {
        await (0, adminAuths_1.handlegetGenders)(adminRepoDb).then((genders) => {
            console.log("response", genders);
            res.json({
                status: "success",
                message: "get all genders successfully",
                genders: genders
            });
        });
    });
    //to get users age graph
    const getUserAgeGraph = (0, express_async_handler_1.default)(async (req, res) => {
        await (0, adminAuths_1.handlegetAges)(adminRepoDb).then((ageData) => {
            console.log("response", ageData);
            res.json({
                status: "success",
                message: "get all genders successfully",
                ageData: ageData
            });
        });
    });
    //to get all users list details
    const getusersListDetails = (0, express_async_handler_1.default)(async (req, res) => {
        await (0, adminAuths_1.handlegetusersListDetails)(adminRepoDb).then((allUsersList) => {
            console.log("response", allUsersList);
            res.json({
                status: "success",
                message: "get all genders successfully",
                allUsersList: allUsersList
            });
        });
    });
    //to block aad unblock user 
    const blocUnblockUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId } = req.body;
        await (0, adminAuths_1.handleBlockUser)(userId, adminRepoDb).then((blockStatus) => {
            console.log("response", blockStatus);
            res.json({
                status: "success",
                message: "block/unblock successfull",
                blockStatus: blockStatus
            });
        });
    });
    //to get all reports of a user 
    const getReportsOfUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId } = req.query;
        if (typeof userId === 'string') {
            await (0, adminAuths_1.handlegetReportsOfUser)(userId, adminRepoDb).then((allReports) => {
                console.log("response", allReports);
                res.json({
                    status: "success",
                    message: "block/unblock successfull",
                    allReports: allReports
                });
            });
        }
        else {
            throw new appError_1.default(` Error while fetching user reports .try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to get all post list details
    const getPostListDetails = (0, express_async_handler_1.default)(async (req, res) => {
        await (0, adminAuths_1.handlegetPostListDetails)(adminRepoDb).then((allPostsList) => {
            console.log("response", allPostsList);
            res.json({
                status: "success",
                message: "get all genders successfully",
                allPostsList: allPostsList
            });
        });
    });
    //to block and unblock post 
    const managePostStatus = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId } = req.body;
        await (0, adminAuths_1.handlemanagePostStatus)(postId, adminRepoDb).then((postStatus) => {
            console.log("response", postStatus);
            res.json({
                status: "success",
                message: "block/unblock successfull",
                postStatus: postStatus
            });
        });
    });
    //to get all reports of a post 
    const getReportsOfPost = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId } = req.query;
        if (typeof postId === 'string') {
            await (0, adminAuths_1.handlegetReportsOfPost)(postId, adminRepoDb).then((allReports) => {
                console.log("response", allReports);
                res.json({
                    status: "success",
                    message: "block/unblock successfull",
                    allReports: allReports
                });
            });
        }
        else {
            throw new appError_1.default(` Error while fetching user reports .try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to get all reported comments
    const getReportedComments = (0, express_async_handler_1.default)(async (req, res) => {
        await (0, adminAuths_1.handlegetallReportedCommets)(adminRepoDb).then((allReportedCommets) => {
            console.log("response", allReportedCommets);
            res.json({
                status: "success",
                message: "get all genders successfully",
                allReportedCommets: allReportedCommets
            });
        });
    });
    //to block and unblock commnet 
    const manageCommnetStatus = (0, express_async_handler_1.default)(async (req, res) => {
        const { commentId } = req.body;
        await (0, adminAuths_1.handlemanageCommentStatus)(commentId, adminRepoDb).then((commentStatus) => {
            console.log("response", commentStatus);
            res.json({
                status: "success",
                message: "block/unblock successfull",
                commentStatus: commentStatus
            });
        });
    });
    //to get all reported replies
    const getAllRepliesReport = (0, express_async_handler_1.default)(async (req, res) => {
        await (0, adminAuths_1.handlegetallReportedReplies)(adminRepoDb).then((allReportedReplies) => {
            console.log("response", allReportedReplies);
            res.json({
                status: "success",
                message: "get all genders successfully",
                allReportedReplies: allReportedReplies
            });
        });
    });
    return {
        getAdminLogin,
        getAdminDashboard,
        getUserRegPerWeeek,
        getGenders,
        getUserAgeGraph,
        getusersListDetails,
        blocUnblockUser,
        getReportsOfUser,
        getPostListDetails,
        managePostStatus,
        getReportsOfPost,
        getReportedComments,
        manageCommnetStatus,
        getAllRepliesReport
    };
};
exports.adminAuthControllers = adminAuthControllers;
