import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 cartItems: [],
 cartTotalQuantity: 0,
 cartTotalAmount: 0,
};

const cartSlice = createSlice({
 name: "cart",
 initialState,
 reducers: {
  addItemToCart: (state, action) => {
   const item = action.payload;
   const itemIndex = state.cartItems.findIndex(
    (cartItem) => cartItem.id === item.id
   );
   if (itemIndex === -1) {
    state.cartItems.push({ ...item, quantity: 1 });
   } else {
    state.cartItems[itemIndex].quantity += 1;
   }
   state.cartTotalQuantity += 1;
   state.cartTotalAmount += item.price;
  },
  deleteItemFromCart: (state, action) => {
   const item = action.payload;
   const itemIndex = state.cartItems.findIndex(
    (cartItem) => cartItem.id === item.id
   );
   if (itemIndex !== -1) {
    state.cartTotalQuantity -= 1;
    if (state.cartItems[itemIndex].quantity === 1)
     state.cartItems.splice(itemIndex, 1);
    else state.cartItems[itemIndex].quantity -= 1;
    state.cartTotalAmount -= item.price;
   }
  },
 },
});

export const { addItemToCart, deleteItemFromCart } = cartSlice.actions;

export const selectTotalItems = (state) =>
 state.persistedReducer.cart.cartTotalQuantity;
export const selectCartItems = (state) => state.persistedReducer.cart.cartItems;

export default cartSlice.reducer;
