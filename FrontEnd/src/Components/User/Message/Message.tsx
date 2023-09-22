import { Avatar, Input } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { POST_URL } from "../../../constants/constants";
import { PaperAirplaneIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { VideoCameraIcon } from "@heroicons/react/20/solid";
import ChatboxTextarea from "./ChatTextArea";

const Message = () => {
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );
  return (
    <div className="flex w-full h-full flex-col">
      <div className="flex justify-between px-8 py-4 items-center border-b-2 border-gray-300">
        <div className="flex justify-start items-center gap-3">
          {user.dp ? (
            <>
              <Avatar
                src={POST_URL + `${user.dp}.jpg`}
                alt="avatar"
                className="h-12 w-12 "
              />
              <div className="flex">
                <p>{user.userName}</p>
              </div>
            </>
          ) : (
            <>
              <UserCircleIcon className="h-10 w-10 text-gray-700" />
              <div className="sm:flex hidden">
                <p>user</p>
              </div>
            </>
          )}
        </div>
        <div>
          <VideoCameraIcon className="h-6 w-6 text-black" />
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        <div className="flex justify-center pt-6">
          <div className="flex flex-col items-center gap-4">
            {user.dp ? (
              <>
                <Avatar
                  src={POST_URL + `${user.dp}.jpg`}
                  alt="avatar"
                  className="h-32 w-32 "
                />
                <div className="flex text-xl">
                  <p>{user.userName}</p>
                </div>
              </>
            ) : (
              <>
                <UserCircleIcon className="h-10 w-10 text-gray-700" />
                <div className="flex ">
                  <p className="text-xl">user</p>
                </div>
              </>
            )}
            <div>
              <button className=" bg-blue-gray-300 text-white px-3 rounded-md">
                view profile
              </button>
            </div>
          </div>
        </div>
        <div className="pt-20 px-8" >
        {Array(100)
        .fill("")
            .map((index) => (
              <div key={index+1}><p>haii</p></div>
            ))}
        </div>
      </div>
      <div className="py-12 md:py-2 px-2 w-full flex ">
        <ChatboxTextarea />
      </div>
    </div>
  );
};

export default Message;
