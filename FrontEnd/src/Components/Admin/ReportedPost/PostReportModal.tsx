import React from "react";
import {
  Dialog,
  DialogHeader,
  Avatar,
} from "@material-tailwind/react";
import { Card, Typography } from "@material-tailwind/react";
import { POST_URL } from "../../../constants/constants";
import moment from "moment"

interface IPostReportModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postReports: IuserReports;
}

const PostReportedModal: React.FC<IPostReportModal> = ({
  open,
  setOpen,
  postReports,
}) => {
  console.log("postReports sate : ", postReports);

  const handleOpen = () => setOpen(!open);
  const TABLE_HEAD = ["Reported user", "Reason","Reported Time"];

  const TABLE_ROWS = postReports.reports;

  return (
    <>
      <Dialog open={open} handler={handleOpen} >
        <DialogHeader>Post Reports</DialogHeader>
        <Card className="h-full w-full overflow-scroll">
          <div
            className="mx-8 flex items-center gap-4 pt-0 pb-8  justify-evenly"
          >
            <Avatar
              size="xxl"
              variant="circular"
              src={POST_URL + `${postReports.dp}.jpg`}
              alt={postReports.name}
            />
            <div className="flex w-full flex-col gap-0.5">
              <div className="flex items-center justify-between">
                <Typography variant="h5" color="blue-gray">
                {postReports.userName}
                </Typography>   
              </div>
              <Typography color="blue-gray">{postReports.name}</Typography>
              <Typography color="blue-gray">{postReports.email}</Typography>
            </div>
          </div>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
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
                  { reportedUserName, reportedUserUname,createdAt, dp, reason },
                  index
                ) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={reportedUserUname}>
                      <td className={classes}>
                        <div className="flex gap-2">
                          <Avatar
                            src={POST_URL + `${dp}.jpg`}
                            alt={reportedUserUname}
                            size="sm"
                          />
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {reportedUserUname}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-70"
                            >
                              {reportedUserName}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {reason}
                        </Typography>
                      </td>
                      <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {moment(createdAt).format('MMMM Do YYYY')}
                      </Typography>
                    </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </Card>
      </Dialog>
    </>
  );
};

export default PostReportedModal;
