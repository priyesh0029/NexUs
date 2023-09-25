import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Avatar,
  Radio,
  Chip,
} from "@material-tailwind/react";
import { searchUser } from "../../../api/apiConnections/User/userConnections";
import { Link } from "react-router-dom";
import { POST_URL } from "../../../constants/constants";
import { UserCircleIcon } from "@heroicons/react/24/outline";
interface ChatSearchProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createOrAccessOnetoOneChat: (user: string) => void;
  createOrAccessGroupChatToChatList: (users: string[]) => void;
}

interface IchatUsers {
  userName: string;
  userId: string;
}

const ChatSearch: React.FC<ChatSearchProps> = ({
  open,
  setOpen,
  createOrAccessOnetoOneChat,
  createOrAccessGroupChatToChatList,
}) => {
  const handleOpen = () => setOpen(!open);

  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<UserInfo[]>([]);
  const [chatUsers, setChatUsers] = useState<IchatUsers[]>([]);

  const handleInput = (e: any) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setSearchResults([]);
    } else {
      getSearchData(e.target.value);
    }
  };

  const getSearchData = async (search: string) => {
    const data: UserInfo[] = await searchUser(search);
    const filteredData = data.filter(
      (user) =>
        !chatUsers.some((chatUser) => user.userName === chatUser.userName)
    );
    setSearchResults(filteredData);
  };

  //add user to chatlist

  const handleAddChatUserList = (userName: string, userId: string) => {
    setChatUsers([...chatUsers, { userName, userId }]);
    setSearchText("");
    const updatedsearchResults = searchResults.filter(
      (user) => user.userName !== userName
    );
    console.log("updatedChatUsers :", updatedsearchResults);
    setSearchResults(updatedsearchResults);
  };

  //remove user from chatlist
  const handleRemoveChatUserList = (userName: string) => {
    console.log("userName :", userName);
    const updatedChatUsers = chatUsers.filter(
      (user) => user.userName !== userName
    );
    console.log("updatedChatUsers :", updatedChatUsers);
    setChatUsers(updatedChatUsers);
  };
  console.log("chatUsers.length :", chatUsers);

  //handle submit create Or AccessChat
  const handleChatSubmit = async () => {
    if (chatUsers.length > 1) {
      const chatUsersId = chatUsers.map((user) => {
        return user.userId;
      });
      console.log("chatUsers.length conformation: ", chatUsersId);
      createOrAccessGroupChatToChatList(chatUsersId);
    } else {
      createOrAccessOnetoOneChat(chatUsers[0].userId);
    }
    setOpen(!open)
  };
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex justify-center flex-col w-full pb-6">
          <div className="flex justify-center border-b-2 border-gray-300 py-2 w-full">
            <p className="font-semibold text-xl pt-4 text-black items-center">
              New message
            </p>
          </div>

          <div className="w-full p-4 border-black">
            <Input label="Search" value={searchText} onChange={handleInput} />
            {chatUsers.length !== 0 ? (
              <div className="flex gap-2 p-2  flex-wrap">
                {chatUsers.map((user, index) => (
                  <Chip
                    key={index}
                    value={user.userName}
                    className="rounded-full "
                    onClose={() => handleRemoveChatUserList(user.userName)}
                  />
                  //  {/* </div> */}
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
          {searchResults.map((user) => (
            <div className=" flex flex-col items-start w-full px-6 hover:bg-gray-100 cursor-pointer py-2 mb-2">
              <div
                className="flex justify-between w-full"
                onClick={() => handleAddChatUserList(user.userName, user._id)}
              >
                <div className="flex w-full items-center">
                  {user.dp ? (
                    <Avatar
                      src={POST_URL + `${user.dp}.jpg`}
                      alt="avatar"
                      className="h-14 w-14 p-1 "
                    />
                  ) : (
                    <UserCircleIcon className="h-14 w-14 text-gray-500" />
                  )}
                  <p className="text-lg font-normal p-1">{user.userName}</p>
                </div>
                <div className="flex">
                  <Radio name="type" />
                </div>
              </div>
            </div>
          ))}
        </div>
        {chatUsers.length !== 0 ? (
          <div className="p-2 mb-2">
            <button
              className="border-2 rounded-xl w-full bg-blue-800 text-white py-2"
              onClick={handleChatSubmit}
            >
              Chat
            </button>
          </div>
        ) : (
          ""
        )}
      </Dialog>
    </>
  );
};

export default ChatSearch;
