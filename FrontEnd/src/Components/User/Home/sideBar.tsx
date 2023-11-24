import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Avatar,
  Tooltip,
  Badge,
} from "@material-tailwind/react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  EnvelopeIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../../features/redux/slices/user/tokenSlice";
import CreatePost from "../Post/CreatePost";
import { useEffect, useState } from "react";
import { clearUserInfo } from "../../../features/redux/slices/user/homeSlice";
import { Link } from "react-router-dom";
import SearchTab from "./SearchTab";
import { POST_URL } from "../../../constants/constants";
import { handleGetNofications } from "../../../api/apiConnections/User/chatConnections";
import { SetNotification } from "../../../features/redux/slices/user/chatSlice";

const DefaultSidebar = () => {
  const dispatch = useDispatch();
  // const [showCreatePost, setShowCreatePost] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchTabOpen, setSearchTabOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(clearUserInfo());
  };

  const handleListItemClick = () => {
    // setShowCreatePost((prevShowCreatePost) => !prevShowCreatePost);
    // setShowCreatePost(!showCreatePost);
    setOpen(!open);
  };

  const handleSearchTab = () => {
    setSearchTabOpen(!searchTabOpen);
  };
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );
  const notification = useSelector(
    (store: { chat: { notification: string[] } }) => store.chat.notification
  );

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
      <Card className="xl:h-full xl:flex xl:fixed xl:left-0 w-[16rem] xl:p-4 xl:rounded-none xl:border-1 xl:border-black hidden">
        <div className="mb-2 p-4">
          <div className="flex justify-center gap-2">
            <div className="w-16 h-16 ">
              <img
                className="border rounded-xl"
                src={POST_URL + "logo/nexuswhite.jpg"}
                alt="logo"
              />
            </div>
            <div className="flex items-center">
              <p className="text-4xl font-bold font-cursive text-black">
                neXus
              </p>
            </div>
          </div>
        </div>
        <List>
          <Link to={"/home"}>
            <ListItem>
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5 text-black" />
              </ListItemPrefix>
              Home
            </ListItem>
          </Link>
          <ListItem onClick={handleSearchTab}>
            <ListItemPrefix>
              <MagnifyingGlassIcon className="h-5 w-5 text-black" />
            </ListItemPrefix>
            Search
          </ListItem>

          <Link to={"/messages"}>
            <ListItem>
              <ListItemPrefix>
                <EnvelopeIcon className="h-5 w-5 text-black" />
              </ListItemPrefix>
              Messages
              <ListItemSuffix>
                {!notification || notification.length === 0 ? (
                  ""
                ) : (
                  <Chip
                    value={notification?.length}
                    size="sm"
                    color="red"
                    className="rounded-full"
                  />
                )}
              </ListItemSuffix>
            </ListItem>
          </Link>
          <ListItem onClick={handleListItemClick}>
            <ListItemPrefix>
              <SquaresPlusIcon className="h-5 w-5 text-black" />
            </ListItemPrefix>
            Create
          </ListItem>

          <Link to={`/profile/${user.userName}`}>
            <ListItem>
              <ListItemPrefix>
                {user.dp ? (
                  <Avatar
                    src={POST_URL + `${user.dp}.jpg`}
                    alt="avatar"
                    className="h-8 w-8 text-black"
                  />
                ) : (
                  <UserCircleIcon className="h-5 w-5 text-black" />
                )}
              </ListItemPrefix>
              Profile
            </ListItem>
          </Link>
          <Link to={"/settings"}>
            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5 text-black" />
              </ListItemPrefix>
              Settings
            </ListItem>
          </Link>
          <ListItem onClick={handleLogout}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5 text-black" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
      <Card className="md:h-full md:flex md:fixed md:left-0 md:w-[6rem] md:p-4 md:rounded-none md:border-1 md: border-black xl:hidden hidden">
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

          <Link to={"/messages"}>
            <Tooltip
              className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-black"
              content="Message"
              placement="right"
            >
              {!notification || notification.length === 0 ? (
                <EnvelopeIcon className="h-10 w-10 text-black" />
              ) : (
                <Badge content={notification.length} className="">
                  <EnvelopeIcon className="h-10 w-10 text-black" />
                </Badge>
              )}
            </Tooltip>
          </Link>
          <div onClick={handleListItemClick}>
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
      <Card className=" fixed bottom-0 left-0  w-full bg-white p-2 border-2 rounded-none z-10 lg:hidden">
        <div className="flex justify-around items-center">
          <Link to={"/home"}>
            <HomeIcon className="h-6 w-6 text-black" />
          </Link>

          <MagnifyingGlassIcon
            className="h-6 w-6 text-black"
            onClick={handleSearchTab}
          />
          <Link to={"/messages"} className="flex items-center">
            {!notification || notification.length === 0  ? (
              <EnvelopeIcon className="h-7 w-7 text-black" />
            ) : (
              <Badge content={notification.length} className="">
                <EnvelopeIcon className="h-7 w-7 text-black" />
              </Badge>
            )}
          </Link>
          <SquaresPlusIcon
            className="h-6 w-6 text-black"
            onClick={handleListItemClick}
          />
          <Link to={`/profile/${user.userName}`}>
            <UserCircleIcon className="h-6 w-6 text-black" />
          </Link>
        </div>
      </Card>
      {searchTabOpen && (
        <SearchTab
          openSearchTab={searchTabOpen}
          setOpenSearchTab={setSearchTabOpen}
        />
      )}
      {open && <CreatePost open={open} setOpen={setOpen} />}
    </>
  );
};

export default DefaultSidebar;
