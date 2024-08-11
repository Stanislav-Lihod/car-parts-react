import {combineReducers, configureStore} from "@reduxjs/toolkit";
import filterReducer from "./redusers/filterSlice";
import partsReducer from "./redusers/partsSlice";


const rootReducer = combineReducers({
  filters: filterReducer,
  parts: partsReducer
})

export const setupStore = ()=>{
  return configureStore({
    reducer: rootReducer
  })
}