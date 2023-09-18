import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import ManageAccountMOadal from "./ManageAccountModal";
import { deactivateAccount, deleteAccount } from "../../../api/apiConnections/User/userConnections";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { clearToken } from "../../../features/redux/slices/user/tokenSlice";
import { clearUserInfo } from "../../../features/redux/slices/user/homeSlice";

const ManageAccount = () => {
  const datas = [
    {
      label: "Deactivate Account",
      desc: "Deactivating your account is temporary, and it means your profile will be hidden on Instagram until you reactivate it through Accounts Center or by logging in to your Instagram account.",
    },
    {
      label: "Delete Account",
      desc: "Deactivating your account is temporary, and it means your profile will be hidden on Instagram until you reactivate it through Accounts Center or by logging in to your Instagram account.",
    },
  ];
  const [manageAccModalOpen, setManageAccModalOpen] = useState<boolean>(false);
  const [action, SetAction] = useState<string>("");
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(clearUserInfo());
  };

  const handleManageAccModal = () => {
    setManageAccModalOpen(!manageAccModalOpen);
  };
  const handleAccount = async () => {
    if (action === "Deactivate Account") {
      await deactivateAccount()
        .then((response) => {
          if (response) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your has been Deactivated successfully",
              text: "Your has been temporarily deactivated. You can reactivate your account at any time through  logging in to your Nexus account.",
              showConfirmButton: true,
            //   timer: 1500,
            }).then(()=>{
                handleLogout();
            })
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else if (action === "Delete Account") {
        await deleteAccount()
        .then((response) => {
            if (response) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Your has been Deleted successfully",
                showConfirmButton: true,
              //   timer: 1500,
              }).then(()=>{
                  handleLogout();
              })
            }
          })
          .catch((error: any) => {
            console.log(error);
          });
    }
  };

  return (
    <>
      <div className="p-8 flex flex-col overflow-y-auto">
        <p className="text-2xl font-xl text-black">
          Deactivating or deleting your Nexus account
        </p>
        <p>
          If you want to take a break from Nexus, you can temporarily deactivate
          this account. If you want to permanently delete your account, let us
          know.
        </p>
      </div>
      <div className="flex lg:px-32 items-center flex-col">
        <Card color="transparent" shadow={false}>
          <List>
            {datas.map((data, index) => (
              <>
                <div>
                  <p className="text-md font-semibold text-black">
                    {data.label}
                  </p>
                </div>
                <ListItem className="p-0" key={index}>
                  <label
                    htmlFor={`vertical-list-${data.label}`}
                    className="flex w-full cursor-pointer items-center px-3 py-2"
                  >
                    <ListItemPrefix className="mr-3">
                      <Radio
                        name="vertical-list"
                        id={`vertical-list-${data.label}`}
                        ripple={false}
                        className="hover:before:opacity-0"
                        containerProps={{
                          className: "p-0",
                        }}
                        onClick={() => {
                          SetAction(data.label);
                        }}
                      />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="font-medium">
                      {data.desc}
                    </Typography>
                  </label>
                </ListItem>
              </>
            ))}
          </List>
          {action.length !== 0 ? (
            <div className="flex justify-end py-8">
              <button
                className="text-md text-white border-2 px-2 bg-blue-500 rounded-lg w-fit"
                onClick={handleManageAccModal}
              >
                continue
              </button>
            </div>
          ) : (
            ""
          )}
        </Card>
      </div>
      {manageAccModalOpen && (
        <ManageAccountMOadal
          open={manageAccModalOpen}
          setOpen={setManageAccModalOpen}
          handleAccount={handleAccount}
        />
      )}
    </>
  );
};

export default ManageAccount;
