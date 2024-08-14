import {combineReducers, configureStore} from "@reduxjs/toolkit";
import filterReducer from "./redusers/filterSlice";
import partsReducer from "./redusers/partsSlice";
import basketReducer from "./redusers/basketSlice";
import partReducer from "./redusers/partSlice";
import userReducer from "./redusers/userSlice";
import errorReducer from "./redusers/errorSlice";


const rootReducer = combineReducers({
  filters: filterReducer,
  parts: partsReducer,
  basket: basketReducer,
  part: partReducer,
  user: userReducer,
  error: errorReducer,
})

export const setupStore = ()=>{
  return configureStore({
    reducer: rootReducer
  })
}