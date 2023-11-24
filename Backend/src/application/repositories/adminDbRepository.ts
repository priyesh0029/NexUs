import { adminTypeRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/adminRepository";


export const adminDbRepository = (
  repository: ReturnType<adminTypeRepositoryMongoDB>
) => {
    const findByProperty = async (params: string) =>
    await repository.findByProperty(params);

    const getDashboard = async () =>
    await repository.adminDashBoardDetails();

    const getUserRegperWeek = async () =>
    await repository.getUserRegperWeekData();

    const getUserGenders = async () =>
    await repository.getUserGenderData();

    const getUserAgeDatas = async () =>
    await repository.getUsersAgeData();

    const getallUserDetails = async () =>
    await repository.getallUsersDetails();

    const toBlokUnblokUser = async (userId:string) =>
    await repository.handleBlockUnblockUser(userId);

    const getUserReports = async (userId:string) =>
    await repository.getUserAllReports(userId);

    const getallPostsDetails = async () =>
    await repository.getallPostDetails();

    const toBlokUnblockPost = async (postId:string) =>
    await repository.handleBlockUnblockPost(postId);

    
    const getPostReports = async (postId:string) =>
    await repository.getPostAllReports(postId);

    const getallReportedComments = async () =>
    await repository.getallCommentReports();

    const toBlokUnblockComment = async (commentId:string) =>
    await repository.handleBlockUnblockComment(commentId);

    const getallReportedReplies = async () =>
    await repository.getallReplyReports();

    const toBlokUnblockReply = async (commentId:string,replyId:string) =>
    await repository.handleBlockUnblockReply(commentId,replyId);

    const getyearlyUserCount = async () =>
    await repository.getyearlyUserCountInfo();

    const getyearlyPostCount = async () =>
    await repository.getyearlyPostCountInfo();


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
    getallReportedReplies,
    toBlokUnblockReply,
    getyearlyUserCount,
    getyearlyPostCount
  };
};

export type adminTypeDbRepository = typeof adminDbRepository;