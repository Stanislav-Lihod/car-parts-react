import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface TotalPrice {
  totalPrice: number;
  totalDelivery: number;
}

export interface Part {
  part_id: number;
  price: number;
  delivery_price: string;
  service_fee: number;
}

interface BasketState {
  isLoading: boolean;
  error: string;
  idPartsInBasket: number[];
  counter: number;
  basketParts: Part[];
  totalPrice: TotalPrice;
}

const initialState: BasketState = {
  isLoading: true,
  error: "",
  idPartsInBasket: JSON.parse(localStorage.getItem("basketParts") ?? "[]").map((item: any) => Number(item)) as number[],
  counter: JSON.parse(localStorage.getItem("basketParts") ?? "[]").length,
  basketParts: [],
  totalPrice: { totalPrice: 0, totalDelivery: 0 },
};

export const fetchBasketParts = (parts: string) => async (dispatch: any) => {
  const queryParams = `part_id=${parts}&_select=scrapheap,part_id,part_name,price_final,price,year,car,service_fee,delivery_price,image,description`;
  try {
    dispatch(basketSlice.actions.showLoad());
    const response = await axios.get(
      `https://9aaca2b44dbb58a9.mokky.dev/parts2?${queryParams}`
    );
    dispatch(basketSlice.actions.basketPartsFetching(response.data));
  } catch (e: unknown) {
    dispatch(basketSlice.actions.errorHandling(e instanceof Error ? e.message : "Unknown error"));
  }
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    showLoad(state) {
      state.isLoading = true;
    },
    errorHandling(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateBasket(state, action: PayloadAction<{ actionType: string; part: number }>) {
      const currentBasket = new Set(JSON.parse(localStorage.getItem("basketParts") ?? "[]").map((item: any) => Number(item)));

      if (action.payload.actionType === "add") {
        currentBasket.add(action.payload.part);
      } else if (action.payload.actionType === "remove") {
        currentBasket.delete(action.payload.part);
      }

      state.idPartsInBasket = [...currentBasket] as number[];
      state.counter = state.idPartsInBasket.length;
      localStorage.setItem("basketParts", JSON.stringify(state.idPartsInBasket));
    },
    hideCounter(state) {
      state.counter = 0;
    },
    removeBasket(state) {
      state.idPartsInBasket = [];
      state.counter = state.idPartsInBasket.length;
      localStorage.setItem("basketParts", JSON.stringify(state.idPartsInBasket));
    },
    basketPartsFetching(state, { payload }: PayloadAction<any[]>) {
      state.basketParts = payload;
      state.isLoading = false;
    },
    setPrice(state, action: PayloadAction<TotalPrice>) {
      state.totalPrice = action.payload;
    },
  },
});

export const { updateBasket, setPrice, removeBasket, hideCounter } = basketSlice.actions;
export default basketSlice.reducer;