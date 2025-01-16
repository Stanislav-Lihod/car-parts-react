import {createSlice} from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const initialState = {
  isLoading: false,
  token: localStorage.getItem('token') ?? '',
  isAuth: Boolean(localStorage.getItem('token')) ?? false,
  user:{}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    setLoading(state, action){
      state.isLoading = action.payload
    },
    setUser(state, action){
      const {data, token} = action.payload

      state.token = token ?? state.token;
      state.user = data ?? state.user;

      if (token){
        localStorage.setItem('token', token);
        state.isAuth = true
      }
    },
    checkUser(state){
      if (state.token){
        state.user = jwtDecode(state.token);
      }
    },
    logout(state){
      state.user = {}
      state.isAuth = false
      state.token = ''
      localStorage.removeItem('token')
    }
  }
})

export const {
  setLoading,
  setUser,
  checkUser,
  logout
} = userSlice.actions
export default userSlice.reducer