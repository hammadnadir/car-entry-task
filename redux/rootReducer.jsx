import { combineReducers } from "@reduxjs/toolkit";
import global from "../redux/global"
import home from "../redux/home"

export const allReducer = () =>
  combineReducers({
    global,
    home
});
