import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import loadash from "lodash";
import { useState } from "react";
import {
  newPassword,
  oldPasswordCheck,
} from "../../../api/apiConnections/User/userConnections";

const ManagePassword = () => {
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [submit, setSubmit] = useState<boolean>(false);
  const [submitRes, setSubmitRes] = useState<string>("");
  const [submitErr, setSubmitErr] = useState<string>("");

  //handleOldPassword
  const handleOldPassword = async (password: string) => {
    await oldPasswordCheck(password).then((response: boolean | string) => {
      console.log("error inside manage  password ", response);

      if (typeof response === "boolean") {
        setPasswordError("");
        setSubmitRes("");
        setSubmitErr("");
        setSubmit(true);
      } else {
        setPasswordError(response);
        setSubmitRes("");
        setSubmitErr("");
        setSubmit(false);
      }
    });
  };

  //change password
  const submitHandler = async (data: any) => {
    console.log("submitHandler : ", data);
    const response = await newPassword(data.rePassword);
    console.log("error inside manage  password ", response);

    if (typeof response === "boolean") {
      setSubmitRes("password changed successfully..!");
      setTimeout(() => {
        setSubmitRes("");
      }, 3000);
      setSubmit(false);
    } else {
      setSubmitErr(response);
      setTimeout(() => {
        setSubmitErr("");
      }, 3000);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      rePassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(1, "*Must be 8 characters or more")
        .required("*Required"),
      newPassword: Yup.string()
        .required("*Password required")
        .test(
          "password-match",
          "*Password must not match the current password",
          function (value) {
            return value !== this.parent.password;
          }
        ),
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
      rePassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), ""], "*Password not match")
        .required("*Required"),
    }),
    onSubmit: async (values) => {
      const data = loadash.omit(values, "password", "newPassword");
      console.log("data : ", values);

      submitHandler(data);
    },
  });
  return (
    <>
      <div className="p-8">
        <p className="text-2xl font-xl text-black">Change Password</p>
      </div>
      <div className="flex lg:px-32 items-center flex-col">
        <Card color="transparent" shadow={false}>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={formik.handleSubmit}
          >
            <div className=" flex flex-col gap-2">
              <Input
                type="password"
                id="password"
                size="lg"
                label="Current Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  handleOldPassword(e.target.value);
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
              <Input
                type="password"
                id="newPassword"
                size="lg"
                label="New Password"
                {...formik.getFieldProps("newPassword")}
              />
              <p className="h-4 ml-2 text-xs text-red-800">
                {formik.touched.newPassword && formik.errors.newPassword
                  ? formik.errors.newPassword
                  : null}
              </p>
              <Input
                type="password"
                id="rePassword"
                size="lg"
                label="Re-type Password"
                {...formik.getFieldProps("rePassword")}
              />
              <p className="h-4 ml-2 text-xs text-red-800">
                {formik.touched.rePassword && formik.errors.rePassword
                  ? formik.errors.rePassword
                  : null}
              </p>
            </div>
            <Button
              type="submit"
              className="mt-6 "
              fullWidth
              disabled={!submit}
            >
              Submit
            </Button>
          </form>
          <p
            className={
              submitRes.length !== 0
                ? "h-4 ml-2 text-xs text-green-400"
                : "h-4 ml-2 text-xs text-red-800"
            }
          >
            {submitRes.length !== 0 ? submitRes : submitErr}
          </p>
        </Card>
      </div>
    </>
  );
};

export default ManagePassword;
