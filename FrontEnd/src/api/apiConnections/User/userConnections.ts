
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
export const getusersList = async (user: string):Promise<any> => {
  try {
    const response: any = await baseURL.get(`/user/usersList?user=${user}`);
    if(response.data.status === 'success'){
      const users = response.data.users
      console.log("users list sfter getusersList : ", users);
      
      return users
    }
  } catch (error) {
    console.log(error);
  }
};

//to handle follow and unfollow requests

export const handleFollows = async (searchedUser:string,loginedUser: string):Promise<any> => {
  try {
    const users = {
      searchedUser,
      loginedUser
    }
    console.log("users of handlefollows : ",users);
    
    const response: any = await baseURL.post("/user/followhandle",users);
    if(response.data.status === 'success'){
      const users = response.data.users
      console.log("users list sfter getusersList : ", users);
      
      return users
    }
  } catch (error) {
    console.log(error);
  }
};

//to handle post save

export const handleSavePost = async(postId:string):Promise<any>=>{
  try{
    const response:any = await baseURL.post("/user/savepost",{postId})
    console.log("response edited post : ",response);
    if(response.data.status === 'success'){
      const savedPost = response.data.savedPost
      return savedPost
    }

  }catch(error){
    console.log(error);
    
  }
}