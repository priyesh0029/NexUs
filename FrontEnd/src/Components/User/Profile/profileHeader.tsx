// import { UserCircleIcon } from "@heroicons/react/20/solid";
// import { useSelector } from "react-redux";

// const ProfileHeader = () => {
//   const user = useSelector(
//     (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
//   );
//   return (

//     <div className="flex justify-between w-full px-60">
//       <div className="w-[11rem] h-[11rem]">
//         <UserCircleIcon className="text-gray-700" />
//       </div>
//       <div className="flex ">
//         <div className="flex flex-col items-start">
//           <div className="flex pt-8 pb-4 gap-4">
//             <p className="text-2xl">{user.userName}</p>
//             <button className="text-xl">edit</button>
//           </div>
//           <div className="flex gap-5 text-lg">
//             <p>40 posts</p>
//             <p>40 followers</p>
//             <p>40 following</p>
//           </div>
//           <div className="flex py-2">
//             <p className="text-lg"> {user.name}</p>
//           </div>
//         </div>
//       </div>
//     </div>

//   );
// };

// export default ProfileHeader;

import { PencilSquareIcon,UserCircleIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { Avatar } from "@material-tailwind/react";
import { POST_URL } from "../../../constants/constants";
import { handleDp } from "../../../api/apiConnections/User/userConnections";
import { useEffect, useRef } from "react";
interface ProfileHeaderProps {
  totalPosts: number;
  userInfo :UserInfo
  setUserInfo : React.Dispatch<React.SetStateAction<UserInfo|undefined>>;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  totalPosts,
  userInfo,
  setUserInfo
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      console.log("profile pic in front end formdata key and value  : ",key, value);
    });

    const response = await handleDp(formData);
    if(response.length !== 0){
      userInfo.dp = response
    }
  };


  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  return (
    <div className="flex justify-between pe-8 sm:ps-8 sm:pe-8 md:ps-28 md:pe-32 lg:ps-28 lg:pe-32 xl:ps-56 xl:pe-48 2xl:ps-72 2xl:pe-[19rem]">
      <div className="w-[9rem] h-[9rem] rounded-full group relative flex justify-center items-center">
        {userInfo.dp ? (<Avatar
          src={POST_URL + `${userInfo.dp}.jpg`}
          alt="avatar"
          className="w-[9rem] h-[9rem] relative group-hover:opacity-40"
        />) : (<UserCircleIcon className="text-gray-700" />)}
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
          <p>{totalPosts} posts</p>
          <p>40 followers</p>
          <p>40 following</p>
        </div>
        <div className="flex py-1">
          <p className="text-lg"> {userInfo.name}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
