import { Avatar, Input } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { POST_URL } from "../../../constants/constants";
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { VideoCameraIcon } from "@heroicons/react/20/solid";
import ChatboxTextarea from "./ChatTextArea";
import { Link } from "react-router-dom";
import { useState } from "react";
import ChatSearch from "./chatSearch";

interface Imessage{
  createOrAccessOnetoOneChat: (user: string) => void;
  createOrAccessGroupChatToChatList: (users: string[]) => void;
}

const Message :React.FC<Imessage> = ({createOrAccessOnetoOneChat,createOrAccessGroupChatToChatList}) => {
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  const selectedChat = useSelector(
    (store: { chat: { userChat: IuserChatList } }) => store.chat.userChat
  );
  const [chatSearchOpen, setChatSearchOpen] = useState(false);
  const handleNewChatSearch = () => {
    setChatSearchOpen(!chatSearchOpen);
  };
  return (
    <div className="flex w-full min-h-screen flex-col">
      {selectedChat._id.length > 0 ? (
        selectedChat.users
          .filter((chatUser: UserInfo) => chatUser.userName !== user.userName)
          .map((chatUser: UserInfo) => (
            <div key={chatUser._id} className="flex flex-col min-h-screen justify-between">
              <div className="flex  justify-between px-8 py-4 items-center border-b-2 border-gray-300">
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
                    {chatUser.dp ? (
                      <>
                        <Avatar
                          src={POST_URL + `${chatUser.dp}.jpg`}
                          alt="avatar"
                          className="h-32 w-32 "
                        />
                        <div className="flex text-xl">
                          <p>{chatUser.userName}</p>
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
                      <Link to={`/profile/${chatUser.userName}`}>
                        <button className=" bg-blue-gray-300 text-white px-3 rounded-md">
                          view profile
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="pt-20 px-8">
                  {/* {Array(100)
        .fill("")
            .map((index) => (
              <div key={index+1}><p>haii</p></div>
            ))} */}
                </div>
              </div>
              <div className="py-12 md:py-2 px-2 w-full flex ">
                <ChatboxTextarea />
              </div>
            </div>
          ))
      ) : (
        <div className="flex justify-center min-h-screen w-full flex-col items-center">
          <ChatBubbleLeftRightIcon className="h-360 w-36 text-gray-500" />
          <p className="text-2xl font-lg ">Your Messages</p>
          <p>Send private photos and messages to a friend or group</p>
          <button
            className="border-2 rounded-xl text-md font-xl text-white bg-blue-600 px-8 py-2 mt-2"
            onClick={handleNewChatSearch}
          >
            Sent message
          </button>
        </div>
      )}
      {chatSearchOpen && (
        <ChatSearch
          open={chatSearchOpen}
          setOpen={setChatSearchOpen}
          createOrAccessOnetoOneChat={createOrAccessOnetoOneChat}
          createOrAccessGroupChatToChatList={createOrAccessGroupChatToChatList}
        />
      )}
    </div>
  );
};

export default Message;
