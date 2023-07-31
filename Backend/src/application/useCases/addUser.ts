import { userTypeDbRepository } from "../repositories/userDbRepositories";
import { authServiceInterfaceType } from "../services/authServiceInterface";
import { user } from "../../entities/user";
import AppError from "../../utilities/appError";
import { HttpStatus } from "../../types/httpStatus";

export const registerUser = async (
  userData: {
    name: string;
    username: string;
    number: string;
    email: string;
    password: string;
  },
  userRepository: ReturnType<userTypeDbRepository>,
  authService: ReturnType<authServiceInterfaceType>
) => {
  let { name, username, number, email, password } = userData;
  email = email.toLowerCase();

  const newUser = user(
    name,
    username,
    number,
    email,
    await authService.encryptPassword(password)
  );

  return await userRepository
    .findByProperty(username)
    .then((userWithUsername) => {
      console.log("userWithUsername : ", userWithUsername);

      if (userWithUsername.length !== 0) {
        throw new AppError(
          `User with username ${username} already exists`,
          HttpStatus.UNAUTHORIZED
        );
      }
      return userRepository.findByNumber(number);
    })
    .then((userWithNumber) => {
      if (userWithNumber.length !== 0) {
        throw new AppError(
          `User with Phone number ${number} already exists`,
          HttpStatus.UNAUTHORIZED
        );
      }
      return userRepository.findByProperty(email);
    })
    .then((userWithEmail) => {
      if (userWithEmail.length !== 0) {
        throw new AppError(
          `User with email: ${email} already exists`,
          HttpStatus.UNAUTHORIZED
        );
      }
      return userRepository.RegisterUser(newUser).then(async(user) => {
        console.log("userdetailds after then :", user);
        const token = await authService.generateToken(user._id.toString());
        console.log("tokrnn authservice.genrtatoken : ",token);
        
        return token
      });
    });
};
