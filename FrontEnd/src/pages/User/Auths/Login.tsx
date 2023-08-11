// import {
//   Card,
//   Input,
//   // Checkbox,
//   Button,
//   Typography,
// } from "@material-tailwind/react";

// import { Link } from "react-router-dom";
// import { Formik } from "formik";
// import * as Yup from "yup";
// import { useDispatch } from "react-redux";
// import { setToken } from "../../../features/redux/slices/user/tokenSlice";
// import { login } from "../../../api/apiConnections/User/authConnections";
// import { ToastContainer,toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';

// const LoginForm = () => {
//   const dispatch = useDispatch();

//   const submitHandler = async (userData: any) => {
//     console.log("data of user register = ", userData);
//     let response = await login(userData);
//     if (response.status === "success") {
//       const token = response.token;
//       console.log(token);
//       dispatch(setToken(token));

//       // navigate('/')
//     } else {
//       console.log("signUp failed");
//     }
//   };

//   return (
//     <Formik
//       initialValues={{
//         username: "",
//         // number: "",
//         // email: "",
//         password: "",
//       }}
//       validationSchema={Yup.object({
//         username: Yup.string()
//           .max(20, "Must be 20 characters or less")
//           .required("*Username required"),
//         // number: Yup.string()
//         //   .matches(/^[7-9]\d{9}$/, "*Invalid phone number")
//         //   .required("*Phone number required"),
//         // email: Yup.string()
//         //   .email("*Invalid email address")
//         //   .required("*Email required"),
//         password: Yup.string().required("*Password required"),
//         // .min(8, "*Pasword must be 8 or more characters")
//         // .matches(
//         //   /(?=.*[a-z])(?=.*[A-Z])\w+/,
//         //   "*Password should contain at least one uppercase and lowercase character"
//         // )
//         // .matches(/\d/, "*Password should contain at least one number")
//         // .matches(
//         //   /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
//         //   "*Password should contain at least one special character"
//         // )
//       })}
//       onSubmit={(values, { setSubmitting }) => {
//         // alert(JSON.stringify(values, null, 2));
//         console.log("values :",values);

//         submitHandler(values);
//         setSubmitting(false);
//         // setTimeout(() => {
//         // }, 400);
//       }}
//     >
//       {(formik) => (
//         <Card
//           color="transparent"
//           className="border-2 mt-16 lg:ms-110 sm:w-100 sm:ms-32 lg:w-96 text-center"
//           shadow={false}
//         >
//           <ToastContainer position="bottom-left" />
//           <Typography variant="h4" color="blue-gray" className="mt-8 ">
//             Sign in
//           </Typography>
//           <Typography color="gray" className="mt-1 sm:ms-2 lg:ms-2 font-normal">
//             Enter your details to Sign in.
//           </Typography>
//           <form className="mt-12 sm:mx-20 mb-24" onSubmit={formik.handleSubmit}>
//             <div className=" flex flex-col gap-6">
//               <div>
//                 <Input
//                   size="lg"
//                   label="Username"
//                   id="username"
//                   type="text"
//                   {...formik.getFieldProps("username")}
//                 />
//                 {formik.touched.username && formik.errors.username ? (
//                   <div className="flex text-xs text-red-800 ">
//                     {formik.errors.username}
//                   </div>
//                 ) : null}
//               </div>
//               <div>
//                 <Input
//                   type="password"
//                   size="lg"
//                   label="Password"
//                   id="password"
//                   {...formik.getFieldProps("password")}
//                 />
//                 {formik.touched.password && formik.errors.password ? (
//                   <div className="flex text-xs text-red-800 ">
//                     {formik.errors.password}
//                   </div>
//                 ) : null}
//               </div>
//             </div>
//             <Button type="submit" className="mt-6 sm:w-28 lg:mx-12 sm:mx-24 " fullWidth>
//               LogIn
//             </Button>
//             <Typography
//               color="gray"
//               className="mt-4 text-center font-normal lg:w-64"
//             >
//               Don't have an account?{" "}
//               <Link
//                 to="/signup"
//                 className="font-medium text-blue-500 transition-colors hover:text-blue-700"
//               >
//                 Sign up
//               </Link>
//             </Typography>
//           </form>
//         </Card>
//       )}
//     </Formik>
//   );
// };

// export default LoginForm;

import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast,ToastContainer } from "react-toastify";
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

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (userData: any) => {
    let response = await login(userData);
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
