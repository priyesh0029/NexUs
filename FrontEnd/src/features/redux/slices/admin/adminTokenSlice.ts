import { createSlice, PayloadAction} from "@reduxjs/toolkit"

interface TokenState {
    token: string | null;
  }

  const loadTokenFromLocalStorage = (): string | null => {
    try {
      const token = localStorage.getItem('adminToken');
      return token ? token : null;
    } catch (error) {
      console.log('Error loading token from local storage:', error);
      return null;
    }
  };

  const initialState: TokenState = {
    token: loadTokenFromLocalStorage(),
  };

  const adminTokenSlice = createSlice({
    name: 'adminToken',
    initialState,
    reducers: {
      setAdminTokenSlice: (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        try {
          localStorage.setItem('adminToken', action.payload);
        } catch (error) {
          console.log('Error storing token in local storage:', error);
        }
      },
      clearAdminTokenSlice: (state) => {
        state.token = null;
        try {
          localStorage.removeItem('adminToken');
        } catch (error) {
          console.log('Error removing token from local storage:', error);
        }
      },
    },
  });
  
  export const { setAdminTokenSlice, clearAdminTokenSlice } = adminTokenSlice.actions;
  export default adminTokenSlice.reducer;