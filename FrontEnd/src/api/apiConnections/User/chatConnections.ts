
import baseURL from "../../api";

//to create or access a single chat
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
    // return errorMessage;
    throw new Error(errorMessage);
    // Throw the error to be caught by the caller
  }
};

// to access or create a group chat 
export const createOrAccessGroupChat = async (users: string[]) => {
  try {
    console.log("response createOrAccessGroupChat users : ", users);
    const response: any = await baseURL.post("/chat/createOrAccessGroupChat", {
      users,
    });
    console.log("response createOrAccessGroupChat : ", response);
    if (response.data.status === "success") {
      const groupChat = response.data.groupChat;
      return groupChat;
    }
  } catch (error) {
    console.log("error inside the api acall catch createOrAccessChat :", error);
    const errorMessage =
      (error as any)?.response?.data?.message ||
      "something went wrong! try again.";
    console.log("response error : ", errorMessage);
    // return errorMessage;
    throw new Error(errorMessage);
    // Throw the error to be caught by the caller
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


//sent a New Message

export const sentNewMessage = async(content: string,chatId : string)=>{
  try {
    const response: any = await baseURL.post("/chat/newMessage",{content,chatId});
    console.log("response newMessage : ", response);
    if (response.data.status === "success") {
      const newMessage = response.data.newMessage;
      return newMessage;
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
}

//to fetch all messags of a chat

export const fetchallMessagesOfChat = async(chatId : string)=>{
  try {
    const response: any = await baseURL.get(`/chat/fetchallmessages?chatId=${chatId}`);
    console.log("response fetchallmessages : ", response);
    if (response.data.status === "success") {
      const allMessages = response.data.allMessages;
      return allMessages;
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
}