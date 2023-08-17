import { UserCircleIcon } from "@heroicons/react/20/solid";
import { HeartIcon, SolidHeartIcon } from "../assetComponents/postAssets";
import { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { handleCommentLike } from "../../../api/apiConnections/User/postConnections";
import LikeModal from "./likeModal";
import ReplyComment from "./replyComment";

interface SingleComment {
  postedComment: Comment;
  focusInput: (username: string, _id: string) => void;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}

const SingleComment: React.FC<SingleComment> = (props) => {
  const { postedComment, focusInput } = props;
  const { _id, userName, comment, createdAt, reply, liked } = postedComment;
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  const commentLikedStatus = liked.some((person) => person === user.userName);
  const [commentLike, setCommentLike] = useState(commentLikedStatus);
  const [commentLikeArr, setcommentLikeArr] = useState<string[]>(liked);
  const [open, setOpen] = useState(false);
  const [viewReply, setViewReply] = useState(false);

  const handleLikeModalClick = () => {
    setOpen(!open);
  };

  const handleClick = (user:string,commentId:string) => {
    focusInput(user, commentId);
  };

  const commentLikeHandler = async () => {
    setCommentLike(!commentLike);
    const response = await handleCommentLike(user.userName, _id);
    if (response.status) {
      if (response.state === "removed") {
        const updatedLikedArr = commentLikeArr.filter(
          (person) => person !== user.userName
        );
        setcommentLikeArr(updatedLikedArr);
      } else if (response.state === "added") {
        setcommentLikeArr((prevLikedArr) => [user.userName, ...prevLikedArr]);
      }
    }
  };
  const viewCommentReply = () => {
    setViewReply(!viewReply);
  };
  return (
    <div className="flex pt-3 justify-between items-start" key={_id}>
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
              {commentLikeArr.length !== 0
                ? commentLikeArr.length !== 1
                  ? commentLikeArr.length + " Likes"
                  : commentLikeArr.length + " Like"
                : "Like"}
            </p>
            <p onClick={() => handleClick(userName, _id)}>Reply</p>
          </div>
          {reply.length === 0 ? (
            ""
          ) : (
            <>
              <div className="p-4" onClick={viewCommentReply}>
                ---view replies({reply.length})
              </div>
              {viewReply &&
                reply.map((eachReply) => (
                  <div className="flex flex-col"  key={eachReply._id}>
                    <ReplyComment commentReply={eachReply} handleClick={handleClick} commentId ={_id}  />
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
