import React, { useState } from "react";
import {
  Button,
  Dialog,
  Avatar,
  Input,
} from "@material-tailwind/react";
import { POST_URL } from "../../../constants/constants";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { oldPasswordCheck } from "../../../api/apiConnections/User/userConnections";


interface ImanageAccount {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAccount:() => void;
}

const ManageAccountMOadal: React.FC<ImanageAccount> = ({ open, setOpen,handleAccount }) => {
  const handleOpen = () => setOpen(!open);

  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );

  //handlePassword
  const handlePassword = async (password: string) => {
    await oldPasswordCheck(password).then((response: boolean | string) => {
      console.log("error inside manage  password ", response);

      if (typeof response === "boolean") {
        setPasswordError("");
        setSubmit(true)
      } else {
        setPasswordError(response);
        setSubmit(false)
      }
    });
  };

  const submitHandler = ()=>{
    handleAccount()
    handleOpen()
  }

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(1, "*Must be 8 characters or more")
        .required("*Required")
      // .min(8, "*Pasword must be 8 or more characters")
      // .matches(
      //   /(?=.*[a-z])(?=.*[A-Z])\w+/,
      //   "*Password should contain at least one uppercase and lowercase character"
      // )
      // .matches(/\d/, "*Password should contain at least one number")
      // .matches(
      //   /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
      //   "*Password should contain at least one special character"
      // ),
      ,
    }),
    onSubmit: async (values) => {
      console.log("data : ", values);

      submitHandler();
    },
  });

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex flex-col items-center py-24">
          <div className="flex justify-center ">
            {user.dp ? (
              <Avatar
                src={POST_URL + `${user.dp}.jpg`}
                alt="avatar"
                className="w-[6rem] h-[6rem] relative group-hover:opacity-40"
              />
            ) : (
              <UserCircleIcon className="text-gray-700" />
            )}
          </div>
          <div>
            <form
              className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={formik.handleSubmit}
            >
              <div className=" flex flex-col gap-2">
                <p>For your security, please re-enter your password to continue</p>
                <Input
                type="password"
                id="password"
                size="lg"
                label="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  handlePassword(e.target.value);
                  formik.handleChange(e);
                }}
                value={password}
              />
              <p className="h-4 ml-2 text-xs text-red-800">
                {passwordError.length !== 0
                  ? passwordError
                  : formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null}
              </p>
              </div>
              <Button
                type="submit"
                className="mt-6 "
                fullWidth
                disabled={!submit}
              >
                continue
              </Button>
            </form>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ManageAccountMOadal;
