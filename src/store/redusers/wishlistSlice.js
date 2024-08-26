import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  error: '',
  ID_partsInWishlist: JSON.parse(localStorage.getItem('wishlistParts')) || [],
  counter: JSON.parse(localStorage.getItem('wishlistParts'))?.length || 0,
  wishlist_parts: [],
}

export const fetchWishlistParts = (parts) => async (dispatch) =>{
  const queryParams = `part_id=${parts}&_select=scrapheap,part_id,part_name,price_final,price,year,car,image,description`;
  try {
    dispatch(wishlistSlice.actions.showLoad())
    const response = await axios.get(`https://9aaca2b44dbb58a9.mokky.dev/parts2?${queryParams}`)
    dispatch(wishlistSlice.actions.wishlistPartsFetching(response.data))
  } catch (e){
    dispatch(wishlistSlice.actions.errorHandling(e.message))
  }
}

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers:{
    showLoad(state){
      state.isLoading = true
    },
    errorHandling(state, action){
      state.error = action.payload
      state.isLoading = false
    },
    updateWishlist(state, action) {
      const currentWishlist = new Set(JSON.parse(localStorage.getItem('wishlistParts')) || []);

      if (action.payload.actionType === 'add') {
        currentWishlist.add(action.payload.part);
      } else if (action.payload.actionType === 'remove') {
        currentWishlist.delete(action.payload.part);
      }

      state.ID_partsInWishlist = [...currentWishlist];
      state.counter = state.ID_partsInWishlist.length;
      localStorage.setItem('wishlistParts', JSON.stringify(state.ID_partsInWishlist));
    },
    wishlistPartsFetching(state, action){
      state.wishlist_parts = action.payload
      state.isLoading = false
    }
  }
})

export const {updateWishlist} = wishlistSlice.actions
export default wishlistSlice.reducer