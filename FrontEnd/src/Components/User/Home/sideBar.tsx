import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Avatar,
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
import { useState } from "react";
import { clearUserInfo } from "../../../features/redux/slices/user/homeSlice";
import { Link } from "react-router-dom";
import SearchTab from "./SearchTab";
import { POST_URL } from "../../../constants/constants";

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

  return (
    <>
      <Card className="xl:h-full xl:flex xl:fixed xl:left-0 w-[16rem] xl:p-4 xl:rounded-none xl:border-1 xl:border-black hidden">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            NexUs
          </Typography>
        </div>
        <List>
          <Link to={"/home"}>
            <ListItem>
              <ListItemPrefix>
                <HomeIcon className="h-5 w-5" />
              </ListItemPrefix>
              Home
            </ListItem>
          </Link>
          <ListItem onClick={handleSearchTab}>
            <ListItemPrefix>
              <MagnifyingGlassIcon className="h-5 w-5" />
            </ListItemPrefix>
            Search
          </ListItem>
          <ListItem>
            {searchTabOpen && (
              <SearchTab
                openSearchTab={searchTabOpen}
                setOpenSearchTab={setSearchTabOpen}
              />
            )}
            <ListItemPrefix>
              <EnvelopeIcon className="h-5 w-5" />
            </ListItemPrefix>
            Messages
            <ListItemSuffix>
              <Chip
                value="14"
                size="sm"
                variant="ghost"
                color="blue-gray"
                className="rounded-full"
              />
            </ListItemSuffix>
          </ListItem>
          <ListItem onClick={handleListItemClick}>
            <ListItemPrefix>
              <SquaresPlusIcon className="h-5 w-5" />
            </ListItemPrefix>
            Create
          </ListItem>
          {open && <CreatePost open={open} setOpen={setOpen} />}
          <Link to={`/profile/${user.userName}`}>
            <ListItem>
              <ListItemPrefix>
                {user.dp ? (
                  <Avatar
                    src={POST_URL + `${user.dp}.jpg`}
                    alt="avatar"
                    className="h-8 w-8 "
                  />
                ) : (
                  <UserCircleIcon className="h-5 w-5 text-gray-700" />
                )}
              </ListItemPrefix>
              Profile
            </ListItem>
          </Link>
          <ListItem>
            <ListItemPrefix>
              <Cog6ToothIcon className="h-5 w-5" />
            </ListItemPrefix>
            Settings
          </ListItem>
          <ListItem onClick={handleLogout}>
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
      <Card className=" fixed bottom-0 left-0 xl:hidden w-full bg-blue-200 p-2 border-2 rounded-none z-10">
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
            onClick={handleListItemClick}
          />
          <Link to={`/profile/${user.userName}`}>
            <UserCircleIcon className="h-6 w-6 text-gray-700" />
          </Link>
        </div>
      </Card>
    </>
  );
};

export default DefaultSidebar;
