import { PayloadAction, createSlice } from "@reduxjs/toolkit";



const loadUserFromLocalStorage = (): UserInfo => {
    try {
      const userInfoString = localStorage.getItem('userInfo');
      if (userInfoString) {
        const userInfo = JSON.parse(userInfoString);
        return userInfo;
      }
      return { name: '', userName: '' }; // Return a default UserInfo object
    } catch (error) {
      console.log('Error loading user info from local storage:', error);
      return { name: '', userName: '' }; // Return a default UserInfo object
    }
  };
  

const initialState = {
    userInfo : loadUserFromLocalStorage(),
  };

const homeSlice = createSlice({
  name: "home",
  initialState,
//   : {
//     userInfo: {} as UserInfo, // Initialize as an empty UserInfo object
//   },
  reducers: {
    SetUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      try {
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      } catch (error) {
        console.log('Error storing token in local storage:', error);
      }
    },
    clearUserInfo : (state)=>{
        state.userInfo = {name: '', userName: '' }
        try {
            localStorage.removeItem('userInfo');
          } catch (error) {
            console.log('Error removing token from local storage:', error);
          }
    }
  },
});

export const { SetUserInfo,clearUserInfo } = homeSlice.actions;
export default homeSlice.reducer;
