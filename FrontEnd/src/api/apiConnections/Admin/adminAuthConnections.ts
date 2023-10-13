import { toast } from "react-toastify";
import adminBaseURL from "../../adminInterceptor";

interface IadminLoginResponse {
    message?: any;
    status: string;
    token: string;
  }
  
  interface IAdminloginForm {
    userName: string;
    password: string;
  }
  

export const adminLoginSubmit = async (adminData: IAdminloginForm): Promise<any> => {
    try {
      console.log(" admin login data : ", adminData);
      
      const response: any = await adminBaseURL.post<IadminLoginResponse>(
        "/admin/adminlogin",
        adminData
      );
  
      console.log("response first : ", response);
      if (response.data.status === "success") {
        let loginResponse: IadminLoginResponse = {
           status: response.data.status,
            token: response.data.adminDetails.token,
          }
          
        toast.success("Admin loggedin successfully");
        return loginResponse;
      } else {
        toast.error("Admin login failed");
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
  