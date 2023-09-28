import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IchatSlice{
  userChat : IuserChatList;
  newMessage : string;
}

const chatSlice = createSlice({
    name: "userChat",
    initialState: {
        userChat : {
        chatName : '',
        isGroupChat: false,
        groupAdmin : '',
        users : [],
        updatedAt :'',
        createdAt : '',
        _id : ''
      },
      newMessage : ''
    } as IchatSlice,
    reducers: {
      setSelectedChat: (state, action: PayloadAction<IuserChatList>) => {
        state.userChat= action.payload;
      },
      clearSelectedChat : (state)=>{
        state.userChat = {
            chatName : '',
            isGroupChat: false,
            groupAdmin : '',
            users : [],
            updatedAt :'',
            createdAt : '',
            _id : ''
          }
      },
      SetNewMessage:  (state, action: PayloadAction<string>) => {
        state.newMessage = action.payload;
      },
    },
  });
  
  export const { setSelectedChat,clearSelectedChat,SetNewMessage } =
  chatSlice.actions;
  
  export default chatSlice.reducer;