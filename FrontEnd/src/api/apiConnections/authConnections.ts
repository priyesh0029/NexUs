import baseURL from "../api";
import {toast} from "react-toastify"

interface RegisterResponse {
    message?: any;
    status: string;
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
      const response = await baseURL.post<RegisterResponse>('/auth/register', userData);
  
      if (response.data.status === 'success') {
        toast.success('Registration successful');
        return 'success';
      } else {
        toast.error('Registration failed');
        return false;
      }
    } catch (error) {
  
      const errorMessage = (error as any)?.response?.data?.message || 'An error occurred during registration';
  
      toast.error(errorMessage);
      throw new Error(errorMessage); // Throw the error to be caught by the caller
    }
  };