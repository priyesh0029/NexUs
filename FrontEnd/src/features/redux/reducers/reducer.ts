import {combineReducers } from "redux"
import tokenSlice from "../slices/user/tokenSlice"
import createPostSlice from "../slices/user/createPostSlice"
import homeSlice from "../slices/user/homeSlice"
import chatSlice from "../slices/user/chatSlice"
import adminTokenSlice from "../slices/admin/adminTokenSlice"


const rootReducer = combineReducers ({
    token : tokenSlice,
    adminToken : adminTokenSlice,
    createPost : createPostSlice,
    home : homeSlice,
    chat : chatSlice
})


export type rootReducerType = ReturnType <typeof rootReducer>

export default rootReducer