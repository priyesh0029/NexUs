import {
  Card,
  Input,
  // Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setToken } from "../../../features/redux/slices/user/tokenSlice";
import { login } from "../../../api/apiConnections/User/authConnections";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const dispatch = useDispatch();

  const submitHandler = async (userData: any) => {
    console.log("data of user register = ", userData);
    let response = await login(userData);
    if (response.status === "success") {
      const token = response.token;
      console.log(token);
      dispatch(setToken(token));

      // navigate('/')
    } else {
      console.log("signUp failed");
    }
  };

  return (
    <Formik
      initialValues={{
        username: "",
        // number: "",
        // email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("*Username required"),
        // number: Yup.string()
        //   .matches(/^[7-9]\d{9}$/, "*Invalid phone number")
        //   .required("*Phone number required"),
        // email: Yup.string()
        //   .email("*Invalid email address")
        //   .required("*Email required"),
        password: Yup.string().required("*Password required"),
        // .min(8, "*Pasword must be 8 or more characters")
        // .matches(
        //   /(?=.*[a-z])(?=.*[A-Z])\w+/,
        //   "*Password should contain at least one uppercase and lowercase character"
        // )
        // .matches(/\d/, "*Password should contain at least one number")
        // .matches(
        //   /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
        //   "*Password should contain at least one special character"
        // )
      })}
      onSubmit={(values, { setSubmitting }) => {
        // alert(JSON.stringify(values, null, 2));
        console.log("values :",values);
        
        submitHandler(values);
        setSubmitting(false);
        // setTimeout(() => {
        // }, 400);
      }}
    >
      {(formik) => (
        <Card
          color="transparent"
          className="border-2 mt-16 lg:ms-100 sm:w-100 sm:ms-32 lg:w-96"
          shadow={false}
        >
          <ToastContainer position="bottom-left" />
          <Typography variant="h4" color="blue-gray" className="mt-8 ">
            Sign in
          </Typography>
          <Typography color="gray" className="mt-1 sm:ms-2 lg:ms-2 font-normal">
            Enter your details to Sign in.
          </Typography>
          <form className="mt-12 sm:mx-20 mb-24" onSubmit={formik.handleSubmit}>
            <div className=" flex flex-col gap-6">
              <div>
                <Input
                  size="lg"
                  label="Username"
                  id="username"
                  type="text"
                  {...formik.getFieldProps("username")}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="flex text-xs text-red-800">
                    {formik.errors.username}
                  </div>
                ) : null}
              </div>
              <div>
                <Input
                  type="password"
                  size="lg"
                  label="Password"
                  id="password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="flex text-xs text-red-800 ">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>
            <Button type="submit" className="mt-6 sm:w-28 lg:mx-12 sm:mx-24 " fullWidth>
              LogIn
            </Button>
            <Typography
              color="gray"
              className="mt-4 text-center font-normal lg:w-64"
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
        </Card>
      )}
    </Formik>
  );
};

export default LoginForm;
