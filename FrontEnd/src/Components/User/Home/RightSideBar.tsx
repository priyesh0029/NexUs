import { Card, Typography, List } from "@material-tailwind/react";
import { ShoppingBagIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";



const RightSideBar = () => {
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );
  console.log("userSlice : ", user.name);

  return (
    // <Card className="h-full flex fixed right-0 max-w-[24rem] p-4 rounded-none border-1 border-black">
    <Card className="h-full flex fixed right-0 w-[22rem] p-4 rounded-none border-1 border-black">
      <div className="mb-2 p-4">
        <div className="flex">
          <UserCircleIcon className="h-14 w-14 text-gray-700" />
          <div >
            <p className="text-xl font-bold">{user.userName}</p>
            <p>{user.name}</p>
          </div>
        </div>
      </div>
      <List className="w-80">
        <div className="flex justify-between my-5">
          <div className="text-sm">suggested for you</div>
          <div className="text-sm">see all</div>
        </div>

        <div className="flex justify-between my-5">
          <div className="text-md flex flex-row gap-2">
            <ShoppingBagIcon className="h-10 w-10" />
            <div>
              <div className="flex flex-col  font-semibold text-gray-900">
                Sterin paul
              </div>
              <div className="flex flex-col text-sm">followed by aswin es</div>
            </div>
          </div>
          <div className="text-sm text-blue-900 mt-1">Follow</div>
        </div>

        <div className="flex justify-between my-5">
          <div className="text-md flex flex-row gap-2">
            <ShoppingBagIcon className="h-10 w-10" />
            <div>
              <div className="flex flex-col  font-semibold text-gray-900">
                Sagar Sam
              </div>
              <div className="flex flex-col text-sm">followed by aswin es</div>
            </div>
          </div>
          <div className="text-sm text-blue-900 mt-1">Follow</div>
        </div>
        <div className="flex justify-between my-5">
          <div className="text-md flex flex-row gap-2">
            <ShoppingBagIcon className="h-10 w-10" />
            <div>
              <div className="flex flex-col  font-semibold text-gray-900">
                Adal adwait vikas
              </div>
              <div className="flex flex-col text-sm">followed by aswin es</div>
            </div>
          </div>
          <div className="text-sm text-blue-900 mt-1">Follow</div>
        </div>

        <div className="flex justify-between my-5">
          <div className="text-md flex flex-row gap-2">
            <ShoppingBagIcon className="h-10 w-10" />
            <div>
              <div className="flex flex-col  font-semibold text-gray-900">
                Abhilash
              </div>
              <div className="flex flex-col text-sm">followed by aswin es</div>
            </div>
          </div>
          <div className="text-sm text-blue-900 mt-1">Follow</div>
        </div>
      </List>
    </Card>
  );
};

export default RightSideBar;
