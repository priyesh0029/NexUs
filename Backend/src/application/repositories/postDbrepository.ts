import { postRepositoryMongoDbType } from "../../framework/database/mongoDb/repositories/postRepository";
import { post } from "../../types/postTypes/postTypes";

export const postRepositoryInterface = (
  repository: ReturnType<postRepositoryMongoDbType>
) => {
  const uploadPost = async (post: post) => await repository.createPost(post);
  const getAllPosts = async () => await repository.getAllposts();
  const handleLike = async (postDetails: { user: string; postId: string }) =>
    await repository.handleLike(postDetails);

  const postComment = async (commentDeatils: {
    comment: string;
    user: string;
    postId: string;
  }) => await repository.postComment(commentDeatils);

  const getAllComments = async (postId: string) =>
    await repository.getAllComments(postId);

  //manage like of a comment
  const handleCommentLike = async (commentDetails: {
    user: string;
    commentId: string;
  }) => await repository.handleCommentLike(commentDetails);

  //add reply to a comment
  const postReply = async (commentDeatils: {
    comment: string;
    user: string;
    commentId: string;
  }) => await repository.postReply(commentDeatils);

  //manage like of a reply
  const handleReplyLike = async (replyLikeDetails: {
    user: string;
    replyId: string;
    commentId: string;
  }) => await repository.handleReplyLike(replyLikeDetails);

  //to get all  posts of user

  const getUserPosts = async(user:string)=>await repository.getUserPosts(user)

  return {
    uploadPost,
    getAllPosts,
    handleLike,
    postComment,
    getAllComments,
    handleCommentLike,
    postReply,
    handleReplyLike,
    getUserPosts
  };
};

export type postRepositoryInterfaceType = typeof postRepositoryInterface;
