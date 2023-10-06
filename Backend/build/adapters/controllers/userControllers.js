"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const user_1 = require("../../application/useCases/user/user");
const appError_1 = __importDefault(require("../../utilities/appError"));
const httpStatus_1 = require("../../types/httpStatus");
const userControllers = (userDbRepo, userDbRepoImpl, authServiceInterfaceApp, authService) => {
    const postRepo = userDbRepo(userDbRepoImpl());
    const authServices = authServiceInterfaceApp(authService());
    //change profile picture of user
    const changedp = (0, express_async_handler_1.default)(async (req, res) => {
        const media = req?.file;
        const user = req.body.userName;
        let filename;
        if (media !== undefined &&
            media !== null &&
            typeof media.filename === "string") {
            filename = media.filename;
            console.log("contollers like profilr photo : ", user, filename);
            await (0, user_1.postDp)(user, filename, postRepo).then((dp) => {
                console.log("contollers new  post response : ", dp);
                res.status(200).json({
                    status: "success",
                    dp,
                });
            });
        }
        else {
            throw new appError_1.default("Error occured while uploading profile picture.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to find user by username
    const getUser = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.params.user;
        console.log("user by username : ", user);
        await (0, user_1.findUser)(user, postRepo).then((user) => {
            console.log("contollers new  post response : ", user);
            res.status(200).json({
                status: "success",
                user,
            });
        });
    });
    //to search all users
    const searchUser = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.query.user;
        const userId = req.query.userId;
        console.log("user by username : ", user);
        if (typeof user === "string" && typeof userId === "string") {
            await (0, user_1.userSearch)(user, userId, postRepo).then((users) => {
                console.log("contollers search user response : ", users);
                res.status(200).json({
                    status: "success",
                    users,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while searching user .try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to get userslist
    const getUsersList = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.query.user;
        if (typeof user === "string") {
            await (0, user_1.usersList)(user, postRepo).then((users) => {
                console.log("contollers search userslist response  1111111222222222222222222222222222222: ", users);
                res.status(200).json({
                    status: "success",
                    users,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while fetching userslist.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to handle follow unfollow requests
    const handleFollows = (0, express_async_handler_1.default)(async (req, res) => {
        const users = req.body;
        console.log("contollers search handleFollows req.body.users: ", users);
        const searchedUser = users.searchedUser;
        const loginedUser = users.loginedUser;
        if (typeof searchedUser === "string" && typeof loginedUser === "string") {
            await (0, user_1.followHandle)(searchedUser, loginedUser, postRepo).then((users) => {
                console.log("contollers search userslist response  1111111222222222222222222222222222222: ", users);
                res.status(200).json({
                    status: "success",
                    users,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while handling follow unfollow requests.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to handle save post
    const savePost = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId } = req.body;
        const userId = req.query.userId;
        console.log("contollers save post postDetails : ", postId, userId);
        if (typeof postId === "string" && typeof userId === "string") {
            await (0, user_1.savePostHandle)(postId, userId, postRepo).then((savedPost) => {
                console.log("contollers all post response : ", savedPost);
                res.status(200).json({
                    status: "success",
                    savedPost,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while saving post.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to amend gender
    const changeGender = (0, express_async_handler_1.default)(async (req, res) => {
        const { gender } = req.body;
        const userId = req.query.userId;
        console.log("contollers change Gender : ", gender, userId);
        if (typeof gender === "string" && typeof userId === "string") {
            await (0, user_1.amendGender)(gender, userId, postRepo).then((gender) => {
                console.log("contollers gender response  1111111222222222222222222222222222222: ", gender);
                res.status(200).json({
                    status: "success",
                    gender,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while changing gender.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //update profile
    const updateProfile = (0, express_async_handler_1.default)(async (req, res) => {
        const { name, bio } = req.body.userData;
        const userId = req.query.userId;
        console.log("contollersupdateProfile : ", req.body.userData);
        if (typeof name === "string" && typeof bio === "string" && typeof userId === "string") {
            await (0, user_1.updateProfileHandle)(name, bio, userId, postRepo).then((profileupdate) => {
                console.log("contollers gender response  1111111222222222222222222222222222222: ", profileupdate);
                res.status(200).json({
                    status: "success",
                    profileupdate,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while updating profile.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //check password
    const checkPassword = (0, express_async_handler_1.default)(async (req, res) => {
        const { password } = req.body;
        const userId = req.query.userId;
        console.log("contollersupdateProfile : ", password);
        if (typeof password === "string" && typeof userId === "string") {
            await (0, user_1.handleCheckPassword)(password, userId, postRepo, authServices).then((password) => {
                console.log("contollers gender response  1111111222222222222222222222222222222: ", password);
                res.status(200).json({
                    status: "success",
                    password,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while updating profile.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //set new password
    const newPassword = (0, express_async_handler_1.default)(async (req, res) => {
        const { password } = req.body;
        const userId = req.query.userId;
        console.log("contollersupdateProfile : ", password);
        if (typeof password === "string" && typeof userId === "string") {
            await (0, user_1.handleNewPassword)(password, userId, postRepo, authServices).then((password) => {
                console.log("contollers gender response  1111111222222222222222222222222222222: ", password);
                res.status(200).json({
                    status: "success",
                    password,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while updating profile.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //deactivateAccount
    const deactivateAccount = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.query.userId;
        if (typeof userId === "string") {
            await (0, user_1.handleDeactivateAccount)(userId, postRepo).then((deactivate) => {
                console.log("contollers gender response  1111111222222222222222222222222222222: ", deactivate);
                res.status(200).json({
                    status: "success",
                    deactivate,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while deactivating account.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //deleteAccount
    const deleteAccount = (0, express_async_handler_1.default)(async (req, res) => {
        const userId = req.query.userId;
        if (typeof userId === "string") {
            await (0, user_1.handleDeleteAccount)(userId, postRepo).then((deleted) => {
                console.log("contollers gender response  1111111222222222222222222222222222222: ", deleted);
                res.status(200).json({
                    status: "success",
                    deleted,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while deactivating account.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    //to report a user
    const reportUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId, report } = req.body;
        const loggedUser = req.query.userId;
        console.log("contollers report comment : ", report, userId, loggedUser);
        if (typeof loggedUser === "string" &&
            typeof report === "string" &&
            typeof userId === "string") {
            await (0, user_1.handleReportUser)(loggedUser, report, userId, postRepo).then((reported) => {
                console.log("contollers report comment response : ", reported);
                res.status(200).json({
                    status: "success",
                    reported,
                });
            });
        }
        else {
            throw new appError_1.default(` Error while reporting the user.try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
    });
    return {
        changedp,
        getUser,
        searchUser,
        getUsersList,
        handleFollows,
        savePost,
        changeGender,
        updateProfile,
        checkPassword,
        newPassword,
        deactivateAccount,
        deleteAccount,
        reportUser
    };
};
exports.userControllers = userControllers;
