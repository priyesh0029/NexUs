import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { POST_URL } from "../../../constants/constants";
import {
  EllipsisHorizontalIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import ChatSearch from "./chatSearch";
import { addPeopleToChat } from "../../../api/apiConnections/User/chatConnections";
import { setSelectedChat } from "../../../features/redux/slices/user/chatSlice";

interface IMessageInfoDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageInfoDrawer: React.FC<IMessageInfoDrawerProps> = ({
  open,
  setOpen,
}) => {
  const closeDrawer = () => setOpen(false);
  const dispatch = useDispatch()

  const loggedUser = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  const selectedChat = useSelector(
    (store: { chat: { userChat: IuserChatList } }) => store.chat.userChat
  );

  //to handle add people search
  const [chatSearchOpen, setChatSearchOpen] = useState(false);
  const handleNewChatSearch = () => {
    setChatSearchOpen(!chatSearchOpen);
  };

  // handle add people to the chat api calll
  const handleAddPeople = async (newChatUsers: string[]) => {
    const response = await addPeopleToChat(newChatUsers, selectedChat._id);
    dispatch(setSelectedChat(response))
  };
  return (
    <React.Fragment>
      <Drawer
        placement="right"
        open={open}
        className="pt-6 flex-col items-center justify-between w-full h-full"
      >
        <div className=" border-b-2 border-gray-300 flex px-4 max-h-[20%] justify-between">
          <p className="py-4 text-lg font-semibold">Details</p>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <div className="border-b-2 border-gray-300 flex flex-col px-4 min-h-[65%]">
          <div className="flex justify-between cursor-pointer">
            <p className="py-3 text-md font-semibold">Members</p>
            <p
              className="py-3 text-sm text-blue-600 font-normal"
              onClick={handleNewChatSearch}
            >
              Add People
            </p>
          </div>
          {selectedChat.users.map((user) => (
            <div className=" flex justify-between px-4 mt-5 cursor-pointer">
              <div>
                {user.dp ? (
                  <div className="md:flex hidden items-center gap-3">
                    <Avatar
                      src={POST_URL + `${user.dp}.jpg`}
                      alt="avatar"
                      className="h-12 w-12 "
                    />
                    <div className="flex flex-col">
                      <p className="text-md">{user.userName}</p>
                      <p className="text-sm text-gray-700">{user.name}</p>
                    </div>
                  </div>
                ) : (
                  <div className="md:flex hidden">
                    <UserCircleIcon className="h-10 w-10 text-gray-700" />
                    <p>{user.userName}</p>
                  </div>
                )}
              </div>
              {user.userName !== loggedUser.userName ? (
                <div>
                  <EllipsisHorizontalIcon className="h-6 w-6 text-gray-500" />
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-col px-10 min-h-[20%] gap-2 py-8">
          <p className="text-red-500 font-normal">Leave chat</p>
          <p className="text-gray-700 font-normal text-sm">
            You won't get messages from this group unless someone adds you back
            to the chat.
          </p>
          <p className="text-red-500 font-normal">delete chat</p>
        </div>
      </Drawer>
      {chatSearchOpen && (
        <ChatSearch
          open={chatSearchOpen}
          setOpen={setChatSearchOpen}
          handleAddPeople={handleAddPeople}
        />
      )}
    </React.Fragment>
  );
};
export default MessageInfoDrawer;
