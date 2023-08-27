import baseURL from "../../api";


export const handleDp = async(post: FormData)=>{
    try {
        // console.log("post in front end : ",post);
        const response: any = await baseURL.post("/settings/changedp", post, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if(response.data.status === 'success'){
          // dispatch(clearMedia)
          // dispatch(clearCaption)
           console.log("response of create post : ", response.data.dp);
        //   const newPostData : newPostType ={
        //     status :response.data.status,
        //     post :response.data.newPost
        //   }
        //   return newPostData
        }
        // dispatch(setNewPost( response.data.newPost))
      } catch (error) {
        console.log(error);
      }
}