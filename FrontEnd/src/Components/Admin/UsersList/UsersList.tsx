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
  blockUser,
  getReportsOfUser,
  getusersListDetails,
} from "../../../api/apiConnections/Admin/adminDashBoardConnections";
import { POST_URL } from "../../../constants/constants";
import moment from "moment";
import UserReportModal from "./UserReportModal";

const TABS = [
  {
    label: "All",
    value: "allusers",
  },
  {
    label: "Reported",
    value: "reportedUsers",
  },
];

const TABLE_HEAD = [
  "Name",
  "user name",
  "E-mail",
  "Phone number",
  "Joined by",
  "Reports",
  "Action",
];

interface IUserTable {
  selectedTab: string;
}

const UserTable: React.FC<IUserTable> = ({ selectedTab }) => {
  const [usersList, setusersList] = useState<IAdminUserLise[]>([]);
  const [userReports, setuserReports] = useState<IuserReports>();
  const [reportModal, setreportModal] = useState<boolean>(false);
  const [TABLE_ROWS, setTABLE_ROWS] = useState<IAdminUserLise[]>([]);

  useEffect(() => {
    if (selectedTab === "users") {
      handleGetusersListDetails();
    }
  }, [selectedTab]);

  const handleGetusersListDetails = async () => {
    const response = await getusersListDetails();
    setusersList(response);
    setTABLE_ROWS(response);
  };

  const handleBlockUnblock = async (userId: string) => {
    const response = await blockUser(userId);
    console.log("response : ", response);
    if (response.status) {
      if (response.state === "blocked") {
        const updatedState = usersList.map((user) => {
          if (user._id == userId) {
            return { ...user, isBlock: true };
          }
          return user;
        });
        setusersList(updatedState);
        setTABLE_ROWS(updatedState);
      } else if (response.state === "unblocked") {
        const updatedState = usersList.map((user) => {
          if (user._id == userId) {
            return { ...user, isBlock: false };
          }
          return user;
        });
        setusersList(updatedState);
        setTABLE_ROWS(updatedState);
      }
    }
  };

  const handleReportModal = async (userId: string) => {
    const response = await getReportsOfUser(userId);
    console.log("respone of user response : ", response);
    setuserReports(response[0]);
    setreportModal(!reportModal);
  };

  const handleTabs = (activeIndex: number) => {
    if (activeIndex === 0) {
      setTABLE_ROWS(() => usersList);
    } else if (activeIndex === 1) {
      const reportedList = usersList.filter(
        (user) => user.reports.length !== 0
      );
      console.log("reportedList : ", reportedList);
      setTABLE_ROWS(() => reportedList);
    }
  };

  //to search the user
  const [searchText, setSearchText] = useState("");

  const handleInput = (e: any) => {
    setSearchText(e.target.value);
    const regex = new RegExp(e.target.value, "i"); // "i" flag for case-insensitive search
    const filteredList = usersList.filter((user) => regex.test(user.userName));
    console.log("filteredList nwlyserche : ", filteredList);
    setTABLE_ROWS(filteredList);
  };

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Users list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all users
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
                    dp,
                    userName,
                    name,
                    email,
                    phoneNumber,
                    createdAt,
                    reports,
                    isBlock,
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
                            src={POST_URL + `${dp}.jpg`}
                            alt={name}
                            size="sm"
                          />
                          <div className="flex flex-col ">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
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
                            {userName}
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
                            {email}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {phoneNumber}
                          </Typography>
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
                            {reports?.length}
                          </Typography>
                          {reports?.length > 0 ? (
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-blue-600 cursor-pointer"
                              onClick={() => handleReportModal(_id)}
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
                          content={isBlock ? "tap to unblock" : "tap to block"}
                        >
                          <Switch
                            onChange={() => handleBlockUnblock(_id)}
                            checked={isBlock}
                            label={isBlock ? "Inactive" : "Active"}
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
      {reportModal && userReports && (
        <UserReportModal
          open={reportModal}
          setOpen={setreportModal}
          userReports={userReports}
        />
      )}
    </>
  );
};

export default UserTable;
