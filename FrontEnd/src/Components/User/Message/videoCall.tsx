import { useEffect, useRef } from "react";
import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

interface IVideoPlayer {
  // stream: MediaStream
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  usersSteam: MediaStream | undefined;
  myStream: MediaStream | undefined;
  handleHangup : ()=> void
}

const VideoPlayer: React.FC<IVideoPlayer> = ({
  usersSteam,
  myStream,
  open,
  setOpen,
  handleHangup
}) => {
  const handleOpen = () => setOpen(!open);

  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);

  useEffect(() => {

    
    if (myStream !== undefined) {
      if (videoRef1.current) videoRef1.current.srcObject = myStream;
    }
    if (usersSteam !== undefined) {
      if (videoRef2.current){ videoRef2.current.srcObject = usersSteam;}
    }

  }, [usersSteam, myStream]);

 

  return (
    <>
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="xl"
      className="w-full"
      style={{ position: 'relative' }}
    >
      <div className="relative flex flex-col items-center md:flex-row md:w-1/2 gap-2 max-h-screen group">
        <video
          style={{ width: "100%" }}
          ref={videoRef1}
          autoPlay
          muted={true}
        />
        <video
          style={{ width: "100%" }}
          ref={videoRef2}
          autoPlay
          muted={true}
        />
        <div className="hang-up-button bg-red-700 px-8 rounded-xl cursor-pointer py-1">
          <p className="text-sm text-white" onClick={handleHangup}>Hang up</p>
        </div>
      </div>
    </Dialog>
  </>
  
  );
};

export default VideoPlayer;
