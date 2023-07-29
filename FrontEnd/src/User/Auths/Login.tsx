import {
    Card,
    Input,
    // Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";

  import { Link } from "react-router-dom";
   
const LoginForm = ()=>{
    return (
      <Card color="transparent" className="border-2 mt-16 lg:ms-100 sm:w-100 sm:ms-32 lg:w-96" shadow={false}>
        <Typography variant="h4" color="blue-gray" className="mt-8 ">
          Sign in
        </Typography>
        <Typography color="gray" className="mt-1 sm:ms-2 lg:ms-2 font-normal">
          Enter your details to Sign in.
        </Typography>
        <form className="mt-12 sm:mx-20 mb-24">
          <div className="mb-4 flex flex-col gap-6">
            <Input size="lg" label="Username" />
            <Input type="password" size="lg" label="Password" />
          </div>
          {/* <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-blue-500"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          /> */}
          <Button className="mt-6 sm:w-28 lg:mx-12 sm:mx-24 " fullWidth>
            LogIn
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal lg:w-64">
            Already have an account?{" "}
            <Link to="/signup"
              className="font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Sign up
            </Link>
          </Typography>
        </form>
      </Card>
    );
  }

  export default LoginForm