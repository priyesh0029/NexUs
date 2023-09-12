import React, { useRef, useState } from "react";
import { Dialog, Carousel, Avatar } from "@material-tailwind/react";
import { POST_URL } from "../../../constants/constants";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import {
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

import moment from "moment";
import LikeModal from "./likeModal";
import { useSelector } from "react-redux";
import {
  handleComment,
  handleCommentReply,
  handleLike,
} from "../../../api/apiConnections/User/postConnections";
import { HeartIcon, SolidHeartIcon } from "../assetComponents/postAssets";
import SingleComment from "./singleComment";
import { Link } from "react-router-dom";
import ManagePost from "./ManagePost";
import EditPost from "./EditPost";

interface CommentModalProps {
  openComment: boolean;
  setOpencomment: React.Dispatch<React.SetStateAction<boolean>>;
  imageArr: string[];
  createdAt: string;
  postedUser: string;
  description: string;
  setDescription : React.Dispatch<React.SetStateAction<string>>;
  likesArr: {
    userName: string;
    dp: string;
  }[];
  setLikesArr: React.Dispatch<
    React.SetStateAction<
      {
        userName: string;
        dp: string;
      }[]
    >
  >;
  postId: string;
  like: boolean;
  setLike: React.Dispatch<React.SetStateAction<boolean>>;
  commentArr: Comment[];
  setCommentArr: React.Dispatch<React.SetStateAction<Comment[]>>;
  postDp: string;
}

const CommentModal: React.FC<CommentModalProps> = (props) => {
  const {
    openComment,
    setOpencomment,
    imageArr,
    createdAt,
    postedUser,
    description,
    setDescription,
    likesArr,
    setLikesArr,
    postId,
    like,
    setLike,
    commentArr,
    setCommentArr,
    postDp,
  } = props;

  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  const handleOpen = () => setOpencomment(!openComment);
  const [openLike, setOpenLike] = useState(false);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [managePost, setManagePost] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const likeHandler = async () => {
    setLike(!like);
    const response = await handleLike(user.userName, postId);
    if (response.status) {
      if (response.state === "removed") {
        const updatedLikedArr = likesArr.filter(
          (person) => person.userName !== user.userName && person.dp !== user.dp
        );
        setLikesArr(updatedLikedArr);
      } else if (response.state === "added") {
        const newUser = { userName: user.userName, dp: user.dp };
        setLikesArr((prevLikedArr) => [...prevLikedArr, newUser]);
      }
    }
  };

  const handleLikeModalClick = () => {
    setOpenLike(!openLike);
  };

  const postCommentHandler = async () => {
    const newComment = await handleComment(user.userName, comment, postId);
    newComment.dp = user.dp;
    setComment("");
    setCommentArr((preCommentArr) => [newComment, ...preCommentArr]);
  };

  //ref function
  const focusInput = (user: string, commentId: string) => {
    if (inputRef.current) {
      inputRef.current.focus();
      setComment(`@${user} `);
      setCommentId(commentId);
    }
  };
  // comment reply
  const postCommentReplyHandler = async () => {
    const newComment = await handleCommentReply(
      user.userName,
      comment,
      commentId
    );
    console.log("reply comment newComment : ", newComment);
    setCommentArr((preCommentArr) =>
      preCommentArr.map((item) =>
        item._id === newComment._id
          ? { ...item, reply: newComment.reply }
          : item
      )
    );
    setComment("");
    setCommentId("");
  };

  //manage post
  const handleManagePost = () => {
    setManagePost(!managePost);
  };

  return (
    <>
      <Dialog
        open={openComment}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="xl"
        // style={{minHeight:"50%" , minWidth :"50%"}}
        // style={{display:"flex" }}
        className="flex flex-wrap"
      >
        <div className="flex h-full ">
          <div className="w-[56%] flex-shrink-0 overflow-hidden ">
            <Carousel className="">
              {imageArr.map((pic) => (
                <img
                  src={POST_URL + `${pic}.jpg`}
                  alt="image 1"
                  className="h-full w-full object-contain"
                  key={pic}
                />
              ))}
            </Carousel>
          </div>
          <div className="w-[46%] p-2 overflow-auto flex flex-col justify-between">
            <div className="flex flex-col overflow-y-auto max-h-full">
              <div className="flex justify-between">
                <div className="flex items-start">
                  {postDp ? (
                    <Avatar
                      src={POST_URL + `${postDp}.jpg`}
                      alt="avatar"
                      className="h-14 w-14 p-1 "
                    />
                  ) : (
                    <UserCircleIcon className="h-10 w-10 text-gray-700" />
                  )}
                  <div className="flex items-center">
                    <Link to={`/profile/${postedUser}`}>
                      <p className="text-md font-bold">{postedUser}</p>
                    </Link>
                    <p className="text-sm ml-1">
                      .{moment(createdAt).startOf("minutes").fromNow()}
                    </p>
                  </div>
                </div>
                <div className="flex mr-5">
                  <EllipsisHorizontalIcon
                    className="h-6 w-6 text-gray-500"
                    onClick={handleManagePost}
                  />
                </div>
                {managePost && (
                  <ManagePost
                    open={managePost}
                    setOpen={setManagePost}
                    openEdit={editOpen}
                    setOpenEdit={setEditOpen}
                    postedUser ={postedUser}
                    postId={postId}
                  />
                )}
                {editOpen && (
                  <EditPost
                    openEdit={editOpen}
                    setOpenEdit={setEditOpen}
                    imageArr={imageArr}
                    createdAt={createdAt}
                    descEdit={description}
                    setDescEdit={setDescription}
                    postId={postId}
                  />
                )}
              </div>
              <hr />
              <div className="flex flex-col overflow-y-auto max-h-96">
                {commentArr.map((comment, index) => (
                  <SingleComment
                    postedComment={comment}
                    postedUser ={postedUser}
                    focusInput={focusInput}
                    setComment={setComment}
                    key={index}
                    openComment={openComment}
                    setOpencomment={setOpencomment}
                    commentArr ={commentArr}
                    setCommentArr = {setCommentArr}
                  />
                ))}
              </div>
            </div>

            <hr />
            <div className="flex gap-2 w-full flex-col">
              <div className="flex pl-4">
                <button onClick={likeHandler}>
                  {!like ? (
                    <HeartIcon className="h-10 w-8 me-2" />
                  ) : (
                    <SolidHeartIcon className="h-10 w-8 me-2" />
                  )}
                </button>
                <ChatBubbleOvalLeftIcon className="h-10 w-8 " />
              </div>
              <div className="pl-6">
                <p className="contents" onClick={handleLikeModalClick}>
                  {likesArr.length !== 0
                    ? likesArr.length !== 1
                      ? likesArr.length + " Likes"
                      : likesArr.length + " Like"
                    : ""}
                </p>
              </div>
              {openLike && (
                <LikeModal
                  open={openLike}
                  setOpen={setOpenLike}
                  user={likesArr}
                />
              )}
              <div className="flex gap-2 px-5">
                <Link to={`/profile/${postedUser}`}>
                  <p className="font-semibold">{postedUser}</p>
                </Link>
                <p>{description}</p>
              </div>
              <div className="flex gap-1">
                <input
                  className="w-48 border-gray-200 rounded-xl px-2 overflow-hidden"
                  ref={inputRef}
                  type="text"
                  style={{ overflowWrap: "break-word", width: "100%" }}
                  placeholder="Add a comment"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
                <button
                  className="bg-blue-600 text-white rounded-lg px-4"
                  onClick={
                    commentId.length !== 0
                      ? postCommentReplyHandler
                      : postCommentHandler
                  }
                >
                  post
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CommentModal;
