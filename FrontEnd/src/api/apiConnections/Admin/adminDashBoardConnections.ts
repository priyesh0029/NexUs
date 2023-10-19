import { toast } from "react-toastify";
import adminBaseURL from "../../adminInterceptor";

export const dashBoardDetails = async (): Promise<any> => {
  try {
    const response: any = await adminBaseURL.get("/admin/dashboard");

    console.log("response first : ", response);
    if (response.data.status === "success") {
      const dashBoardDetails = response.data.dashBoardInfos;

      return dashBoardDetails;
    } 
  } catch (error) {
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage); // Throw the error to be caught by the caller
  }
};


export const getUserRegPerWeeek = async (): Promise<any> => {
  try {
    const response: any = await adminBaseURL.get("/admin/getUserRegPerWeeek");

    console.log("response first : ", response);
    if (response.data.status === "success") {
      const userRegperWeek = response.data.userRegperWeek;

      return userRegperWeek;
    } 
  } catch (error) {
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage); // Throw the error to be caught by the caller
  }
};

export const getGenders = async (): Promise<any> => {
  try {
    const response: any = await adminBaseURL.get("/admin/getGenders");

    console.log("response gender : ", response);
    if (response.data.status === "success") {
      const genders = response.data.genders;

      return genders;
    } 
  } catch (error) {
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage); // Throw the error to be caught by the caller
  }
};


//to get users age graph
export const getUserAgeGraph = async (): Promise<any> => {
  try {
    const response: any = await adminBaseURL.get("/admin/getUserAgeGraph");

    console.log("response gender : ", response);
    if (response.data.status === "success") {
      const ageData = response.data.ageData;

      return ageData;
    } 
  } catch (error) {
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage); // Throw the error to be caught by the caller
  }
};

//to get all users list details

export const getusersListDetails = async (): Promise<any> => {
  try {
    const response: any = await adminBaseURL.get("/admin/getusersListDetails");

    console.log("response getusersListDetails : ", response);
    if (response.data.status === "success") {
      const allUsersList = response.data.allUsersList;

      return allUsersList;
    } 
  } catch (error) {
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage); // Throw the error to be caught by the caller
  }
};

//to get all users list details

export const blockUser = async (userId: string): Promise<any> => {
  try {
    const response: any = await adminBaseURL.patch("/admin/blockUser",{userId});

    console.log("response getusersListDetails : ", response);
    if (response.data.status === "success") {
      const blockStatus = response.data.blockStatus;

      return blockStatus;
    } 
  } catch (error) {
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage); // Throw the error to be caught by the caller
  }
};

//to get all reports of  a user

export const getReportsOfUser = async (userId: string): Promise<any> => {
  try {
    const response: any = await adminBaseURL.get(`/admin/getReportsOfUser?userId=${userId}`);

    console.log("response getusersListDetails : ", response);
    if (response.data.status === "success") {
      const allReports = response.data.allReports;

      return allReports;
    } 
  } catch (error) {
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage); // Throw the error to be caught by the caller
  }
};


//to get all post lists details

export const getPostListDetails = async (): Promise<any> => {
  try {
    const response: any = await adminBaseURL.get("/admin/getPostListDetails");

    console.log("response getusersListDetails : ", response);
    if (response.data.status === "success") {
      const allPostsList = response.data.allPostsList;

      return allPostsList;
    } 
  } catch (error) {
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage); // Throw the error to be caught by the caller
  }
};

// to manage post active and inactive status

export const managePostStatus = async (postId: string): Promise<any> => {
  console.log("postId : ",postId);

  try {
    const response: any = await adminBaseURL.patch("/admin/managePostStatus",{postId});

    console.log("response getusersListDetails : ", response);
    if (response.data.status === "success") {
      const postStatus = response.data.postStatus;

      return postStatus;
    } 
  } catch (error) {
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage); // Throw the error to be caught by the caller
  }
};

//to get all reports of  a posts

export const getReportsOfPost = async (postId: string): Promise<any> => {
  try {
    const response: any = await adminBaseURL.get(`/admin/getReportsOfPost?postId=${postId}`);

    console.log("response getReportsOfPost : ", response);
    if (response.data.status === "success") {
      const allReports = response.data.allReports;

      return allReports;
    } 
  } catch (error) {
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage); // Throw the error to be caught by the caller
  }
};

//to get all reported Comments


export const getReportedComments = async (): Promise<any> => {
  try {
    const response: any = await adminBaseURL.get("/admin/getReportedComments");

    console.log("response getusersListDetails : ", response);
    if (response.data.status === "success") {
      const allReportedCommets = response.data.allReportedCommets;

      return allReportedCommets;
    } 
  } catch (error) {
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage); // Throw the error to be caught by the caller
  }
};

// to manage commnet active and inactive status

export const manageCommnetStatus = async (commentId: string): Promise<any> => {
  console.log("postId : ",commentId);

  try {
    const response: any = await adminBaseURL.patch("/admin/manageCommnetStatus",{commentId});

    console.log("response manageCommnetStatus : ", response);
    if (response.data.status === "success") {
      const commentStatus = response.data.commentStatus;

      return commentStatus;
    } 
  } catch (error) {
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    toast.error(errorMessage);
    throw new Error(errorMessage); // Throw the error to be caught by the caller
  }
};