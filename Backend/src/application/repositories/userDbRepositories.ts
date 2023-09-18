import { userTypeRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/userRepository";

export const userDbRepository = (
  repository: ReturnType<userTypeRepositoryMongoDB>
) => {
  const findByProperty = async (params: string) =>
    await repository.findByProperty(params);
  const findById = async (userId: string) =>
    await repository.findById(userId);
  const findByNumber = async (params: string) =>
    await repository.findByNumber(params);
  const RegisterUser = async (userEntity: {}) =>
    await repository.addUser(userEntity);
  const uploadDp = async (user: string, filename: string) =>
    await repository.uploadDp(user, filename);
  const searchUserbyChar = async (user: string) =>
    await repository.searchUserbyChar(user);
  const getUsersList = async (user: string) =>
    await repository.getUsersList(user);
  const handleFollowUnfollow = async (searchedUser: string, userId: string) =>
    await repository.handleFollowUnfollow(searchedUser, userId);

  //to handle save post
  const handleSavePost = async (postId: string, userId: string) =>
    await repository.handlePostSave(postId, userId);

  //to handle xcahnge gender
  const genderAmend = async (gender: string, userId: string) =>
    await repository.handleChangeGender(gender, userId);
  //to handle update profile
  const handleUpdateProfile = async (
    name: string,
    bio: string,
    userId: string
  ) => await repository.handleProfileUpdate(name, bio, userId);
  //to change password
  const changePassword = async (userId: string, password: string) =>
    await repository.handleChangePassword(userId, password);

  //to deactivateAccount
  const deactivateAccount = async(userId: string) =>
  await repository.handleAccountDeactivate(userId);

  //to activate Account
  const activateAccount = async(username: string) =>
  await repository.handleAccountActivate(username);
  
  //to delete Account
  const deleteAccount = async(userId: string) =>
  await repository.handleAccountDelete(userId);

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
    deleteAccount
  };
};

export type userTypeDbRepository = typeof userDbRepository;
