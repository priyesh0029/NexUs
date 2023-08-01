import {combineReducers } from "redux"
import tokenSlice from "../slices/user/tokenSlice"


const rootReducer = combineReducers ({
    token : tokenSlice
})


export type rootReducerType = ReturnType <typeof rootReducer>

export default rootReducer