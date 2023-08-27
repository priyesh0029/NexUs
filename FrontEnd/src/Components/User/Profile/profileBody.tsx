import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getUserPost,
  getallPostComments,
} from "../../../api/apiConnections/User/postConnections";
import { POST_URL } from "../../../constants/constants";
import CommentModal from "../Post/commentModal";

interface ProfileAreaProps {
  posts: Post[];
}

const ProfileBody: React.FC<ProfileAreaProps> = ({ posts }) => {
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  const [like, setLike] = useState(false);
  const [likedArr, setLikedArr] = useState<string[]>([]);
  const [openComment, setOpencomment] = useState(false);
  const [commentArr, setCommentArr] = useState<Comment[]>([]);
  const [postId, setPostId] = useState<string>("");
  const [postedUser, setPostedUser] = useState<string>("");
  const [imgNames, setImgNames] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");

  const handleCommentModalClick = ({
    _id,
    postedUser,
    imgNames,
    description,
    createdAt,
    liked,
  }: Post) => {
    const likeStatus = liked.some((person) => person === user.userName);
    setLike(likeStatus);
    setLikedArr(liked);
    setPostId(_id);
    setPostedUser(postedUser);
    setImgNames(imgNames);
    setDescription(description);
    setCreatedAt(createdAt);
    setCommentArr([])
    getComments(_id);
    setOpencomment(!openComment);
  };

  const getComments = async (_id: string) => {
    const response = await getallPostComments(_id);
    console.log("all comments response : ", response);
    if (response.length !== 0) {
      setCommentArr(response);
    }
  };
  useEffect(() => {
    // This code will run whenever commentArr changes
    console.log("commentArr nnuseeffect : ", commentArr);
  }, [commentArr]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-48 2xl:px-24 lg:px-0">
      {posts.map((post) => (
        <div key={post._id} className="aspect-w-1 aspect-h-1">
          <img
            className="object-cover object-center w-full h-full"
            src={POST_URL + `${post.imgNames[0]}.jpg`}
            alt="nature image"
            onClick={() => handleCommentModalClick({ ...post })}
          />
        </div>
      ))}
      {openComment && (
        <CommentModal
          open={openComment}
          setOpen={setOpencomment}
          imageArr={imgNames}
          createdAt={createdAt}
          postedUser={postedUser}
          likesArr={likedArr}
          setLikes={setLikedArr}
          postId={postId}
          like={like}
          setLike={setLike}
          commentArr={commentArr}
          setCommentArr={setCommentArr}
        />
      )}
    </div>
  );
};

export default ProfileBody;
