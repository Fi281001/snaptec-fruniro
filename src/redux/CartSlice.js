// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { database } from "../firebase";
import { getAuth } from "firebase/auth";
import { ref, set, push, get } from "firebase/database";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
  },
});

export const { setCart, addToCart } = cartSlice.actions;

export default cartSlice.reducer;

// Async actions with Firebase
// add
export const addToCartAsync = (productId) => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const cartRef = ref(database, `carts/${user.uid}`);
    const newCartItemRef = push(cartRef);

    const cartItem = {
      productId: productId,
    };

    await set(newCartItemRef, cartItem);
    dispatch(addToCart(cartItem)); // Cập nhật Redux store
  } else {
    console.error("User is not logged in.");
  }
};

// hiển thị giỏ
export const getCartAsync = () => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const cartRef = ref(database, `carts/${user.uid}`);
    const cartSnapshot = await get(cartRef);

    if (cartSnapshot.exists()) {
      const cartData = cartSnapshot.val();
      const cartcart = Object.values(cartData);
      dispatch(setCart(cartcart)); // Lưu giỏ hàng vào Redux store
    } else {
      dispatch(setCart([])); // Giỏ hàng rỗng
    }
  } else {
    console.error("User is not logged in.");
  }
};
