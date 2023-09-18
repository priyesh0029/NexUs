import baseURL from "../../api";

export const handleDp = async (post: FormData) => {
  try {
    console.log("post in front end : ", post);
    const response: any = await baseURL.post("/user/changedp", post, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.status === "success") {
      console.log("response of create post : ", response.data.dp);
      return response.data.dp;
    }
  } catch (error) {
    console.log(error);
  }
};

//get user details for profile
export const getUserDetails = async (user: string) => {
  try {
    const response: any = await baseURL.get(`/user/user/${user}`);
    if (response.data.status === "success") {
      console.log("response of getUserDetails api : ", response.data.user);
      return response.data.user[0];
    }
  } catch (error) {
    console.log(error);
  }
};

//search user using regex
export const searchUser = async (user: string) => {
  try {
    const response: any = await baseURL.get(`user/search?user=${user}`);
    if (response.data.status === "success") {
      console.log("response of search users : ", response.data.users);
      return response.data.users;
    }
  } catch (error) {
    console.log(error);
  }
};

//to get users list in right side bar for suggestions
export const getusersList = async (user: string): Promise<any> => {
  try {
    const response: any = await baseURL.get(`/user/usersList?user=${user}`);
    if (response.data.status === "success") {
      const users = response.data.users;
      console.log("users list sfter getusersList : ", users);

      return users;
    }
  } catch (error) {
    console.log(error);
  }
};

//to handle follow and unfollow requests

export const handleFollows = async (
  searchedUser: string,
  loginedUser: string
): Promise<any> => {
  try {
    const users = {
      searchedUser,
      loginedUser,
    };
    console.log("users of handlefollows : ", users);

    const response: any = await baseURL.post("/user/followhandle", users);
    if (response.data.status === "success") {
      const users = response.data.users;
      console.log("users list sfter getusersList : ", users);

      return users;
    }
  } catch (error) {
    console.log(error);
  }
};

//to handle post save

export const handleSavePost = async (postId: string): Promise<any> => {
  try {
    const response: any = await baseURL.post("/user/savepost", { postId });
    console.log("response edited post : ", response);
    if (response.data.status === "success") {
      const savedPost = response.data.savedPost;
      return savedPost;
    }
  } catch (error) {
    console.log(error);
  }
};

//edit profile handler

export const editProfileHandle = async (userData: any) => {
  console.log("userData in profile edit : ", userData);
  try {
    const response: any = await baseURL.patch("/user/updateProfile", {
      userData,
    });
    console.log("response edited post : ", response);
    if (response.data.status === "success") {
      const gender = response.data.gender;
      return gender;
    }
  } catch (error) {
    console.log(error);
  }
};

//edit gender in edit profile

export const handleGenderSave = async (gender: string) => {
  console.log("userData in gender edit : ", gender);
  try {
    const response: any = await baseURL.patch("/user/changeGender", { gender });
    console.log("response edited post : ", response);
    if (response.data.status === "success") {
      const profileupdate = response.data.profileupdate;
      return profileupdate;
    }
  } catch (error) {
    console.log(error);
  }
};

//check old password

export const oldPasswordCheck = async (password: string) => {
  console.log("check old password : ", password);
  try {
    const response: any = await baseURL.patch("/user/checkPassword", {
      password,
    });
    console.log("response edited post : ", response);
    if (response.data.status === "success") {
      const password = response.data.password;
      return password;
    }
  } catch (error) {
    console.log("error inside the api acall catch :", error);
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    return errorMessage
    // throw new Error(errorMessage); 
    // Throw the error to be caught by the caller
  }
};

// setting a new password 

export const newPassword = async (password: string) => {
  console.log("check old password : ", password);
  try {
    const response: any = await baseURL.patch("/user/newPassword", {
      password,
    });
    console.log("response edited post : ", response);
    if (response.data.status === "success") {
      const password = response.data.password;
      return password;
    }
  } catch (error) {
    console.log("error inside the api acall catch :", error);
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    return errorMessage
    // throw new Error(errorMessage); 
    // Throw the error to be caught by the caller
  }
};

//to deactivate account 

export const deactivateAccount = async()=>{
  try{
    const response: any = await baseURL.patch("/user/deactivateAccount");
    console.log("response edited post : ", response);
    if (response.data.status === "success") {
      const deactivate = response.data.deactivate;
      return deactivate;
    }

  }catch (error){
    console.log("error inside the api acall catch :", error);
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    // return errorMessage
    throw new Error(errorMessage); 
    //Throw the error to be caught by the caller
  }
}

//to delete Account

export const deleteAccount = async()=>{
  try{
    const response: any = await baseURL.patch("/user/deleteAccount");
    console.log("response edited post : ", response);
    if (response.data.status === "success") {
      const deleted = response.data.deleted;
      return deleted;
    }

  }catch (error){
    console.log("error inside the api acall catch :", error);
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    // return errorMessage
    throw new Error(errorMessage); 
    //Throw the error to be caught by the caller
  }
}