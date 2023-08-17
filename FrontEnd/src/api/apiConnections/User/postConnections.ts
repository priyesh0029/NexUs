import baseURL from "../../api";

interface newPostType {
  status: string
  post: object;
}

interface PostResponseType {
    status : string,
    allPosts ?: []
  
}

export const createPost = async (post: FormData):Promise<any> => {
  // const dispatch  = useDispatch()
  try {
    // console.log("post in front end : ",post);
    const response: any = await baseURL.post("/post/create", post, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if(response.data.status === 'success'){
      // dispatch(clearMedia)
      // dispatch(clearCaption)
       console.log("response of create post : ", response.data.newPost);
      const newPostData : newPostType ={
        status :response.data.status,
        post :response.data.newPost
      }
      return newPostData
    }
    // dispatch(setNewPost( response.data.newPost))
  } catch (error) {
    console.log(error);
  }
};

//get all post 
export const getAllPost = async ():Promise<any> => {
  try {
    const response: any = await baseURL.get<PostResponseType>("/post");
    const postResponse : PostResponseType = {
      status: response.data.status,
      allPosts: response.data.allPosts,
    };
    console.log("response postResponse : ", postResponse);
    return postResponse
  } catch (error) {
    console.log(error);
  }
};

//handle like
export const handleLike =async (user:string,postId:string):Promise<any> =>{

  try{
        const postDetails = {user,postId}
        const response :any = await baseURL.post("/post/like",postDetails)
        console.log("response of like : ",response);
        if(response.data.status === 'success'){
          const likeResponse = {
            status: response.data.response.status,
            user: response.data.response.user,
            state : response.data.response.state
          };
          return likeResponse
        }
        
  }catch(error){
    console.log(error);
    
  }
}

//add comment to a post

export const handleComment = async(user:string,comment:string,postId:string):Promise<any> =>{

  try{
    const commentDetails = { user,comment,postId}
    const response:any = await baseURL.post("/post/comment",commentDetails)
    console.log("response of comment 222 : ",response);
    if(response.data.status === 'success'){
      const newComment = response.data.newComment
      return newComment
    }

  }catch(error){
    console.log(error);
    
  }
}

//to get all comments of a post

export const getallPostComments = async(postId:string):Promise<any> =>{

  try{  
    const response:any = await baseURL.get(`/post/allcomments?param=${postId}`);
      
      if(response.data.status === 'success'){
        return response.data.comments
      }

  }catch(error){
    console.log(error);
    
  }
}

//handle single comment like

export const handleCommentLike = async(user:string, commentId : string):Promise<any> =>{
    try{

      const commentDetails = {user,commentId}
        const response :any = await baseURL.post("/post/commentlike",commentDetails)
        console.log("response of like : ",response);
        if(response.data.status === 'success'){
          const commentLikeResponse = {
            status: response.data.response.status,
            user: response.data.response.user,
            state : response.data.response.state
          };
          return commentLikeResponse
        }

    }catch(error){
      console.log(error);
      
    }
}

//handle reply comment : add reply to a comment

export const handleCommentReply =  async(user:string,comment:string,commentId:string):Promise<any> =>{

  try{
    const commentDetails = { user,comment,commentId}
    const response:any = await baseURL.post("/post/replycomment",commentDetails)
    console.log("response of comment 222 : ",response);
    if(response.data.status === 'success'){
      const newreplyComment = response.data.newComment
      return newreplyComment
    }

  }catch(error){
    console.log(error);
    
  }
}

//handle reply like : add or remove like to a reply

export const handleReplyLike = async(user:string,replyId:string,commentId:string):Promise<any> =>{

  try{
    const likeReplyDetails = { user,replyId,commentId}
    const response:any = await baseURL.post("/post/replylike",likeReplyDetails)
    console.log("response of comment 222 : ",response);
    if(response.data.status === 'success'){
      const newReplyComment = response.data.state
      return newReplyComment
    }

  }catch(error){
    console.log(error);
    
  }
}
