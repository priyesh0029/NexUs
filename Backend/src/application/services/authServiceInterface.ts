import { authServiceType } from "../../framework/services/authServices";
import { Ipayload } from "../../types/userTypes/userTypes";

export const authServiceInterface = (services: ReturnType<authServiceType>) => {
  //password encryption
  const encryptPassword = async (password: string) => {
    return await services.encryptPassword(password);
  };

  //generate token

  const generateToken = async (payload: Ipayload) => {
    return await services.generateToken(payload);
  };

  //password compare

  const comparePassword = async (password: string, hashedPassword: string) => {
    return await services.comparePassword(password, hashedPassword);
  };

  return {
    encryptPassword,
    generateToken,
    comparePassword,
  };
};

export type authServiceInterfaceType = typeof authServiceInterface;
