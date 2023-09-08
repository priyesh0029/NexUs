import { PencilSquareIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@material-tailwind/react";
import { POST_URL } from "../../../constants/constants";
import {
  handleDp,
  handleFollows,
} from "../../../api/apiConnections/User/userConnections";
import { useRef, useState } from "react";
import { SetUserDp } from "../../../features/redux/slices/user/homeSlice";
interface ProfileHeaderProps {
  totalPosts: number;
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  totalPosts,
  userInfo,
}) => {
  const [follower, setFollower] = useState(userInfo.followers);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const handlePropic = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the click event of the file input
    }
  };

  const changePropic = async (file: File) => {
    console.log("Selected file:", file);
    const formData = new FormData();
    formData.append(`dp`, file);
    formData.append(`userName`, userInfo.userName);
    formData.forEach((key, value) => {
      console.log(
        "profile pic in front end formdata key and value  : ",
        key,
        value
      );
    });

    const response = await handleDp(formData);
    if (response.length !== 0) {

      console.log("response: ",response,"response type: ",typeof response);
        dispatch(SetUserDp(response))
      
    }
  };

  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  const followerStatus = follower.some((person) => person === user.userName);
  const [followButton, SetFollowButton] = useState(followerStatus);

  const handleFollow = async () => {
    SetFollowButton(!followButton);
    const response = await handleFollows(userInfo.userName, user.userName);
    if (response.status) {
      if (response.state === "added") {
        setFollower((prevFollower) => [response.user, ...prevFollower]);
      } else if (response.state === "removed") {
        const updatedFollowedArr = follower.filter(
          (person) => person !== user.userName
        );
        setFollower(updatedFollowedArr);
      }
    }
  };

  return (
    <div className="flex justify-between pe-8 sm:ps-8 sm:pe-8 md:ps-28 md:pe-32 lg:ps-28 lg:pe-32 xl:ps-56 xl:pe-48 2xl:ps-72 2xl:pe-[19rem]">
      <div className="w-[9rem] h-[9rem] rounded-full group relative flex justify-center items-center">
        {userInfo.dp ? (
          <Avatar
            src={userInfo.userName === user.userName ? POST_URL + `${user.dp}.jpg`: POST_URL + `${userInfo.dp}.jpg`}
            alt="avatar"
            className="w-[9rem] h-[9rem] relative group-hover:opacity-40"
          />
        ) : (
          <UserCircleIcon className="text-gray-700" />
        )}
        {userInfo.userName === user.userName ? (
          <>
            <PencilSquareIcon
              className="w-[4rem] h-[4rem] group-hover:opacity-100 opacity-0 text-gray-800  absolute"
              onClick={handlePropic}
            />
            <input
              ref={fileInputRef}
              type="file"
              style={{ display: "none" }}
              onChange={(event) => {
                // Handle the selected file here
                const selectedFile = event.target.files?.[0];
                if (selectedFile) {
                  // Perform any actions you need with the selected file
                  changePropic(selectedFile);
                }
              }}
            />
          </>
        ) : (
          ""
        )}
      </div>
      <div className="flex flex-col items-start">
        <div className="flex flex-row items-center pt-4 pb-2 gap-4">
          <p className="text-2xl">{userInfo.userName}</p>
          {userInfo.userName === user.userName ? (
            <button className="text-lg border-1 bg-blue-gray-200 p-1 rounded-lg">
              Edit profile
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="flex  flex-row items-center gap-5 text-lg">
          <div className="flex gap-1">
            <p className="text-xl font-semibold">{totalPosts}</p>
            <p className="text-md font-extralight">posts</p>
          </div>
          <div className="flex gap-1">
            <p className="text-xl font-semibold">{follower.length}</p>
            <p className="text-md font-extralight">
              {follower.length > 1 ? "followers" : "follower"}
            </p>
          </div>
          <div className="flex gap-1">
            <p className="text-xl font-semibold">{userInfo.following.length}</p>
            <p className="text-md font-extralight">following</p>
          </div>
        </div>
        <div className="flex py-1">
          <p className="text-lg"> {userInfo.name}</p>
        </div>
        {userInfo.userName !== user.userName ? (
          <div className="flex">
            <button
              className="border bg-blue-500 text-white text-md px-4 rounded-xl"
              onClick={handleFollow}
            >
              {followButton ? "Unfollow" : "Follow"}
            </button>
            <button className="ml-4 border bg-gray-100 text-black text-md px-4  rounded-xl">
              Message
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
