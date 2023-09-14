import React, { useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFollows,
  handleSavePost,
} from "../../../api/apiConnections/User/userConnections";
import {
  SetHandlefollows,
  SetSavePost,
} from "../../../features/redux/slices/user/homeSlice";
import {
  deletePost,
  reportPost,
} from "../../../api/apiConnections/User/postConnections";
import ConfirmDialouge from "../assetComponents/ConfirmModal";
import ReportModal from "./ReportModal";

interface ImanagePostProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openEdit: boolean;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  postedUser: string;
  postId: string;
  allPost: Post[];
  setAllPost: React.Dispatch<React.SetStateAction<Post[]>>;
  openComment: boolean;
  setOpencomment: React.Dispatch<React.SetStateAction<boolean>>;
}

const ManagePost: React.FC<ImanagePostProps> = (props) => {
  const {
    open,
    setOpen,
    openEdit,
    setOpenEdit,
    postedUser,
    postId,
    allPost,
    setAllPost,
    setOpencomment,
  } = props;
  const [confirmModal, setConfirmModal] = useState(false);

  const dispatch = useDispatch();

  const handleOpen = () => setOpen(!open);
  const editPost = () => {
    setOpenEdit(!openEdit);
    handleOpen();
  };

  const handlePostSave = async () => {
    const response = await handleSavePost(postId);
    console.log("response of saving post : ", response);
    if (response.status) {
      dispatch(SetSavePost(response.postId));
    }
  };

  const handleDeletePost = async () => {
    const response = await deletePost(postId);
    if (response) {
      console.log("post Deleted");
      const updatedPostArr = allPost.filter((post) => post._id !== postId);
      setAllPost(updatedPostArr);
      setOpencomment(false);
    }
  };

  const handleConfirmModal = () => {
    setConfirmModal(!confirmModal);
  };

  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  const followingStatus = user.following.some(
    (person) => person === postedUser
  );
  console.log("user.following : ", user.following, followingStatus);
  const [followButton, SetFollowButton] = useState<boolean>(followingStatus);

  const hanadleFollowUnfollow = async () => {
    const response = await handleFollows(postedUser, user.userName);
    if (response.status) {
      if (response.state === "added") {
        SetFollowButton(true);
        dispatch(SetHandlefollows(postedUser));
      } else if (response.state === "removed") {
        SetFollowButton(false);
        dispatch(SetHandlefollows(postedUser));
      }
    }
  };

  //report post
  const [reportPageOpen, setReportPageOpen] = useState(false);
  const handleReportPage = () => {
    setReportPageOpen(!reportPageOpen);
  };

  const handleReportPost = async (report: string) => {
    const response = await reportPost(postId, report);
    console.log("response f reported post : ", response);
    if(response){
      handleOpen()
    }
    
  };

  return (
    <>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="border-none"
      >
        <div className="flex items-center flex-col ">
          {user.userName !== postedUser ? (
            <div
              className="text-md text-red-800 font-semibold w-full text-center  border-t border-b border-gray-400"
              onClick={handleReportPage}
            >
              Report
            </div>
          ) : (
            ""
          )}

          {user.userName === postedUser ? (
            <div
              className="text-md text-gray-800 font-semibold w-full text-center  border-b border-gray-400"
              onClick={editPost}
            >
              Edit
            </div>
          ) : (
            ""
          )}
          {user.userName !== postedUser ? (
            <div
              className="text-md text-blue-800 font-semibold w-full text-center  border-b border-gray-400"
              onClick={hanadleFollowUnfollow}
            >
              {followButton ? "unfollow" : "follow"}
            </div>
          ) : (
            ""
          )}

          <div
            className="text-md text-gray-800 font-semibold w-full text-center  border-b border-gray-400"
            onClick={handlePostSave}
          >
            {!user.savedPost || !user.savedPost.includes(postId)
              ? "Save"
              : "unsave"}
          </div>
          {user.userName === postedUser ? (
            <div
              className="text-md text-red-800 font-semibold w-full text-center   border-b border-gray-400 "
              onClick={handleConfirmModal}
            >
              Delete
            </div>
          ) : (
            ""
          )}
        </div>
        {confirmModal && (
          <ConfirmDialouge
            open={confirmModal}
            setOpen={setConfirmModal}
            item={"Delete this Post"}
            handleConfirmFunction={handleDeletePost}
          />
        )}
        {reportPageOpen && (
          <ReportModal
            open={reportPageOpen}
            setOpen={setReportPageOpen}
            item={"Post"}
            handleReport={handleReportPost}
          />
        )}
      </Dialog>
    </>
  );
};

export default ManagePost;
