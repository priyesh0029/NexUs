import HomeBody from "../../../Components/User/Home/Body";
import RightSideBar from "../../../Components/User/Home/RightSideBar";
import DefaultSidebar from "../../../Components/User/Home/sideBar";
const Home = () => {
  return (
    <div className="flex flex-row justify-center bg-black">
      <div className="flex justify-center">
        <DefaultSidebar />
      </div>
      <div className="flex justify-center xl:w-[calc(100vw-38rem)] xl:-ml-24 w-full ml-0 bg-white">
        <HomeBody />
      </div>
      <div className="xl:flex xl:justify-center hidden ">
        <RightSideBar />
      </div>
    </div>
  );
};

export default Home;
