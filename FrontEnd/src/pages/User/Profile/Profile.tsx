
import DefaultSidebar from "../../../Components/User/Home/sideBar";
import ProfileArea from "../../../Components/User/Profile/profileArea";

const Profile = () => {
    return (
      <div className="flex">
        <div className="flex justify-center">
          <DefaultSidebar />
        </div>
        <div className=" xl:w-[calc(100vw-16rem)] xl:ml-[16rem] w-full pt-5 flex pb-28">
          <ProfileArea/>
        </div>
      </div>
    );
  };
  
  export default Profile;
  