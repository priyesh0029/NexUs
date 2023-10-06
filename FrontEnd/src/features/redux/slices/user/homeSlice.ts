import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const loadUserFromLocalStorage = (): IuserHomeSlice => {
  try {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      return userInfo;
    }
    return {
      _id:"",
      name: "",
      userName: "",
      dp: "",
      savedPost: [],
      following: [],
      followers: [],
    }; // Return a default IuserHomeSlice object
  } catch (error) {
    console.log("Error loading user info from local storage:", error);
    return {
      _id:"",
      name: "",
      userName: "",
      dp: "",
      savedPost: [],
      following: [],
      followers: [],
    }; // Return a default IuserHomeSlice object
  }
};

const initialState = {
  userInfo: loadUserFromLocalStorage(),
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    //to set userInfo while login
    SetUserInfo: (state, action: PayloadAction<IuserHomeSlice>) => {
      state.userInfo = action.payload;
      try {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      } catch (error) {
        console.log("Error storing token in local storage:", error);
      }
    },
     //to set dp for profile
     SetName: (state, action: PayloadAction<string>) => {
      state.userInfo.name = action.payload;

      try {
        const userInfoString = localStorage.getItem("userInfo");
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          userInfo.name = action.payload;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        } else {
          const userInfo = {
            _id:"",
            name: "",
            userName: "",
            dp: action.payload,
            savedPost: [],
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
      } catch (error) {
        console.log("Error updating dp in local storage:", error);
      }
    },
    //to set dp for profile
    SetUserDp: (state, action: PayloadAction<string>) => {
      state.userInfo.dp = action.payload;

      try {
        const userInfoString = localStorage.getItem("userInfo");
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          userInfo.dp = action.payload;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        } else {
          const userInfo = {
            _id:"",
            name: "",
            userName: "",
            dp: action.payload,
            savedPost: [],
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
      } catch (error) {
        console.log("Error updating dp in local storage:", error);
      }
    },
    //to save posts
    SetSavePost: (state, action: PayloadAction<string[]>) => {
      state.userInfo.savedPost = action.payload;

      try {
        const userInfoString = localStorage.getItem("userInfo");
        if (userInfoString) {
          const userInfo = JSON.parse(userInfoString);
          userInfo.savedPost = action.payload;
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        } else {
          const userInfo = {
            _id:"",
            name: "",
            userName: "",
            dp: "",
            savedPost: action.payload,
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }
      } catch (error) {
        console.log("Error updating dp in local storage:", error);
      }
    },

    //to handle following and unfollowing
    SetHandlefollows: (state, action: PayloadAction<string>) => {
      const newValue = action.payload;

      if (!state.userInfo.following.includes(newValue)) {
        state.userInfo.following.push(newValue);

        try {
          const userInfoString = localStorage.getItem("userInfo");
          if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);

            if (!userInfo.following.includes(newValue)) {
              userInfo.following.push(newValue);
              localStorage.setItem("userInfo", JSON.stringify(userInfo));
            }
          }
        } catch (error) {
          console.log("Error updating followers in local storage:", error);
        }
      }else{
        state.userInfo.following = state.userInfo.following.filter(
          (following) => following !== newValue
        );

        try {
          const userInfoString = localStorage.getItem("userInfo");
          if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);

            // Remove the unfollowValue from  following arrays in localStorage

            userInfo.following = userInfo.following.filter(
              (following: string) => following !== newValue
            );

            localStorage.setItem("userInfo", JSON.stringify(userInfo));
          }
        } catch (error) {
          console.log("Error updating followers in local storage:", error);
        }
      }
    },

    //to handle unfollow and unfollowing
    // SetHandleUnfollows: (state, action: PayloadAction<string>) => {
    //   const unfollowValue = action.payload;

    //   if (state.userInfo.following.includes(unfollowValue)) {
    //     // Remove the unfollowValue from  following arrays of redux state

    //     state.userInfo.following = state.userInfo.following.filter(
    //       (following) => following !== unfollowValue
    //     );

    //     try {
    //       const userInfoString = localStorage.getItem("userInfo");
    //       if (userInfoString) {
    //         const userInfo = JSON.parse(userInfoString);

    //         // Remove the unfollowValue from  following arrays in localStorage

    //         userInfo.following = userInfo.following.filter(
    //           (following: string) => following !== unfollowValue
    //         );

    //         localStorage.setItem("userInfo", JSON.stringify(userInfo));
    //       }
    //     } catch (error) {
    //       console.log("Error updating followers in local storage:", error);
    //     }
    //   }
    // },

    //to clear local storage  while logout
    clearUserInfo: (state) => {
      state.userInfo = {
        _id:"",
        name: "",
        userName: "",
        dp: "",
        savedPost: [],
        following: [],
        followers: [],
      };
      try {
        localStorage.removeItem("userInfo");
      } catch (error) {
        console.log("Error removing token from local storage:", error);
      }
    },
  },
});

export const {
  SetUserInfo,
  SetUserDp,
  SetName,
  SetSavePost,
  SetHandlefollows,
  // SetHandleUnfollows,
  clearUserInfo,
} = homeSlice.actions;
export default homeSlice.reducer;
