"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDbRepository = void 0;
const userDbRepository = (repository) => {
    const findByProperty = async (params) => await repository.findByProperty(params);
    const findById = async (userId) => await repository.findById(userId);
    const findByNumber = async (params) => await repository.findByNumber(params);
    const RegisterUser = async (userEntity) => await repository.addUser(userEntity);
    const uploadDp = async (user, filename) => await repository.uploadDp(user, filename);
    const searchUserbyChar = async (user, userId) => await repository.searchUserbyChar(user, userId);
    const getUsersList = async (user) => await repository.getUsersList(user);
    const handleFollowUnfollow = async (searchedUser, userId) => await repository.handleFollowUnfollow(searchedUser, userId);
    //to handle save post
    const handleSavePost = async (postId, userId) => await repository.handlePostSave(postId, userId);
    //to handle xcahnge gender
    const genderAmend = async (gender, userId) => await repository.handleChangeGender(gender, userId);
    //to handle update profile
    const handleUpdateProfile = async (name, bio, userId) => await repository.handleProfileUpdate(name, bio, userId);
    //to change password
    const changePassword = async (userId, password) => await repository.handleChangePassword(userId, password);
    //to deactivateAccount
    const deactivateAccount = async (userId) => await repository.handleAccountDeactivate(userId);
    //to activate Account
    const activateAccount = async (username) => await repository.handleAccountActivate(username);
    //to delete Account
    const deleteAccount = async (userId) => await repository.handleAccountDelete(userId);
    //to Handle report User 
    const reportUserHandle = async (loggedUser, report, userId) => await repository.userReportDb(loggedUser, report, userId);
    return {
        findByProperty,
        findById,
        findByNumber,
        RegisterUser,
        uploadDp,
        searchUserbyChar,
        getUsersList,
        handleFollowUnfollow,
        handleSavePost,
        genderAmend,
        handleUpdateProfile,
        changePassword,
        deactivateAccount,
        activateAccount,
        deleteAccount,
        reportUserHandle
    };
};
exports.userDbRepository = userDbRepository;
