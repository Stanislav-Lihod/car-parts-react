import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  isBreadcrumbsLoading: true,
  error: '',
  part: {},
  breadcrumbs: []
}

export const getPart = (id) => async (dispatch) =>{
  try {
    dispatch(partSlice.actions.showLoad())
    const response = await axios.get(`https://9aaca2b44dbb58a9.mokky.dev/parts2?part_id=${id}`)
    dispatch(partSlice.actions.partFetching(response.data[0]))
  } catch (e){
    dispatch(partSlice.actions.errorHandling(e.message))
  }
}

export const getBreadcrumbs = (id) => async (dispatch) =>{
  try {
    dispatch(partSlice.actions.showLoad())
    const response = await axios.get(`https://9aaca2b44dbb58a9.mokky.dev/modification?modification.id=${id}`)
    dispatch(partSlice.actions.breadcrumbsFetching(response.data[0]))
  } catch (e){
    dispatch(partSlice.actions.errorHandling(e.message))
  }
}

export const partSlice = createSlice({
  name: 'part',
  initialState,
  reducers:{
    showLoad(state){
      state.isLoading = true
    },
    errorHandling(state, action){
      state.error = action.payload
      state.isLoading = false
    },
    partFetching(state, action){
      state.error = ''
      state.part = action.payload
      state.isLoading = false
    },
    breadcrumbsFetching(state, action){
      state.error = ''
      state.breadcrumbs = action.payload
      state.breadcrumbs.modification = state.breadcrumbs.modification.filter(item => item.id === 2779)[0]
      state.isBreadcrumbsLoading = false
    }
  }
})

export const {} = partSlice.actions
export default partSlice.reducer