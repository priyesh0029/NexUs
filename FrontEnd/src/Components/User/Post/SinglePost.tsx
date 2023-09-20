import { Avatar, Card, CardHeader, Carousel } from "@material-tailwind/react";

import {
  BookmarkIcon,
  ChatBubbleOvalLeftIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

import {
  BookmarkIcon as SolidBookmarkIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { POST_URL } from "../../../constants/constants";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getallPostComments,
  handleLike,
} from "../../../api/apiConnections/User/postConnections";
import LikeModal from "./likeModal";
import CommentModal from "./commentModal";
import { HeartIcon, SolidHeartIcon } from "../assetComponents/postAssets";
import { Link } from "react-router-dom";
import ManagePost from "./ManagePost";
import EditPost from "./EditPost";
import { handleSavePost } from "../../../api/apiConnections/User/userConnections";
import { SetSavePost } from "../../../features/redux/slices/user/homeSlice";

interface IsinglePost {
  postedUser: string;
  description: string;
  imgNames: string[];
  isBlocked: boolean;
  liked:{
      userName: string;
      dp: string;
      deactive ?: boolean;
    }[];
  reports: [];
  _id: string;
  updatedAt: string;
  createdAt: string;
  dp: string;
  allPost: Post[];
  setAllPost: React.Dispatch<React.SetStateAction<Post[]>>;
}

const SinglePost: React.FC<IsinglePost> = (props) => {
  const {
    _id,
    postedUser,
    imgNames,
    description,
    createdAt,
    liked,
    dp,
    allPost,
    setAllPost,
  } = props;
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );
  const likeStatus = liked.some((person) => person.userName === user.userName);
  const [like, setLike] = useState(likeStatus);
  const [likedArr, setLikedArr] =
    useState<{ userName: string; dp: string }[]>(liked);
  const [open, setOpen] = useState(false);
  const [openComment, setOpencomment] = useState(false);
  const [commentArr, setCommentArr] = useState<Comment[]>([]);
  const [desc, setDesc] = useState<string>(description);

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
          (person) => person.userName !== user.userName && person.dp !== user.dp
        );
        setLikedArr(updatedLikedArr);
      } else if (response.state === "added") {
        const newUser = { userName: user.userName, dp: user.dp };
        setLikedArr((prevLikedArr) => [...prevLikedArr, newUser]);
      }
    }
  };

  //managepost
  const [managePost, setManagePost] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const dispatch = useDispatch();

  const handleManagePost = () => {
    setManagePost(!managePost);
  };

  const handlePostSave = async () => {
    const response = await handleSavePost(_id);
    console.log("response of saving post : ", response);
    if (response.status) {
      dispatch(SetSavePost(response.postId));
    }
  };

  return (
    <>
      <Card
        className="mt-6 pt-8 border-1 rounded-md border-gray-400 flex flex-col "
        key={_id}
      >
        <CardHeader className="relative rounded-sm h-full">
          <div className="flex items-start justify-between">
            <div className="flex">
              {dp ? (
                <Avatar
                  src={POST_URL + `${dp}.jpg`}
                  alt="avatar"
                  className="h-14 w-14 p-1 "
                />
              ) : (
                <UserCircleIcon className="h-10 w-10 text-gray-700" />
              )}

              <div className="flex items-start">
                <Link to={`/profile/${postedUser}`}>
                  <p className="text-md font-bold">{postedUser} .</p>
                </Link>
                <p className="text-sm p-1">
                  {moment(createdAt).startOf("minutes").fromNow()}
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
                postedUser={postedUser}
                postId={_id}
                allPost={allPost}
                setAllPost={setAllPost}
                openComment={openComment}
                setOpencomment={setOpencomment}
              />
            )}
            {editOpen && (
              <EditPost
                openEdit={editOpen}
                setOpenEdit={setEditOpen}
                imageArr={imgNames}
                createdAt={createdAt}
                descEdit={desc}
                setDescEdit={setDesc}
                postId={_id}
              />
            )}
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

        <div className="px-4 py-1 pt-1 flex justify-between">
          <div>
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
          <div className="pt-2" onClick={handlePostSave}>
            {!user.savedPost || !user.savedPost.includes(_id) ? (
              <BookmarkIcon className="h-8 w-8 text-gray-700" />
            ) : (
              <SolidBookmarkIcon className="h-8 w-8 text-gray-900" />
            )}
          </div>
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
            <Link to={`/profile/${postedUser}`}>
              <p className="font-semibold">{postedUser}</p>
            </Link>
            <p>{desc}</p>
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
              description={desc}
              setDescription={setDesc}
              likesArr={likedArr}
              setLikesArr={setLikedArr}
              postId={_id}
              like={like}
              setLike={setLike}
              commentArr={commentArr}
              setCommentArr={setCommentArr}
              postDp={dp}
              allPost={allPost}
              setAllPost={setAllPost}
            />
          )}
        </div>
      </Card>
    </>
  );
};

export default SinglePost;
