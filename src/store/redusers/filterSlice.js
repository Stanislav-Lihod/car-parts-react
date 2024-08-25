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
  },
  selectedFilters:{}
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
    setCurrentCar(state, action){
      const key = Object.keys(action.payload)[0];

      switch (key){
        case 'car.brand':
          state.currentParams["car.model"] = ''
          state.currentParams["car.modification"] = ''
          break
        case 'car.model':
          state.currentParams["car.modification"] = ''
          break
      }

      state.currentParams[key] = action.payload[key];
    },
    setCurrentFilter(state, action){
      state.selectedFilters.page = [1]
      const key = Object.keys(action.payload)[0];
      if (key.includes('car.')){
        state.currentParams[key] = action.payload[key];
      } else {
        state.selectedFilters[key] = [action.payload[key]];
      }
      filterSlice.caseReducers.updateSearchParam(state);
    },
    toggleFilter(state, action) {
      state.selectedFilters.page = [1]
      const { type, value } = action.payload;

      if (!state.selectedFilters[type]) {
        state.selectedFilters[type] = [value];
      } else if (state.selectedFilters[type].includes(value)) {
        state.selectedFilters[type] = state.selectedFilters[type].filter((item) => item !== value);
      } else {
        state.selectedFilters[type].push(value);
      }

      filterSlice.caseReducers.updateSearchParam(state);
    },
    setRangeFilter(state, action) {
      state.selectedFilters.page = [1]
      const { type, value } = action.payload;
      state.selectedFilters[type] = [value];
      filterSlice.caseReducers.updateSearchParam(state);
    },
    updateSearchParam(state){
      const currentParamsString = Object.entries(state.currentParams)
        .filter(([key, value]) => value !== '' && value != null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);

      const selectedParamsString = Object.entries(state.selectedFilters)
        .flatMap(([key, values]) =>
          (Array.isArray(values) ? values : [])
            .filter(value => value !== '' && value != null)
            .map(value => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        );
      state.searchParam = decodeURIComponent([...currentParamsString, ...selectedParamsString].join('&'))
    },
    clearFilters(state){
      state.selectedFilters = {}
      filterSlice.caseReducers.updateSearchParam(state);
    }
  }
})

export const {
  setCurrentFilter,
  removePageFilter,
  toggleFilter,
  setCurrentCar,
  updateSearchParam,
  setRangeFilter,
  clearFilters
} = filterSlice.actions
export default filterSlice.reducer