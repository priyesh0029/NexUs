import React, { useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { handleSavePost } from "../../../api/apiConnections/User/userConnections";
import { SetSavePost } from "../../../features/redux/slices/user/homeSlice";

interface ImanagePostProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openEdit : boolean;
  setOpenEdit : React.Dispatch<React.SetStateAction<boolean>>;
  postedUser :string
  postId:string
}

const ManageComment: React.FC<ImanagePostProps> = (props) => {
  const { open, setOpen,openEdit,setOpenEdit,postedUser,postId} = props;

  const dispatch = useDispatch()

  const handleOpen = () => setOpen(!open);
  const editPost = () => {
    setOpenEdit(!openEdit);
    handleOpen();
  };

  const handlePostSave = async()=>{
    const response = await handleSavePost(postId)
    console.log("response of saving post : ",response);
    if(response.status){
        dispatch(SetSavePost(response.postId))
    }
    
  }

  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  return (
    <>
      <Dialog size="xs" open={open} handler={handleOpen} className="border-none">
        <div className="flex items-center flex-col ">
         { user.userName !== postedUser ? <div className="text-md text-red-800 font-semibold w-full text-center  border-t border-b border-gray-400">
            Report
          </div>:""}
          { user.userName === postedUser ?<div
            className="text-md text-gray-800 font-semibold w-full text-center  border-b border-gray-400"
            onClick={editPost}
          >
            Edit
          </div>:""}
         { user.userName !== postedUser ? <div className="text-md text-blue-800 font-semibold w-full text-center  border-b border-gray-400">
            follow
          </div>:""}
         
          <div className="text-md text-gray-800 font-semibold w-full text-center  border-b border-gray-400" onClick={handlePostSave}>
            {!user.savedPost || !user.savedPost.includes(postId) ? "Save":"unsave"}
          </div>
          {user.userName === postedUser ?<div className="text-md text-gray-800 font-semibold w-full text-center   border-b border-gray-400">
            Delete
          </div>:""}
        </div>
      </Dialog>
    </>
  );
};

export default ManageComment;