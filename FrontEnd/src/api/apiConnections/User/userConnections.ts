
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

export const getUserDetails = async (user: string) => {
  try {
    const response: any = await baseURL.get(`/user/user/${user}`);
    if (response.data.status === "success") {
      console.log("response of getUserDetails : ", response.data.user);
      return response.data.user[0];
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchUser = async (user: string) => {
  try {
    const response: any = await baseURL.get(`/user/user/${user}`);
    if (response.data.status === "success") {
      console.log("response of getUserDetails : ", response.data.users);
      return response.data.users;
    }
  } catch (error) {
    console.log(error);
  }
};