import {combineReducers, configureStore} from "@reduxjs/toolkit";
import filterReducer from "./redusers/filterSlice";
import partsReducer from "./redusers/partsSlice";
import basketReducer from "./redusers/basketSlice";
import partReducer from "./redusers/partSlice";


const rootReducer = combineReducers({
  filters: filterReducer,
  parts: partsReducer,
  basket: basketReducer,
  part: partReducer,
})

export const setupStore = ()=>{
  return configureStore({
    reducer: rootReducer
  })
}