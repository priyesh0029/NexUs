import React, { useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { Carousel } from "@material-tailwind/react";
import { PhotoIcon, ArrowLongLeftIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCaption,
  clearMedia,
  setCaption,
  setMedia,
  setNewPost,
} from "../../../features/redux/slices/user/createPostSlice";
import { createPost } from "../../../api/apiConnections/User/postConnections";

const BuildPost = () => {
  const dispatch = useDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const filesArray: File[] = Object.values(selectedFiles);
      dispatch(setMedia(filesArray));
      console.log(filesArray);
    }
    // Do something with the selected files
    // console.log(selectedFiles);
  };
  return (
    <div className="flex w-96 h-60 justify-center pt-10">
      <div className=" flex items-center flex-col pt-8">
        <PhotoIcon className="w-28 h-28" />
        <div className="items-center text-lg">
          Drag photos and videos here..
        </div>
        <div className="relative">
          <input
            type="file"
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            multiple // Enable multiple file selection
            onChange={handleFileChange}
            // Other input attributes and event handlers can be added here
          />
          <div className="px-4 py-1 mt-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-gray-300 transition">
            Select form computer
          </div>
        </div>
      </div>
    </div>
  );
};

const CarouselDefault = () => {
  const [captionInput, setcaptionInput] = useState("");
  const dispatch = useDispatch();
  const images = useSelector(
    (store: { createPost: { media: [] } }) => store.createPost.media
  );

  const captionHandle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setcaptionInput(event.target.value);
    dispatch(setCaption(captionInput));
  };

  return (
    <div className="">
      <Carousel className="rounded-sm h-96 w-full">
        {images.map((pic) => {
          return (
            <img
              src={URL.createObjectURL(pic)}
              alt="image 1"
              className="h-full w-full object-cover"
              key={pic}
            />
          );
        })}
      </Carousel>
      <div className="flex flex-col p-5 shadow-2xl shadow-gray-600">
        <div>username</div>
        <textarea
          className="p-2  h-28"
          placeholder="write your caption here.."
          onChange={captionHandle}
        />
      </div>
    </div>
  );
};

interface CreatePostProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePost: React.FC<CreatePostProps> = (props) => {
  const { open, setOpen } = props;

  const dispatch = useDispatch();
  const mediaPost = useSelector(
    (store: { createPost: { media: [] } }) => store.createPost.media
  );
  const captionPost = useSelector(
    (store: { createPost: { caption: "" } }) => store.createPost.caption
  );
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );
  const [selectPost, setselectPost] = useState(false);
  const [showPost, setshowPost] = useState(false);
  const handleOpen = () => setOpen(!open);
  const createPostHandler = () => {
    if (!selectPost) {
      selectPostHandler();
      showPostHandler();
    } else if (selectPost && showPost) {
      handleOpen();
      submitHandler();
      // dispatch(clearMedia())
      // dispatch(clearCaption())
    }
  };

  const createBackHandler = () => {
    selectPostHandler();
    showPostHandler();
  };
  const selectPostHandler = () => setselectPost(!selectPost);
  const showPostHandler = () => setshowPost(!showPost);

  // useEffect(() => {
  //   setOpen(open);
  // }, [open]);

  console.log("value of prop :", open); 

  const submitHandler = async () => {
    try {
      console.log("post in front end mediaPost1 : ", mediaPost);

      const formData = new FormData();

      mediaPost.forEach((file) => {
        formData.append(`image`, file);
      });
      formData.append(`caption`, captionPost);
      formData.append(`userName`, user.userName);
      console.log("post in front end mediaPost2 : ", mediaPost);
      // let post :{
      //   formData: FormData;
      //   captionPost: string;
      // } = { formData,captionPost}

      formData.forEach((key, value) => {
        console.log("post in front end formdata key and value  : ",key, value);
      });
      console.log("post in front end : ", formData);

      let response = await createPost(formData);
      if (response.status === "success") {
        dispatch(clearMedia());
        dispatch(clearCaption())
        dispatch(setNewPost(response.post))
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="min-h-[60vh]"
        role="dialog"
      >
        <div className="flex justify-between py-1">
          {selectPost ? (
            <ArrowLongLeftIcon
              className="w-8 h-8 ms-4"
              onClick={createBackHandler}
            />
          ) : (
            "."
          )}

          <div className="text-center text-xl font-sans flex ">
            create new post
          </div>
          <span
            className="text-sm flex pe-8 pt-1 text-blue-800"
            onClick={createPostHandler}
          >
            {!selectPost && mediaPost.length !== 0 && "Next"}
            {selectPost && "Share"}
          </span>
        </div>

        <hr className="border-gray-700" />
        <div className="flex">
          <div className="h-full w-full flex items-center flex-col">
            {!selectPost ? <BuildPost /> : <CarouselDefault />}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CreatePost;
