import baseURL from "../../api";
import { toast } from "react-toastify";

interface RegisterResponse {
  message?: any;
  status: string;
  userInfo?: {
    token: string;
    user: {
      name: string;
      userName: string;
      dp : string;
      savedPost : string[]
    };
  };
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
        status: response.data.status,
        userInfo: {
          token: response.data.token.token,
          user: {
            name: response.data.token.user.name,
            userName: response.data.token.user.userName,
            dp :  response.data.token.user.dp,
            savedPost:response.data.token.user.savedPost
          },
        },
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
        status: response.data.status,
        userInfo: {
          token: response.data.token.token,
          user: {
            name: response.data.token.user[0].name,
            userName: response.data.token.user[0].userName,
            dp :  response.data.token.user[0].dp,
            savedPost:response.data.token.user[0].savedPost
          },
        },
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
