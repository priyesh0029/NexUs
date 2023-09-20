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
// import { register } from "../../../api/apiConnections/User/authConnections";
// import { useNavigate } from "react-router-dom";
//  import loadash from "lodash"
// import { ToastContainer,toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import { setToken } from "../../../features/redux/slices/user/tokenSlice";
// import { useDispatch } from "react-redux";

// const SignUpForm = () => {

//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const submitHandler = async(userData:any)=>{
//     console.log("data of user register = ",userData);
//     let response = await register(userData)
//     if(response.status ==='success'){
//       const token = response.token
//       console.log(token);
//       dispatch(setToken(token))

//       // navigate('/')
//     }else{
//       console.log("signUp failed");

//     }
//   }
//   return (
//     <Formik
//       initialValues={{
//         name: "",
//         username: "",
//         number: "",
//         email: "",
//         password: "",
//         confirmPassword:""
//       }}
//       validationSchema={Yup.object({
//         name: Yup.string()
//           .max(20, "Must be 15 characters or less")
//           .required("*Name required"),
//         username: Yup.string()
//           .max(20, "Must be 20 characters or less")
//           .required("*Username required"),
//         number:Yup.string()
//         .matches(/^[7-9]\d{9}$/, '*Invalid phone number')
//         .required('*Phone number required'),
//         email: Yup.string()
//           .email("*Invalid email address")
//           .required("*Email required"),
//         password: Yup.string()
// .required("*Password required")
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
// ,
//           confirmPassword: Yup.string().test(
//             "passwords-match",
//             "*Passwords do not match",
//             function (value) {
//               return this.parent.password === value;
//             }
//           ),
//       })}
//       onSubmit={(values, { setSubmitting }) => {
//         // alert(JSON.stringify(values, null, 2));
//         const data = loadash.omit(values,'confirmPassword')
//         submitHandler(data)
//         setSubmitting(false);
//         // setTimeout(() => {
//         // }, 400);
//       }}
//     >
//       {(formik) => (
//         <Card
//           color="transparent"
//           className="border-2 mt-16 lg:ms-110 sm:w-100 sm:ms-32 lg:w-90 text-center"
//           shadow={false}
//         >
//            <ToastContainer position="bottom-left" />
//           <Typography variant="h4" color="blue-gray" className="mt-8 ">
//             Sign up
//           </Typography>
//           <Typography color="gray" className="mt-1 sm:ms-2 lg:ms-2 font-normal">
//             Enter your details to Register.
//           </Typography>
//           <form className="mt-12 mb-24 w-100" onSubmit={formik.handleSubmit}>
//             <div className="flex  mb-4 gap-1 pl-[1.5rem] px-6 ">
//               <div>
//                 <Input
//                   size="lg"
//                   label="Name"
//                   id="name"
//                   type="text"
//                   {...formik.getFieldProps("name")}
//                 />
//                 {formik.touched.name && formik.errors.name ? (
//                   <div className="flex text-xs text-red-800">
//                     {formik.errors.name}
//                   </div>
//                 ) : null}
//               </div>
//               <div >
//                 <Input
//                 //  className="w-60"
//                   size="lg"
//                   label="Username"
//                   id="username"
//                   type="text"
//                   {...formik.getFieldProps("username")}
//                 />
//                 {formik.touched.username && formik.errors.username ? (
//                   <div className="flex text-xs text-red-800">
//                     {formik.errors.username}
//                   </div>
//                 ) : null}
//               </div>
//             </div>
//             <div className="mb-4 flex flex-col gap-4  ml-6 mr-4">
//               <div>
//                 <Input
//                   size="lg"
//                   label="Number"
//                   id="number"
//                   type="text"
//                   {...formik.getFieldProps("number")}
//                 />
//                 {formik.touched.number && formik.errors.number ? (
//                   <div className="flex text-xs text-red-800">
//                     {formik.errors.number}
//                   </div>
//                 ) : null}
//               </div>
//               <div>
//                 <Input
//                   size="lg"
//                   label="E-mail Address"
//                   id="email"
//                   type="text"
//                   {...formik.getFieldProps("email")}
//                 />
//                 {formik.touched.email && formik.errors.email ? (
//                   <div className="flex text-xs text-red-800">
//                     {formik.errors.email}
//                   </div>
//                 ) : null}
//               </div>
//               <div>
//                 <Input
//                   size="lg"
//                   label="Password"
//                   id="password"
//                   type="password"
//                   {...formik.getFieldProps("password")}
//                 />
//                 {formik.touched.password && formik.errors.password ? (
//                   <div className="flex text-xs text-red-800">
//                     {formik.errors.password}
//                   </div>
//                 ) : null}
//               </div>
//               <div>
//                 <Input
//                   size="lg"
//                   label="Repeat Password"
//                   id="confirmPassword"
//                   type="password"
//                   {...formik.getFieldProps("confirmPassword")}
//                 />
//                 {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
//                   <div className="flex text-xs text-red-800">
//                     {formik.errors.confirmPassword}
//                   </div>
//                 ) : null}
//               </div>
//             </div>

