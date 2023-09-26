import { Avatar, Tooltip } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { POST_URL } from "../../../constants/constants";
import {
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { VideoCameraIcon } from "@heroicons/react/20/solid";
import ChatboxTextarea from "./ChatTextArea";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ChatSearch from "./chatSearch";
import {
  fetchallMessagesOfChat,
  sentNewMessage,
} from "../../../api/apiConnections/User/chatConnections";
import {
  isLastMessage,
  isSameSender,
  isSameUser,
  sameCenterMargin,
} from "../../../constants/chatLogics";
import { io, Socket } from "socket.io-client";

interface ImessageProps {
  createOrAccessOnetoOneChat: (user: string) => void;
  createOrAccessGroupChatToChatList: (users: string[]) => void;
}

// let ENDPOINT = process.env.SERVER_URL
let ENDPOINT = "http://localhost:5000";
let socket: Socket, selectedChatCompare: IuserChatList;

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
  const [newMessage, setNewMessage] = useState<string>("");
  const [socketConnected, setSocketConnected] = useState(false);
  const chatDivRef = useRef<HTMLDivElement | null>(null);
  const [typing,setTyping] =useState(false)
  const [isTyping,setIstyping] = useState(false)


  //socket io connection
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user.userName);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing",()=>setIstyping(()=>true))
    socket.on("stop typing",()=>setIstyping(()=>false))

  }, []);

  useEffect(() => {
    if (selectedChat._id.length > 0) {
      fetchallMessages();
      selectedChatCompare = selectedChat;
    }
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message received", (newMesageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMesageReceived.chatId._id
      ) {
        //notification
      } else {
        setMessages([...messages, newMesageReceived]);
      }
    });
  });

  //to open search modal
  const handleNewChatSearch = () => {
    setChatSearchOpen(!chatSearchOpen);
  };

  //to fetch all messages of the chat
  const fetchallMessages = async () => {
    const response: Imessage[] = await fetchallMessagesOfChat(selectedChat._id);
    console.log("fetch all Messages Of Chat response : ", response);
    setMessages(response);
    socket.emit("join chat", selectedChat._id);
    scrollToBottom();
  };

  //typin Handler for message while typing

  const typinHandler = (event : React.ChangeEvent<HTMLTextAreaElement>)=>{
    setNewMessage(event.target.value)

    //typing indicator logic
    if(!socketConnected) return

    if(!typing){
      setTyping(true)
      socket.emit("typing", selectedChat._id)
    }
    let lastTypingTime = new Date().getTime()
    let timerLength = 3000


    setTimeout(()=>{
      let timeNow = new Date().getTime()
      let timeDiff = timeNow - lastTypingTime

      if(timeDiff >= timerLength && typing){
        socket.emit("stop typing",selectedChat._id)
        setTyping(false)
      }
    },timerLength)
  }
  
  // to sent a message

  const sendMessage = async () => {
    if(newMessage.length === 0)return
    const response: Imessage = await sentNewMessage(
      newMessage,
      selectedChat._id
    );
    socket.emit("stop typing",selectedChat._id)
    setTyping(false)
    setNewMessage("");
    console.log("newMessage sent by usern response : ", response);
    socket.emit("new message", response);
    setMessages([...messages, response]);
    scrollToBottom();
  };

  //scroll to bottom function for messages
  const scrollToBottom = () => {
    if (chatDivRef.current) {
      console.log("Scrolling to bottom...");
      chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
    }
  };
  return (
    <div className="flex w-full min-h-screen flex-col">
      {selectedChat._id.length > 0 ? (
        selectedChat.users
          .filter((chatUser: UserInfo) => chatUser.userName !== user.userName)
          .slice(-1)
          .map((chatUser: UserInfo) => (
            <div
              key={chatUser._id}
              className="flex flex-col min-h-screen justify-between"
            >
              <div className="flex  justify-between px-8 py-4 items-center border-b-2 border-gray-300">
                <div className="flex justify-start items-center gap-3">
                  {selectedChat.isGroupChat ? (
                    <>
                      <div className="flex items-center -space-x-8">
                        {selectedChat.users.map((user: UserInfo) => (
                          <Avatar
                            key={user.dp}
                            variant="circular"
                            alt="user 1"
                            className="border-2 border-white hover:z-10 focus:z-10"
                            src={POST_URL + `${user.dp}.jpg`}
                            size="md"
                          />
                        ))}
                      </div>
                      <div className="md:flex hidden">
                        <p className="font-2xl text-2xl">
                          {selectedChat.chatName}
                        </p>
                      </div>
                    </>
                  ) : chatUser.dp ? (
                    <>
                      <Avatar
                        src={POST_URL + `${chatUser.dp}.jpg`}
                        alt="avatar"
                        className="h-12 w-12 "
                      />
                      <div className="flex">
                        <p>{chatUser.userName}</p>
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
              <div className=" overflow-y-scroll" id="chatDiv" ref={chatDivRef}>
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
                <div className="pt-20 px-1">
                  {messages &&
                    messages.map((message: Imessage, index) => (
                      <div className="flex px-8" key={message._id}>
                        {(isSameSender(
                          messages,
                          message,
                          index,
                          user.userName
                        ) ||
                          isLastMessage(messages, index, user.userName)) && (
                          <div className="flex items-center justify-center mt-2 ">
                            <Tooltip
                              className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-black"
                              content={message.sender.userName}
                              placement="bottom"
                            >
                              <Avatar
                                src={POST_URL + `${message.sender.dp}.jpg`}
                                alt={message.sender.userName}
                                size="sm"
                                className="mr-2"
                              />
                            </Tooltip>
                          </div>
                        )}
                        <div
                          className={`${
                            message.sender.userName === user.userName
                              ? "bg-blue-500 text-white rounded-xl p-1  px-4 "
                              : "bg-gray-300 text-black rounded-xl p-1  px-4"
                          } max-w-[75%] ml-${sameCenterMargin(
                            messages,
                            message,
                            index,
                            user.userName
                          )} 
                            ${
                              isSameUser(messages, message, index) ||
                              message.chatId.isGroupChat
                                ? "mt-1"
                                : "mt-8"
                            } block`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="py-12 md:py-2 px-2 w-full flex ">
                <ChatboxTextarea
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  sendMessage={sendMessage}
                  typinHandler={typinHandler}
                  isTyping = {isTyping}
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
