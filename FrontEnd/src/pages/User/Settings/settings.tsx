
import DefaultSidebar from "../../../Components/User/Home/sideBar";
import SettingsBody from "../../../Components/User/Settings/SettingsBody";

const Settings = () => {
  return (
    <div className="flex flex-row justify-center bg-black">
      <div className="flex justify-center">
        <DefaultSidebar />
      </div>
      <div className="flex xl:ml-64 w-full ml-0 bg-white">
        <SettingsBody />
      </div>
      
    </div>
  );
};

export default Settings;
