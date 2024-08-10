import {combineReducers, configureStore} from "@reduxjs/toolkit";
import filterReducer from "./redusers/filterSlice";


const rootReducer = combineReducers({
  filters: filterReducer
})

export const setupStore = ()=>{
  return configureStore({
    reducer: rootReducer
  })
}