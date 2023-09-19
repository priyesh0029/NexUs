import { useEffect, useState } from "react";
import ProfileBody from "./profileBody";
import ProfileHeader from "./profileHeader";
import {
  getUserPost,
  getUserSavedPost,
} from "../../../api/apiConnections/User/postConnections";
import { useParams } from "react-router-dom";
import { getUserDetails } from "../../../api/apiConnections/User/userConnections";

const ProfileArea = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<UserInfo>();
  const [postLength, setPostLength] = useState<number>(0);
  const params = useParams();
  const { proId } = params;

  //  on click of post and saved
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
    }
  };
  const headers = ["Posts", "Saved"];

  if (typeof proId === "string") {
    useEffect(() => {
      getProfilePosts(proId);
    }, [proId, activeIndex]);

    useEffect(() => {
      getProfileDetails(proId);
    }, [proId]);

    const getProfilePosts = async (proId: string) => {
      if (activeIndex === 0) {
        setPosts([]);
        const response = await getUserPost(proId);
        console.log("response after fetching post of user : ", response);
        setPosts(response);
        setPostLength(response.length);
      } else if (activeIndex === 1) {
        setPosts([]);
        const response = await getUserSavedPost();
        console.log("response after fetching post of user : ", response);
        setPosts(response);
      }
    };

    const getProfileDetails = async (proId: string) => {
      const response: UserInfo = await getUserDetails(proId);
      console.log("response getProfileDetails : ", response);
      setUser(response);
    };

    return (
      <div className="flex flex-col">
        <div className="flex flex-col w-full">
          {user !== undefined && (
            <ProfileHeader totalPosts={postLength} userInfo={user} />
          )}
        </div>
        <div>
          <div className="flex justify-center pt-28">
            <div className=" flex justify-center border-t-2 w-full gap-12">
              {headers.map((element, index) => (
                <div
                  className={`flex justify-center px-2 ${
                    activeIndex === index ? "border-t-2 border-black" : ""
                  }`}
                  key={index}
                  onClick={() => handleClick(index)}
                >
                  <p className="text-md text-gray-700">{element}</p>
                </div>
              ))}
            </div>
          </div>
          <ProfileBody posts={posts} setPosts={setPosts} proId={proId} />
        </div>
      </div>
    );
  }
};

export default ProfileArea;
