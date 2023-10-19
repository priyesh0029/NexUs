"use strict";
//userLogin
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlemanageCommentStatus = exports.handlegetallReportedCommets = exports.handlegetReportsOfPost = exports.handlemanagePostStatus = exports.handlegetPostListDetails = exports.handlegetReportsOfUser = exports.handleBlockUser = exports.handlegetusersListDetails = exports.handlegetAges = exports.handlegetGenders = exports.handleUserRegperWeek = exports.adminDashboard = exports.loginAdmin = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utilities/appError"));
const loginAdmin = async (adminData, adminRepository, authService) => {
    const { username, password } = adminData;
    console.log("admindata inn admin usecase :", adminData);
    return await adminRepository.findByProperty(username).then((admin) => {
        if (admin.length === 0) {
            throw new appError_1.default(`username or e-mail is incorrect.try again..!`, httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        return authService
            .comparePassword(password, admin[0].password)
            .then(async (status) => {
            if (!status) {
                throw new appError_1.default(`Incorrect password.try again!`, httpStatus_1.HttpStatus.UNAUTHORIZED);
            }
            else {
                return {
                    token: await authService.generateToken({ id: admin[0]._id, role: "admin" }),
                    admin,
                };
            }
        });
    });
};
exports.loginAdmin = loginAdmin;
const adminDashboard = async (adminRepository) => {
    return await adminRepository.getDashboard().then((dashboard) => {
        if (!dashboard) {
            throw new appError_1.default("Error occured while loading dashboard.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return dashboard;
    });
};
exports.adminDashboard = adminDashboard;
const handleUserRegperWeek = async (adminRepository) => {
    return await adminRepository.getUserRegperWeek().then((userRegperweekResults) => {
        if (!userRegperweekResults) {
            throw new appError_1.default("Error occured while loading user Registration per week chart.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return userRegperweekResults;
    });
};
exports.handleUserRegperWeek = handleUserRegperWeek;
const handlegetGenders = async (adminRepository) => {
    return await adminRepository.getUserGenders().then((genders) => {
        if (!genders) {
            throw new appError_1.default("Error occured fetching genders chart.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return genders;
    });
};
exports.handlegetGenders = handlegetGenders;
//to get users age data
const handlegetAges = async (adminRepository) => {
    return await adminRepository.getUserAgeDatas().then((ageData) => {
        if (!ageData) {
            throw new appError_1.default("Error occured fetching genders chart.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return ageData;
    });
};
exports.handlegetAges = handlegetAges;
//to get all users list details
const handlegetusersListDetails = async (adminRepository) => {
    return await adminRepository.getallUserDetails().then((allusersDetails) => {
        if (!allusersDetails) {
            throw new appError_1.default("Error occured fetching users list.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return allusersDetails;
    });
};
exports.handlegetusersListDetails = handlegetusersListDetails;
//to block a user
const handleBlockUser = async (userId, adminRepository) => {
    return await adminRepository.toBlokUnblokUser(userId).then((blockResponse) => {
        if (!blockResponse) {
            throw new appError_1.default("Error occured while block or unblock user.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return blockResponse;
    });
};
exports.handleBlockUser = handleBlockUser;
//to get all reports of user
const handlegetReportsOfUser = async (userId, adminRepository) => {
    return await adminRepository.getUserReports(userId).then((userReports) => {
        if (!userReports) {
            throw new appError_1.default("Error occured while fetching user reports.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return userReports;
    });
};
exports.handlegetReportsOfUser = handlegetReportsOfUser;
//to get all posts list details
const handlegetPostListDetails = async (adminRepository) => {
    return await adminRepository.getallPostsDetails().then((allPostsDetails) => {
        if (!allPostsDetails) {
            throw new appError_1.default("Error occured fetching all posts.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return allPostsDetails;
    });
};
exports.handlegetPostListDetails = handlegetPostListDetails;
//to manage post  active inactive status
const handlemanagePostStatus = async (postId, adminRepository) => {
    return await adminRepository.toBlokUnblockPost(postId).then((blockResponse) => {
        if (!blockResponse) {
            throw new appError_1.default("Error occured while block or unblock post.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return blockResponse;
    });
};
exports.handlemanagePostStatus = handlemanagePostStatus;
//to get all reports of post
const handlegetReportsOfPost = async (postId, adminRepository) => {
    return await adminRepository.getPostReports(postId).then((postReports) => {
        if (!postReports) {
            throw new appError_1.default("Error occured while fetching user reports.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return postReports;
    });
};
exports.handlegetReportsOfPost = handlegetReportsOfPost;
//to get all reported comments
const handlegetallReportedCommets = async (adminRepository) => {
    return await adminRepository.getallReportedComments().then((allReportedComments) => {
        if (!allReportedComments) {
            throw new appError_1.default("Error occured fetching all posts.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return allReportedComments;
    });
};
exports.handlegetallReportedCommets = handlegetallReportedCommets;
//to manage commnet  active inactive status
const handlemanageCommentStatus = async (commentId, adminRepository) => {
    return await adminRepository.toBlokUnblockComment(commentId).then((blockResponse) => {
        if (!blockResponse) {
            throw new appError_1.default("Error occured while block or unblock post.try again..!", httpStatus_1.HttpStatus.BAD_REQUEST);
        }
        return blockResponse;
    });
};
exports.handlemanageCommentStatus = handlemanageCommentStatus;
