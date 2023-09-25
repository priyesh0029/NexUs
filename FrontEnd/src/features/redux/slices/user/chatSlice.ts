import { PayloadAction, createSlice } from "@reduxjs/toolkit";


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
      } as IuserChatList,},
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
      }
    },
  });
  
  export const { setSelectedChat,clearSelectedChat } =
  chatSlice.actions;
  
  export default chatSlice.reducer;