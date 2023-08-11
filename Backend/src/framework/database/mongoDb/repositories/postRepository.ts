import { post } from "../../../../types/postTypes/postTypes";
import Post from "../models/postModel";

export const postRepositoryMongoDb = () => {
  const createPost = async (post: post) => {
    const postDetails = {
      postedUser: post.userName,
      description: post.caption,
      imgNames: post.filenames,
    };
    const newPost = new Post(postDetails)
    return await newPost.save()
  };

  //getallposts

  const getAllposts = async ()=>{
    return await Post.find().sort({ createdAt: -1 });
  }
  return {
    createPost,
    getAllposts
  };
};

export type postRepositoryMongoDbType = typeof postRepositoryMongoDb;
