import { Avatar, Tooltip } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { POST_URL } from "../../../constants/constants";
import {
  ChatBubbleLeftRightIcon,
  InformationCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { VideoCameraIcon } from "@heroicons/react/20/solid";
import ChatboxTextarea from "./ChatTextArea";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import ChatSearch from "./chatSearch";
import {
  fetchallMessagesOfChat,
  saveChatNotification,
  sentNewMessage,
} from "../../../api/apiConnections/User/chatConnections";
import {
  isLastMessage,
  isSameSender,
  isSameUser,
  sameCenterMargin,
} from "../../../constants/chatLogics";
import { io, Socket } from "socket.io-client";
import {
  SetNewMessage,
  SetNotification,
} from "../../../features/redux/slices/user/chatSlice";
import Lottie from "react-lottie";
import animationData from "../../../Animaitons/typing.json";
import MessageInfoDrawer from "./MessageInfo";
import Peer from "peerjs";
import VideoPlayer from "./videoCall";

interface ImessageProps {
  fetchAgain: boolean;
  setFetchAgain: React.Dispatch<React.SetStateAction<boolean>>;
  createOrAccessOnetoOneChat: (user: string) => void;
  createOrAccessGroupChatToChatList: (users: string[]) => void;
}

// let ENDPOINT = process.env.SERVER_URL
let ENDPOINT = process.env.BASE_URL;
let socket: Socket, selectedChatCompare: IuserChatList;

const Message: React.FC<ImessageProps> = ({
  fetchAgain,
  setFetchAgain,
  createOrAccessOnetoOneChat,
  createOrAccessGroupChatToChatList,
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSetttings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  const selectedChat = useSelector(
    (store: { chat: { userChat: IuserChatList } }) => store.chat.userChat
  );

  const notification = useSelector(
    (store: { chat: { notification: string[] } }) => store.chat.notification
  );

  const dispatch = useDispatch();

  const [chatSearchOpen, setChatSearchOpen] = useState(false);
  const [messages, setMessages] = useState<Imessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [socketConnected, setSocketConnected] = useState(false);
  const chatDivRef = useRef<HTMLDivElement | null>(null);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIstyping] = useState(false);
  const [room, setRoom] = useState<string>("");
  const [openInfoDrawer, SetOpenInfoDrawer] = useState<boolean>(false);
  //peer connection state
  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const[otherUserPeerId,SetOtherUserPeerId] = useState<string>('')
  //socket io connection
  useEffect(() => {
      socket = io(ENDPOINT as string);
      socket.emit("setup", user.userName);
      socket.on("connected", () => setSocketConnected(true));
      socket.on(
        "typing",
        (room) => (setRoom(() => room), setIstyping(() => true))
      );
      socket.on("stop typing", () => setIstyping(() => false));

      return () => {
        socket.off("connected");
        socket.off("setup");
      };
  }, []);


  useEffect(()=>{
    if (selectedChat._id.length > 0) {
      const meId = user._id;
       const peer = new Peer(meId);
        setMe(peer);
    }
  
  },[selectedChat])
  //to fetch messages of the chat using selectedChat._id
  useEffect(() => {
    if (selectedChat._id.length > 0) {
      fetchallMessages();
      selectedChatCompare = selectedChat;
    }
    if (me) {
      console.log("me : ", me);

      socket.emit("join chat", {
        room: selectedChat._id,
        user: user.userName,
        peerId: user._id,
      });
      // socket.on("user-joined", ({ peerId }) => {
      //   SetOtherUserPeerId(peerId)
      // });
      // socket.on("get-users", ({ participants }: { participants: string[] }) => {
      //   console.log({ participants });
      //   socket.on("user-disconnected", (peerId: string) => {
      //     // dispatch(removePeerAction(peerId));
      //   });
      //  });
    }
  }, [selectedChat, me]);

  //handle new mesaagess event using socket.on("message received", (newMesageReceived)
  useEffect(() => {
    socket.on("message received", (newMesageReceived) => {
      // dispatch(SetNewMessage("message received"))
      console.log("--------------newMesageReceived : ", newMesageReceived);

      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMesageReceived.chatId._id
      ) {
        //notification
        const notificationStatus = notification.some(
          (notify) => notify === newMesageReceived.chatId._id
        );
        console.log(
          "--------------notificationStatus : ",
          notification,
          notificationStatus
        );
        if (!notificationStatus) {
          dispatch(
            SetNotification([newMesageReceived.chatId._id, ...notification])
          );
          setFetchAgain(!fetchAgain);
          handleSaveChatNotification(newMesageReceived.chatId._id);
        }
      } else {
        setMessages((prevState) => [...prevState, newMesageReceived]);
      }
    });

    return () => {
      socket.off("message received");
    };
  }, [notification]);

  // to handle Save Notification

  const handleSaveChatNotification = async (chatId: string) => {
    const response = await saveChatNotification(chatId);
    console.log("notification save after new message response : ", response);
  };
  //to open search modal
  const handleNewChatSearch = () => {
    setChatSearchOpen(!chatSearchOpen);
  };

  //to fetch all messages of the chat
  const fetchallMessages = async () => {
    const response: Imessage[] = await fetchallMessagesOfChat(selectedChat._id);
    console.log("fetch all Messages Of Chat response : ", response);
    setMessages(response);
    scrollToBottom();
  };

  //typin Handler for message while typing

  const typinHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(event.target.value);

    //typing indicator logic
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;

    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  // to sent a message

  const sendMessage = async () => {
    if (newMessage.length === 0) return;
    const response: Imessage = await sentNewMessage(
      newMessage,
      selectedChat._id
    );
    socket.emit("stop typing", selectedChat._id);
    setTyping(false);
    setNewMessage("");
    console.log("newMessage sent by usern response : ", response);
    socket.emit("new message", response);
    setMessages([...messages, response]);
    scrollToBottom();
    // dispatch(SetNewMessage("message received"))
  };

  //scroll to bottom function for messages
  const scrollToBottom = () => {
    if (chatDivRef.current) {
      console.log("Scrolling to bottom...");
      chatDivRef.current.scrollTop = chatDivRef.current.scrollHeight;
    }
  };
  //handle InfoDrawer
  const handleInfoDrawer = () => {
    SetOpenInfoDrawer(true);
  };

  //to handle video call
  //------------------------------------------------------------//
  // const navigate = useNavigate();

  
  const [videocall, setVideoCall] = useState<boolean>(false);
  const[connectedUsesrs,SetConnectedUsesrs] = useState<string[]>([])

  const handleVideocall = () => {
    setVideoCall(!videocall);
  };

  // const [peers, dispatch] = useReducer(peersReducer, {});

  // console.log({ peers });

  useEffect(() => {
    //for video  chat strat
    if (videocall) {
      try {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            console.log("stream navigator.mediaDevices.then : ", stream); 
            setStream(stream);
          });
      } catch (error) {
        console.error(error);
      }
     
    }
    socket.emit("join videoChat", selectedChat._id)
    socket.on("get-users", ({ participants }: { participants: string[] }) => {
      console.log("socket.on(=get-users  : ", participants );
      SetConnectedUsesrs(participants)
     });
     const peerId = connectedUsesrs.filter((peerId)=> peerId !== user._id)
     SetOtherUserPeerId(peerId[0])
    //for video chat end
  }, [videocall]);

  // useEffect(() => {
  //   console.log("set me value showing in useeffect : ", me);
  //   if (me)
  //     socket.emit("join videoChat", {
  //       room: selectedChat._id,
  //       user: user.userName,
  //       peerId: user._id,
  //     });
  // }, [me]);

  const[usersSteam,setUsersStream] = useState<MediaStream>()
  const [callStatus, setCallStatus] = useState<string>("idle"); // States: "idle", "outgoing", "incoming", "connected"
  const [incomingCallPeerId, setIncomingCallPeerId] = useState(null);


  useEffect(() => {
    if (!me) return;
    if (!stream) return;
    if (!videocall) return;
   
      const call = me.call(otherUserPeerId, stream);
      call.on("stream", (peerStream) => {
        console.log("call.on(stream) : ", peerStream);
        // dispatch((peerId, peerStream));
        setCallStatus("outgoing")
        setUsersStream(peerStream)
      });
   
   
      me.on("call", (incomingCall) => {
        incomingCall.answer(stream);
        incomingCall.on("stream", (peerStream) => {
        console.log("call.answer(stream) : ", peerStream);
        // dispatch(addPeerAction(call.peer, peerStream));
        setUsersStream(peerStream)
      });
    });

  }, [me,stream]);

  return (
    <div className="flex w-full min-h-screen max-h-screen flex-col">
      {usersSteam && stream &&(
        <VideoPlayer
        //  stream={stream}
         open={videocall} setOpen={setVideoCall} usersSteam={usersSteam} myStream ={stream}
          />
      )}
      {selectedChat._id.length > 0 ? (
        selectedChat.users
          .filter((chatUser: UserInfo) => chatUser.userName !== user.userName)
          .slice(-1)
          .map((chatUser: UserInfo) => (
            <div
              key={`${chatUser._id}user`}
              className="flex flex-col min-h-screen max-h-screen justify-between"
            >
              <div className="flex  justify-between px-8 py-4 items-center border-b-2 border-gray-300">
                <div className="flex justify-start items-center gap-3">
                  {selectedChat.isGroupChat ? (
                    <>
                      <div className="flex items-center -space-x-8">
                        {selectedChat.users.map((user: UserInfo) => (
                          <Avatar
                            key={`${user.dp}messageGroupChat`}
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
                <div className="flex gap-4">
                  {!selectedChat.isGroupChat ? (
                    <VideoCameraIcon
                      className="h-6 w-6 text-black"
                      onClick={handleVideocall}
                    />
                  ) : (
                    <></>
                  )}
                  <InformationCircleIcon
                    className="h-6 w-6 text-black"
                    onClick={handleInfoDrawer}
                  />
                </div>
              </div>
              <div className=" overflow-y-scroll" id="chatDiv" ref={chatDivRef}>
                {selectedChat.isGroupChat ? (
                  <div
                    className="flex justify-center flex-col p-4 gap-4 items-center cursor-pointer"
                    key={`${selectedChat._id}selectedChat`}
                  >
                    <div className="flex items-center -space-x-16 pt-6">
                      {selectedChat.users.map((user: UserInfo) => (
                        <Avatar
                          key={`${user.dp}usersdp`}
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
                <div className="pt-20 px-1 flex flex-col ">
                  {messages &&
                    messages.map((message: Imessage, index) => (
                      <div
                        className="flex px-8 "
                        key={`${message._id}messageId`}
                      >
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
                          } max-w-[60%] break-words ml-${sameCenterMargin(
                            messages,
                            message,
                            index,
                            user.userName
                          )} 
                            ${
                              isSameUser(messages, message, index)
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
              <div className="py-12 md:py-2 px-2 w-full flex-col ">
                {isTyping && selectedChat._id === room ? (
                  <div>
                    <Lottie
                      options={defaultOptions}
                      width={70}
                      style={{ marginBottom: 15, marginLeft: 0 }}
                      key={`${room}room`}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <ChatboxTextarea
                  newMessage={newMessage}
                  setNewMessage={setNewMessage}
                  sendMessage={sendMessage}
                  typinHandler={typinHandler}
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
      {openInfoDrawer && (
        <MessageInfoDrawer
          open={openInfoDrawer}
          setOpen={SetOpenInfoDrawer}
          fetchAgain={fetchAgain}
          setFetchAgain={setFetchAgain}
        />
      )}
    </div>
  );
};

export default Message;
