import baseURL from "../../api";

// interface PostType {
//   mediaPost: []
//   captionPost: string;
// }

export const createPost = async (post: FormData) => {
  try {
    // console.log("post in front end : ",post);

    const response: any = await baseURL.post("/post/create", post, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("response : ", response);
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = async () => {
  try {
    const response: any = await baseURL.get("/post");
    console.log("response : ", response);
    const postResponse = {
      status: response.data.status,
      allposts: response.data.allPosts,
    };
    return postResponse
  } catch (error) {
    console.log(error);
  }
};
