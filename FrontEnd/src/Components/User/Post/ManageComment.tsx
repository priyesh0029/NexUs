import React, { useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import {
  deleteComment,
  deleteReply,
  reportComment,
  reportReply,
} from "../../../api/apiConnections/User/postConnections";
import ConfirmDialouge from "../assetComponents/ConfirmModal";
import ReportModal from "./ReportModal";

interface ImanagePostProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  commentId: string;
  commentedUser: string;
  postedUser: string;
  commentArr?: Comment[];
  setCommentArr?: React.Dispatch<React.SetStateAction<Comment[]>>;
  replyId?: string;
  replyArr?: Reply[];
  setReplyArr?: React.Dispatch<React.SetStateAction<Reply[]>>;
  repliedUser?: string;
}

const ManageComment: React.FC<ImanagePostProps> = (props) => {
  let {
    open,
    setOpen,
    commentId,
    commentedUser,
    postedUser,
    commentArr,
    setCommentArr,
    replyId,
    replyArr,
    setReplyArr,
    repliedUser,
  } = props;

  const [confirmModal, setConfirmModal] = useState(false);

  const handleOpen = () => setOpen(!open);
  const handleConfirmModal = () => {
    setConfirmModal(!confirmModal);
  };

  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  const handleDeleteComment = async () => {
    const response = await deleteComment(commentId);
    handleOpen();
    if (commentArr !== undefined && setCommentArr !== undefined) {
      const updatedCommentdArr = commentArr.filter(
        (comment) => comment._id !== response._id
      );
      setCommentArr(updatedCommentdArr);
    }
  };

  const handleDeleteReply = async () => {
    if (typeof replyId === "string") {
      const response = await deleteReply(commentId, replyId);
      handleOpen();
      console.log("log response of delete reply : ", response);

      if (replyArr !== undefined && setReplyArr !== undefined) {
        console.log("replyarray : ", replyArr);

        const updatedReplyArr = replyArr.filter(
          (reply) => reply._id !== response
        );
        setReplyArr(updatedReplyArr);
      }
    }
  };

  //report comment
  const [reportPageOpen, setReportPageOpen] = useState(false);
  const handleReportPage = () => {
    setReportPageOpen(!reportPageOpen);
  };

  const handleReportComment = async(report: string) => {
    const response = await reportComment(commentId,report)
    console.log("response f reported post : ", response);
    if(response){
      handleOpen()
    }
  };

  //report Reply

  const handleReportReply = async(report: string) => {
    if (typeof replyId === "string") {
      const response = await reportReply(commentId,replyId,report)
      console.log("response f reported post : ", response);
      if(response){
        handleOpen()
      }
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
          {(user.userName === postedUser &&
            user.userName === commentedUser &&
            repliedUser !== undefined &&
            user.userName !== repliedUser) ||
          (user.userName === postedUser &&
            user.userName !== commentedUser &&
            repliedUser === undefined) ? (
            <>
              <div
                className="text-md text-gray-800 font-semibold w-full text-center  border-b border-gray-400"
                onClick={handleConfirmModal}
              >
                Delete
              </div>
              <div
                className="text-md text-red-800 font-semibold w-full text-center  border-t border-b border-gray-400"
                onClick={handleReportPage}
              >
                Report
              </div>
            </>
          ) : (user.userName !== postedUser &&
              user.userName === commentedUser &&
              repliedUser === undefined) ||
            (user.userName !== postedUser &&
              user.userName !== commentedUser &&
              repliedUser !== undefined &&
              user.userName === repliedUser) ||
            (user.userName !== postedUser &&
              user.userName === commentedUser &&
              repliedUser !== undefined &&
              user.userName === repliedUser) ? (
            <div
              className="text-md text-gray-800 font-semibold w-full text-center  border-b border-gray-400"
              onClick={handleConfirmModal}
            >
              Delete
            </div>
          ) : (user.userName !== postedUser &&
              user.userName !== commentedUser &&
              repliedUser === undefined) ||
            (user.userName !== postedUser &&
              user.userName !== commentedUser &&
              repliedUser !== undefined &&
              user.userName !== repliedUser) ||
            (user.userName !== postedUser &&
              user.userName === commentedUser &&
              repliedUser !== undefined &&
              user.userName !== repliedUser) ? (
            <div className="text-md text-red-800 font-semibold w-full text-center  border-t border-b border-gray-400" onClick={handleReportPage}>
              Report
            </div>
          ) : (
            <div
              className="text-md text-gray-800 font-semibold w-full text-center  border-b border-gray-400"
              onClick={handleConfirmModal}
            >
              Delete
            </div>
          )}
          {confirmModal && (
            <ConfirmDialouge
              open={confirmModal}
              setOpen={setConfirmModal}
              item={
                replyId !== undefined
                  ? "Delete this Reply"
                  : "Delete this Comment"
              }
              handleConfirmFunction={
                replyId !== undefined ? handleDeleteReply : handleDeleteComment
              }
            />
          )}
          <div
            className="text-md text-blue-800 font-semibold w-full text-center  border-b border-gray-400"
            onClick={handleOpen}
          >
            Cancel
          </div>
        </div>
        {reportPageOpen && (
          <ReportModal
            open={reportPageOpen}
            setOpen={setReportPageOpen}
            item={
              replyId !== undefined
                ? "Reply"
                : "Comment"
            }
            handleReport={replyId !== undefined
              ? handleReportReply
              : handleReportComment}
          />
        )}
      </Dialog>
    </>
  );
};

export default ManageComment;
