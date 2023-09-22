//to create or access a chat

import baseURL from "../../api";

export const createOrAccessChat = async (user: string) => {
  try {
    console.log("response createOrAccessChat user: ", user);
    const response: any = await baseURL.post("/chat/createOrAccessChat", {
      user,
    });
    console.log("response createOrAccessChat : ", response);
    if (response.data.status === "success") {
      const chat = response.data.chat;
      return chat;
    }
  } catch (error) {
    console.log("error inside the api acall catch createOrAccessChat :", error);
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    return errorMessage;
    // throw new Error(errorMessage);
    //Throw the error to be caught by the caller
  }
};

export const getUserChats = async () => {
  try {
    const response: any = await baseURL.get("/chat/getUserChats");
    console.log("response createOrAccessChat : ", response);
    if (response.data.status === "success") {
      const allChats = response.data.allChats;
      return allChats;
    }
  } catch (error) {
    console.log("error inside the api acall catch createOrAccessChat :", error);
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    return errorMessage;
    // throw new Error(errorMessage);
    //Throw the error to be caught by the caller
  }
};
