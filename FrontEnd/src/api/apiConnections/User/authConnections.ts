import baseURL from "../../api";
import { toast } from "react-toastify";

interface RegisterResponse {
  message?: any;
  status: string;
  token?: string;
}

interface RegisterFormValues {
  name: string;
  userName: string;
  number: string;
  email: string;
  password: string;
}

export const register = async (userData: RegisterFormValues): Promise<any> => {
  try {
    const response: any = await baseURL.post<RegisterResponse>(
      "/auth/register",
      userData
    );

    console.log("response first : ", response);
    if (response.data.status === "success") {
      let signupResponse: RegisterResponse = {
        token: response.data.token,
        status: response.data.status,
      };

      toast.success("Registration successful");
      return signupResponse;
    } else {
      toast.error("Registration failed");
      return false;
    }
  } catch (error) {
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "An error occurred during registration";
    toast.error(errorMessage);
    throw new Error(errorMessage); // Throw the error to be caught by the caller
  }
};

export const login = async (userData: RegisterFormValues): Promise<any> => {
  try {
    const response: any = await baseURL.post<RegisterResponse>(
      "/auth/login",
      userData
    );

    console.log("response first : ", response);
    if (response.data.status === "success") {
      let loginResponse: RegisterResponse = {
        token: response.data.token,
        status: response.data.status,
      };

      toast.success("Registration successful");
      return loginResponse;
    } else {
      toast.error("Registration failed");
      return false;
    }
  } catch (error) {
    const errorMessage =
    (error as any)?.response?.data?.message ||
    "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage); // Throw the error to be caught by the caller
  }
};
