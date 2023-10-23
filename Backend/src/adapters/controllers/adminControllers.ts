import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { authServiceInterfaceType } from "../../application/services/authServiceInterface";
import { authServiceType } from "../../framework/services/authServices";
import { adminTypeDbRepository } from "../../application/repositories/adminDbRepository";
import { adminTypeRepositoryMongoDB } from "../../framework/database/mongoDb/repositories/adminRepository";
import { adminDashboard, handleBlockUser, handleUserRegperWeek, handlegetAges, handlegetGenders, handlegetPostListDetails, handlegetReportsOfPost, handlegetReportsOfUser, handlegetallReportedCommets, handlegetallReportedReplies, handlegetusersListDetails, handlemanageCommentStatus, handlemanagePostStatus, loginAdmin } from "../../application/useCases/admin/adminAuths";
import AppError from "../../utilities/appError";
import { HttpStatus } from "../../types/httpStatus";

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

  const getAdminDashboard = asyncHandler(async(req:Request,res:Response)=>{
    
    await adminDashboard(adminRepoDb).then((dashBoardInfos)=>{
      console.log("response",dashBoardInfos);
      res.json({
        status: "success",
        message: "admin loggedin successfully",
        dashBoardInfos: dashBoardInfos
      });
    })

  })

  const getUserRegPerWeeek = asyncHandler(async(req:Request,res:Response)=>{
    
    await handleUserRegperWeek(adminRepoDb).then((userRegperWeek)=>{
      console.log("response",userRegperWeek);
      res.json({
        status: "success",
        message: "got user registation per week successfully",
        userRegperWeek: userRegperWeek
      });
    })

  })

  const getGenders = asyncHandler(async(req:Request,res:Response)=>{
    
    await handlegetGenders(adminRepoDb).then((genders)=>{
      console.log("response",genders);
      res.json({
        status: "success",
        message: "get all genders successfully",
        genders: genders
      });
    })

  })

  //to get users age graph

  const getUserAgeGraph = asyncHandler(async(req:Request,res:Response)=>{
    
    await handlegetAges(adminRepoDb).then((ageData)=>{
      console.log("response",ageData);
      res.json({
        status: "success",
        message: "get all genders successfully",
        ageData: ageData
      });
    })

  })

  //to get all users list details

  const getusersListDetails = asyncHandler(async(req:Request,res:Response)=>{
    
    await handlegetusersListDetails(adminRepoDb).then((allUsersList)=>{
      console.log("response",allUsersList);
      res.json({
        status: "success",
        message: "get all genders successfully",
        allUsersList: allUsersList
      });
    })

  })

   //to block aad unblock user 

   const blocUnblockUser = asyncHandler(async(req:Request,res:Response)=>{
    const {userId} =  req.body
    await handleBlockUser(userId,adminRepoDb).then((blockStatus)=>{
      console.log("response",blockStatus);
      res.json({
        status: "success",
        message: "block/unblock successfull",
        blockStatus: blockStatus
      });
    })

  })

  //to get all reports of a user 

  const getReportsOfUser = asyncHandler(async(req:Request,res:Response)=>{
    const {userId} =  req.query
    if(typeof userId === 'string'){

      await handlegetReportsOfUser(userId,adminRepoDb).then((allReports)=>{
        console.log("response",allReports);
        res.json({
          status: "success",
          message: "block/unblock successfull",
          allReports: allReports
        });
      })
    }else {
      throw new AppError(
        ` Error while fetching user reports .try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }

  })

  //to get all post list details

  const getPostListDetails = asyncHandler(async(req:Request,res:Response)=>{
    
    await handlegetPostListDetails(adminRepoDb).then((allPostsList)=>{
      console.log("response",allPostsList);
      res.json({
        status: "success",
        message: "get all genders successfully",
        allPostsList: allPostsList
      });
    })

  })

    //to block and unblock post 

    const managePostStatus = asyncHandler(async(req:Request,res:Response)=>{
      const {postId} =  req.body
      await handlemanagePostStatus(postId,adminRepoDb).then((postStatus)=>{
        console.log("response",postStatus);
        res.json({
          status: "success",
          message: "block/unblock successfull",
          postStatus: postStatus
        });
      })
  
    })

     //to get all reports of a post 

  const getReportsOfPost = asyncHandler(async(req:Request,res:Response)=>{
    const {postId} =  req.query
    if(typeof postId === 'string'){

      await handlegetReportsOfPost(postId,adminRepoDb).then((allReports)=>{
        console.log("response",allReports);
        res.json({
          status: "success",
          message: "block/unblock successfull",
          allReports: allReports
        });
      })
    }else {
      throw new AppError(
        ` Error while fetching user reports .try again..!`,
        HttpStatus.BAD_REQUEST
      );
    }

  })


  //to get all reported comments

  const getReportedComments = asyncHandler(async(req:Request,res:Response)=>{
    
    await handlegetallReportedCommets(adminRepoDb).then((allReportedCommets)=>{
      console.log("response",allReportedCommets);
      res.json({
        status: "success",
        message: "get all genders successfully",
        allReportedCommets: allReportedCommets
      });
    })

  })

    //to block and unblock commnet 

    const manageCommnetStatus = asyncHandler(async(req:Request,res:Response)=>{
      const {commentId} =  req.body
      await handlemanageCommentStatus(commentId,adminRepoDb).then((commentStatus)=>{
        console.log("response",commentStatus);
        res.json({
          status: "success",
          message: "block/unblock successfull",
          commentStatus: commentStatus
        });
      })
  
    })

     //to get all reported replies

  const getAllRepliesReport = asyncHandler(async(req:Request,res:Response)=>{
    
    await handlegetallReportedReplies(adminRepoDb).then((allReportedReplies)=>{
      console.log("response",allReportedReplies);
      res.json({
        status: "success",
        message: "get all genders successfully",
        allReportedReplies: allReportedReplies
      });
    })

  })


  return {
    getAdminLogin,
    getAdminDashboard,
    getUserRegPerWeeek,
    getGenders,
    getUserAgeGraph,
    getusersListDetails,
    blocUnblockUser,
    getReportsOfUser,
    getPostListDetails,
    managePostStatus,
    getReportsOfPost,
    getReportedComments,
    manageCommnetStatus,
    getAllRepliesReport
  };
};
