import { Card, CardHeader, Carousel } from "@material-tailwind/react";

import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";

import {
  HeartIcon as SolidHeartIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { getAllPost } from "../../../api/apiConnections/User/postConnections";
import { useSelector } from "react-redux";

const SinglePost = () => {
  const [like, setLike] = useState(false);
  const [ post,setPost] = useState([])

  const likeHandler = () => {
    setLike(!like);
  };

  useEffect(() => {
    getPost();
  }, []);

  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  const getPost = async () => {
    const response = await getAllPost();
    if(response?.status === 'success'){
      setPost(response.allposts)
    }
  };

  return (
    <>
      <Card className="mt-6 pt-8 border-1 rounded-md border-gray-400 flex flex-col">
        <CardHeader className="relative rounded-sm h-full">
          <div className="flex">
            <UserCircleIcon className="h-10 w-10 text-gray-700" />
            <div>
              <p className="text-md font-bold">{user.userName}</p>
            </div>
          </div>
          <Carousel className="rounded-sm">
          {post.imgNames:string[].map((pic) => {
          return (
            <img
              src={`https://res.cloudinary.com/dsinpyvxb/image/upload/v1691770829/posts/image-1691770827353-${pic}.jpg`}
              alt="image 1"
              className="h-full w-full object-cover"
              key={pic}
            />
          );
        })}
          </Carousel>
        </CardHeader>

        <div className="px-4 py-1">
          <button onClick={likeHandler}>
            {like ? (
              <HeartIcon className="h-10 w-8 me-5" />
            ) : (
              <SolidHeartIcon className="h-10 w-8 me-5" />
            )}
          </button>
          <button>
            <ChatBubbleOvalLeftIcon className="h-10 w-8 " />
          </button>
        </div>
      </Card>

      <Card className="mt-6 pt-10 border-1 rounded-md border-gray-400 flex flex-col">
        <CardHeader color="blue-gray" className="relative rounded-md h-full">
          <img
            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
            alt="card-image"
          />
        </CardHeader>

        <div className="px-4 py-1">
          <button onClick={likeHandler}>
            {like ? (
              <HeartIcon className="h-10 w-8 me-5" />
            ) : (
              <SolidHeartIcon className="h-10 w-8 me-5" />
            )}
          </button>
          <button>
            <ChatBubbleOvalLeftIcon className="h-10 w-8 " />
          </button>
        </div>
      </Card>
    </>
  );
};

export default SinglePost;
