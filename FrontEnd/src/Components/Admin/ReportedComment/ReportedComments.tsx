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
import { useEffect, useState } from "react";
import {
  getReportedComments,
  manageCommnetStatus,
} from "../../../api/apiConnections/Admin/adminDashBoardConnections";
import { POST_URL } from "../../../constants/constants";
import moment from "moment";
import PostReportedModal from "../ReportedPost/PostReportModal";
import CommentReportModal from "./CommentReportModal";

const TABS = [
  {
    label: "Comments",
    value: "Comments",
  },
  {
    label: "Replies",
    value: "Replies",
  },
];

const TABLE_HEAD = [
  "Posted by",
  "Commented by",
  "Reports",
  "Post content",
  "Comment",
  "Commented Time",
  "Action",
];

interface ReportedComments {
  selectedTab: string;
}

const ReportedComments: React.FC<ReportedComments> = ({ selectedTab }) => {
  const [commentReport, setcommentReport] = useState<IcommentReport[]>();
  const [TABLE_ROWS, setTABLE_ROWS] = useState<IcommentReport[]>([]);
  const [reportModal, setreportModal] = useState<boolean>(false);
  const [reports, setReports] = useState<ICommentReportDetails[]>([]);

  useEffect(() => {
    if (selectedTab === "reportedcomments") {
      handleGetReportedComments();
    }
  }, [selectedTab]);

  const handleGetReportedComments = async () => {
    const response = await getReportedComments();
    console.log("getReportedComments : ", response);

    setcommentReport(response);
    setTABLE_ROWS(response);
  };

  //to handle active or inactive state of a post

  const handleBlockUnblock = async (commentId: string) => {
    const response = await manageCommnetStatus(commentId);
    console.log("response : ", response);
    if (response.status) {
      if (response.state === "blocked") {
        const updatedState = commentReport?.map((comment) => {
          if (comment._id == commentId) {
            return { ...comment, isBlocked: true };
          }
          return comment;
        });
        if (updatedState !== undefined) {
          setcommentReport(updatedState);
          setTABLE_ROWS(updatedState);
        }
      } else if (response.state === "unblocked") {
        const updatedState = commentReport?.map((comment) => {
          if (comment._id == commentId) {
            return { ...comment, isBlocked: false };
          }
          return comment;
        });
        if (updatedState !== undefined) {
          setcommentReport(updatedState);
          setTABLE_ROWS(updatedState);
        }
      }
    }
  };

  const handleTabs = (activeIndex: number) => {
    if (activeIndex === 0) {
      if (commentReport !== undefined) setTABLE_ROWS(() => commentReport);
    } else if (activeIndex === 1) {
      //   const reportedList = commentReport?.filter(
      //     (post) => post.reports !== 0
      //   );
      //   console.log("reportedList : ", reportedList);
      //   setTABLE_ROWS(()=>reportedList)
    }
  };

  // to search the user
  const [searchText, setSearchText] = useState("");

  const handleInput = (e: any) => {
    setSearchText(e.target.value);
    const regex = new RegExp(e.target.value, "i"); // "i" flag for case-insensitive search
    const filteredList = commentReport?.filter((comment) =>
      regex.test(comment.commetedUserName)
    );
    console.log("filteredList nwlyserche : ", filteredList);
    if (filteredList !== undefined) setTABLE_ROWS(filteredList);
  };

  //to handle ReportModal
  const handleReportModal = (reports: ICommentReportDetails[]) => {
    setreportModal(!reportModal);
    setReports(reports);
  };

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Reported Commments
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all reported commments
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <Tabs value="all" className="w-full md:w-max">
              <TabsHeader>
                {TABS.map(({ label, value }, index) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => handleTabs(index)}
                  >
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>
            <div className="w-full md:w-72">
              <Input label="Search" value={searchText} onChange={handleInput} />
            </div>
          </div>
        </CardHeader>
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
                    commentCreated,
                    commetedUserDp,
                    commetedUserEmail,
                    commetedUserName,
                    commetedUserUname,
                    post,
                    postedUserDp,
                    postedUserName,
                    postedUserUname,
                    reports,
                    isBlocked,
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
                        <div className="flex items-center gap-3">
                          <Avatar
                            src={POST_URL + `${postedUserDp}.jpg`}
                            alt={postedUserName}
                            size="sm"
                          />
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
                          <Avatar
                            src={POST_URL + `${commetedUserDp}.jpg`}
                            alt={commetedUserName}
                            size="sm"
                          />
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
                            >
                              view
                            </Typography>
                          ) : (
                            <></>
                          )}
                        </div>
                      </td>

                      {/*  */}
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
                            {moment(commentCreated).format("MMMM Do YYYY")}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <Tooltip
                          content={
                            isBlocked ? "tap to unblock" : "tap to block"
                          }
                        >
                          <Switch
                            onChange={() => handleBlockUnblock(_id)}
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
      </Card>
      {reportModal && (
        <CommentReportModal
          open={reportModal}
          setOpen={setreportModal}
          reports={reports}
        />
      )}
    </>
  );
};

export default ReportedComments;
