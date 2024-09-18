import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice.js";

const Store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default Store;
