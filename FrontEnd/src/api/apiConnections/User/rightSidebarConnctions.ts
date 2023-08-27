import baseURL from "../../api";


export const getusersList = async ():Promise<any> => {
    try {
      const response: any = await baseURL.get("/home/usersList");
    //   const postResponse : PostResponseType = {
    //     status: response.data.status,
    //     allPosts: response.data.allPosts,
    //   };
      console.log("response postResponse : ", response);
    //   return postResponse
    } catch (error) {
      console.log(error);
    }
  };