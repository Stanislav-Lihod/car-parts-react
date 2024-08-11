import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  error: '',
  parts: [],
  pagination:{
    totalParts: 0,
  }
}

export const fetchParts = (currentParams) => async (dispatch) =>{
  const params = Object.fromEntries(
    Object.entries(currentParams).filter(([key, value]) => value !== '')
  )
  try {
    dispatch(partsSlice.actions.showLoad())
    const response = await axios.get('https://9aaca2b44dbb58a9.mokky.dev/parts2?limit=9',{
      params
    })
    dispatch(partsSlice.actions.partsFetching(response.data.items))
    dispatch(partsSlice.actions.setPagination(response.data.meta))
  } catch (e){
    dispatch(partsSlice.actions.errorHandling(e.message))
  }
}

export const partsSlice = createSlice({
  name: 'parts',
  initialState,
  reducers:{
    showLoad(state){
      state.isLoading = true
    },
    errorHandling(state, action){
      state.error = action.payload
      state.isLoading = false
    },
    partsFetching(state, action){
      state.error = ''
      state.parts = action.payload
      state.isLoading = false
    },
    setPagination(state, action){
      state.pagination.totalParts = action.payload.total_items
    }
  }
})

export const {} = partsSlice.actions
export default partsSlice.reducer