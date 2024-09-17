// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { database } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
export const addToCartAsync = (cartItem) => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // Sử dụng productId của sản phẩm làm key
    const cartRef = ref(database, `carts/${user.uid}/${cartItem.productId}`);

    // Lấy thông tin sản phẩm hiện tại từ Firebase
    const cartSnapshot = await get(cartRef);

    if (cartSnapshot.exists()) {
      // Nếu sản phẩm đã tồn tại, tăng quantity lên 1
      const existingProduct = cartSnapshot.val();
      const updatedQuantity = existingProduct.quantity + 1;

      console.log("Sản phẩm đã tồn tại, tăng số lượng: ", existingProduct);
      await set(cartRef, {
        ...existingProduct,
        quantity: updatedQuantity, // Cập nhật số lượng sản phẩm
      });

      console.log(`Updated quantity for ${cartItem.name}:`, updatedQuantity);
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới sản phẩm vào giỏ hàng
      await set(cartRef, {
        ...cartItem,
        quantity: 1, // Đặt quantity ban đầu là 1
      });

      console.log("Thêm sản phẩm mới: ", cartItem);
    }

    // Cập nhật Redux store
    dispatch(addToCart(cartItem));
  } else {
    console.error("User is not authenticated");
  }
};

// hiển thị giỏ
export const getCartAsync = () => async (dispatch) => {
  const auth = getAuth();

  onAuthStateChanged(auth, async (user) => {
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
    }
  });
};
