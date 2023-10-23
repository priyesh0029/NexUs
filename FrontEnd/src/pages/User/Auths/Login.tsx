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
import {
  login,
  loginThroughEmailCheck,
} from "../../../api/apiConnections/User/authConnections";
import { SetUserInfo } from "../../../features/redux/slices/user/homeSlice";
import { useState } from "react";
import { POST_URL } from "../../../constants/constants";
import { auth, provider } from "../../../constants/firebaseAuth";
import { signInWithPopup } from "firebase/auth";
import UnameModal from "./UnameModal";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setuserData] = useState<IgoogleLoginResponse>({
    name: "",
    email: "",
  });

  const [gmailUnameModal, setgmailUnameModal] = useState<boolean>(false)




  const submitHandler = async (userData: any) => {
    let response = await login(userData);
    console.log("data of user login = ", response);
    if (response.status === "success") {
      const token = response.userInfo.token;
      const user = response.userInfo.user;
      console.log(token);
      dispatch(setToken(token));
      dispatch(SetUserInfo(user));
      navigate("/");
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
    onSubmit: async (values, { setSubmitting }) => {
      submitHandler(values);
      setSubmitting(false);
    },
  });

  const handleGoogleSignIn =  () => {
    provider.setCustomParameters({ prompt: "select_account" }); // Force account 
     signInWithPopup(auth, provider).then((data) => {
      console.log(
        "email: ",
        data.user.displayName,
        data.user.phoneNumber,
        data.user.email
      );
      if (data.user.displayName !== null && data.user.email !== null) {
        const userDetails = {
          name: data.user.displayName,
          email: data.user.email,
        };
        setuserData(userDetails);
        handleLoginThroughEmail(data.user.email);
      }
    });
  };

  const handleLoginThroughEmail = async (email:string) => {
    const response = await loginThroughEmailCheck(email);
    console.log("data of user login = ", response);
    if (response.status === "newUser"){
        console.log("response.status : ",response.status);
        setgmailUnameModal(!gmailUnameModal)
    }else if (response.status === "success") {
      const token = response.userInfo.token;
      const user = response.userInfo.user;
      console.log(token);
      dispatch(setToken(token));
      dispatch(SetUserInfo(user));
      navigate("/");
    } else {
      console.log("signUp failed");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="flex w-100 mt-16 pt-12 items-center justify-center flex-col border-2 border-gray-400 rounded-xl">
        <div>
          <div className="flex justify-center gap-2">
            <div className="w-16 h-16 ">
              <img
                className="border rounded-xl"
                src={POST_URL + "logo/nexuswhite.jpg"}
                alt="logo"
              />
            </div>
            <div className="flex items-center">
              <p className="text-4xl font-bold font-cursive text-black">
                neXus
              </p>
            </div>
          </div>
          <ToastContainer position="bottom-left" />
        </div>
        <div className="flex justify-center pt-8">
          <form onSubmit={formik.handleSubmit} className=" ">
            <Typography variant="h3" color="blue" className="text-center ">
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
                  onClick={handleGoogleSignIn}
                >
                  <img
                    src="https://static-00.iconduck.com/assets.00/google-icon-2048x2048-czn3g8x8.png"
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
      </div>
      {gmailUnameModal && <UnameModal  open={gmailUnameModal} setOpen ={setgmailUnameModal} userData={userData}/>}
    </div>
  );
};

export default LoginForm;
