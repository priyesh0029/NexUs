"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReportUser = exports.handleDeleteAccount = exports.handleDeactivateAccount = exports.handleNewPassword = exports.handleCheckPassword = exports.updateProfileHandle = exports.amendGender = exports.savePostHandle = exports.followHandle = exports.usersList = exports.userSearch = exports.findUser = exports.postDp = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utilities/appError"));
const postDp = async (user, filename, repository) => {
    return await repository.uploadDp(user, filename).then((response) => {
        if (!response) {
            throw new appError_1.default("Error occured while uploading profile picture.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.postDp = postDp;
const findUser = async (user, repository) => {
    return await repository.findByProperty(user).then((response) => {
        if (!response) {
            throw new appError_1.default("Error occured while loading thiis page.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.findUser = findUser;
const userSearch = async (user, userId, repository) => {
    return await repository.searchUserbyChar(user, userId).then((response) => {
        if (!response) {
            throw new appError_1.default("Error occured while searching users.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.userSearch = userSearch;
//to get users list
const usersList = async (user, repository) => {
    return await repository.getUsersList(user).then((response) => {
        if (!response) {
            throw new appError_1.default("Error occured while loading users.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.usersList = usersList;
//to handle follow unfollow requests
const followHandle = async (searchedUser, loginedUser, repository) => {
    return await repository
        .handleFollowUnfollow(searchedUser, loginedUser)
        .then((response) => {
        if (!response) {
            throw new appError_1.default("Error occured while loading users.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.followHandle = followHandle;
//to handle save post
const savePostHandle = async (postId, userId, repository) => {
    return await repository.handleSavePost(postId, userId).then((response) => {
        if (!response) {
            throw new appError_1.default(` Error occured while saving post.please try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.savePostHandle = savePostHandle;
//to handle save post
const amendGender = async (gender, userId, repository) => {
    return await repository.genderAmend(gender, userId).then((response) => {
        if (!response) {
            throw new appError_1.default(` Error occured while saving post.please try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.amendGender = amendGender;
//to handle update Profile
const updateProfileHandle = async (name, bio, dob, userId, repository) => {
    return await repository
        .handleUpdateProfile(name, bio, dob, userId)
        .then((response) => {
        if (!response) {
            throw new appError_1.default(` Error occured while saving post.please try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.updateProfileHandle = updateProfileHandle;
// to handleCheckPassword
const handleCheckPassword = async (password, userId, repository, authService) => {
    return await repository.findById(userId).then((user) => {
        console.log("login details of user :", user[0].password);
        if (user.length === 0) {
            throw new appError_1.default(`passwor validation failed.try again after login ...`, httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        return authService
            .comparePassword(password, user[0].password)
            .then(async (status) => {
            if (!status) {
                throw new appError_1.default(`Incorrect password.try again!`, httpStatus_1.HttpStatus.UNAUTHORIZED);
            }
            return status;
        });
    });
};
exports.handleCheckPassword = handleCheckPassword;
// to handleCheckPassword
const handleNewPassword = async (password, userId, repository, authService) => {
    return await authService.encryptPassword(password).then(async (password) => {
        if (password.length === 0) {
            throw new appError_1.default(`something went wrong.try again..`, httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        return await repository.changePassword(userId, password).then((response) => {
            if (!response) {
                throw new appError_1.default(`something went wrong.try again..`, httpStatus_1.HttpStatus.UNAUTHORIZED);
            }
            console.log("changePassword: ", response);
            return response;
        });
    });
};
exports.handleNewPassword = handleNewPassword;
//to handle deactivate account
const handleDeactivateAccount = async (userId, repository) => {
    return await repository.deactivateAccount(userId).then((response) => {
        if (!response) {
            throw new appError_1.default(`something went wrong while deactivating account.try again..`, httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        console.log("deactivateAccount: ", response);
        return response;
    });
};
exports.handleDeactivateAccount = handleDeactivateAccount;
//to handle delete Account
const handleDeleteAccount = async (userId, repository) => {
    return await repository.deleteAccount(userId).then((response) => {
        if (!response) {
            throw new appError_1.default(`something went wrong while deleting account.try again..`, httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        console.log("deactivateAccount: ", response);
        return response;
    });
};
exports.handleDeleteAccount = handleDeleteAccount;
//to report a user 
const handleReportUser = async (loggedUser, report, userId, repository) => {
    return await repository.reportUserHandle(loggedUser, report, userId).then((response) => {
        if (!response) {
            throw new appError_1.default(` Error occured while reporting user.please try again..!`, httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        else {
            return response;
        }
    });
};
exports.handleReportUser = handleReportUser;
