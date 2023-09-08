import {
  Dialog,
  Carousel,
  Avatar,
} from "@material-tailwind/react";
import { POST_URL } from "../../../constants/constants";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import moment from "moment";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { updatePost } from "../../../api/apiConnections/User/postConnections";


interface IeditPostProps {
  openEdit: boolean;
  setOpenEdit: React.Dispatch<React.SetStateAction<boolean>>;
  imageArr: string[];
  createdAt: string;
  descEdit: string;
  setDescEdit : React.Dispatch<React.SetStateAction<string>>;
  postId:string
}

const EditPost: React.FC<IeditPostProps> = (props) => {
  const { openEdit, setOpenEdit, imageArr, createdAt,descEdit,setDescEdit,postId} = props;
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );
  const handleOpen = () => setOpenEdit(!openEdit);

  const hadleEdit = async()=>{
    handleOpen()
    const response = await updatePost(postId,descEdit)
    if(response.status === 'success'){
      setDescEdit(response.description)
    }
  }
  return (
    <>
      <Dialog
        open={openEdit}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="lg"
      >
        <div className="flex justify-between px-3">
          <div>
            <p className="text-md text-blue-800" onClick={handleOpen}>
              cancel
            </p>
          </div>
          <div>
            <p className="text-lg text-gray-900 font-semibold">Edit Info</p>
          </div>
          <div onClick={hadleEdit}>
            <p className="text-md text-blue-800">done</p>
          </div>
        </div>
        <div className="flex h-full ">
          <div className="w-1/2 flex-shrink-0 overflow-hidden ">
            <Carousel className="">
              {imageArr.map((pic) => (
                <img
                  src={POST_URL + `${pic}.jpg`}
                  alt="image 1"
                  className="h-full w-full object-contain"
                  key={pic}
                />
              ))}
            </Carousel>
          </div>
          <div className="w-1/2 p-2 overflow-auto flex flex-col justify-between">
            <div className="flex flex-col overflow-y-auto max-h-full">
              <div className="flex justify-between">
                <div className="flex items-start">
                  {user.dp ? (
                    <Avatar
                      src={POST_URL + `${user.dp}.jpg`}
                      alt="avatar"
                      className="h-14 w-14 p-1 "
                    />
                  ) : (
                    <UserCircleIcon className="h-10 w-10 text-gray-700" />
                  )}
                  <div className="flex items-center">
                    <Link to={`/profile/${user.userName}`}>
                      <p className="text-md font-bold">{user.userName}</p>
                    </Link>
                    <p className="text-sm ml-1">
                      .{moment(createdAt).startOf("minutes").fromNow()}
                    </p>
                  </div>
                </div>
              </div>
              <hr />
              <div className="flex gap-2 w-full px-8">
                <div className=" gap-2 px-5 w-full">
                  <textarea
                    className="p-2 h-56 w-full border-none focus:border-gray-50 focus:border-transparent"
                    value={descEdit}
                    onChange={(e) => setDescEdit(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default EditPost;
