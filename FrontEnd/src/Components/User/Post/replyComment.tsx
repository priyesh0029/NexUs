import { UserCircleIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import { useState } from "react";
import LikeModal from "./likeModal";
import { HeartIcon, SolidHeartIcon } from "../assetComponents/postAssets";
import { useSelector } from "react-redux";
import { handleReplyLike } from "../../../api/apiConnections/User/postConnections";
import { Link } from "react-router-dom";

interface ReplyCommentProps {
  commentReply: Reply;
  handleClick: (username: string, _id: string) => void;
  commentId: string;
  openComment: boolean;
  setOpencomment: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReplyComment: React.FC<ReplyCommentProps> = (props) => {
  const { commentReply, handleClick, commentId,openComment,setOpencomment } = props;
  const { _id, userName, comment, liked, createdAt } = commentReply;

  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  const replyLikedStatus = liked.some((person) => person === user.userName);

  const [like, setLike] = useState(replyLikedStatus);
  const [replyLikedArr, setReplyLikedArr] = useState<string[]>(liked);
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
          (person) => person !== user.userName
        );
        setReplyLikedArr(updatedLikedArr);
      } else if (response.state === "added") {
        setReplyLikedArr((prevLikedArr) => [user.userName, ...prevLikedArr]);
      }
    }
  };

  const handleOpen = () => {
    setOpencomment(!openComment);
  };

  return (
    <div className="flex pt-3 justify-between items-start">
      <div className="flex">
        <div>
          <UserCircleIcon className="h-14 w-14 text-gray-700" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-start  ">
            <div className="w-[220px] break-all flex">
              <p className="text-md font-bold">
              <Link to={`/profile/${userName}`} onClick={handleOpen}>{userName}{" "}</Link>
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
      {openReplyLike && <LikeModal open={openReplyLike} setOpen={setOpenReplyLike} user={replyLikedArr} />}
    </div>
  );
};

export default ReplyComment;
