import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  HomeIcon ,
  MagnifyingGlassIcon ,
  UserCircleIcon,
  Cog6ToothIcon,
  PowerIcon,
  EnvelopeIcon ,
  SquaresPlusIcon 
} from "@heroicons/react/24/solid";
import { useDispatch } from "react-redux";
import { clearToken } from "../../../features/redux/slices/user/tokenSlice";
import CreatePost from "../Post/CreatePost";
import { useState } from "react";
import { clearUserInfo } from "../../../features/redux/slices/user/homeSlice";
 
const DefaultSidebar = ()=>{

  const dispatch = useDispatch()
  // const [showCreatePost, setShowCreatePost] = useState(false);
  const [open, setOpen] = useState(false);


  const handleLogout = ()=>{
    dispatch(clearToken())
    dispatch(clearUserInfo())
  }

  const handleListItemClick = () => {
    // setShowCreatePost((prevShowCreatePost) => !prevShowCreatePost);
    // setShowCreatePost(!showCreatePost);
    setOpen(!open)

  };

  return (
    // <Card className="h-full flex fixed left-0 max-w-[24rem] p-4 rounded-none border-1 border-black">
    <Card className="h-full flex fixed left-0 w-[16rem] p-4 rounded-none border-1 border-black">

      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          NexUs
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <HomeIcon  className="h-5 w-5" />
          </ListItemPrefix>
          Home
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <MagnifyingGlassIcon  className="h-5 w-5" />
          </ListItemPrefix>
          Search
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <EnvelopeIcon className="h-5 w-5" />
          </ListItemPrefix>
          Messages
          <ListItemSuffix>
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </ListItemSuffix>
        </ListItem>
        <ListItem onClick={handleListItemClick}>
       
          <ListItemPrefix>
            <SquaresPlusIcon className="h-5 w-5" />
          </ListItemPrefix>
          Create
        </ListItem>
        {open && <CreatePost open={open} setOpen={setOpen} />}
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem  onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}

export default DefaultSidebar