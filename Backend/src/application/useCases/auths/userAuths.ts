import { userTypeDbRepository } from "../../repositories/userDbRepositories";
import { authServiceInterfaceType } from "../../services/authServiceInterface";
import { user } from "../../../entities/user";
import AppError from "../../../utilities/appError";
import { HttpStatus } from "../../../types/httpStatus";

//userRegister

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
      return userRepository.RegisterUser(newUser).then(async (user) => {
        console.log("userdetailds after then :", user);
        const token = await authService.generateToken(user._id.toString());

        return token;
      });
    });
};

//userLogin

export const loginUser = async (
  userData: {
    username: string;
    password: string;
  },
  userRepository: ReturnType<userTypeDbRepository>,
  authService: ReturnType<authServiceInterfaceType>
) => {
  const { username, password } = userData;

  return await userRepository.findByProperty(username).then((user) => {
    console.log("login details of user :", user[0].password);
    if (user.length === 0) {
      throw new AppError(`User does not exist`, HttpStatus.UNAUTHORIZED);
    }
    return authService
      .comparePassword(password, user[0].password)
      .then((status) => {
        if (!status) {
          throw new AppError(
            `Incorrect password.try again!`,
            HttpStatus.UNAUTHORIZED
          );
        }
        return authService.generateToken(user[0]._id);
      });
  });
};
