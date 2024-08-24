import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {setCurrentFilter} from "./filterSlice";

const initialState = {
  isLoading: true,
  error: '',
  parts: [],
  pagination:{
    totalParts: 0,
    current_page: 1,
    total_pages: 1,
  }
}

export const fetchParts = () => async (dispatch, getState) =>{
  const {searchParam} = getState().filters

  try {
    dispatch(partsSlice.actions.showLoad())
    const response = await axios.get(`https://9aaca2b44dbb58a9.mokky.dev/parts2?limit=9&${searchParam}`)
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
      state.pagination.current_page = action.payload.current_page
      state.pagination.total_pages = action.payload.total_pages
    }
  }
})

export const {} = partsSlice.actions
export default partsSlice.reducer