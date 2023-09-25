import { Avatar, Input, Tooltip } from "@material-tailwind/react";
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
import { useEffect, useState } from "react";
import ChatSearch from "./chatSearch";
import {
  fetchallMessagesOfChat,
  sentNewMessage,
} from "../../../api/apiConnections/User/chatConnections";
import { isLastMessage, isSameSender } from "../../../constants/chatLogics";

interface ImessageProps {
  createOrAccessOnetoOneChat: (user: string) => void;
  createOrAccessGroupChatToChatList: (users: string[]) => void;
}

const Message: React.FC<ImessageProps> = ({
  createOrAccessOnetoOneChat,
  createOrAccessGroupChatToChatList,
}) => {
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  const selectedChat = useSelector(
    (store: { chat: { userChat: IuserChatList } }) => store.chat.userChat
  );
  const [chatSearchOpen, setChatSearchOpen] = useState(false);
  const [messages, setMessages] = useState<Imessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const handleNewChatSearch = () => {
    setChatSearchOpen(!chatSearchOpen);
  };

  useEffect(() => {
    if (selectedChat._id.length > 0) {
      fetchallMessages();
    }
  }, [selectedChat]);

  //to fetch all messages of the chat
  const fetchallMessages = async () => {
    const response: Imessage[] = await fetchallMessagesOfChat(selectedChat._id);
    console.log("fetch all Messages Of Chat response : ", response);
    setMessages(response);
  };

  // to sent a message

  const sendMessage = async () => {
    const response = await sentNewMessage(newMessage, selectedChat._id);
    setNewMessage("");
    console.log("newMessage sent by usern response : ", response);
  };
  return (
    <div className="flex w-full min-h-screen flex-col">
      {selectedChat._id.length > 0 ? (
        selectedChat.users
          .filter((chatUser: UserInfo) => chatUser.userName !== user.userName)
          .map((chatUser: UserInfo) => (
            <div
              key={chatUser._id}
              className="flex flex-col min-h-screen justify-between"
            >
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
                {selectedChat.isGroupChat ? (
                  <div
                    className="flex justify-center flex-col p-4 gap-4 items-center cursor-pointer"
                    key={selectedChat._id}
                  >
                    <div className="flex items-center -space-x-16 pt-6">
                      {selectedChat.users.map((user: UserInfo) => (
                        <Avatar
                          key={user.dp}
                          variant="circular"
                          alt="user 1"
                          className="border-2 border-white hover:z-10 focus:z-10"
                          src={POST_URL + `${user.dp}.jpg`}
                          size="xxl"
                        />
                      ))}
                    </div>
                    <div className="md:flex hidden">
                      <p className="font-2xl text-2xl">
                        {selectedChat.chatName}
                      </p>
                    </div>
                  </div>
                ) : (
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
                )}

                {/* view messages here */}
                <div className="pt-20 px-8">
                  {messages &&
                    messages.map((message: Imessage, index) => (
                      // <div className="flex" key={message._id}>
                      //   {(isSameSender(
                      //     messages,
                      //     message,
                      //     index,
                      //     user.userName
                      //   ) ||
                      //     isLastMessage(messages, index, user.userName)) && (
                      //     <Tooltip
                      //       className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-black"
                      //       content="Home"
                      //       placement="right"
                      //     >
                      //       {message.content}
                      //     </Tooltip>
                      //   )}
                      // </div>
                      <div className="flex" key={message._id}>
                        <Tooltip
                          className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-black"
                          content="Home"
                          placement="right"
                        >
                          {message.content} {message.content}  {isSameSender(
                          messages,
                          message,
                          index,
                          user.userName
                        )}
                        </Tooltip>
                    </div>
                    ))}
                </div>
              </div>
              <div className="py-12 md:py-2 px-2 w-full flex ">
                <ChatboxTextarea
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  sendMessage={sendMessage}
                />
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
