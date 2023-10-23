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
              token: await authService.generateToken({id:admin[0]._id,role:"admin"}),
              admin,
            };
          }
        });
    });
  };
  

  export const adminDashboard = async (
    adminRepository: ReturnType<adminTypeDbRepository>,
  ) => {
  
    return await adminRepository.getDashboard().then((dashboard) => {
      if (!dashboard) {
        throw new AppError(
          "Error occured while loading dashboard.try again..!",
          HttpStatus.BAD_REQUEST
        );
      }
      return dashboard;
    });
  };

  export const handleUserRegperWeek = async (
    adminRepository: ReturnType<adminTypeDbRepository>,
  ) => {
  
    return await adminRepository.getUserRegperWeek().then((userRegperweekResults) => {
      if (!userRegperweekResults) {
        throw new AppError(
          "Error occured while loading user Registration per week chart.try again..!",
          HttpStatus.BAD_REQUEST
        );
      }
      return userRegperweekResults;
    });
  };

  export const handlegetGenders = async (
    adminRepository: ReturnType<adminTypeDbRepository>,
  ) => {
  
    return await adminRepository.getUserGenders().then((genders) => {
      if (!genders) {
        throw new AppError(
          "Error occured fetching genders chart.try again..!",
          HttpStatus.BAD_REQUEST
        );
      }
      return genders;
    });
  };

  //to get users age data

  export const handlegetAges = async (
    adminRepository: ReturnType<adminTypeDbRepository>,
  ) => {
  
    return await adminRepository.getUserAgeDatas().then((ageData) => {
      if (!ageData) {
        throw new AppError(
          "Error occured fetching genders chart.try again..!",
          HttpStatus.BAD_REQUEST
        );
      }
      return ageData;
    });
  };

   //to get all users list details

   export const handlegetusersListDetails = async (
    adminRepository: ReturnType<adminTypeDbRepository>,
  ) => {
  
    return await adminRepository.getallUserDetails().then((allusersDetails) => {
      if (!allusersDetails) {
        throw new AppError(
          "Error occured fetching users list.try again..!",
          HttpStatus.BAD_REQUEST
        );
      }
      return allusersDetails;
    });
  };

  //to block a user

  export const handleBlockUser = async (
    userId:string,
    adminRepository: ReturnType<adminTypeDbRepository>,
  ) => {
  
    return await adminRepository.toBlokUnblokUser(userId).then((blockResponse) => {
      if (!blockResponse) {
        throw new AppError(
          "Error occured while block or unblock user.try again..!",
          HttpStatus.BAD_REQUEST
        );
      }
      return blockResponse;
    });
  };

   //to get all reports of user

   export const handlegetReportsOfUser = async (
    userId:string,
    adminRepository: ReturnType<adminTypeDbRepository>,
  ) => {
  
    return await adminRepository.getUserReports(userId).then((userReports) => {
      if (!userReports) {
        throw new AppError(
          "Error occured while fetching user reports.try again..!",
          HttpStatus.BAD_REQUEST
        );
      }
      return userReports;
    });
  };

  //to get all posts list details

  export const handlegetPostListDetails = async (
    adminRepository: ReturnType<adminTypeDbRepository>,
  ) => {
  
    return await adminRepository.getallPostsDetails().then((allPostsDetails) => {
      if (!allPostsDetails) {
        throw new AppError(
          "Error occured fetching all posts.try again..!",
          HttpStatus.BAD_REQUEST
        );
      }
      return allPostsDetails;
    });
  };

  
  //to manage post  active inactive status

  export const handlemanagePostStatus = async (
    postId:string,
    adminRepository: ReturnType<adminTypeDbRepository>,
  ) => {
  
    return await adminRepository.toBlokUnblockPost(postId).then((blockResponse) => {
      if (!blockResponse) {
        throw new AppError(
          "Error occured while block or unblock post.try again..!",
          HttpStatus.BAD_REQUEST
        );
      }
      return blockResponse;
    });
  };
  //to get all reports of post

  export const handlegetReportsOfPost = async (
    postId:string,
    adminRepository: ReturnType<adminTypeDbRepository>,
  ) => {
  
    return await adminRepository.getPostReports(postId).then((postReports) => {
      if (!postReports) {
        throw new AppError(
          "Error occured while fetching user reports.try again..!",
          HttpStatus.BAD_REQUEST
        );
      }
      return postReports;
    });
  };
  
  //to get all reported comments

  export const handlegetallReportedCommets = async (
    adminRepository: ReturnType<adminTypeDbRepository>,
  ) => {
  
    return await adminRepository.getallReportedComments().then((allReportedComments) => {
      if (!allReportedComments) {
        throw new AppError(
          "Error occured fetching all posts.try again..!",
          HttpStatus.BAD_REQUEST
        );
      }
      return allReportedComments;
    });
  };

  //to manage commnet  active inactive status

  export const handlemanageCommentStatus = async (
    commentId:string,
    adminRepository: ReturnType<adminTypeDbRepository>,
  ) => {
  
    return await adminRepository.toBlokUnblockComment(commentId).then((blockResponse) => {
      if (!blockResponse) {
        throw new AppError(
          "Error occured while block or unblock post.try again..!",
          HttpStatus.BAD_REQUEST
        );
      }
      return blockResponse;
    });
  };


   //to get all reported replies

   export const handlegetallReportedReplies = async (
    adminRepository: ReturnType<adminTypeDbRepository>,
  ) => {
  
    return await adminRepository.getallReportedReplies().then((allReportedReplies) => {
      if (!allReportedReplies) {
        throw new AppError(
          "Error occured fetching all posts.try again..!",
          HttpStatus.BAD_REQUEST
        );
      }
      return allReportedReplies;
    });
  };