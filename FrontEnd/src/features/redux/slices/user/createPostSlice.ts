import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CreatePostState {
  media: File[];
  caption: string;
  newPost: Post;
}

const createPostSlice = createSlice({
  name: "createPost",
  initialState: {
    media: [],
    caption: "",
    newPost: {
      postedUser: "",
      description: "",
      imgNames: [],
      isBlocked: false,
      liked: [],
      reports: [],
      _id: "",
      updatedAt: "",
      createdAt: "",
    },
  } as CreatePostState,
  reducers: {
    setMedia: (state, action: PayloadAction<File[]>) => {
      state.media = action.payload;
    },
    setCaption: (state, action: PayloadAction<string>) => {
      state.caption = action.payload;
    },
    clearMedia: (state) => {
      state.media = [];
    },
    clearCaption: (state) => {
      state.caption = "";
    },
    setNewPost: (state, action: PayloadAction<Post>) => {
      state.newPost = action.payload;
    },
    clearNewPost: (state) => {
      state.newPost = {
        postedUser: "",
        description: "",
        imgNames: [],
        isBlocked: false,
        liked: [],
        reports: [],
        _id: "",
        updatedAt: "",
        createdAt: "",
      };
    },
  },
});

export const { setMedia, setCaption, clearMedia, clearCaption, setNewPost,clearNewPost } =
  createPostSlice.actions;

export default createPostSlice.reducer;
