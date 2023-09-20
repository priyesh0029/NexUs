import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Avatar } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { POST_URL } from "../../../constants/constants";

const Chat = () => {
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  return (
    <div className="flex flex-col w-full h-full  border-r-2 border-gray-300">
      <div className="p-4 flex border-b-2 border-gray-300">
        {user.dp ? (
          <div className="sm:flex hidden">
            <Avatar
              src={POST_URL + `${user.dp}.jpg`}
              alt="avatar"
              className="h-12 w-12 "
            />
            <p>{user.userName}</p>
          </div>
        ) : (
          <div className="sm:flex hidden">
            <UserCircleIcon className="h-10 w-10 text-gray-700" />
            <p>user</p>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <div className="flex p-4 gap-4 items-center hover:bg-gray-100">
          {user.dp ? (
            <>
              <Avatar
                src={POST_URL + `${user.dp}.jpg`}
                alt="avatar"
                className="h-12 w-12 "
              />
              <div className="sm:flex hidden">
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
        <div className="flex p-4 gap-4 items-center hover:bg-gray-100">
          {user.dp ? (
            <>
              <Avatar
                src={POST_URL + `${user.dp}.jpg`}
                alt="avatar"
                className="h-12 w-12 "
              />
              <div className="sm:flex hidden">
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
      </div>
    </div>
  );
};

export default Chat;
