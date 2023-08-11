import {combineReducers } from "redux"
import tokenSlice from "../slices/user/tokenSlice"
import createPostSlice from "../slices/user/createPostSlice"
import homeSlice from "../slices/user/homeSlice"


const rootReducer = combineReducers ({
    token : tokenSlice,
    createPost : createPostSlice,
    home : homeSlice
})


export type rootReducerType = ReturnType <typeof rootReducer>

export default rootReducer