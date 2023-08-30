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
  return {
    findByProperty,
    findByNumber,
    addUser,
    uploadDp
  };
};

export type userTypeRepositoryMongoDB = typeof userRepositoryMongoDB;
