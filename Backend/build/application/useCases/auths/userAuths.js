"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCheckEmail = exports.loginUser = exports.registerUser = void 0;
const user_1 = require("../../../entities/user");
const appError_1 = __importDefault(require("../../../utilities/appError"));
const httpStatus_1 = require("../../../types/httpStatus");
//userRegister
const registerUser = async (userData, userRepository, authService) => {
    let { name, username, number, email, password } = userData;
    email = email.toLowerCase();
    const newUser = (0, user_1.user)(name, username, number, email, await authService.encryptPassword(password));
    return await userRepository
        .findByProperty(username)
        .then((userWithUsername) => {
        console.log("userWithUsername : ", userWithUsername);
        if (userWithUsername.length !== 0) {
            throw new appError_1.default(`User with username ${username} already exists`, httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        return userRepository.findByNumber(number);
    })
        .then((userWithNumber) => {
        if (userWithNumber.length !== 0) {
            throw new appError_1.default(`User with Phone number ${number} already exists`, httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        return userRepository.findByProperty(email);
    })
        .then((userWithEmail) => {
        if (userWithEmail.length !== 0) {
            throw new appError_1.default(`User with email: ${email} already exists`, httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        return userRepository.RegisterUser(newUser).then(async (user) => {
            console.log("userdetailds after then :", user);
            const token = await authService.generateToken({ id: user._id.toString(), role: "user" });
            return { token, user };
        });
    });
};
exports.registerUser = registerUser;
//userLogin
const loginUser = async (userData, userRepository, authService) => {
    const { username, password } = userData;
    return await userRepository.findByProperty(username).then((user) => {
        if (user.length === 0) {
            throw new appError_1.default(`User does not exist`, httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        return authService
            .comparePassword(password, user[0].password)
            .then(async (status) => {
            if (!status) {
                throw new appError_1.default(`Incorrect password.try again!`, httpStatus_1.HttpStatus.UNAUTHORIZED);
            }
            else if (status && user[0].accountDeactive) {
                return await userRepository
                    .activateAccount(user[0].userName)
                    .then(async (active) => {
                    console.log("actieve status of activate account : ", active);
                    if (!active) {
                        throw new appError_1.default(`Error occured while activating ${user[0].userName}'s account.try again!`, httpStatus_1.HttpStatus.UNAUTHORIZED);
                    }
                    else {
                        return {
                            token: await authService.generateToken({ id: user[0]._id, role: "user" }),
                            user,
                        };
                    }
                });
            }
            else {
                return {
                    token: await authService.generateToken({ id: user[0]._id, role: "user" }),
                    user,
                };
            }
        });
    });
};
exports.loginUser = loginUser;
//to check email for google login
const handleCheckEmail = async (email, userRepository) => {
    return await userRepository.findByProperty(email).then((user) => {
        if (!user) {
            throw new appError_1.default(`User does not exist`, httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        else {
            return user;
        }
    });
};
exports.handleCheckEmail = handleCheckEmail;
