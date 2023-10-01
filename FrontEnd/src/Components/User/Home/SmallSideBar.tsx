import React, { useEffect, useState } from "react";
import {
  Card,
  Chip,
  Avatar,
  Tooltip,
  Badge,
  IconButton,
} from "@material-tailwind/react";
import { POST_URL } from "../../../constants/constants";
import { Link } from "react-router-dom";
import {
  Cog6ToothIcon,
  EnvelopeIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PowerIcon,
  SquaresPlusIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import SearchTab from "./SearchTab";
import CreatePost from "../Post/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../../features/redux/slices/user/tokenSlice";
import { clearUserInfo } from "../../../features/redux/slices/user/homeSlice";
import { handleGetNofications } from "../../../api/apiConnections/User/chatConnections";
import { SetNotification } from "../../../features/redux/slices/user/chatSlice";

const SmallSideBar = () => {
  const [open, setOpen] = React.useState(false);
  const [searchTabOpen, setSearchTabOpen] = useState(false);
  const dispatch = useDispatch();

  const notification = useSelector(
    (store: { chat: { notification: string[] } }) => store.chat.notification
  );
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

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    const response = await handleGetNofications();
    console.log(
      "response of notificaationa  after api call : ",
      response.notifications
    );
    dispatch(SetNotification(response.notifications));
  };

  return (
    <>
      <Card className="md:h-full md:flex md:fixed md:left-0 w-[6rem] md:p-4 md:rounded-none md:border-1 md:border-black hidden z-10">
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
            <Tooltip
              className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-black"
              content="Home"
              placement="right"
            >
              <div>
                <HomeIcon className="h-10 w-10 text-black" />
              </div>
            </Tooltip>
          </Link>
          <div onClick={handleSearchTab}>
            <Tooltip
              className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-black"
              content="Search"
              placement="right"
            >
              <div>
                <MagnifyingGlassIcon className="h-10 w-10 text-black" />
              </div>
            </Tooltip>
          </div>

          {searchTabOpen && (
            <SearchTab
              openSearchTab={searchTabOpen}
              setOpenSearchTab={setSearchTabOpen}
            />
          )}
          <Link to={"/messages"}>
            <Tooltip
              className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-black"
              content="Message"
              placement="right"
            >
              {notification.length === 0 ? (
              <EnvelopeIcon className="h-10 w-10 text-black" />
            ) : (
              <Badge content={notification.length} className="">
                <EnvelopeIcon className="h-10 w-10 text-black" />
              </Badge>
            )}
            </Tooltip>
          </Link>
          <div onClick={handleCreatePostClick}>
            <Tooltip
              className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-black"
              content="Create"
              placement="right"
            >
              <div>
                <SquaresPlusIcon className="h-10 w-10 text-black" />
              </div>
            </Tooltip>
          </div>
          {open && <CreatePost open={open} setOpen={setOpen} />}
          <Link to={`/profile/${user.userName}`}>
            <div>
              <Tooltip
                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-black"
                content="Profile"
                placement="right"
              >
                <div>
                  {user.dp ? (
                    <Avatar
                      src={POST_URL + `${user.dp}.jpg`}
                      alt="avatar"
                      className="h-12 w-12 "
                    />
                  ) : (
                    <UserCircleIcon className="h-10 w-10 text-black" />
                  )}
                </div>
              </Tooltip>
            </div>
          </Link>
          <Link to={"/settings"}>
            <div>
              <Tooltip
                className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-black"
                content="Settings"
                placement="right"
              >
                <div>
                  <Cog6ToothIcon className="h-10 w-10 text-black" />
                </div>
              </Tooltip>
            </div>
          </Link>
          <div onClick={handleLogout}>
            <Tooltip
              className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-black"
              content="Logout"
              placement="right"
            >
              <div>
                <PowerIcon className="h-10 w-10 text-black" />
              </div>
            </Tooltip>
          </div>
        </div>
      </Card>
      <Card className=" fixed bottom-0 left-0 md:hidden w-full bg-white p-2 border-2 rounded-none z-10">
        <div className="flex justify-around items-center">
          <Link to={"/home"}>
            <HomeIcon className="h-6 w-6 text-black" />
          </Link>

          <MagnifyingGlassIcon
            className="h-6 w-6 text-black"
            onClick={handleSearchTab}
          />
          {/* {searchTabOpen && <SearchTab openSearchTab = {searchTabOpen} setOpenSearchTab={setSearchTabOpen}/>} */}
          <Link to={"/messages"} className="flex items-center">
            {notification.length === 0 ? (
              <EnvelopeIcon className="h-7 w-7 text-black" />
            ) : (
              <Badge content={notification.length} className="">
                <EnvelopeIcon className="h-7 w-7 text-black" />
              </Badge>
            )}
          </Link>
          <SquaresPlusIcon
            className="h-6 w-6 text-black"
            onClick={handleCreatePostClick}
          />
          <Link to={`/profile/${user.userName}`}>
            <UserCircleIcon className="h-6 w-6 text-black" />
          </Link>
        </div>
      </Card>
    </>
  );
};

export default SmallSideBar;
