import React from "react";
import { Dialog } from "@material-tailwind/react";

interface IconfirmModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  item: string;
  handleConfirmFunction: () => void;
  reportReason?: string;
}

const ConfirmDialouge: React.FC<IconfirmModal> = ({
  open,
  setOpen,
  item,
  handleConfirmFunction,
  reportReason,
}) => {
  const handleOpen = () => setOpen(!open);

  const handleConfirm = () => {
    handleConfirmFunction();
    handleOpen();
  };

  let items = item.split(" ");
  console.log("items of confirm modal: ", items);

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
        <div className="flex flex-col items-center">
          <div className="pt-4">
            <p className="text-xl font-bold text-black">{items[0]} ?</p>
          </div>
          <div className="flex flex-col items-center py-4">
            <p>Are you sure you want to </p>
            <p>{item} ?</p>
          </div>
            {items[0] === "Report" ? (
              <div className="flex py-4 gap-3 w-full">
                <p className="flex text-red-800 w-[40%] justify-end">Report reason : </p>
                <p className="text-black w-[60%]"> {reportReason}</p>
              </div>
            ) : (
              ""
            )}
          <div className="flex flex-col items-center pb-4">
            {items[0] === "Delete" ? (
              <button
                className="py-2 text-blue-500 text-lg font-semibold"
                onClick={handleConfirm}
              >
                Delete
              </button>
            ) : (
              <button
                className="py-2 text-red-800 text-lg font-semibold"
                onClick={handleConfirm}
              >
                Report
              </button>
            )}
            <button
              className="py-3 text-black text-lg font-semibold"
              onClick={handleOpen}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ConfirmDialouge;
