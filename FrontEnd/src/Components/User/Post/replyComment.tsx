import { UserCircleIcon } from "@heroicons/react/20/solid";
import moment from "moment";
import { useState } from "react";
import LikeModal from "./likeModal";
import { HeartIcon, SolidHeartIcon } from "../assetComponents/postAssets";
import { useSelector } from "react-redux";
import { handleReplyLike } from "../../../api/apiConnections/User/postConnections";

interface ReplyCommentProps {
  commentReply: Reply;
  handleClick: (username: string, _id: string) => void;
  commentId: string;
}

const ReplyComment: React.FC<ReplyCommentProps> = (props) => {
  const { commentReply, handleClick, commentId } = props;
  const { _id, userName, comment, liked, createdAt } = commentReply;

  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  const replyLikedStatus = liked.some((person) => person === user.userName);

  const [like, setLike] = useState(replyLikedStatus);
  const [replyLikedArr, setReplyLikedArr] = useState<string[]>(liked);
  const [open, setOpen] = useState(false);

  const handleLikeModalClick = () => {
    setOpen(!open);
  };

  const replyLikeHandler = async() => {
    setLike(!like);
    const response = await handleReplyLike(user.userName, _id,commentId);
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

  return (
    <div className="flex pt-3 justify-between items-start">
      <div className="flex">
        <UserCircleIcon className="h-14 w-14 text-gray-700" />
        <div className="flex flex-col">
          <div className="flex items-start gap-3 ">
            <p className="text-md font-bold">{userName}</p>
            <p className="text-sm pt-1">{comment}</p>
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
      <div className="pt-4 pe-6">
        <button onClick={replyLikeHandler}>
          {!like ? (
            <HeartIcon className="h-4 w-4" />
          ) : (
            <SolidHeartIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      {open && <LikeModal open={open} setOpen={setOpen} user={replyLikedArr} />}
    </div>
  );
};

export default ReplyComment;
