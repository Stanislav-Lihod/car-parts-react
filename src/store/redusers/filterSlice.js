import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isFilterLoading: false,
  error: '',
  brands: [],
  models: [],
  modifications: [],
  searchParam: '',
  currentParams: {
    brand: {
      id: 'null',
      name: ''
    },
    model: {
      id: 'null',
      name: ''
    },
    modification:{
      id: 'null',
      name: ''
    }
  }
}

export const fetchBrands = () => async (dispatch) =>{
  try {
    dispatch(filterSlice.actions.showLoad())
    const response = await axios.get('https://9aaca2b44dbb58a9.mokky.dev/brands')
    dispatch(filterSlice.actions.brandsFetching(response.data))
  } catch (e){
    dispatch(filterSlice.actions.errorHandling(e.message))
  }
}

export const fetchModels = (id) => async (dispatch) =>{
  if (id !== 'null'){
    try {
      dispatch(filterSlice.actions.showLoad())
      const response = await axios.get(`https://9aaca2b44dbb58a9.mokky.dev/models/${id}`)
      dispatch(filterSlice.actions.modelsFetching(response.data.models))
    } catch (e){
      dispatch(filterSlice.actions.errorHandling(e.message))
    }
  } else {
    dispatch(filterSlice.actions.resetCurrentParameter('model'))
  }
}

export const fetchModification = (brandId,modelId) => async (dispatch) =>{
  if (brandId !== 'null' && modelId !== 'null'){
    try {
      dispatch(filterSlice.actions.showLoad())
      const response = await axios.get(`https://9aaca2b44dbb58a9.mokky.dev/modification?brand=${brandId}&model=${modelId}`)
      dispatch(filterSlice.actions.modificationFetching(response.data[0]?.modification) ?? [])
    } catch (e){
      dispatch(filterSlice.actions.errorHandling(e.message))
    }
  } else {
    dispatch(filterSlice.actions.resetCurrentParameter('modification'))
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers:{
    showLoad(state){
      state.isFilterLoading = true
    },
    errorHandling(state, action){
      state.error = action.payload
      state.isFilterLoading = false
    },
    brandsFetching(state, action){
      state.error = ''
      state.brands = action.payload
      state.isFilterLoading = false
    },
    modelsFetching(state, action){
      state.error = ''
      state.models = action.payload
      state.isFilterLoading = false
    },
    modificationFetching(state, action){
      state.error = ''
      state.modifications = action.payload
      state.isFilterLoading = false
    },
    setCurrentFilter(state, action){
      const key = Object.keys(action.payload)[0]
      state.currentParams[key] = action.payload[key];
    },
    resetCurrentParameter(state, action){
      state[action.payload + 's'] = []
      state.currentParams[action.payload] = {
        id: 'null',
        name: ''
      }
    },
    changeSearchParamsString(state){
      const arr = []
      for (const tag in state.currentParams) {
        if (state.currentParams[tag].id !== 'null'){
          arr.push(`${tag}=${state.currentParams[tag].id}`)
        }
      }
      state.searchParam = arr.join('&')
    }
  }
})

export const {setCurrentFilter,changeSearchParamsString} = filterSlice.actions
export default filterSlice.reducer