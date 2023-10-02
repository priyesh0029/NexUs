import React, { useState } from "react";
import {
  Button,
  Dialog,
  Input,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { handleSubmitChatName } from "../../../api/apiConnections/User/chatConnections";
import { setSelectedChat } from "../../../features/redux/slices/user/chatSlice";
interface ChangeGroupNameModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChangeGroupNameModal: React.FC<ChangeGroupNameModalProps> = ({
  open,
  setOpen,
}) => {
  const selectedChat = useSelector(
    (store: { chat: { userChat: IuserChatList } }) => store.chat.userChat
  );
  const handleOpen = () => setOpen(!open);
  const [newName, setNewName] = useState<string>(selectedChat.chatName);
  const [submit, setSubmit] = useState<boolean>(false);
  const dispatch = useDispatch()

  const handleGroupChatName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
    if (e.target.value !== selectedChat.chatName) {
      setSubmit(true);
    }else{
        setSubmit(false);
    }
  };

  const submitChatName = async()=>{
    const response = await handleSubmitChatName(newName,selectedChat._id)
    dispatch(setSelectedChat(response))
    handleOpen()
  }

  return (
    <Dialog open={open} handler={handleOpen} className="w-full " size="sm">
      <div className="flex flex-col items-center w-full justify-center">
        <div className="w-full flex  justify-center text-lg font-semibold border-b-2 border-gray-400 text-black">
          change group name
        </div>
        <div className=" w-full flex justify-center flex-col items-center px-4 gap-4 py-4">
          <div className="w-full flex justify-center">
            <p> Changing the name of a group chat changes it for everyone.</p>
          </div>
          <div className="w-full px-4">
            <Input
              color="blue"
              size="lg"
              label="group name"
              value={newName}
              onChange={handleGroupChatName}
            />
          </div>
        </div>
        <div className="flex py-4 w-full px-24">
          <Button type="submit" className="mt-6 " fullWidth disabled={!submit} onClick={submitChatName}>
            save
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default ChangeGroupNameModal;
