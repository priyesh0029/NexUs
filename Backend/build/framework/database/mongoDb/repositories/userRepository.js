"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoryMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../models/userModel"));
const postModel_1 = __importDefault(require("../models/postModel"));
const userRepositoryMongoDB = () => {
    const findByProperty = async (params) => {
        console.log("user111111111 : ", params);
        const user = await userModel_1.default.find({
            $or: [{ userName: params }, { email: params }],
        });
        console.log("user : ", user.length);
        return user;
    };
    const findById = async (userId) => {
        console.log("user111111111 : ", userId);
        const userID = new mongoose_1.default.Types.ObjectId(userId);
        const user = await userModel_1.default.find({ _id: userID });
        console.log("user : ", user);
        return user;
    };
    const findByNumber = async (params) => {
        console.log("user111111111 : ", params);
        const user = await userModel_1.default.find({ phoneNumber: params }).select("-password");
        console.log("user : ", user);
        return user;
    };
    const addUser = async (userEntity) => {
        console.log("userEntity : ", userEntity);
        const newUser = new userModel_1.default({
            name: userEntity.getName(),
            userName: userEntity.getUsername(),
            email: userEntity.getEmail(),
            phoneNumber: userEntity.getNumber(),
            password: userEntity.getPassword(),
        });
        const user = await newUser.save();
        console.log("user register complete :", user);
        return user;
    };
    //upload dp of user
    const uploadDp = async (user, filename) => {
        const newDp = await userModel_1.default.findOneAndUpdate({ userName: user }, { $set: { dp: filename } }, { new: true });
        if (newDp !== null) {
            console.log("user postedReply complete :", newDp);
            return newDp.dp;
        }
        else {
            return false;
        }
    };
    //search user by char
    const searchUserbyChar = async (user, userId) => {
        console.log("search cahr : ", user);
        const userID = new mongoose_1.default.Types.ObjectId(userId);
        const userDetails = await userModel_1.default.findOne({ _id: userID }, { _id: 0, userName: 1 });
        if (userDetails !== null) {
            const users = await userModel_1.default.find({
                $and: [
                    { userName: { $regex: user, $options: "i" } },
                    { userName: { $ne: userDetails.userName } }
                ]
            });
            console.log("users search using regex : ", users);
            return users;
        }
    };
    //to get usersList
    const getUsersList = async (user) => {
        const userDetails = await userModel_1.default.findOne({ userName: user }, { _id: 0, following: 1 });
        if (userDetails !== null) {
            userDetails.following.push(user);
            console.log("00000000000000000000000000000000000000000000000", userDetails.following);
            const users = await userModel_1.default.find({
                userName: { $exists: true, $nin: userDetails.following },
            }, { userName: 1, dp: 1 }).limit(5);
            console.log("getUsersList from database : ", users);
            return users;
        }
    };
    //handle follow unfollow requests
    const handleFollowUnfollow = async (searchedUser, loginedUser) => {
        const followerList = await userModel_1.default.findOne({
            userName: searchedUser,
            followers: { $elemMatch: { $eq: loginedUser } },
        });
        console.log("followers :", followerList);
        if (followerList) {
            const [unfollow, unfollowing] = await Promise.all([
                userModel_1.default.updateOne({ userName: searchedUser }, { $pull: { followers: loginedUser } }),
                userModel_1.default.updateOne({ userName: loginedUser }, { $pull: { following: searchedUser } }),
            ]);
            console.log("unfollow 1:", unfollow, "unfollowing : ", unfollowing);
            if (unfollow.modifiedCount === 1 && unfollowing.modifiedCount === 1) {
                return { status: true, user: loginedUser, state: "removed" };
            }
        }
        else {
            const [follow, following] = await Promise.all([
                userModel_1.default.updateOne({ userName: searchedUser }, { $push: { followers: loginedUser } }),
                userModel_1.default.updateOne({ userName: loginedUser }, { $push: { following: searchedUser } }),
            ]);
            console.log("follow 2 :", follow, "following : ", following);
            if (follow.modifiedCount === 1 && following.modifiedCount === 1) {
                return { status: true, user: loginedUser, state: "added" };
            }
        }
        return false; // Return false if the update operation didn't succeed
    };
    //to handle save post
    const handlePostSave = async (postId, userId) => {
        const userID = new mongoose_1.default.Types.ObjectId(userId);
        const saved = await userModel_1.default.findOne({
            _id: userID,
            savedPost: { $elemMatch: { $eq: postId } },
        });
        console.log("liked :", saved);
        if (saved) {
            const unSave = await userModel_1.default.findOneAndUpdate({ _id: userID }, { $pull: { savedPost: postId } }, { new: true, projection: { savedPost: 1, _id: 0 } });
            console.log("unSave 1:", unSave);
            if (unSave !== null) {
                return { status: true, postId: unSave.savedPost };
            }
        }
        else {
            const save = await userModel_1.default.findOneAndUpdate({ _id: userID }, { $push: { savedPost: postId } }, { new: true, projection: { savedPost: 1, _id: 0 } });
            console.log("save 2 :", save);
            if (save !== null) {
                return { status: true, postId: save.savedPost };
            }
        }
        return false; // Return false if the update operation didn't succeed
    };
    //to amend the gender of user
    const handleChangeGender = async (gender, userId) => {
        const userID = new mongoose_1.default.Types.ObjectId(userId);
        const updateGender = await userModel_1.default.updateOne({ _id: userID }, { $set: { gender: gender } });
        if (updateGender.modifiedCount === 1) {
            return true;
        }
        else {
            return false;
        }
    };
    //to handle Profile Update
    const handleProfileUpdate = async (name, bio, userId) => {
        const userID = new mongoose_1.default.Types.ObjectId(userId);
        const updateGender = await userModel_1.default.updateOne({ _id: userID }, { $set: { name: name, bio: bio } });
        if (updateGender.modifiedCount === 1) {
            return true;
        }
        else {
            return false;
        }
    };
    //to handle Change Password
    const handleChangePassword = async (userId, password) => {
        const userID = new mongoose_1.default.Types.ObjectId(userId);
        const updatePassword = await userModel_1.default.updateOne({ _id: userID }, { $set: { password: password } });
        if (updatePassword.modifiedCount === 1) {
            return true;
        }
        return false;
    };
    //to handle account deactivation
    const handleAccountDeactivate = async (userId) => {
        const userID = new mongoose_1.default.Types.ObjectId(userId);
        const deactivated = await userModel_1.default.updateOne({ _id: userID }, { $set: { accountDeactive: true } });
        if (deactivated.modifiedCount === 1) {
            return true;
        }
        return false;
    };
    //to handle account activation
    const handleAccountActivate = async (username) => {
        const deactivated = await userModel_1.default.updateOne({ userName: username }, { $set: { accountDeactive: false } });
        if (deactivated.modifiedCount === 1) {
            return true;
        }
        return false;
    };
    //to handle account deletion
    const handleAccountDelete = async (userId) => {
        const userID = new mongoose_1.default.Types.ObjectId(userId);
        const userDetails = await userModel_1.default.findOne({ _id: userID }, { _id: 0, userName: 1 });
        if (userDetails !== null) {
            const [userDeleteResult, postsDeleteResult] = await Promise.all([
                userModel_1.default.deleteOne({ userName: userDetails.userName }),
                postModel_1.default.deleteMany({ postedUser: userDetails.userName }),
            ]);
            console.log("handleAccountDelete mongo query : ", userDeleteResult, postsDeleteResult);
            if (userDeleteResult.deletedCount === 1 &&
                postsDeleteResult.deletedCount >= 0) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    };
    //to report a user 
    const userReportDb = async (loggedUser, reportComment, userId) => {
        const user = await userModel_1.default.findOne({ _id: loggedUser }, { _id: 0, userName: 1 });
        if (user !== null) {
            const reportObj = {
                reportedUser: user.userName,
                report: reportComment,
            };
            const checkReport = await userModel_1.default.findOne({
                _id: userId,
                reports: {
                    $elemMatch: {
                        reportedUser: user.userName,
                        report: reportComment,
                    },
                },
            });
            if (checkReport === null) {
                const updatedReport = await userModel_1.default.updateOne({ _id: userId }, { $push: { reports: reportObj } });
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
        findByProperty,
        findById,
        findByNumber,
        addUser,
        uploadDp,
        searchUserbyChar,
        getUsersList,
        handleFollowUnfollow,
        handlePostSave,
        handleChangeGender,
        handleProfileUpdate,
        handleChangePassword,
        handleAccountDeactivate,
        handleAccountDelete,
        handleAccountActivate,
        userReportDb
    };
};
exports.userRepositoryMongoDB = userRepositoryMongoDB;
