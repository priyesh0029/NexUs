import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { POST_URL } from "../../../constants/constants";
import { Link } from "react-router-dom";

interface LikeModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: {
    userName: string;
    dp: string;
    deactive ?:boolean;
  }[];
}

const LikeModal: React.FC<LikeModalProps> = (props) => {
  const { open, setOpen, user } = props;

  const handleOpen = () => setOpen(!open);
  const owner = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="sm"
      >
        <div className="text-center text-xl font-semibold pb-4">Likes</div>
        <hr />
        {user.map((user) => (
          <div className="flex flex-col justify-between ">
            <div className="flex px-12 py-2 items-center justify-between">
              <div className="flex gap-3">
                
                {user.dp && !user.deactive ? (
                  <Avatar
                    src={POST_URL + `${user.dp}.jpg`}
                    alt="avatar"
                    className="h-14 w-14 p-1 "
                  />
                ) : (
                  <UserCircleIcon className="h-12 w-12 text-gray-500" />
                )}
                

                <div>
               {!user.deactive? <Link to={`/profile/${user.userName}`}>
                  <Typography variant="h6">{user.userName}</Typography>
                </Link>: <Typography variant="h6">user {" "}</Typography>}
                  <Typography
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    Web Developer
                  </Typography>
                </div>
              </div>
              {user.userName !== owner.userName && !user.deactive ? (
                <button className="border-2 bg-blue-600 rounded-xl text-md text-white px-6 flex items-end">
                  follow
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </Dialog>
    </>
  );
};

export default LikeModal;
