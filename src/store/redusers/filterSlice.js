import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  error: '',
  brands: [],
  models: [],
  modifications: [],
  searchParam: '',
  currentParams: {
    "car.brand": '',
    "car.model": '',
    "car.modification": ''
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

export const fetchModels = (brandId) => async (dispatch) =>{
  if (brandId !== ''){
    try {
      dispatch(filterSlice.actions.showLoad())
      const response = await axios.get(`https://9aaca2b44dbb58a9.mokky.dev/models/${brandId}`)
      dispatch(filterSlice.actions.modelsFetching(response.data.models))
    } catch (e){
      dispatch(filterSlice.actions.errorHandling(e.message))
    }
  }
}

export const fetchModification = (brandId,modelId) => async (dispatch) =>{
  if (brandId !== '' && modelId !== ''){
    try {
      dispatch(filterSlice.actions.showLoad())
      const response = await axios.get(`https://9aaca2b44dbb58a9.mokky.dev/modification?brand=${brandId}&model=${modelId}`)
      dispatch(filterSlice.actions.modificationFetching(response.data[0]?.modification) ?? [])
    } catch (e){
      dispatch(filterSlice.actions.errorHandling(e.message))
    }
  }
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers:{
    showLoad(state){
      state.isLoading = true
    },
    errorHandling(state, action){
      state.error = action.payload
      state.isLoading = false
    },
    brandsFetching(state, action){
      state.error = ''
      state.brands = action.payload
      state.isLoading = false
    },
    modelsFetching(state, action){
      state.error = ''
      state.models = action.payload
      state.isLoading = false
    },
    modificationFetching(state, action){
      state.error = ''
      state.modifications = action.payload
      state.isLoading = false
    },
    setCurrentFilter(state, action){
      const key = Object.keys(action.payload)[0];

      switch (key){
        case 'car.brand':
          state['models'] = []
          state.currentParams[`car.model`] = ''
        case 'car.model':
          state['modifications'] = []
          state.currentParams[`car.modification`] = ''
      }

      state.currentParams[key] = action.payload[key];
      state.searchParam = Object.entries(state.currentParams)
        .filter(([key, value]) => value !== '')
        .map(([key, value]) => `${key}=${value}`)
        .join('&');
    }
  }
})

export const {setCurrentFilter, removePageFilter} = filterSlice.actions
export default filterSlice.reducer