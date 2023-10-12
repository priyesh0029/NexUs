import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import Lottie from "react-lottie";
import animationData1 from "../../../Animaitons/call_acceptButton.json";
import animationData2 from "../../../Animaitons/call_rejectButton.json";
import animationData3 from "../../../Animaitons/typing_2.json";


interface ICallNotify {
  // stream: MediaStream
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAnswerCall: React.Dispatch<React.SetStateAction<boolean>>;
  calledUser: string;
  handleVideocall : ()=>void
  // handleAnswerCall :()=>void
}

const CallNotify: React.FC<ICallNotify> = ({
  open,
  setOpen,
  setAnswerCall,
  calledUser,
  handleVideocall,
  // handleAnswerCall
}) => {
  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSetttings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: animationData2,
    rendererSetttings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  
  const defaultOptions3 = {
    loop: true,
    autoplay: true,
    animationData: animationData3,
    rendererSetttings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleOpen = () => setOpen(!open);

  const handleAnswer = ()=>{
    // handleAnswerCall()
    setAnswerCall(()=>true)
    //  handleVideocall()
    handleOpen()
  }

  
  const handleReject = ()=>{
    // handleAnswerCall()
    handleOpen()
  }

  return (
    <>
      <Dialog open={open} handler={handleOpen} size="sm" className="w-full">
        <div className="flex justify-center items-center flex-col w-full">
          <div className="flex justify-center w-full p-4">
            <UserCircleIcon className="h-28 w-36 text-gray-900" />
          </div>
          <div className="flex justify-center">
            <p className="flex  text-md text-green-600">
              {calledUser} is calling{" "}
            </p>
            <Lottie
                options={defaultOptions3}
                width={50}
                style={{display:"flex", justifyContent:"start"  }}
                key={`connecting_btn`}
              />
          </div>
          <div className="flex justify-between w-full pb-4 px-16">
            <div onClick={handleAnswer}>
              <Lottie
                options={defaultOptions1}
                width={100}
                style={{ marginBottom: 15, marginLeft: 0 }}
                key={`call_accept_btn`}
              />
            </div>
            <div onClick={handleReject}>
              <Lottie
                options={defaultOptions2}
                width={100}
                style={{ marginBottom: 15, marginLeft: 0 }}
                key={`call_reject_btn`}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CallNotify;
