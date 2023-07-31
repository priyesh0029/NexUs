import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import configKeys from "../../config";

export const authServices = () => {
  //passwordEncryption
  const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    return password;
  };

  //generate token

  const generateToken = async(payload: string) => {
    if (configKeys.JWT_SECRET) {
      const token =  await jwt.sign({ payload }, configKeys.JWT_SECRET, {
        expiresIn: "5d",
      });
      return token;
    } else {
      throw new Error("JWT_TOKEN_KEY is undefined");
    }
  };
  //comparePassword

  return {
    encryptPassword,
    generateToken
  };
};

export type authServiceType = typeof authServices;
