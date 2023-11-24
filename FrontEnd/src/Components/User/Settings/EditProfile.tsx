import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Avatar,
  Textarea,
  Select,
  Option,
  Radio,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { POST_URL } from "../../../constants/constants";
import { PencilSquareIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import {
  editProfileHandle,
  getUserDetails,
  handleDp,
} from "../../../api/apiConnections/User/userConnections";
import {
  SetName,
  SetUserDp,
} from "../../../features/redux/slices/user/homeSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import GenderModal from "./genderModal";

const EditProfile = () => {
  const user = useSelector(
    (store: { home: { userInfo: UserInfo } }) => store.home.userInfo
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const [genderOpen, setGenderOpen] = useState<boolean>(false);
  const [biodata, setBiodata] = useState<string>("");
  const [name, Setname] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dob, setDob] = useState<string>("");


  const handleGenderModal = () => {
    setGenderOpen(!genderOpen);
  };

  const handlePropic = async () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the click event of the file input
    }
  };

  useEffect(() => {
    getProfileDetails(user.userName);
  }, []);

  const getProfileDetails = async (proId: string) => {
    const response = await getUserDetails(proId);
    if (typeof response.gender === "string") setGender(response.gender);
    if (typeof response.bio === "string") setBiodata(response.bio);
    if (typeof response.dob === "string") setDob(response.dob);
    if (typeof response.name === "string") Setname(response.name);
  };

  const submitHandler = async (userData: any) => {
    await editProfileHandle(userData).then((response) => {
      if (response) {
        dispatch(SetName(name));
      }
    });
  };
  const changePropic = async (file: File) => {
    console.log("Selected file:", file);
    const formData = new FormData();
    formData.append(`dp`, file);
    formData.append(`userName`, user.userName);
    formData.forEach((key, value) => {
      console.log(
        "profile pic in front end formdata key and value  : ",
        key,
        value
      );
    });

    const response = await handleDp(formData);
    if (response.length !== 0) {
      console.log("response: ", response, "response type: ", typeof response);
      dispatch(SetUserDp(response));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: name,
      bio: biodata,
      dob : dob
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "Must be less than 20 characters")
        .required("Required"),
      bio: Yup.string().max(150, "Must be less than 150 characters"),
      dob: Yup.string() .required("Required"),
      
    }),
    onSubmit: async (values, { setSubmitting }) => {
      submitHandler(values);
      setSubmitting(false);
    },
  });

  return (
    <>
      <div className="p-8">
        <p className="text-2xl font-xl text-black">Edit profile</p>
      </div>
      <div className="flex lg:px-32 items-center flex-col  ">
        <Card color="transparent" shadow={false}>
          <div className="flex items-center gap-12">
            <div className="w-[4rem] h-[4rem] rounded-full group relative flex items-center ">
              {user.dp ? (
                <Avatar
                  src={POST_URL + `${user.dp}.jpg`}
                  alt="avatar"
                  className="w-[4rem] h-[4rem] relative group-hover:opacity-40"
                />
              ) : (
                <UserCircleIcon className="text-gray-700" />
              )}
              <PencilSquareIcon
                className="w-[2rem] h-[2rem] ml-4 group-hover:opacity-100 opacity-0 text-gray-800  absolute"
                onClick={handlePropic}
              />
              <input
                ref={fileInputRef}
                type="file"
                style={{ display: "none" }}
                onChange={(event) => {
                  // Handle the selected file here
                  const selectedFile = event.target.files?.[0];
                  if (selectedFile) {
                    // Perform any actions you need with the selected file
                    changePropic(selectedFile);
                  }
                }}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-md font-bold">{user.userName}</p>
              <p
                className="text-md font-extralight text-blue-700"
                onClick={handlePropic}
              >
                Change Profile Photo
              </p>
            </div>
          </div>
          <form
            className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4 flex flex-col">
              <div>
                <Input
                  type="text"
                  id="name"
                  size="lg"
                  label="Name"
                  onChange={(e) => {
                    Setname(e.target.value);
                    formik.handleChange(e);
                  }}
                  value={name}
                />
                <p className="h-6 ml-2 text-xs text-red-800">
                  {formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : null}
                </p>
              </div>
              <div className="w-96">
                <Textarea
                  id="bio"
                  label="Bio"
                  onChange={(e) => {
                    setBiodata(e.target.value);
                    formik.handleChange(e);
                  }}
                  value={biodata}
                />
                <p className="h-6 ml-2 text-xs text-red-800">
                  {formik.touched.bio && formik.errors.bio
                    ? formik.errors.bio
                    : null}
                </p>
              </div>
              <div className="mb-4">
                <Input
                  id="dob"
                  type="date"
                  label="date of birth"
                  size="lg"
                  className="px-4 py-2"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                    formik.handleChange(e);
                  }}
                />
              </div>
              <p className="h-6 ml-2 text-xs text-red-800">
                  {formik.touched.dob && formik.errors.dob
                    ? formik.errors.dob
                    : null}
                </p>
              <div>
                <Input
                  type="text"
                  size="lg"
                  label="Gender"
                  readOnly
                  className="cursor-pointer"
                  value={gender}
                  onClick={handleGenderModal}
                />
              </div>
              {genderOpen && (
                <GenderModal
                  open={genderOpen}
                  setOpen={setGenderOpen}
                  gender={gender}
                  setGender={setGender}
                />
              )}
            </div>

            <Button type="submit" className="mt-6" fullWidth>
              Submit
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default EditProfile;
