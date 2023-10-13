"use strict";
//userLogin
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = void 0;
const httpStatus_1 = require("../../../types/httpStatus");
const appError_1 = __importDefault(require("../../../utilities/appError"));
const loginAdmin = async (adminData, adminRepository, authService) => {
    const { username, password } = adminData;
    console.log("admindata inn admin usecase :", adminData);
    return await adminRepository.findByProperty(username).then((admin) => {
        if (admin.length === 0) {
            throw new appError_1.default(`username or e-mail is incorrect.try again..!`, httpStatus_1.HttpStatus.UNAUTHORIZED);
        }
        return authService
            .comparePassword(password, admin[0].password)
            .then(async (status) => {
            if (!status) {
                throw new appError_1.default(`Incorrect password.try again!`, httpStatus_1.HttpStatus.UNAUTHORIZED);
            }
            else {
                return {
                    token: await authService.generateToken({ id: admin[0]._id, role: "user" }),
                    admin,
                };
            }
        });
    });
};
exports.loginAdmin = loginAdmin;
