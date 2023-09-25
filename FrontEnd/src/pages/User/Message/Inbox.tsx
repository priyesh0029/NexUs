import { useEffect, useState } from "react";
import SmallSideBar from "../../../Components/User/Home/SmallSideBar";
import Chat from "../../../Components/User/Message/Chat";
import Message from "../../../Components/User/Message/Message";
import { createOrAccessChat, createOrAccessGroupChat, getUserChats } from "../../../api/apiConnections/User/chatConnections";
import { useDispatch } from "react-redux";
import { clearSelectedChat } from "../../../features/redux/slices/user/chatSlice";

const Inbox = () => {
  const [chatList, setChatList] = useState<IuserChatList[]>([]);
  const dispatch = useDispatch()

  dispatch(clearSelectedChat())

  useEffect(() => {
    handleGetUserChats();
  }, []);

  //to fetch chats of the user

  const handleGetUserChats = async () => {
    const response = await getUserChats();
    console.log("respons eof handleGetUserChats after api call : ", response);
    if (response.length > 0) {
      setChatList(response);
    }
  };

  //create new one to one chat
  const createOrAccessOnetoOneChat = async (userId: string) => {
    const response = await createOrAccessChat(userId);
    console.log(
      "respons eof createOrAccessOnetoOneChat after api call : ",
      response
    );
    setChatList((prevState) => {
      if (prevState.some((chat) => chat._id === response._id)) {
        return prevState;
      } else {
        return [response, ...prevState];
      }
    });
  };

  //create or access group chat
  const createOrAccessGroupChatToChatList = async (users: string[]) => {
    console.log("group chat useridsss: ", users);
    const response = await createOrAccessGroupChat(users);
    console.log(
      "respons eof createOrAccessOnetoOneChat after api call : ",
      response
    );
    setChatList((prevState) => {
      if (prevState.some((chat) => chat._id === response._id)) {
        return prevState;
      } else {
        return [response, ...prevState];
      }
    });
  };

  return (
    <div className="flex w-full h-full">
      <div className="flex">
        <SmallSideBar />
      </div>
      <div className="flex w-[calc(100vw-28rem)] max-w-[22rem] md:ml-[6rem] max-h-screen">
        <Chat chatList ={chatList} createOrAccessOnetoOneChat={createOrAccessOnetoOneChat} createOrAccessGroupChatToChatList={createOrAccessGroupChatToChatList}/>
      </div>
      <div className="flex w-screen max-h-screen">
        <Message createOrAccessOnetoOneChat={createOrAccessOnetoOneChat} createOrAccessGroupChatToChatList={createOrAccessGroupChatToChatList}/>
      </div>
    </div>
  );
};

export default Inbox;