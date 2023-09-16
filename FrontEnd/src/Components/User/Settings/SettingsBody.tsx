import React from "react";
import { useMediaQuery } from "react-responsive";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
  IdentificationIcon,
  PencilIcon,
  ShieldCheckIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import EditProfile from "./EditProfile";

const SettingsBody = () => {
  const data = [
    {
      label: "Edit profile",
      value: "editprofile",
      icon: PencilIcon,
      desc: <EditProfile />,
    },
    {
      label: "Personal details",
      value: "personalDetails",
      icon: IdentificationIcon,
      desc: `We're not always in the position that we want to be at.
        We're constantly growing. We're constantly making mistakes. We're
        constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Password and security",
      value: "passwordAndSecurity",
      icon: ShieldCheckIcon,
      desc: `We're not always in the position that we want to be at.
        We're constantly growing. We're constantly making mistakes. We're
        constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Switch appearence",
      value: "switchAppearence",
      icon: SunIcon,
      desc:`We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];

  const isMediumScreen = useMediaQuery({ maxWidth: 1024 });

  return (
    <div key="medium-screen" className="flex flex-col">
      <div className="py-8 px-6">
        <p className="font-2xl text-2xl">Settings</p>
      </div>
      {isMediumScreen ? (
        <div className=" flex flex-row">
          <Tabs value="editprofile" className="max-w-fit">
            <TabsHeader
              className="bg-transparent"
              indicatorProps={{
                className: "bg-gray-900/10 shadow-none !text-gray-900",
              }}
            >
              {data.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody className="flex flex-col w-full h-full justify-center">
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value}>
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      ) : (
        <div key="other-screen" className="flex max-h-screen flex-col">
          <Tabs value="editprofile" orientation="vertical">
            <TabsHeader className="lg:w-72 md:w-44 w-32 min-h-screen">
              {data.map(({ label, value, icon }) => (
                <Tab key={value} value={value} className="flex justify-start">
                  <div className="flex items-start gap-2">
                    {React.createElement(icon, { className: "w-5 h-5" })}
                    {label}
                  </div>
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody>
              {data.map(({ value, desc }) => (
                <TabPanel key={value} value={value} className="py-0">
                  {desc}
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      )}
    </div>
  );
};
export default SettingsBody;
