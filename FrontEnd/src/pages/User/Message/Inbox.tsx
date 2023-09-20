import SmallSideBar from "../../../Components/User/Home/SmallSideBar";
import Chat from "../../../Components/User/Message/Chat";
import Message from "../../../Components/User/Message/message";
import ProfileArea from "../../../Components/User/Profile/profileArea";

const Inbox = () => {
  return (
    <div className="flex w-full h-full">
      <div className="flex">
        <SmallSideBar />
      </div>
      <div className="flex w-[calc(100vw-28rem)] max-w-[22rem] md:ml-[6rem] min-h-screen">
        <Chat />
      </div>
      <div className="flex w-full min-h-screen">
        <Message/>
      </div>
    </div>
  );
};

export default Inbox;
