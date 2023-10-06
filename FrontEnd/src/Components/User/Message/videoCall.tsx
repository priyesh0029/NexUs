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
  usersSteam: MediaStream;
  myStream: MediaStream;
}

const VideoPlayer: React.FC<IVideoPlayer> = ({
  usersSteam,
  myStream,
  open,
  setOpen,
}) => {
  const handleOpen = () => setOpen(!open);

  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);


  useEffect(() => {
      if (videoRef1.current) videoRef1.current.srcObject = usersSteam;
      if (videoRef2.current) videoRef2.current.srcObject = myStream;
  }, [usersSteam,myStream]);

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
      >
        {/* <video style={{ width: "100%" }} ref={videoRef} autoPlay muted={true} /> */}
        <div className="flex flex-col items-center md:flex-row md:w-1/2 gap-2 max-h-screen">
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
        </div>
      </Dialog>
    </>
  );
};

//  const VideoPlayer: React.FC<{ stream: MediaStream }> = ({ stream }) => {
//     const videoRef = useRef<HTMLVideoElement>(null);

//     useEffect(() => {
//         if (videoRef.current) videoRef.current.srcObject = stream;
//     }, [stream]);

//     return (
//         <video style={{ width: "100%" }} ref={videoRef} autoPlay muted={true} />
//     );
// };
export default VideoPlayer;
