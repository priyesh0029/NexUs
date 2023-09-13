import React, { useState } from "react";
import { Dialog } from "@material-tailwind/react";

interface IReportModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: string;
}

const postReportOptions = [
  "It's spam",
  "Nudity or sexual activity",
  "Hate speech or symbols",
  "Violence or dangerous organizations",
  "Bullying or harassment",
  "Intellectual property violation",
  "False information",
  "Suicide, self-injury, or eating disorders",
  "I just don't like it",
];

const ReportModal: React.FC<IReportModal> = (props) => {
  const { open, setOpen, item } = props;
  const [clickedItem, setClickedItem] = useState<string | null>(null);

  const handleOpen = () => setOpen(!open);

  const handleClick = (reportReason: string) => {
    setClickedItem(reportReason);
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="xs"
      >
        <div className="flex py-4 justify-center">
          <p className="text-xl font-bold text-black">Report</p>
        </div>
        <div className="flex flex-col items-start w-full py-4 gap-2 border-2 border-gray-400">
          <p className="font-semibold px-2">
            Why are you Reporting this {item}?
          </p>
          <div className="flex flex-col items-start w-full">
            {postReportOptions.map((option, index) => (
              <p
                key={index}
                className={`border-b border-gray-400 p-2 w-full ${
                  clickedItem === option ? 'bg-gray-200' : ''
                }`}
                onClick={() => handleClick(option)}
              >
                {option}
              </p>
            ))}
            {clickedItem && (
              <p className="border-b border-gray-400 p-2 w-full">
                Clicked: {clickedItem}
              </p>
            )}
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ReportModal;
