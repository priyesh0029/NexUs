import { userTypeDbRepository } from "../../repositories/userDbRepositories";
import { authServiceInterfaceType } from "../../services/authServiceInterface";
import { user } from "../../../entities/user";
import AppError from "../../../utilities/appError";
import { HttpStatus } from "../../../types/httpStatus";
import { UserInfoLogin } from "../../../types/userTypes/userTypes";

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
    password ? await authService.encryptPassword(password):""
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
        const token = await authService.generateToken({id:user._id.toString(),role:"user"});
        return { token, user };
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

  return await userRepository.findByProperty(username).then((user:UserInfoLogin[]) => {
    if (user.length === 0) {
      throw new AppError(`User does not exist`, HttpStatus.UNAUTHORIZED);
    }else if(!user){
      throw new AppError(`an error occured while login.please try again after refreshing the page..!`, HttpStatus.UNAUTHORIZED);
    }
    return authService
      .comparePassword(password, user[0].password)
      .then(async (status) => {
        if (!status) {
          throw new AppError(
            `Incorrect password.try again!`,
            HttpStatus.UNAUTHORIZED
          );
        } else if (status && user[0].accountDeactive) {
          return await userRepository
            .activateAccount(user[0].userName)
            .then(async (active) => {
              console.log("actieve status of activate account : ", active);

              if (!active) {
                throw new AppError(
                  `Error occured while activating ${user[0].userName}'s account.try again!`,
                  HttpStatus.UNAUTHORIZED
                );
              }else {
                return {
                  token: await authService.generateToken({id:user[0]._id,role:"user"}),
                  user,
                };
              }
            });
        } else {
          return {
            token: await authService.generateToken({id:user[0]._id,role:"user"}),
            user,
          };
        }
      });
  });
};


//to check email for google login

// export const handleCheckEmail = async (
//   email:string,
//   userRepository: ReturnType<userTypeDbRepository>,
// ) => {
  

//   return await userRepository.findByProperty(email).then((user) => {
//     if (!user) {
//       throw new AppError(`User does not exist`, HttpStatus.UNAUTHORIZED);
//     }else{

//       return user
//     }
     
//   });
// };


export const handleCheckEmail = async (
  email:string,
  userRepository: ReturnType<userTypeDbRepository>,
  authService: ReturnType<authServiceInterfaceType>
) => {
  

  return await userRepository.findByProperty(email).then(async(user:UserInfoLogin[]) => {
    if (user.length === 0 ) {
      return {
        token: null,
        user,
      };
    }else if(!user){
      throw new AppError(`an error occured while login.please try again after refreshing the page..!`, HttpStatus.UNAUTHORIZED);
    }else if ( user[0].accountDeactive) {
          return await userRepository
            .activateAccount(user[0].userName)
            .then(async (active) => {
              console.log("actieve status of activate account : ", active);

              if (!active) {
                throw new AppError(
                  `Error occured while activating ${user[0].userName}'s account.try again!`,
                  HttpStatus.UNAUTHORIZED
                );
              }else {
                return {
                  token: await authService.generateToken({id:user[0]._id,role:"user"}),
                  user,
                };
              }
            });
        } else {
          return {
            token: await authService.generateToken({id:user[0]._id,role:"user"}),
            user,
          };
        }
      });
};


