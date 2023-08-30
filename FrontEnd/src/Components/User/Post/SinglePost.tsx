import { Card, CardHeader, Carousel } from "@material-tailwind/react";

import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

import {
  // HeartIcon as SolidHeartIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { POST_URL } from "../../../constants/constants";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  getallPostComments,
  handleLike,
} from "../../../api/apiConnections/User/postConnections";
import LikeModal from "./likeModal";
import CommentModal from "./commentModal";
import { HeartIcon, SolidHeartIcon } from "../assetComponents/postAssets";
import { Link } from "react-router-dom";

const SinglePost = ({
  _id,
  postedUser,
  imgNames,
  description,
  createdAt,
  liked,
}: Post) => {
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );
  const likeStatus = liked.some((person) => person === user.userName);
  const [like, setLike] = useState(likeStatus);
  const [likedArr, setLikedArr] = useState<string[]>(liked);
  const [open, setOpen] = useState(false);
  const [openComment, setOpencomment] = useState(false);
  const [commentArr, setCommentArr] = useState<Comment[]>([]);

  const handleLikeModalClick = () => {
    setOpen(!open);
  };

  const handleCommentModalClick = () => {
    setOpencomment(!openComment);
  };

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    const response = await getallPostComments(_id);
    console.log("all comments response : ", response);
    if (response.length !== 0) {
      setCommentArr(response);
    }
  };

  const likeHandler = async () => {
    setLike(!like);
    const response = await handleLike(user.userName, _id);
    if (response.status) {
      if (response.state === "removed") {
        const updatedLikedArr = likedArr.filter(
          (person) => person !== user.userName
        );
        setLikedArr(updatedLikedArr);
      } else if (response.state === "added") {
        setLikedArr((prevLikedArr) => [user.userName, ...prevLikedArr]);
      }
    }
  };

  return (
    <>
      <Card
        className="mt-6 pt-8 border-1 rounded-md border-gray-400 flex flex-col "
        key={_id}
      >
        <CardHeader className="relative rounded-sm h-full">
          <div className="flex items-start">
            <UserCircleIcon className="h-10 w-10 text-gray-700" />
            <div className="flex items-center">
              <Link to={`/profile/${postedUser}`}>
                <p className="text-md font-bold">{postedUser}</p>
              </Link>
              <p className="text-sm ml-1">
                .{moment(createdAt).startOf("minutes").fromNow()}
              </p>
            </div>
          </div>
          <Carousel className="rounded-sm items-center">
            {imgNames.map((pic) => (
              <img
                src={POST_URL + `${pic}.jpg`}
                alt="image 1"
                className="h-full w-full object-cover"
                key={pic}
              />
            ))}
          </Carousel>
        </CardHeader>

        <div className="px-4 py-1">
          <button onClick={likeHandler}>
            {likedArr.length === 0 || !like ? (
              <HeartIcon className="h-10 w-8 me-5" />
            ) : (
              <SolidHeartIcon className="h-10 w-8 me-5" />
            )}
          </button>
          <button onClick={handleCommentModalClick}>
            <ChatBubbleOvalLeftIcon className="h-10 w-8 " />
          </button>
        </div>
        <div className="pb-5 px-5 flex flex-col ">
          <p className="contents" onClick={handleLikeModalClick}>
            {likedArr.length !== 0
              ? likedArr.length !== 1
                ? likedArr.length + " Likes"
                : likedArr.length + " Like"
              : ""}
          </p>
          <div className="flex gap-2">
            <p className="font-semibold">{postedUser}</p>
            <p>{description}</p>
          </div>
          {open && <LikeModal open={open} setOpen={setOpen} user={likedArr} />}
          <p className="text-gray-500" onClick={handleCommentModalClick}>
            {commentArr.length !== 0
              ? `view all ${commentArr.length} comments`
              : "Add a comment..."}
          </p>
          {openComment && (
            <CommentModal
              openComment={openComment}
              setOpencomment={setOpencomment}
              imageArr={imgNames}
              createdAt={createdAt}
              postedUser={postedUser}
              likesArr={likedArr}
              setLikes={setLikedArr}
              postId={_id}
              like={like}
              setLike={setLike}
              commentArr={commentArr}
              setCommentArr={setCommentArr}
            />
          )}
        </div>
      </Card>
    </>
  );
};

export default SinglePost;
