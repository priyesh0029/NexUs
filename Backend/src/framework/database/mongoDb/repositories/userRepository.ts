import mongoose from "mongoose";
import User from "../models/userModel";

export const userRepositoryMongoDB = () => {
  const findByProperty = async (params: string) => {
    console.log("user111111111 : ", params);
    const user: any = await User.find({
      $or: [{ userName: params }, { email: params }],
    });
    console.log("user : ", user);
    return user;
  };

  const findByNumber = async (params: string) => {
    console.log("user111111111 : ", params);
    const user: any = await User.find({ phoneNumber: params }).select(
      "-password"
    );
    console.log("user : ", user);
    return user;
  };

  const addUser = async (userEntity: any) => {
    console.log("userEntity : ", userEntity);

    const newUser = new User({
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

  const uploadDp = async (user: string, filename: string) => {
    const newDp = await User.findOneAndUpdate(
      { userName: user },
      { $set: { dp: filename } },
      { new: true }
    );

    if (newDp !== null) {
      console.log("user postedReply complete :", newDp);
      return newDp.dp;
    } else {
      return false;
    }
  };

  //search user by char

  const searchUserbyChar = async (user: string) => {
    console.log("search cahr : ", user);

    const users = await User.find({
      userName: { $regex: user, $options: "i" },
    });
    console.log("users search using regex : ", users);

    return users;
  };

  //to get usersList
  const getUsersList = async (user: string) => {
    const userDetails = await User.findOne(
      { userName: user },
      { _id: 0, following: 1 }
    );
    if (userDetails !== null) {
      userDetails.following.push(user);

      console.log(
        "00000000000000000000000000000000000000000000000",
        userDetails.following
      );

      const users = await User.find(
        {
          userName: { $exists: true, $nin: userDetails.following },
        },
        { userName: 1, dp: 1 }
      ).limit(5);
      console.log("getUsersList from database : ", users);

      return users;
    }
  };

  //handle follow unfollow requests

  const handleFollowUnfollow = async (
    searchedUser: string,
    loginedUser: string
  ) => {
    const followerList = await User.findOne({
      userName: searchedUser,
      followers: { $elemMatch: { $eq: loginedUser } },
    });

    console.log("followers :", followerList);

    if (followerList) {
      const [unfollow, unfollowing] = await Promise.all([
        User.updateOne(
          { userName: searchedUser },
          { $pull: { followers: loginedUser } }
        ),
        User.updateOne(
          { userName: loginedUser },
          { $pull: { following: searchedUser } }
        ),
      ]);

      console.log("unfollow 1:", unfollow, "unfollowing : ", unfollowing);

      if (unfollow.modifiedCount === 1 && unfollowing.modifiedCount === 1) {
        return { status: true, user: loginedUser, state: "removed" };
      }
    } else {
      const [follow, following] = await Promise.all([
        User.updateOne(
          { userName: searchedUser },
          { $push: { followers: loginedUser } }
        ),
        User.updateOne(
          { userName: loginedUser },
          { $push: { following: searchedUser } }
        ),
      ]);

      console.log("follow 2 :", follow, "following : ", following);

      if (follow.modifiedCount === 1 && following.modifiedCount === 1) {
        return { status: true, user: loginedUser, state: "added" };
      }
    }

    return false; // Return false if the update operation didn't succeed
  };

  //to handle save post

  const handlePostSave = async (postId: string, userId: string) => {
    const userID = new mongoose.Types.ObjectId(userId);

    const saved = await User.findOne({
      _id: userID,
      savedPost: { $elemMatch: { $eq: postId } },
    });
    console.log("liked :", saved);

    if (saved) {
      const unSave = await User.findOneAndUpdate(
        { _id: userID },
        { $pull: { savedPost: postId } },
        { new: true, projection: { savedPost: 1, _id: 0 } }
      );
      console.log("unSave 1:", unSave);
      if (unSave !== null) {
        return { status: true, postId: unSave.savedPost };
      }
    } else {
      const save = await User.findOneAndUpdate(
        { _id: userID },
        { $push: { savedPost: postId } },
        { new: true, projection: { savedPost: 1, _id: 0 } }
      );
      console.log("save 2 :", save);
      if (save !== null) {
        return { status: true, postId: save.savedPost };
      }
    }

    return false; // Return false if the update operation didn't succeed
  };

  //to amend the gender of user
  const handleChangeGender = async (gender: string, userId: string) => {
    const userID = new mongoose.Types.ObjectId(userId);
    const updateGender = await User.updateOne(
      { _id: userID },
      { $set: { gender: gender } }
    );

    if (updateGender.modifiedCount === 1) {
      return true;
    } else {
      return false;
    }
  };

  //to amend the gender of user
  const handleProfileUpdate = async (name: string,bio:string, userId: string) => {
    const userID = new mongoose.Types.ObjectId(userId);
    const updateGender = await User.updateOne(
      { _id: userID },
      { $set: {name:name, bio: bio } }
    );

    if (updateGender.modifiedCount === 1) {
      return true;
    } else {
      return false;
    }
  };

  return {
    findByProperty,
    findByNumber,
    addUser,
    uploadDp,
    searchUserbyChar,
    getUsersList,
    handleFollowUnfollow,
    handlePostSave,
    handleChangeGender,
    handleProfileUpdate
  };
};

export type userTypeRepositoryMongoDB = typeof userRepositoryMongoDB;
