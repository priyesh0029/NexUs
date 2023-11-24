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
  getPostListDetails,
  getReportsOfPost,
  managePostStatus,
} from "../../../api/apiConnections/Admin/adminDashBoardConnections";
import { POST_URL } from "../../../constants/constants";
import moment from "moment";
import PostReportedModal from "./PostReportModal";

const TABS = [
  {
    label: "All",
    value: "allPosts",
  },
  {
    label: "Reported",
    value: "reportedPosts",
  },
];

const TABLE_HEAD = [
  "Created by",
  "user name",
  "E-mail",
  "Post content",
  "Created time",
  "Reports",
  "Action",
];

interface PostTable {
  selectedTab: string;
}

const PostTable : React.FC<PostTable> = ({ selectedTab }) => {
  const [postsList, setpostsList] = useState<IallPosts[]>([]);
  const [postReports, setpostReports] = useState<IuserReports>();
  const [reportModal, setreportModal] = useState<boolean>(false);
  const [TABLE_ROWS, setTABLE_ROWS] = useState<IallPosts[]>([]);

  useEffect(() => {
    if (selectedTab === "posts") {
    handleGetPostListDetails();
    }
  }, [selectedTab]);

  const handleGetPostListDetails = async () => {
    const response = await getPostListDetails();
    console.log("handleGetPostListDetails : ", response);

    setpostsList(response);
    setTABLE_ROWS(response);
  };

  //to handle active or inactive state of a post

  const handleBlockUnblock = async (postId: string) => {    
    const response = await managePostStatus(postId);
    console.log("response : ", response);
    if (response.status) {
      if (response.state === "blocked") {
        const updatedState = postsList.map((post) => {
          if (post.postId == postId) {
            return { ...post, isBlocked: true };
          }
          return post;
        });
        setpostsList(updatedState);
        setTABLE_ROWS(updatedState)
      } else if (response.state === "unblocked") {
        const updatedState = postsList.map((post) => {
          if (post.postId == postId) {
            return { ...post, isBlocked: false };
          }
          return post;
        });
        setpostsList(updatedState);
        setTABLE_ROWS(updatedState)
      }
    }
  };

  const handleReportModal = async (postId: string) => {
    const response = await getReportsOfPost(postId);
    console.log("respone of post response : ", response);
    setpostReports(response[0]);
    setreportModal(!reportModal);
  };

  const handleTabs = (activeIndex: number) => {
    if (activeIndex === 0) {
        setTABLE_ROWS(()=>postsList)
    } else if (activeIndex === 1) {
      const reportedList = postsList.filter(
        (post) => post.reports !== 0
      );
      console.log("reportedList : ", reportedList);
      setTABLE_ROWS(()=>reportedList)
    }
  };

 // to search the user
  const [searchText, setSearchText] = useState("");

  const handleInput = (e: any) => {
    setSearchText(e.target.value)
    const regex = new RegExp(e.target.value, "i"); // "i" flag for case-insensitive search
    const filteredList = postsList.filter((post) => regex.test(post.postedUserUName));
    console.log("filteredList nwlyserche : ",filteredList);
    setTABLE_ROWS(filteredList)
  };

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Posts list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all posts
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
              <Input
                label="Search"
                value={searchText}
                onChange={handleInput}
              />
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
                    postId,
                    postedUserName,
                    postedUserUName,
                    postedUserDp,
                    postedEmail,
                    reports,
                    isBlocked,
                    postContent,
                    description,
                    createdAt,
                    updatedAt,
                  },
                  index
                ) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={postId}>
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
                              {postedUserName}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {postedUserUName}
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
                            {postedEmail}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col ">
                        <Avatar
                            src={POST_URL + `${postContent[0]}.jpg`}
                            alt={postedUserName}
                            size="lg"
                            variant="rounded"
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {moment(createdAt).format("MMMM Do YYYY")}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col justify-center items-center group">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {reports}
                          </Typography>
                          {reports > 0 ? (
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-blue-600 cursor-pointer"
                              onClick={() => handleReportModal(postId)}
                            >
                                view
                            </Typography>
                          ) : (
                            <></>
                          )}
                        </div>
                      </td>

                      <td className={classes}>
                        <Tooltip
                          content={isBlocked ? "tap to unblock" : "tap to block"}
                        >
                          <Switch
                            onChange={() => handleBlockUnblock(postId)}
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
      {reportModal && postReports && (
        <PostReportedModal
          open={reportModal}
          setOpen={setreportModal}
          postReports={postReports}
        />
      )}
    </>
  );
};

export default PostTable;
