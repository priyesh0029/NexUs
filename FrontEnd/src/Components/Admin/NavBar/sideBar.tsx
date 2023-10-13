import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { POST_URL } from "../../../constants/constants";
import DashBoardComponent from "../DashBoard/DashBoard";

const AdminSideBar = () => {
  const data = [
    {
      label: "Dashboard",
      value: "dashboard",
      icon: Square3Stack3DIcon,
      desc: <DashBoardComponent/>,
    },
    {
      label: "User",
      value: "user",
      icon: UserCircleIcon,
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Post",
      value: "post",
      icon: Cog6ToothIcon,
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Comments",
      value: "comments",
      icon: Cog6ToothIcon,
      desc: `We're not always in the position that we want to be at.
        We're constantly growing. We're constantly making mistakes. We're
        constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Logout",
      value: "logout",
      icon: Cog6ToothIcon,
      desc: `We're not always in the position that we want to be at.
        We're constantly growing. We're constantly making mistakes. We're
        constantly trying to express ourselves and actualize our dreams.`,
    },
  ];
  return (
    <Tabs
      value="dashboard"
      orientation="vertical"
      className="w-screen h-full"
    >
      <TabsHeader className="w-full h-full gap-36">
      <div className="flex justify-center gap-2 mt-4">
            <div className="w-16 h-16 ">
              <img
                className="border rounded-xl"
                src={POST_URL + "logo/nexuswhite.jpg"}
                alt="logo"
              />
            </div>
            <div className="md:flex items-center hidden">
              <p className="text-4xl font-bold font-cursive text-black">
                neXus
              </p>
            </div>
          </div>
        <div className="">
          {data.map(({ label, value, icon }) => (
            <Tab
              key={value}
              value={value}
              className="max-h-10 lg:min-w-[16em]"
              style={{ display: "flex", justifyContent: "flex-start"}}
            >
              <div className="flex items-start gap-2 ">
                {React.createElement(icon, { className: "w-5 h-5" })}
                {label}
              </div>
            </Tab>
          ))}
        </div>
      </TabsHeader>
      <TabsBody className="  ml-auto mr-auto "> 
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value} >
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default AdminSideBar;
