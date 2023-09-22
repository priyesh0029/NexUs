import { PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Avatar, Tooltip } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { POST_URL } from "../../../constants/constants";
import { useState } from "react";
import ChatSearch from "./chatSearch";

const Chat = () => {
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  const [chatSearchOpen,setChatSearchOpen] = useState(false)
  const handleNewChatSearch = ()=>{
    setChatSearchOpen(!chatSearchOpen)
  }

  return (
    <div className="flex flex-col w-full h-full  border-r-2 border-gray-300 ">
      <div className="p-4 flex border-b-2 border-gray-300 justify-between ">
        {user.dp ? (
          <div className="md:flex hidden items-center gap-3">
            <Avatar
              src={POST_URL + `${user.dp}.jpg`}
              alt="avatar"
              className="h-12 w-12 "
            />
            <p>{user.userName}</p>
          </div>
        ) : (
          <div className="md:flex hidden">
            <UserCircleIcon className="h-10 w-10 text-gray-700" />
            <p>user</p>
          </div>
        )}
        <div>
          <Tooltip
            className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-black"
            content="new message"
            placement="bottom"
          >
            <PencilSquareIcon className="h-10 w-10 text-black" onClick={handleNewChatSearch}/>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto">
        {Array(100)
          .fill("")
          .map((index) => (
            <div className="flex p-4 gap-4 items-center hover:bg-gray-100" key={index}>
              {user.dp ? (
                <>
                  <Avatar
                    src={POST_URL + `${user.dp}.jpg`}
                    alt="avatar"
                    className="h-12 w-12 "
                  />
                  <div className="md:flex hidden">
                    <p>{user.userName}hmhty</p>
                  </div>
                </>
              ) : (
                <>
                  <UserCircleIcon className="h-10 w-10 text-gray-700" />
                  <div className="md:flex hidden">
                    <p>user</p>
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
      {chatSearchOpen && <ChatSearch open={chatSearchOpen} setOpen={setChatSearchOpen}/>}
    </div>
  );
};

export default Chat;
