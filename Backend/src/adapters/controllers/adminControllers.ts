import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { authServiceInterfaceType } from "../../application/services/authServiceInterface";
import { authServiceType } from "../../framework/services/authServices";
import { adminTypeDbRepository } from "../../application/repositories/adminDbRepository";
import { adminTypeRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/adminRepository";
import { loginAdmin } from "../../application/useCases/admin/adminAuths";

export const adminAuthControllers = (
  authServiceInterfaceApp: authServiceInterfaceType,
  authService: authServiceType,
  adminDbRepo: adminTypeDbRepository,
  adminDbRepoImpl: adminTypeRepositoryMongoDB
) => {
  const adminRepoDb = adminDbRepo(adminDbRepoImpl());
  const authServices = authServiceInterfaceApp(authService());

 
//AdminLogin

const getAdminLogin = asyncHandler(async(req:Request,res:Response)=>{
    const admin = req.body;
    console.log("admindata i n controllers :",admin);

    await loginAdmin(admin,adminRepoDb,authServices).then((adminDetails)=>{
      console.log("response",adminDetails);
      res.json({
        status: "success",
        message: "admin loggedin successfully",
        adminDetails: adminDetails
      });
    })

  })


  return {
    getAdminLogin
  };
};
