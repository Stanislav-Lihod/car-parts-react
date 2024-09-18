import {combineReducers, configureStore} from "@reduxjs/toolkit";
import filterReducer from "./redusers/filterSlice";
import basketReducer from "./redusers/basketSlice";
import partReducer from "./redusers/partSlice";
import userReducer from "./redusers/userSlice";
import errorReducer from "./redusers/errorSlice";
import wishlistReducer from "./redusers/wishlistSlice";
import {partsApi} from "../services/PartsService";
import {getCarApi} from "../services/GetCarsService";
import {userApi} from "../services/UserService";

const rootReducer = combineReducers({
  filters: filterReducer,
  basket: basketReducer,
  part: partReducer,
  user: userReducer,
  error: errorReducer,
  wishlist: wishlistReducer,
  [partsApi.reducerPath]: partsApi.reducer,
  [getCarApi.reducerPath]: getCarApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
})

export const setupStore = ()=>{
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(partsApi.middleware)
        .concat(getCarApi.middleware)
        .concat(userApi.middleware)
  })
}