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
import { register } from "../../../api/apiConnections/User/authConnections";
import { useNavigate } from "react-router-dom";
import loadash from "lodash"
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { setToken } from "../../../features/redux/slices/user/tokenSlice";
import { useDispatch } from "react-redux";


const SignUpForm = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = async(userData:any)=>{
    console.log("data of user register = ",userData);
    let response = await register(userData)
    if(response.status ==='success'){
      const token = response.token
      console.log(token);
      dispatch(setToken(token))
      
      // navigate('/')
    }else{
      console.log("signUp failed");
      
    }
  }
  return (
    <Formik
      initialValues={{
        name: "",
        username: "",
        number: "",
        email: "",
        password: "",
        confirmPassword:""
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .max(20, "Must be 15 characters or less")
          .required("*Name required"),
        username: Yup.string()
          .max(20, "Must be 20 characters or less")
          .required("*Username required"),
        number:Yup.string()
        .matches(/^[7-9]\d{9}$/, '*Invalid phone number')
        .required('*Phone number required'),
        email: Yup.string()
          .email("*Invalid email address")
          .required("*Email required"),
        password: Yup.string()
          .required("*Password required")
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
          ,
          confirmPassword: Yup.string().test(
            "passwords-match",
            "*Passwords do not match",
            function (value) {
              return this.parent.password === value;
            }
          ),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // alert(JSON.stringify(values, null, 2));
        const data = loadash.omit(values,'confirmPassword')
        submitHandler(data)
        setSubmitting(false);
        // setTimeout(() => {
        // }, 400);
      }}
    >
      {(formik) => (
        <Card
          color="transparent"
          className="border-2 mt-16 lg:ms-100 sm:w-100 sm:ms-32 lg:w-90"
          shadow={false}
        >
           <ToastContainer position="bottom-left" />
          <Typography variant="h4" color="blue-gray" className="mt-8 ">
            Sign up
          </Typography>
          <Typography color="gray" className="mt-1 sm:ms-2 lg:ms-2 font-normal">
            Enter your details to Register.
          </Typography>
          <form className="mt-12 mb-24 " onSubmit={formik.handleSubmit}>
            <div className="flex  mb-4 gap-1 pl-[1.5rem] px-6 ">
              <div>
                <Input
                  size="lg"
                  label="Name"
                  id="name"
                  type="text"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="flex text-xs text-red-800">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
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
            </div>
            <div className="mb-4 flex flex-col gap-4  ml-6 mr-4">
              <div>
                <Input
                  size="lg"
                  label="Number"
                  id="number"
                  type="number"
                  {...formik.getFieldProps("number")}
                />
                {formik.touched.number && formik.errors.number ? (
                  <div className="flex text-xs text-red-800">
                    {formik.errors.number}
                  </div>
                ) : null}
              </div>
              <div>
                <Input
                  size="lg"
                  label="E-mail Address"
                  id="email"
                  type="text"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="flex text-xs text-red-800">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div>
                <Input
                  size="lg"
                  label="Password"
                  id="password"
                  type="password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="flex text-xs text-red-800">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
              <div>
                <Input
                  size="lg"
                  label="Repeat Password"
                  id="confirmPassword"
                  type="password"
                  {...formik.getFieldProps("confirmPassword")}
                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className="flex text-xs text-red-800">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
            </div>
           
            <Button type="submit" className="mt-6 w-28 mx-40" fullWidth>
              Signn up
            </Button>
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
          </form>
        </Card>
      )}
    </Formik>
  );
};

export default SignUpForm;
