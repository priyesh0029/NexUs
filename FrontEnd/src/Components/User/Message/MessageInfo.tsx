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
import ChangeGroupNameModal from "./GroupNameModal";
import ManageGroupChatModal from "./ChatInfoOptModal";

interface IMessageInfoDrawerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MessageInfoDrawer: React.FC<IMessageInfoDrawerProps> = ({
  open,
  setOpen,
}) => {
  const closeDrawer = () => setOpen(false);
  const dispatch = useDispatch();

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
    dispatch(setSelectedChat(response));
  };

  //to handle group name
  const [groupNameModal, setGroupNameModal] = useState<boolean>(false);
  const handleGroupName = async () => {
    setGroupNameModal(!groupNameModal);
  };

  //to handle and manage group chat 
  const [groupManageModal, setGroupManageModal] = useState<boolean>(false);
  const[chatUserId,setChatUserId] = useState<string>('')
  const handleGroupManageModal = (chatUserId :string) => {
    setChatUserId(chatUserId)
    setGroupManageModal(!groupManageModal);
  };

  return (
    <React.Fragment>
      <Drawer
        placement="right"
        open={open}
        className="pt-6 flex-col items-center justify-between w-full h-full"
      >
        <div className="flex flex-col border-b-2 border-gray-300 min-h-[20%] max-h-[20%]">
          <div className=" flex px-4  justify-between">
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
          <div className="flex justify-between px-4 py-8">
            <p className="text-gray-900 text-md ">change your group Name</p>
            <button
              className="border-2 bg-gray-400 px-2 rounded-lg"
              onClick={handleGroupName}
            >
              change
            </button>
          </div>
        </div>
        <div className="border-b-2 border-gray-300 flex flex-col px-4 min-h-[50%] max-h-[50%]">
          <div className="flex justify-between cursor-pointer">
            <p className="py-3 text-md font-semibold">Members</p>
            {selectedChat.groupAdmin ? (
              <p
                className="py-3 text-sm text-blue-600 font-normal"
                onClick={handleNewChatSearch}
              >
                Add People
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col overflow-y-scroll scrollbar-hide">
            {selectedChat.isGroupChat
              ? selectedChat.users.map((user) => (
                  <div
                    key={user.userName}
                    className="flex justify-between px-4 mt-5 cursor-pointer hover:bg-gray-100 items-center"
                  >
                    <div>
                      {user.dp ? (
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={POST_URL + `${user.dp}.jpg`}
                            alt="avatar"
                            className="h-12 w-12"
                          />
                          <div className="flex flex-col">
                            <p className="text-md">{user.userName}</p>
                            <p className="text-sm text-gray-700">{user.name}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex">
                          <UserCircleIcon className="h-10 w-10 text-gray-700" />
                          <p>{user.userName}</p>
                        </div>
                      )}
                    </div>
                    {user.userName !== loggedUser.userName ? (
                      <div>
                        <EllipsisHorizontalIcon className="h-6 w-6 text-gray-500" onClick={()=>handleGroupManageModal(user._id)}/>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))
              : selectedChat.users
                  .filter(
                    (chatUser) => chatUser.userName !== loggedUser.userName
                  )
                  .map((singleUser) => (
                    <div
                      key={singleUser.userName}
                      className="flex justify-between px-4 mt-5 cursor-pointer hover:bg-gray-100 items-center"
                    >
                      <div>
                        {singleUser.dp ? (
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={POST_URL + `${singleUser.dp}.jpg`}
                              alt="avatar"
                              className="h-12 w-12"
                            />
                            <div className="flex flex-col">
                              <p className="text-md">{singleUser.userName}</p>
                              <p className="text-sm text-gray-700">
                                {singleUser.name}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex">
                            <UserCircleIcon className="h-10 w-10 text-gray-700" />
                            <p>{singleUser.userName}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
          </div>
        </div>
        <div className="flex flex-col px-10 min-h-[20%] max-h-[20%] gap-2 py-8 mb-8 cursor-pointer">
          {selectedChat.groupAdmin ? (
            <>
              <p className="text-red-500 font-normal">Leave chat</p>
              <p className="text-gray-700 font-normal text-sm">
                You won't get messages from this group unless someone adds you
                back to the chat.
              </p>
            </>
          ) : (
            <>
              <p className="text-red-500 font-normal">Report</p>
              <p className="text-red-500 font-normal">Block</p>
            </>
          )}
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
      {groupNameModal && (
        <ChangeGroupNameModal
          open={groupNameModal}
          setOpen={setGroupNameModal}
        />
      )}
      {groupManageModal && (
        <ManageGroupChatModal
          open={groupManageModal}
          setOpen={setGroupManageModal}
          chatUserId={chatUserId}
        />
      )}
    </React.Fragment>
  );
};
export default MessageInfoDrawer;
