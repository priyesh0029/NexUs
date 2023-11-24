import React, { useState } from "react";
import { Dialog } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { handleRemoveFromChat } from "../../../api/apiConnections/User/chatConnections";
import { setSelectedChat } from "../../../features/redux/slices/user/chatSlice";
import ReportModal from "../Post/ReportModal";
import { reportUser } from "../../../api/apiConnections/User/userConnections";
import { ToastContainer } from "react-toastify";

interface ManageProfileModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId : string
  userName :string
}

const ManageProfileModal: React.FC<ManageProfileModalProps> = ({
  open,
  setOpen,
  userId,
  userName
}) => {
  const handleOpen = () => setOpen(!open);


  //report user
  const [reportPageOpen, setReportPageOpen] = useState(false);
  const handleReportPage = () => {
    setReportPageOpen(!reportPageOpen);
  };

  //handle report user
  const handleReportUser = async(report:string)=>{
    const response = await reportUser(userId,report)
    if(response){
        handleOpen()
    }
  }

  return (
    <Dialog open={open} handler={handleOpen} size="xs" className="w-full">
        <ToastContainer position="bottom-center" />
      <div className="flex flex-col items-center w-full cursor-pointer">
        <div className="border-b-2 border-gray-400 w-full flex justify-center">
          <p className="text-red-600 font-semibold" onClick={handleReportPage}>Report</p>
        </div>
        {/* <div className="border-b-2 border-gray-400 w-full flex justify-center">
          <p className="text-black font-semibold">Block</p>
        </div> */}
        <div className=" w-full flex justify-center">
          <p className="text-black " onClick={handleOpen}>cancel</p>
        </div>
      </div>
      {reportPageOpen && (
          <ReportModal
            open={reportPageOpen}
            setOpen={setReportPageOpen}
            item={userName}
            handleReport={handleReportUser}
          />
        )}
    </Dialog>
  );
};

export default ManageProfileModal;