import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import {setError} from "./errorSlice";

const initialState = {
  isLoading: false,
  token: Cookies.get('token') ?? '',
  isAuth: Boolean(Cookies.get('token')) ?? false,
  user:{}
}

export const checkUser = () => async (dispatch, getState) =>{
  const { token } = getState().user
  try {
    dispatch(userSlice.actions.showLoad())
    const response = await axios.get('https://9aaca2b44dbb58a9.mokky.dev/auth_me',{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    dispatch(userSlice.actions.setUser(response.data))
  } catch (e){
    console.error(e.message)
    dispatch(userSlice.actions.hideLoad())
  }
}

export const updateUser = (body) => async (dispatch, getState) =>{
  const {user, token} = getState().user
  try {
    dispatch(userSlice.actions.showLoad())
    const response = await axios.patch(`https://9aaca2b44dbb58a9.mokky.dev/users/${user.id}`,
      body,
      {  headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
    dispatch(userSlice.actions.setUser(response.data))
  } catch (e){
    dispatch(userSlice.actions.hideLoad())
    if (e.response.status === 401){
      dispatch(setError('Incorrect data entry'));
    } else {
      dispatch(setError("User doesn't exist"));
    }
  }
}

export const loginUser = (body) => async (dispatch) =>{
  try {
    dispatch(userSlice.actions.showLoad())
    const response = await axios.post('https://9aaca2b44dbb58a9.mokky.dev/auth',
      body,
      {  headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    dispatch(userSlice.actions.setUser(response.data))
  } catch (e){
    dispatch(userSlice.actions.hideLoad())
    if (e.response.status === 401){
      dispatch(setError('Incorrect data entry'));
    } else {
      dispatch(setError("User doesn't exist"));
    }
  }
}

export const registerUser = (body) => async (dispatch) =>{
  try {
    dispatch(userSlice.actions.showLoad())
    const response = await axios.post('https://9aaca2b44dbb58a9.mokky.dev/register',
      {...body, id: Date.now(), orders: []},
    {  headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
    dispatch(userSlice.actions.setUser(response.data))
  } catch (e){
    dispatch(setError(e.message));
    dispatch(userSlice.actions.hideLoad())
  }
}

export const logoutUser = () => async (dispatch) =>{
  try {
    dispatch(userSlice.actions.showLoad())
    const response = await axios.get('https://9aaca2b44dbb58a9.mokky.dev/auth_me',{
      headers:{
        Authorization: `Bearer 1`
      }
    })
  } catch (e){
    dispatch(userSlice.actions.logout())
    console.error('Logout user')
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    showLoad(state){
      state.isLoading = true
    },
    hideLoad(state){
      state.isLoading = false
    },
    errorHandling(state, action){
      state.isAuth = false
      state.isLoading = false

      Cookies.remove('token')
      state.token = ''
    },
    setUser(state, action){
      state.isLoading = false
      state.user = action.payload.data ?? action.payload
      state.isAuth = true

      if (action.payload.token){
        Cookies.set('token', action.payload.token, { expires: 1 / 24 })
        state.token = Cookies.get('token')
      }
    },
    logout(state, action){
      state.isLoading = false
      state.user = {}
      state.isAuth = false

      Cookies.remove('token')
      state.token = ''
    }
  }
})

export const {setCurrentFilter} = userSlice.actions
export default userSlice.reducer