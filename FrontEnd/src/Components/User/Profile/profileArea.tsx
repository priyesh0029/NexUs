import { useEffect, useState } from "react";
import ProfileBody from "./profileBody";
import ProfileHeader from "./profileHeader";
import { useSelector } from "react-redux";
import { getUserPost } from "../../../api/apiConnections/User/postConnections";

const ProfileArea = () => {
  const[posts,setPosts] = useState<Post[]>([]);
    const user = useSelector(
        (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
      );

      useEffect(()=>{
        getProfilePosts()
      },[])

      const getProfilePosts = async()=>{
        const response = await getUserPost(user.userName)
        console.log("response after fetching post of user : ",response);
        setPosts(response)
      }
  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full" >
        <ProfileHeader totalPosts = {posts.length} posts={posts}/>
      </div>
      <div>
        <ProfileBody posts ={posts}/>
      </div>
    </div>
  );
};

export default ProfileArea;
