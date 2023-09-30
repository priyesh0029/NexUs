import { FaceSmileIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { Textarea, Button, IconButton } from "@material-tailwind/react";


interface ICahtBoxTextarea {
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: () => void;
  typinHandler: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ChatboxTextarea: React.FC<ICahtBoxTextarea> = ({
  newMessage,
  typinHandler,
  sendMessage,
}) => {

  

  return (
    <div className="flex flex-col w-full">
      
      <div className="flex w-full flex-row items-center gap-2 rounded-[99px] border border-gray-900/10 bg-gray-900/5 p-2">
        <div className="flex">
          {/* media */}
          <FaceSmileIcon className="h-6 w-6 ml-4 text-blue-500" />
        </div>
        <Textarea
          rows={1}
          resize={true}
          placeholder="Your Message"
          className="min-h-full !border-0 focus:border-transparent"
          containerProps={{
            className: "grid h-full",
          }}
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          value={newMessage}
          // onChange={(e)=> setNewMessage(e.target.value)}
          onChange={(e) => typinHandler(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <div onClick={sendMessage}>
          <PaperAirplaneIcon className="h-6 w-6 mr-4 text-blue-500" />
        </div>
      </div>
    </div>
  );
};

export default ChatboxTextarea;
