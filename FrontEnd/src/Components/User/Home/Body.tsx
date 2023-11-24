import { useEffect, useState } from "react";
import SinglePost from "../Post/SinglePost";
import Stories from "./Stories";
import { getAllPost } from "../../../api/apiConnections/User/postConnections";
import { useDispatch, useSelector } from "react-redux";
import { clearNewPost } from "../../../features/redux/slices/user/createPostSlice";

const HomeBody = () => {
  const [allPost, setAllPost] = useState<Post[]>([]);
  const dispatch = useDispatch()
  const newPost = useSelector(
    (store: { createPost: { newPost: Post } }) => store.createPost.newPost
  );
  dispatch(clearNewPost)
  console.log("newPost redux : ", newPost);

   
  useEffect(() => {
    if (newPost.createdAt === "") {
      getPost();
    }else{
      setAllPost([newPost,...allPost])
    }
  }, [newPost]);

  const getPost = async () => {
    const response = await getAllPost();
    if (response?.status === "success") {
      console.log("post  singlepost compo1111 : ", response.allPosts);
      setAllPost(response.allPosts);
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-center ">
      {/* <div className="flex justify-center ">
        <Stories />
      </div> */}
      <div className="flex lg:px-32 items-center flex-col  ">
        {allPost.map((post) => (
          <div key={post._id}>
           {!post.isBlocked ? <SinglePost {...post} allPost={allPost} setAllPost={setAllPost} />:<></>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeBody;
