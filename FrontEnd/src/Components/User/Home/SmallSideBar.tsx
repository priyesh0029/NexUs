import React, { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Card,
  Chip,
  Avatar,
} from "@material-tailwind/react";
import { POST_URL } from "../../../constants/constants";
import { Link } from "react-router-dom";
import { Cog6ToothIcon, EnvelopeIcon, HomeIcon, MagnifyingGlassIcon, PowerIcon, SquaresPlusIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import SearchTab from "./SearchTab";
import CreatePost from "../Post/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../../features/redux/slices/user/tokenSlice";
import { clearUserInfo } from "../../../features/redux/slices/user/homeSlice";

const SmallSideBar = () => {
  const [open, setOpen] = React.useState(false);
  const [searchTabOpen, setSearchTabOpen] = useState(false);
  const dispatch = useDispatch();



  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );
  const handleSearchTab = () => {
    setSearchTabOpen(!searchTabOpen);
  };

  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(clearUserInfo());
  };

  const handleCreatePostClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <Card className="md:h-full md:flex md:fixed md:left-0 w-[6rem] md:p-4 md:rounded-none md:border-1 md:border-black hidden">
        <div className="mb-2 p-4">
          <div className="flex justify-start">
            <div className="w-28 h-28 ">
              <img
                className="border rounded-xl"
                src={POST_URL + "logo/nexuswhite.jpg"}
                alt="logo"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6">
          <Link to={"/home"}>
            <div>
                <HomeIcon className="h-10 w-10" />
            </div>
          </Link>
          <div onClick={handleSearchTab}>
            <div>
              <MagnifyingGlassIcon className="h-10 w-10" />
            </div>
          </div>
          {searchTabOpen && (
            <SearchTab
              openSearchTab={searchTabOpen}
              setOpenSearchTab={setSearchTabOpen}
            />
          )}
          <Link to={"/messages"}>
            <div>
              <div>
                <EnvelopeIcon className="h-10 w-10" />
              </div>
              <div>
                {/* <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                /> */}
              </div>
            </div>
          </Link>
          <div onClick={handleCreatePostClick}>
            <div>
              <SquaresPlusIcon className="h-10 w-10" />
            </div>
          </div>
          {open && <CreatePost open={open} setOpen={setOpen} />}
          <Link to={`/profile/${user.userName}`}>
            <div>
              <div>
                {user.dp ? (
                  <Avatar
                    src={POST_URL + `${user.dp}.jpg`}
                    alt="avatar"
                    className="h-12 w-12 "
                  />
                ) : (
                  <UserCircleIcon className="h-10 w-10 text-gray-700" />
                )}
              </div>
            </div>
          </Link>
          <Link to={"/settings"}>
            <div>
              <div>
                <Cog6ToothIcon className="h-10 w-10" />
              </div>
            </div>
          </Link>
          <div onClick={handleLogout}>
            <div>
              <PowerIcon className="h-10 w-10" />
            </div>
          </div>
        </div>
      </Card>
      <Card className=" fixed bottom-0 left-0 md:hidden w-full bg-blue-200 p-2 border-2 rounded-none z-10">
        <div className="flex justify-around items-center">
          <Link to={"/home"}>
            <HomeIcon className="h-6 w-6 text-gray-700" />
          </Link>

          <MagnifyingGlassIcon
            className="h-6 w-6 text-gray-700"
            onClick={handleSearchTab}
          />
          {/* {searchTabOpen && <SearchTab openSearchTab = {searchTabOpen} setOpenSearchTab={setSearchTabOpen}/>} */}
          <Link to={"/messages"}>
            <EnvelopeIcon className="h-6 w-6 text-gray-700" />
          </Link>
          <SquaresPlusIcon
            className="h-6 w-6 text-gray-700"
            onClick={handleCreatePostClick}
          />
          <Link to={`/profile/${user.userName}`}>
            <UserCircleIcon className="h-6 w-6 text-gray-700" />
          </Link>
        </div>
      </Card>
    </>
  );
};

export default SmallSideBar;
