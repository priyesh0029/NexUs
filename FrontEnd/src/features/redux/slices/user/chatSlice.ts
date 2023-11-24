import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IchatSlice {
  userChat: IuserChatList;
  newMessage: string;
  notification: string[];
}

const chatSlice = createSlice({
  name: "userChat",
  initialState: {
    userChat: {
      chatName: "",
      isGroupChat: false,
      groupAdmin: {
        _id: "",
        name: "",
        userName: "",
        dp: "",
      },
      users: [],
      latestMessage: {
        chatId: "",
        content: "",
        createdAt: "",
        sender: "",
        updatedAt: "",
        _id: "",
      },
      updatedAt: "",
      createdAt: "",
      _id: "",
    },
    newMessage: "",
    notification: [],
  } as IchatSlice,
  reducers: {
    setSelectedChat: (state, action: PayloadAction<IuserChatList>) => {
      state.userChat = action.payload;
    },
    clearSelectedChat: (state) => {
      state.userChat = {
        chatName: "",
        isGroupChat: false,
        groupAdmin: {
          _id: "",
          name: "",
          userName: "",
          dp: "",
        },
        users: [],
        latestMessage: {
          chatId: "",
          content: "",
          createdAt: "",
          sender: "",
          updatedAt: "",
          _id: "",
        },
        updatedAt: "",
        createdAt: "",
        _id: "",
      };
    },
    SetNewMessage: (state, action: PayloadAction<string>) => {
      state.newMessage = action.payload;
    },
    SetNotification: (state, action: PayloadAction<string[]>) => {
      state.notification = action.payload;
    },
  },
});

export const {
  setSelectedChat,
  clearSelectedChat,
  SetNewMessage,
  SetNotification,
} = chatSlice.actions;

export default chatSlice.reducer;
