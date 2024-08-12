import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  error: '',
  ID_partsInBasket: JSON.parse(localStorage.getItem('basketParts')) || [],
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
      const currentBasket = JSON.parse(localStorage.getItem('basketParts')) || []
      const newBasket = new Set()

      currentBasket.forEach(part => newBasket.add(part))
      newBasket.add(action.payload)

      state.ID_partsInBasket = [...newBasket]
      state.counter = state.ID_partsInBasket.length
      localStorage.setItem('basketParts', JSON.stringify(state.ID_partsInBasket))
    },
    removePartInBasket(state, action){
      const currentBasket = JSON.parse(localStorage.getItem('basketParts')) || []
      const newBasket = new Set()

      currentBasket.forEach(part => newBasket.add(part))
      newBasket.delete(action.payload)

      state.ID_partsInBasket = [...newBasket]
      state.counter = state.ID_partsInBasket.length
      localStorage.setItem('basketParts', JSON.stringify(state.ID_partsInBasket))
    },
    basketPartsFetching(state, action){
      state.basket_parts = action.payload
      state.isLoading = false
    }
  }
})

export const {addPartInBasket,removePartInBasket} = basketSlice.actions
export default basketSlice.reducer