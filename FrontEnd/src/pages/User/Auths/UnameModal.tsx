import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  CardBody,
  Input,
} from "@material-tailwind/react";
import { POST_URL } from "../../../constants/constants";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../../../api/apiConnections/User/authConnections";
import { setToken } from "../../../features/redux/slices/user/tokenSlice";
import { SetUserInfo } from "../../../features/redux/slices/user/homeSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface IUnameModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userData: {
    name: string;
    userName?: string;
    number?: string;
    email: string;
  };
}

interface Isubmitvalues {
  userName: string;
  number: string;
}

const UnameModal: React.FC<IUnameModal> = ({ open, setOpen, userData }) => {
  const handleOpen = () => setOpen(!open);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const mobileNumberHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const mobileValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    formik.setFieldValue("number", mobileValue);
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
      number: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .min(8, "username must include atleast 8 characters")
        .max(20, "Must be less than 20 characters")
        .required("*Required"),
        number: Yup.string()
        .matches(
          /^[0-9]{10}$/,
          "*Mobile number must be a 10-digit numeric value"
        )
        .required("*Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      submitHandler(values);
      setSubmitting(false);
    },
  });

  const submitHandler = async (values: Isubmitvalues) => {
    console.log("values : ", values);
    const userInfo = {
      name: userData.name,
      username : values.userName,
      number : values.number,
      email : userData.email,
    }

    const response = await register(userInfo);
    console.log("data of user response = ", response);
    if (response.status === "success") {
      const token = response.userInfo.token;
      const user = response.userInfo.user;
      console.log(token);
      dispatch(setToken(token));
      dispatch(SetUserInfo(user));
      navigate("/");
    } else {
      console.log("google signUp failed");
    }
  };

  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <div className="flex justify-center  py-10">
          <div className="w-16 h-16 ">
            <img
              className="border rounded-xl"
              src={POST_URL + "logo/nexuswhite.jpg"}
              alt="logo"
            />
          </div>
          <div className="flex items-center">
            <p className="text-4xl font-bold font-cursive text-black">neXus</p>
          </div>
        </div>
        <div className=" px-8 text-lg text-black">
          Hey {userData.name},plaese enter a username and your phone number to
          create an account in Nexus
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className=" ml-auto mr-auto flex flex-col items-center"
        >
          <div className="flex flex-col gap-2 mt-6">
            <Input
              type="text"
              label="User Name"
              size="lg"
              id="userName"
              {...formik.getFieldProps("userName")}
            />
            <p className="h-4 ml-2 text-xs text-red-800">
              {formik.touched.userName && formik.errors.userName
                ? formik.errors.userName
                : null}
            </p>

            <Input
              type="text"
              id="number"
              size="lg"
              label="Phone Number"
              value={formik.values.number}
              onChange={mobileNumberHandle}
            />
            <p className="h-4 mb-1 ml-2 text-xs text-red-800">
              {formik.touched.number && formik.errors.number
                ? formik.errors.number
                : null}
            </p>
          </div>
          <div className="flex w-24  justify-center">
            <Button
              type="submit"
              className="mb-4"
              color="blue"
              variant="gradient"
              fullWidth
            >
              Submit
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
};

export default UnameModal;
