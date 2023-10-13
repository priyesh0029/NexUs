//userLogin

import { IadminInfo } from "../../../types/adminTypes/adminTypes";
import { HttpStatus } from "../../../types/httpStatus";
import AppError from "../../../utilities/appError";
import { adminTypeDbRepository } from "../../repositories/adminDbRepository";
import { authServiceInterfaceType } from "../../services/authServiceInterface";

export const loginAdmin = async (
    adminData: {
      username: string;
      password: string;
    },
    adminRepository: ReturnType<adminTypeDbRepository>,
    authService: ReturnType<authServiceInterfaceType>
  ) => {
    const { username, password } = adminData;
  console.log("admindata inn admin usecase :",adminData);
  
    return await adminRepository.findByProperty(username).then((admin:IadminInfo[]) => {
      if (admin.length === 0) {
        throw new AppError(`username or e-mail is incorrect.try again..!`, HttpStatus.UNAUTHORIZED);
      }
      return authService
        .comparePassword(password, admin[0].password)
        .then(async (status) => {
          if (!status) {
            throw new AppError(
              `Incorrect password.try again!`,
              HttpStatus.UNAUTHORIZED
            );
          }else {
            return {
              token: await authService.generateToken({id:admin[0]._id,role:"user"}),
              admin,
            };
          }
        });
    });
  };
  