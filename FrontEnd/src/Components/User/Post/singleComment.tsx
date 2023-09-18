import { UserCircleIcon } from "@heroicons/react/20/solid";
import { HeartIcon, SolidHeartIcon } from "../assetComponents/postAssets";
import { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  getAllReplies,
  handleCommentLike,
} from "../../../api/apiConnections/User/postConnections";
import LikeModal from "./likeModal";
import ReplyComment from "./replyComment";
import { Link } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import { POST_URL } from "../../../constants/constants";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import ManageComment from "./ManageComment";

interface SingleComment {
  postedComment: Comment;
  focusInput: (username: string, _id: string) => void;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  openComment: boolean;
  setOpencomment: React.Dispatch<React.SetStateAction<boolean>>;
  postedUser: string;
  commentArr: Comment[];
  setCommentArr: React.Dispatch<React.SetStateAction<Comment[]>>;
}

const SingleComment: React.FC<SingleComment> = (props) => {
  const {
    postedComment,
    focusInput,
    openComment,
    setOpencomment,
    postedUser,
    commentArr,
    setCommentArr,
  } = props;
  const { _id, userName, comment, createdAt, reply, liked, dp } = postedComment;
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  const commentLikedStatus = liked.some(
    (person) => person.userName === user.userName
  );
  const [commentLike, setCommentLike] = useState(commentLikedStatus);
  const [commentLikeArr, setcommentLikeArr] =
    useState<{ userName: string; dp: string }[]>(liked);
  const [open, setOpen] = useState(false);
  const [viewReply, setViewReply] = useState(false);
  const [replyArr, setReplyArr] = useState<Reply[]>([]);

  const handleLikeModalClick = () => {
    setOpen(!open);
  };

  const handleClick = (user: string, commentId: string) => {
    focusInput(user, commentId);
  };

  const commentLikeHandler = async () => {
    setCommentLike(!commentLike);
    const response = await handleCommentLike(user.userName, _id);
    if (response.status) {
      if (response.state === "removed") {
        const updatedLikedArr = commentLikeArr.filter(
          (person) => person.userName !== user.userName && person.dp !== user.dp
        );
        setcommentLikeArr(updatedLikedArr);
      } else if (response.state === "added") {
        const newUser = { userName: user.userName, dp: user.dp };
        setcommentLikeArr((prevLikedArr) => [...prevLikedArr, newUser]);
      }
    }
  };
  const viewCommentReply = () => {
    setViewReply(!viewReply);
  };
  const handleOpen = () => {
    setOpencomment(!openComment);
  };

  useEffect(() => {
    getReplies();
  }, [postedComment]);

  const getReplies = async () => {
    const response = await getAllReplies(_id);
    if (response !== 0) {
      setReplyArr(response);
    }
  };

  //manage comment of post
  const [manageCommentOpen, setManageCommentOpen] = useState(false);

  const handleManageComment = async () => {
    setManageCommentOpen(!manageCommentOpen);
  };
  return (
    <div className="flex pt-3 justify-between items-start group" key={_id}>
      <div className="flex">
        <div>
          {dp ? (
            <Avatar
              src={POST_URL + `${dp}.jpg`}
              alt="avatar"
              className="h-14 w-14 p-1 "
            />
          ) : (
            <UserCircleIcon className="h-10 w-10 text-gray-700" />
          )}
        </div>
        <div className="flex flex-col ">
          <div className="flex items-start  ">
            <div className="max-w-[320px] break-all inline-block">
              <p className="text-md font-bold">
                {userName !==null ?<Link to={`/profile/${userName}`} onClick={handleOpen}>
                  {userName}{" "}
                </Link>:"user "}
                <span
                  className="comment-style text-md font-normal"
                  aria-hidden="true"
                >
                  {comment}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-start  text-sm gap-5">
            <p>{moment(createdAt).startOf("minutes").fromNow()}</p>
            <p onClick={handleLikeModalClick}>
              {commentLikeArr.length !== 0
                ? commentLikeArr.length !== 1
                  ? commentLikeArr.length + " Likes"
                  : commentLikeArr.length + " Like"
                : "Like"}
            </p>
            <p onClick={() => handleClick(userName, _id)}>Reply</p>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <EllipsisHorizontalIcon
                className="h-6 w-6 text-gray-500"
                onClick={handleManageComment}
              />
            </div>
            {manageCommentOpen && (
              <ManageComment
                open={manageCommentOpen}
                setOpen={setManageCommentOpen}
                commentId={_id}
                commentedUser={userName}
                postedUser={postedUser}
                commentArr={commentArr}
                setCommentArr={setCommentArr}
              />
            )}
          </div>
          {replyArr.length === 0 ? (
            ""
          ) : (
            <>
              <div className="p-4" onClick={viewCommentReply}>
                ---view replies({replyArr.length})
              </div>
              {viewReply &&
                replyArr.map((eachReply) => (
                  <div className="flex flex-col" key={eachReply._id}>
                    <ReplyComment
                      commentReply={eachReply}
                      handleClick={handleClick}
                      commentId={_id}
                      commentedUser={userName}
                      openComment={openComment}
                      setOpencomment={setOpencomment}
                      postedUser={postedUser}
                      replyArr={replyArr}
                      setReplyArr={setReplyArr}
                    />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
      <div className="pt-4 pe-6">
        <button onClick={commentLikeHandler}>
          {!commentLike ? (
            <HeartIcon className="h-4 w-4" />
          ) : (
            <SolidHeartIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      {open && (
        <LikeModal open={open} setOpen={setOpen} user={commentLikeArr} />
      )}
    </div>
  );
};

export default SingleComment;