//             <Button type="submit" className="mt-6 w-28 mx-40" fullWidth>
//               Signn up
//             </Button>
//             <Typography
//               color="gray"
//               className="mt-4 text-center font-normal lg:w-68"
//             >
//               Already have an account?{" "}
//               <Link
//                 to="/"
//                 className="font-medium text-blue-500 transition-colors hover:text-blue-700"
//               >
//                 Log in
//               </Link>
//             </Typography>
//           </form>
//         </Card>
//       )}
//     </Formik>
//   );
// };

// export default SignUpForm;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Input, Button, Typography } from "@material-tailwind/react";
import { register } from "../../../api/apiConnections/User/authConnections";
import { setToken } from "../../../features/redux/slices/user/tokenSlice";
import loadash from "lodash";
import "react-toastify/dist/ReactToastify.css";
import { SetUserInfo } from "../../../features/redux/slices/user/homeSlice";
import { POST_URL } from "../../../constants/constants";

const SignUpForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (userData: any) => {
    let response = await register(userData);
    console.log("data of user response = ", response);
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

  const mobileNumberHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mobileValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    formik.setFieldValue("number", mobileValue);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      number: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "*Must be less than 20 characters")
        .required("*Required"),
      username: Yup.string()
        .max(20, "*Must be less than 20 characters")
        .required("*Required"),
      email: Yup.string().email("*Invalid email address").required("*Required"),
      password: Yup.string()
        .min(1, "*Must be 8 characters or more")
        .required("*Required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "*Password not match")
        .required("*Required"),
      number: Yup.string()
        .matches(
          /^[0-9]{10}$/,
          "*Mobile number must be a 10-digit numeric value"
        )
        .required("*Required"),
      // agreeTerms: Yup.boolean()
      //   .oneOf([true], "You must agree to the terms and conditions")
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const data = loadash.omit(values, "rePassword");
      submitHandler(data);
      setSubmitting(false);
    },
  });

  return (
    <div className="flex justify-center">
      <div className="flex w-100 mt-16 pt-8 items-center justify-center flex-col border-2 border-gray-400 rounded-xl">
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
          <ToastContainer position="bottom-left" />
          <form
            onSubmit={formik.handleSubmit}
            className=" ml-auto mr-auto 2 w-100 "
          >
            <Typography variant="h3" color="blue" className="text-center ">
              Sign Up
            </Typography>

            <div className="p-4">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <div>
                    <Input
                      type="text"
                      id="name"
                      size="lg"
                      label="Name"
                      {...formik.getFieldProps("name")}
                    />
                    <p className="h-6 ml-2 text-xs text-red-800">
                      {formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : null}
                    </p>
                  </div>

                  <div className="w-100">
                    <Input
                      type="text"
                      id="username"
                      size="lg"
                      label="Username"
                      {...formik.getFieldProps("username")}
                    />
                    <p className="h-4 ml-2 text-xs text-red-800">
                      {formik.touched.username && formik.errors.username
                        ? formik.errors.username
                        : null}
                    </p>
                  </div>
                </div>

                <Input
                  type="text"
                  id="number"
                  size="lg"
                  label="Phone Number"
                  value={formik.values.number}
                  onChange={mobileNumberHandle}
                  // {...formik.getFieldProps('mobile')}
                />
                <p className="h-4 ml-2 text-xs text-red-800">
                  {formik.touched.number && formik.errors.number
                    ? formik.errors.number
                    : null}
                </p>

                <Input
                  type="email"
                  id="email"
                  size="lg"
                  label="E-mail"
                  {...formik.getFieldProps("email")}
                />
                <p className="h-4 ml-2 text-xs text-red-800">
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null}
                </p>
                <Input
                  type="password"
                  id="password"
                  size="lg"
                  label="Password"
                  {...formik.getFieldProps("password")}
                />
                <p className="h-4 ml-2 text-xs text-red-800">
                  {formik.touched.password && formik.errors.password
                    ? formik.errors.password
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

              <div className="flex w-24 ml-44">
                <Button
                  type="submit"
                  className="mt-2"
                  color="blue"
                  variant="gradient"
                  fullWidth
                >
                  Submit
                </Button>
              </div>
              <Typography
                color="gray"
                className="mt-4 text-center font-normal lg:w-68"
              >
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                >
                  Log in
                </Link>
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
