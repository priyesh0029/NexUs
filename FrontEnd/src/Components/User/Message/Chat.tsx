import { PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { Avatar, Tooltip } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { POST_URL } from "../../../constants/constants";
import { useState } from "react";
import ChatSearch from "./chatSearch";
import {
  SetNotification,
  setSelectedChat,
} from "../../../features/redux/slices/user/chatSlice";
import { checkNotificationStatus } from "../../../constants/chatLogics";
import { removeChatNotification } from "../../../api/apiConnections/User/chatConnections";

interface Ichat {
  chatList: IuserChatList[];
  createOrAccessOnetoOneChat: (user: string) => void;
  createOrAccessGroupChatToChatList: (users: string[]) => void;
}

const Chat: React.FC<Ichat> = ({
  chatList,
  createOrAccessOnetoOneChat,
  createOrAccessGroupChatToChatList,
}) => {
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  const notification = useSelector(
    (store: { chat: { notification: string[] } }) => store.chat.notification
  );

  const [chatSearchOpen, setChatSearchOpen] = useState(false);
  const handleNewChatSearch = () => {
    setChatSearchOpen(!chatSearchOpen);
  };

  const dispatch = useDispatch();

  //to select a chat

  const handleMessage = async (chat: IuserChatList) => {
    if (checkNotificationStatus(notification, chat._id)) {
      const response = await removeChatNotification(chat._id);
      console.log("removeChatNotification after calling api : ", response);
      if (typeof response === "boolean") {
        if (response) {
          dispatch(SetNotification(notification.filter((notify) => notify !== chat._id)))
        }
      }
    }
    dispatch(setSelectedChat(chat));
  };

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
            <p>{user.userName}</p>
          </div>
        )}
        <div>
          <Tooltip
            className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-black"
            content="new message"
            placement="bottom"
          >
            <PencilSquareIcon
              className="h-10 w-10 text-black"
              onClick={handleNewChatSearch}
            />
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto">
        {chatList.flatMap((chat, index) =>
          chat.isGroupChat ? (
            <div
              className={`flex p-4 gap-4 items-center hover:bg-gray-100 cursor-pointer  ${
                notification.some((notify) => notify === chat._id)
                  ? `bg-black text-white`
                  : ``
              }`}
              key={`${chat._id}groupchat`}
              onClick={() => handleMessage(chat)}
            >
              <div className="flex items-center -space-x-6">
                {chat.users.slice(-2).map((user: UserInfo) => (
                  <Avatar
                    key={`${user.dp}user`}
                    variant="circular"
                    alt="user 1"
                    className="border-2 border-white hover:z-10 focus:z-10"
                    src={POST_URL + `${user.dp}.jpg`}
                  />
                ))}
              </div>
              <div className="md:flex hidden">
                <p>{chat.chatName}</p>
              </div>
            </div>
          ) : (
            chat.users
              .filter(
                (chatUser: UserInfo) => chatUser.userName !== user.userName
              )
              .map((chatUser: UserInfo) => (
                <div
                  className="flex p-4 gap-4  hover:bg-gray-100 cursor-pointer"
                  key={`${chat._id}chat`}
                  onClick={() => handleMessage(chat)}
                >
                  {chatUser.dp ? (
                    <>
                      <Avatar
                        src={POST_URL + `${chatUser.dp}.jpg`}
                        alt="avatar"
                        className="h-12 w-12"
                      />
                      <div
                        className={`md:flex hidden flex-col ${
                          checkNotificationStatus(notification, chat._id)
                            ? ` font-semibold`
                            : ``
                        }`}
                      >
                        <p className="text-lg">{chatUser.userName}</p>
                        <p className="text-md">{chat.latestMessage.content}</p>
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
              ))
          )
        )}
      </div>

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

export default Chat;
