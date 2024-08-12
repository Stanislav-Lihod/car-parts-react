import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  error: '',
  partsInBasket: JSON.parse(localStorage.getItem('basketParts')) || [],
  counter: JSON.parse(localStorage.getItem('basketParts'))?.length || 0,
  basket_parts: []
}

export const fetchBasketParts = (parts) => async (dispatch) =>{
  const queryParams = `part_id=${parts}&_select=scrapheap,part_id,part_name,price_final,price,year,car,service_fee,delivery_price,image,description`;
  try {
    dispatch(basketSlice.actions.showLoad())
    const response = await axios.get(`https://9aaca2b44dbb58a9.mokky.dev/parts2?${queryParams}`)
    dispatch(basketSlice.actions.basketPartsFetching(response.data))
  } catch (e){
    dispatch(basketSlice.actions.errorHandling(e.message))
  }
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers:{
    showLoad(state){
      state.isLoading = true
    },
    errorHandling(state, action){
      state.error = action.payload
      state.isLoading = false
    },
    addPartInBasket(state, action){
      state.partsInBasket.push(action.payload)
      state.counter = state.partsInBasket.length
      localStorage.setItem('basketParts', JSON.stringify(state.partsInBasket))
    },
    removePartInBasket(state, action){
      console.log(action.payload)
      state.partsInBasket = state.partsInBasket.filter(item => item !== action.payload)
      state.counter = state.partsInBasket.length
      localStorage.setItem('basketParts', JSON.stringify(state.partsInBasket))
    },
    basketPartsFetching(state, action){
      state.basket_parts = action.payload
      state.isLoading = false
    }
  }
})

export const {addPartInBasket,removePartInBasket} = basketSlice.actions
export default basketSlice.reducer