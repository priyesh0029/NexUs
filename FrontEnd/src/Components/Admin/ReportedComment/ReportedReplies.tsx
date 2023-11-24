import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  Tooltip,
  Switch,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { POST_URL } from "../../../constants/constants";
import moment from "moment";
import CommentReportModal from "./CommentReportModal";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { manageReplyStatus } from "../../../api/apiConnections/Admin/adminDashBoardConnections";

const TABLE_HEAD = [
  "Post content",
  "Posted by",
  "Replied to",
  "Replied by",
  "Reports",
  "Replied Time",
  "Action",
];

interface ReportedRepliesProps {
  replyReports: IReportedReplies[];
  setreplyReports : React.Dispatch<React.SetStateAction<IReportedReplies[]>>;
}

const ReportedReplies: React.FC<ReportedRepliesProps> = ({ replyReports,setreplyReports }) => {
  const [TABLE_ROWS, setTABLE_ROWS] = useState<IReportedReplies[]>(replyReports);
  const [reportModal, setreportModal] = useState<boolean>(false);
  const [reports, setReports] = useState<ICommentReportDetails[]>([]);

  //to handle active or inactive state of a reply

    const handleBlockUnblock = async (commentId: string,replyId:string) => {
      const response = await manageReplyStatus(commentId,replyId);
      console.log("response : ", response);
      if (response.status) {
        if (response.state === "blocked") {
          const updatedState = replyReports?.map((reply) => {
            if (reply.replyId == replyId) {
              return { ...reply, isBlocked: true };
            }
            return reply;
          });
          if (updatedState !== undefined) {
            setreplyReports(updatedState);
            setTABLE_ROWS(updatedState);
          }
        } else if (response.state === "unblocked") {
          const updatedState = replyReports?.map((reply) => {
            if (reply.replyId == replyId) {
              return { ...reply, isBlocked: false };
            }
            return reply;
          });
          if (updatedState !== undefined) {
            setreplyReports(updatedState);
            setTABLE_ROWS(updatedState);
          }
        }
      }
    };

  // to search the user
  const [searchText, setSearchText] = useState("");

  //   const handleInput = (e: any) => {
  //     setSearchText(e.target.value);
  //     const regex = new RegExp(e.target.value, "i"); // "i" flag for case-insensitive search
  //     const filteredList = commentReport?.filter((comment) =>
  //       regex.test(comment.commetedUserName)
  //     );
  //     console.log("filteredList nwlyserche : ", filteredList);
  //     if (filteredList !== undefined) setTABLE_ROWS(filteredList);
  //   };

  //to handle ReportModal
  const [replyDetails, setreplyDetails] = useState<IreplyDetails>()
  const handleReportModal = (reports: ICommentReportDetails[],comment:string,replyComment:string) => {
    setreportModal(!reportModal);
    setreplyDetails({comment,replyComment})
    setReports(reports);
  };

  return (
    <>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map(
              (
                {
                  _id,
                  comment,
                  commetedUserDp,
                  commetedUserName,
                  commetedUserUname,
                  isBlocked,
                  post,
                  postedUserDp,
                  postedUserName,
                  postedUserUname,
                  replyId,
                  repliedUserDp,
                  repliedUserEmail,
                  repliedUserName,
                  repliedUserUname,
                  replyComment,
                  replyCreatedAt,
                  reports,
                },
                index
              ) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex flex-col ">
                        <Avatar
                          src={POST_URL + `${post[0]}.jpg`}
                          alt={postedUserName}
                          size="lg"
                          variant="rounded"
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        {postedUserDp?<Avatar
                          src={POST_URL + `${postedUserDp}.jpg`}
                          alt={postedUserName}
                          size="sm"
                        />:<UserCircleIcon className="h-10 w-10 text-gray-500" /> }
                        <div className="flex flex-col ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {postedUserUname}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {postedUserName}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                       {commetedUserDp?<Avatar
                            src={POST_URL + `${commetedUserDp}.jpg`}
                            alt={postedUserName}
                            size="sm"
                          />:<UserCircleIcon className="h-10 w-10 text-gray-500" /> }
                        <div className="flex flex-col ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {commetedUserUname}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {commetedUserName}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex items-center gap-3">
                      {repliedUserDp?<Avatar
                          src={POST_URL + `${postedUserDp}.jpg`}
                          alt={repliedUserDp}
                          size="sm"
                        />:<UserCircleIcon className="h-10 w-10 text-gray-500" /> }
                        <div className="flex flex-col ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {repliedUserName}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {repliedUserUname}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {repliedUserEmail}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    <td className={classes}>
                      <div className="flex flex-col justify-center items-center group">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {reports?.length}
                        </Typography>
                        {reports?.length > 0 ? (
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-blue-600 cursor-pointer"
                            onClick={() => handleReportModal(reports,comment,replyComment)}
                          >
                            view
                          </Typography>
                        ) : (
                          <></>
                        )}
                      </div>
                    </td>

                    {/*  */}
                             {/* <td className= "">
            <div className="flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {comment}
              </Typography>
            </div>
          </td>
          <td className={classes}>
            <div className="flex flex-col">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {replyComment}
              </Typography>
            </div>
          </td> */}
                    
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {moment(replyCreatedAt).format("MMMM Do YYYY")}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <Tooltip
                        content={isBlocked ? "tap to unblock" : "tap to block"}
                      >
                        <Switch
                           onChange={() => handleBlockUnblock(_id,replyId)}
                          checked={isBlocked}
                          label={isBlocked ? "Inactive" : "Active"}
                        />
                      </Tooltip>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
      {reportModal && replyDetails && (
        <CommentReportModal
          open={reportModal}
          setOpen={setreportModal}
          reports={reports}
          replyDetails={replyDetails}
        />
      )}
    </>
  );
};

export default ReportedReplies;
