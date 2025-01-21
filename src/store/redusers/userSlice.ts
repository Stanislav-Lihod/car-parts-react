import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
interface Part {
  id: number;
  name: string;
  price: number;
  part_id: number;
  image: string;
  part_name: string;
  price_final: number;
}

interface Order {
  id: number;
  totalPrice: number;
  date: number;
  parts: Part[];
}
export interface User {
  id: number;
  email: string;
  password: string;
  location: string;
  city: string;
  address: string;
  zipCode: string;
  first_name: string;
  second_name: string;
  phone_number: string;
  orders?: Order[];
}

interface UserState {
  isLoading: boolean;
  token: string;
  isAuth: boolean;
  user: User;
}

const initialState: UserState = {
  isLoading: false,
  token: localStorage.getItem("token") ?? "",
  isAuth: Boolean(localStorage.getItem("token")),
  user: {
    id: 0,
    email: "",
    password: "",
    location: "",
    city: "",
    address: "",
    zipCode: "",
    first_name: "",
    second_name: "",
    phone_number: "",
    orders: []
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setUser(state, action: PayloadAction<{ data: User; token: string }>) {
      const { data, token } = action.payload;

      state.token = token ?? state.token;
      state.user = data ?? state.user;

      if (token) {
        localStorage.setItem("token", token);
        state.isAuth = true;
      }
    },
    checkUser(state) {
      if (state.token) {
        try {
          state.user = jwtDecode(state.token) as User;
        } catch (error) {
          console.error("Invalid token:", error);
        }
      }
    },
    logout(state) {
      state.user = initialState.user;
      state.isAuth = false;
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const { setLoading, setUser, checkUser, logout } = userSlice.actions;
export default userSlice.reducer;