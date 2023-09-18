

import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

import {
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { setToken } from "../../../features/redux/slices/user/tokenSlice";
import { login } from "../../../api/apiConnections/User/authConnections";
import { SetUserInfo } from "../../../features/redux/slices/user/homeSlice";
import { useState } from "react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 


  const submitHandler = async (userData: any) => {
    let response = await login(userData)
    console.log("data of user login = ", response);
    if (response.status === "success") {
      const token = response.userInfo.token;
      const user = response.userInfo.user
      console.log(token);
      dispatch(setToken(token));
      dispatch(SetUserInfo(user))
      navigate('/')
    } else {
      console.log("signUp failed");
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "Must be less than 20 characters")
        .required("Required"),
      password: Yup.string()
        // .max(20, "Must be less than 20 characters")
        // .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: async (values,{ setSubmitting }) => {
      submitHandler(values);
      setSubmitting(false);
    },
  });

  return (
    <div className="flex w-screen justify-center pt-24">
      <ToastContainer position="bottom-left" />
      <form
        onSubmit={formik.handleSubmit}
        className=" border-2 border-gray-400 rounded-xl"
      >
        <Typography variant="h3" color="blue" className="text-center pt-6 ">
          Login
        </Typography>

        <CardBody className="flex flex-col gap-2">
          <Input
            type="text"
            label="User Name"
            size="lg"
            id="username"
            {...formik.getFieldProps("username")}
          />
          <p className="h-4 ml-2 text-sm text-red-800">
            {formik.touched.username && formik.errors.username
              ? formik.errors.username
              : null}
          </p>

          <Input
            type="password"
            label="Password"
            size="lg"
            id="password"
            {...formik.getFieldProps("password")}
          />
          <p className="h-4 ml-2 text-sm text-red-800">
            {formik.touched.password && formik.errors.password
              ? formik.errors.password
              : null}
          </p>
          {/* <div className="-ml-2.5"> */}
          {/* <Checkbox label="Remember Me" /> */}
          {/* </div> */}
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" color="blue" variant="gradient" fullWidth>
            Sign In
          </Button>

          <div className="flex justify-center items-center gap-3 p-4">
            <div className="w-full border-t-2 border-blue-gray-200 "></div>
            <p className="text-blue-gray-300">OR</p>
            <div className="w-full border-t-2 border-blue-gray-200 "></div>
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              variant="outlined"
              color="blue"
              className="flex items-center gap-3"
            >
              <img
                src="https://www.material-tailwind.com/icons/google.svg"
                alt="metamask"
                className="h-6 w-6"
              />
              Sign in with Google
            </Button>
          </div>
        </CardFooter>
        <Typography
          color="gray"
          className="m-6 text-center font-normal lg:w-64"
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-500 transition-colors hover:text-blue-700"
          >
            Sign up
          </Link>
        </Typography>
      </form>
    </div>
  );
};

export default LoginForm;
