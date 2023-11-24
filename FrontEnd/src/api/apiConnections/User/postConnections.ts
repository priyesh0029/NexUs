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
    console.log("response of add a comment 111 : ",response);
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
        console.log("response of comment like : ",response);
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
    console.log("response of like reply 222 : ",response);
    if(response.data.status === 'success'){
      const newReplyComment = response.data.state
      return newReplyComment
    }

  }catch(error){
    console.log(error);
    
  }
}

//get all post of user

export const getUserPost = async(user:string):Promise<any>=>{

  try{
    const response:any = await baseURL.get(`/post/userposts?param=${user}`)
    console.log("response of user Post 222 : ",response);
    if(response.data.status === 'success'){
      const posts = response.data.posts
      return posts
    }

  }catch(error){
    console.log(error);
    
  }
}

//to get all replies of a comment

export const getAllReplies = async(commentId:string):Promise<any>=>{
  try{
    const response:any = await baseURL.get(`/post/allcommentReplies?commentId=${commentId}`)
    console.log("response of comment reply 222 : ",response);
    if(response.data.status === 'success'){
      const replies = response.data.replies
      return replies
    }

  }catch(error){
    console.log(error);
    
  }
}

//to update a users post

export const updatePost = async(postId:string,description:string):Promise<any>=>{
  try{
    const editpostInfo = {postId,description}
    const response:any = await baseURL.post("/post/updatepost",editpostInfo)
    console.log("response edited post : ",response);
    if(response.data.status === 'success'){
      const post = response.data.post
      return post
    }

  }catch(error){
    console.log(error);
    
  }
}


//delete comment 

export const deleteComment = async(commentId:string):Promise<any>=>{
  try{
    const response:any = await baseURL.patch("/post/deletecomment",{commentId})
    console.log("response delete comment : ",response);
    if(response.data.status === 'success'){
      const comment = response.data.comment
      return comment
    }

  }catch(error){
    console.log(error);
    
  }
}

//delete Reply

export const deleteReply = async(commentId:string,ReplyId:string):Promise<any>=>{
  try{
    const ReplyDetails ={commentId,ReplyId}
    const response:any = await baseURL.patch("/post/deleteReply",ReplyDetails)
    console.log("response reply comment : ",response);
    if(response.data.status === 'success'){
      const reply = response.data.reply
      return reply
    }

  }catch(error){
    console.log(error);
    
  }
}

//delete a Post

export const deletePost = async(postId:string):Promise<any>=>{
  try{
    const response:any = await baseURL.patch("/post/deletePost",{postId})
    console.log("response delete post : ",response);
    if(response.data.status === 'success'){
      const post = response.data.post
      return post
    }

  }catch(error){
    console.log(error);
    
  }
}

//report a post 

export const reportPost = async(postId: string,report:string):Promise<any>=>{
  try{
    const reportDetails = {postId,report}
    console.log("response report post reportDetails : ",reportDetails);
    const response:any = await baseURL.patch("/post/reportPost",reportDetails)
    console.log("response report post : ",response);
    if(response.data.status === 'success'){
      const reported = response.data.reported
      return reported
    }

  }catch(error){
    console.log(error);
    
  }
}

//repoet a comment

export const reportComment = async(commentId: string,report:string):Promise<any>=>{
  try{
    const reportDetails = {commentId,report}
    console.log("response report post reportDetails : ",reportDetails);
    const response:any = await baseURL.patch("/post/reportComment",reportDetails)
    console.log("response report post : ",response);
    if(response.data.status === 'success'){
      const reported = response.data.reported
      return reported
    }

  }catch(error){
    console.log(error);
    
  }
}

//repoet a reply

export const reportReply = async(commentId: string,replyId:string,report:string,):Promise<any>=>{
  try{
    const reportDetails = {commentId,replyId,report}
    console.log("response report post reportDetails : ",reportDetails);
    const response:any = await baseURL.patch("/post/reportReply",reportDetails)
    console.log("response report post : ",response);
    if(response.data.status === 'success'){
      const reported = response.data.reported
      return reported
    }

  }catch(error){
    console.log(error);
    
  }
}

//to gget user saved posts

export const getUserSavedPost = async()=>{
  try{
    const response:any = await baseURL.get("/post/getUserSavedPost")
    console.log("response of user Post 222 : ",response);
    if(response.data.status === 'success'){
      const posts = response.data.posts
      return posts
    }

  }catch(error){
    console.log(error);
    
  }
}