import { PayloadAction, createSlice } from "@reduxjs/toolkit";



const loadUserFromLocalStorage = (): IuserHomeSlice => {
    try {
      const userInfoString = localStorage.getItem('userInfo');
      if (userInfoString) {   
        const userInfo = JSON.parse(userInfoString);
        return userInfo;
      }
      return { name: '', userName: '', dp: '',savedPost:[] }; // Return a default IuserHomeSlice object
    } catch (error) {
      console.log('Error loading user info from local storage:', error);
      return { name: '', userName: '', dp: '',savedPost:[] }; // Return a default IuserHomeSlice object
    }
  };
  

const initialState = {
    userInfo : loadUserFromLocalStorage(),
  };

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    SetUserInfo: (state, action: PayloadAction<IuserHomeSlice>) => {
      state.userInfo = action.payload;
      try {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      } catch (error) {
        console.log('Error storing token in local storage:', error);
      }
    },
    SetUserDp: (state, action: PayloadAction<string>) => {
      state.userInfo.dp = action.payload;
    
      try {
        const userInfoString = localStorage.getItem('userInfo');
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          userInfo.dp = action.payload;
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        } else {
          const userInfo = { name: '', userName: '', dp: action.payload ,savedPost:[]};
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
      } catch (error) {
        console.log('Error updating dp in local storage:', error);
      }
    },  
    SetSavePost: (state, action: PayloadAction<string[]>) => {
      state.userInfo.savedPost = action.payload;
    
      try {
        const userInfoString = localStorage.getItem('userInfo');
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          userInfo.savedPost = action.payload;
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        } else {
          const userInfo = { name: '', userName: '', dp: '',savedPost :action.payload };
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        }
      } catch (error) {
        console.log('Error updating dp in local storage:', error);
      }
    },   
    clearUserInfo : (state)=>{
        state.userInfo = {name: '', userName: '', dp: '',savedPost:[]}
        try {
            localStorage.removeItem('userInfo');
          } catch (error) {
            console.log('Error removing token from local storage:', error);
          }
    }
  },
});

export const { SetUserInfo,SetUserDp,SetSavePost,clearUserInfo } = homeSlice.actions;
export default homeSlice.reducer;
