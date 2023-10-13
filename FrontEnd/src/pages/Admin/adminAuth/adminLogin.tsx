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
import { POST_URL } from "../../../constants/constants";
import { adminLoginSubmit } from "../../../api/apiConnections/Admin/adminAuthConnections";
import { setAdminTokenSlice } from "../../../features/redux/slices/admin/adminTokenSlice";


const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (adminData: any) => {
    let response = await adminLoginSubmit(adminData);
    console.log("data of user login = ", response);
    if (response.status === "success") {
      const token = response.token;
      console.log(token);
       dispatch(setAdminTokenSlice(token));
      navigate("/dashboard");
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
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" color="blue" variant="gradient" fullWidth>
                Sign In
              </Button>
            </CardFooter>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
