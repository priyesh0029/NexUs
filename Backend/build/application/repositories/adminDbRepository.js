"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDbRepository = void 0;
const adminDbRepository = (repository) => {
    const findByProperty = async (params) => await repository.findByProperty(params);
    const getDashboard = async () => await repository.adminDashBoardDetails();
    const getUserRegperWeek = async () => await repository.getUserRegperWeekData();
    const getUserGenders = async () => await repository.getUserGenderData();
    const getUserAgeDatas = async () => await repository.getUsersAgeData();
    const getallUserDetails = async () => await repository.getallUsersDetails();
    const toBlokUnblokUser = async (userId) => await repository.handleBlockUnblockUser(userId);
    const getUserReports = async (userId) => await repository.getUserAllReports(userId);
    const getallPostsDetails = async () => await repository.getallPostDetails();
    const toBlokUnblockPost = async (postId) => await repository.handleBlockUnblockPost(postId);
    const getPostReports = async (postId) => await repository.getPostAllReports(postId);
    const getallReportedComments = async () => await repository.getallCommentReports();
    const toBlokUnblockComment = async (commentId) => await repository.handleBlockUnblockComment(commentId);
    const getallReportedReplies = async () => await repository.getallReplyReports();
    return {
        findByProperty,
        getDashboard,
        getUserRegperWeek,
        getUserGenders,
        getUserAgeDatas,
        getallUserDetails,
        toBlokUnblokUser,
        getUserReports,
        getallPostsDetails,
        toBlokUnblockPost,
        getPostReports,
        getallReportedComments,
        toBlokUnblockComment,
        getallReportedReplies
    };
};
exports.adminDbRepository = adminDbRepository;
