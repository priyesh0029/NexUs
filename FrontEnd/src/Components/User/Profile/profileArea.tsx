import { useEffect, useState } from "react";
import ProfileBody from "./profileBody";
import ProfileHeader from "./profileHeader";
import { getUserPost } from "../../../api/apiConnections/User/postConnections";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../../api/apiConnections/User/userConnections";

const ProfileArea = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<UserInfo>();
  const params = useParams();
  const { proId } = params;

  if (typeof proId === "string") {
    useEffect(() => {
      getProfilePosts(proId);
    }, [proId]);

    useEffect(() => {
      getProfileDetails(proId);
    }, [proId]);

    const getProfilePosts = async (proId: string) => {
      const response = await getUserPost(proId);
      console.log("response after fetching post of user : ", response);
      setPosts(response);
    };

    const getProfileDetails = async (proId: string) => {
      const response:UserInfo = await getUserDetails(proId);
      console.log("response getProfileDetails : ", response);
        setUser(response);
    };
    return (
      <div className="flex flex-col">
        <div className="flex flex-col w-full">
          {user !==undefined && <ProfileHeader totalPosts={posts.length} userInfo={user}/>}
        </div>
        <div>
          <ProfileBody posts={posts} setPosts={setPosts} proId={proId} />
        </div>
      </div>
    );
  }
};

export default ProfileArea;
