// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { database } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, set, get, remove } from "firebase/database";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    clearCart: (state) => {
      state.cart = []; // Đặt giỏ hàng về trạng thái rỗng
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action) => {
      // Xóa sản phẩm khỏi Redux store
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload
      );
    },
  },
});

export const { setCart, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;

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

      await set(cartRef, {
        ...existingProduct,
        quantity: updatedQuantity, // Cập nhật số lượng sản phẩm
      });
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới sản phẩm vào giỏ hàng
      await set(cartRef, {
        ...cartItem,
        quantity: 1, // Đặt quantity ban đầu là 1
      });

      console.log("Thêm sản phẩm mới: ", cartItem);
    }
    dispatch(getCartAsync());
  } else {
    console.error("User is not authenticated");
  }
};

// display cart
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

// delete cart
export const removeFromCartAsync = (productId) => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const cartRef = ref(database, `carts/${user.uid}/${productId}`);
    await remove(cartRef);
    dispatch(removeFromCart(productId));
  } else {
  }
};

// delete all cart
export const clearCartAsync = () => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const cartRef = ref(database, `carts/${user.uid}`);
    await remove(cartRef); // Xóa giỏ hàng từ Firebase
    dispatch(clearCart()); // Xóa giỏ hàng trong Redux store
  } else {
    console.error("User is not authenticated");
  }
};
export const selectTotalQuantity = (state) => {
  return state.cart.cart.reduce((total, item) => total + item.quantity, 0);
};

// update
// update cart
export const updateCartAsync = (productId, newQuantity) => async (dispatch) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const cartRef = ref(database, `carts/${user.uid}/${productId}`);
    // Lấy thông tin sản phẩm hiện tại từ Firebase
    const cartSnapshot = await get(cartRef);
    if (cartSnapshot.exists()) {
      const existingProduct = cartSnapshot.val();
      // Nếu newQuantity > 0, cập nhật số lượng sản phẩm
      if (newQuantity > 0) {
        await set(cartRef, {
          ...existingProduct,
          quantity: newQuantity, // Cập nhật số lượng sản phẩm
        });
      } else {
        // Nếu newQuantity <= 0, xóa sản phẩm khỏi giỏ hàng
        await remove(cartRef);
        dispatch(removeFromCart(productId));
      }
      dispatch(getCartAsync()); // Lấy lại giỏ hàng sau khi cập nhật
    } else {
      console.error("Product does not exist in cart");
    }
  } else {
    console.error("User is not authenticated");
  }
};
