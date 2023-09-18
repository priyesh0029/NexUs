import { UserCircleIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import { useState } from "react";
import LikeModal from "./likeModal";
import { HeartIcon, SolidHeartIcon } from "../assetComponents/postAssets";
import { useSelector } from "react-redux";
import { handleReplyLike } from "../../../api/apiConnections/User/postConnections";
import { Link } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import { POST_URL } from "../../../constants/constants";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import ManageComment from "./ManageComment";

interface ReplyCommentProps {
  commentReply: Reply;
  handleClick: (username: string, _id: string) => void;
  commentId: string;
  commentedUser: string;
  openComment: boolean;
  setOpencomment: React.Dispatch<React.SetStateAction<boolean>>;
  postedUser: string;
  replyArr: Reply[];
  setReplyArr: React.Dispatch<React.SetStateAction<Reply[]>>;
}

const ReplyComment: React.FC<ReplyCommentProps> = (props) => {
  const {
    commentReply,
    handleClick,
    commentId,
    commentedUser,
    openComment,
    setOpencomment,
    postedUser,
    replyArr,
    setReplyArr,
  } = props;

  const { _id, userName, comment, liked, dp, createdAt } = commentReply;

  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  const replyLikedStatus = liked.some(
    (person) => person.userName === user.userName
  );

  const [like, setLike] = useState(replyLikedStatus);
  const [replyLikedArr, setReplyLikedArr] =
    useState<{ userName: string; dp: string }[]>(liked);
  const [openReplyLike, setOpenReplyLike] = useState(false);

  const handleLikeModalClick = () => {
    setOpenReplyLike(!openReplyLike);
  };

  const replyLikeHandler = async () => {
    setLike(!like);
    const response = await handleReplyLike(user.userName, _id, commentId);
    if (response.status) {
      if (response.state === "removed") {
        const updatedLikedArr = replyLikedArr.filter(
          (person) => person.userName !== user.userName && person.dp !== user.dp
        );
        setReplyLikedArr(updatedLikedArr);
      } else if (response.state === "added") {
        const newUser = { userName: user.userName, dp: user.dp };
        setReplyLikedArr((prevLikedArr) => [...prevLikedArr, newUser]);
      }
    }
  };

  const handleOpen = () => {
    setOpencomment(!openComment);
  };

  //manage reply
  const [manageCommentOpen, setManageCommentOpen] = useState(false);

  const handleManageComment = async () => {
    setManageCommentOpen(!manageCommentOpen);
  };

  return (
    <div className="flex pt-3 justify-between items-start">
      <div className="flex group">
        <div>
          {dp ? (
            <Avatar
              src={POST_URL + `${dp}.jpg`}
              alt="avatar"
              className="h-14 w-14 p-1 "
            />
          ) : (
            <UserCircleIcon className="h-14 w-14 text-gray-700" />
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-start  ">
            <div className="w-[220px] break-all flex">
              <p className="text-md font-bold">
                {userName !== null ?<Link to={`/profile/${userName}`} onClick={handleOpen}>
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
              {replyLikedArr.length !== 0
                ? replyLikedArr.length !== 1
                  ? replyLikedArr.length + " Likes"
                  : replyLikedArr.length + " Like"
                : "Like"}
            </p>
            <p onClick={() => handleClick(userName, commentId)}>Reply</p>
            <div className=" px-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
              <EllipsisHorizontalIcon
                className="h-6 w-6 text-gray-500"
                onClick={handleManageComment}
              />
            </div>
            {manageCommentOpen && (
              <ManageComment
                open={manageCommentOpen}
                setOpen={setManageCommentOpen}
                commentId={commentId}
                commentedUser={commentedUser}
                postedUser={postedUser}
                replyArr={replyArr}
                setReplyArr={setReplyArr}
                replyId={_id}
                repliedUser ={userName}
              />
            )}
          </div>
        </div>
      </div>
      <div className="pt-4 ">
        <button onClick={replyLikeHandler}>
          {!like ? (
            <HeartIcon className="h-4 w-4" />
          ) : (
            <SolidHeartIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      {openReplyLike && (
        <LikeModal
          open={openReplyLike}
          setOpen={setOpenReplyLike}
          user={replyLikedArr}
        />
      )}
    </div>
  );
};

export default ReplyComment;
