import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  error: '',
  idPartsInBasket: JSON.parse(localStorage.getItem('basketParts')) || [],
  counter: JSON.parse(localStorage.getItem('basketParts'))?.length || 0,
  basketParts: [],
  totalPrice:{}
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
    updateBasket(state, action) {
      const currentBasket = new Set(JSON.parse(localStorage.getItem('basketParts')) || []);

      if (action.payload.actionType === 'add') {
        currentBasket.add(action.payload.part);
      } else if (action.payload.actionType === 'remove') {
        currentBasket.delete(action.payload.part);
      }

      state.idPartsInBasket = [...currentBasket];
      state.counter = state.idPartsInBasket.length;
      localStorage.setItem('basketParts', JSON.stringify(state.idPartsInBasket));
    },
    hideCounter(state){
      state.counter = 0
    },
    removeBasket(state){
      state.idPartsInBasket = [];
      state.counter = state.idPartsInBasket.length;
      localStorage.setItem('basketParts', JSON.stringify(state.idPartsInBasket));
    },
    basketPartsFetching(state, action){
      state.basketParts = action.payload
      state.isLoading = false
    },
    setPrice(state, action){
      state.totalPrice = action.payload
    }
  }
})

export const {updateBasket,setPrice, removeBasket,hideCounter} = basketSlice.actions
export default basketSlice.reducer