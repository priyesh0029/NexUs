import { Card, Typography, List, Avatar } from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { POST_URL } from "../../../constants/constants";
import { getusersList, handleFollows } from "../../../api/apiConnections/User/userConnections";
import { Link } from "react-router-dom";

const RightSideBar = () => {
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );
  const [usersList, setUsersList] = useState<
    { userName: string; dp: string }[]
  >([]);
  


  useEffect(() => {
    getuserList();
  }, []);

  const getuserList = async () => {
    const response = await getusersList(user.userName);
    console.log("response of get user list right side bar : ", response);

    setUsersList(response);
  };

  const initialFollowStates = usersList?.map(() => false);
  const [followStates, setFollowStates] = useState(initialFollowStates);

  const handleFollow = async (searchedUser:string,index :number) => {
    const response = await handleFollows(searchedUser, user.userName);
    if(response.status){
      if(response.state === 'added'){
        const newFollowStates = [...followStates];
        newFollowStates[index] = true;
        setFollowStates(newFollowStates)
      }else if (response.state === 'removed'){
        const newFollowStates = [...followStates];
        newFollowStates[index] = false;
        setFollowStates(newFollowStates)
      }
    }
  };

  return (
    <Card className="h-full flex fixed right-0 w-[22rem] p-4 rounded-none border-1 border-black">
      <div className="mb-2 p-4">
        <div className="flex">
          {user.dp ? (
            <Avatar
              src={POST_URL + `${user.dp}.jpg`}
              alt="avatar"
              className="h-14 w-14 p-1 "
            />
          ) : (
            <UserCircleIcon className="h-14 w-14 text-gray-500" />
          )}
          <div>
            <Link to={`/profile/${user.userName}`}>
              <p className="text-xl font-bold">{user.userName}</p>
            </Link>
            <p>{user.name}</p>
          </div>
        </div>
      </div>
      <List className="w-80">
        <div className="flex justify-between my-2">
          <div className="text-sm">suggested for you</div>
          <div className="text-sm text-blue-900">see all</div>
        </div>

        {usersList.map((userList,index) => (
          <div className="flex justify-between my-2" key={userList.userName}>
            <div className="text-md flex flex-row gap-2">
              {userList.dp ? (
                <Avatar
                  src={POST_URL + `${userList.dp}.jpg`}
                  alt="avatar"
                  className="h-12 w-12 p-1 "
                />
              ) : (
                <UserCircleIcon className="h-12 w-12 text-gray-500" />
              )}
              <div>
                <div className="flex flex-col  font-semibold text-gray-900">
                  <Link to={`/profile/${userList.userName}`}>
                    {userList.userName}
                  </Link>
                </div>
                <div className="flex flex-col text-sm">
                  followed by aswin es
                </div>
              </div>
            </div>
            <div className="text-sm text-blue-900 mt-1" onClick={()=>handleFollow(userList.userName,index)}>{followStates[index] ? "Unfollow":"Follow"}</div>
          </div>
        ))}
      </List>
    </Card>
  );
};

export default RightSideBar;
