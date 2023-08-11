import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CreatePostState {
    media: File[],
    caption: string
}

const createPostSlice = createSlice({
    name: "createPost",
    initialState: {
        media: [],
        caption : ""
    } as CreatePostState,
    reducers: {
        setMedia: (state, action: PayloadAction<File[]>) => {
            state.media = action.payload;
        },
        setCaption: (state, action: PayloadAction<string>) => {
            state.caption = action.payload;
        },
        clearMedia : (state)=>{
            state.media = []
        },
        clearCaption : (state)=>{
            state.caption = ""
        }
    }
});

export const { setMedia, setCaption,clearMedia,clearCaption} = createPostSlice.actions;

export default createPostSlice.reducer;


