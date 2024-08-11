import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  isStoreData: false,
  error: '',
  brands: [],
  models: [],
  modifications: [],
  searchParam: '',
  currentParams: {
    "car.brand": '',
    "car.model": '',
    "car.modification": '',
    'sortBy': ''
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
  } else {
    // dispatch(filterSlice.actions.resetCurrentParameter(['model']))
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
  } else {
    // dispatch(filterSlice.actions.resetCurrentParameter(['modification']))
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
      const needReset = action.payload[1],
            newParameters = action.payload[0],
            key = Object.keys(newParameters)[0];

      if (needReset){
        switch (key){
          case 'car.brand':
            state['models'] = []
            state.currentParams[`car.model`] = ''
          case 'car.model':
            state['modifications'] = []
            state.currentParams[`car.modification`] = ''
        }
      }

      state.currentParams[key] = newParameters[key];

      state.searchParam = Object.entries(state.currentParams)
        .filter(([key, value]) => value !== '')
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      state.isStoreData = true
    }
  }
})

export const {setCurrentFilter} = filterSlice.actions
export default filterSlice.reducer