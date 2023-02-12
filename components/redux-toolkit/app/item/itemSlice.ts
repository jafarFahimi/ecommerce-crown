import { createSlice } from "@reduxjs/toolkit";

// let localItem;
// let localItemState: string | null = "{}";
// if (typeof window !== "undefined") {
//   localItem = localStorage.getItem("ITEM");
//   localItemState = localStorage.getItem("state");
// }

// const stateCartItems = JSON.parse(localItemState || "{}")?.cartItems
//   ? JSON.parse(localItemState || "{}").cartItems
//   : [];
// const stateTotalPrice = JSON.parse(localItemState || "{}")?.totalPrice
//   ? JSON.parse(localItemState || "{}").totalPrice
//   : 0;
// const stateTotalItems = JSON.parse(localItemState || "{}")?.totalItems
//   ? JSON.parse(localItemState || "{}").totalItems
//   : 0;
// const stateWishlist = JSON.parse(localItemState || "{}")?.wishlist
//   ? JSON.parse(localItemState || "{}").wishlist
//   : [];

const allItems: StateProps[] = [
  { id: 1, name: "Brown Brim", imageUrl: "https://i.ibb.co/ZYW3VTp/brown-brim.png", price: 25, qty: 1 },
];

type StateProps = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  qty: number;
};
type PayLoadProps = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

let totalPriceValue = 0;
allItems.forEach((item) => (totalPriceValue += item.price * item.qty));

const itemSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: allItems,
    totalPrice: totalPriceValue,
    totalItems: allItems.length,
  },
  reducers: {
    addToCart(state, action) {
      if (state.cartItems.findIndex((item) => item.id === action.payload.id) !== -1) {
        const index = state.cartItems.findIndex((item) => item.id === action.payload.id);
        state.cartItems[index].qty++;
      } else {
        action.payload["qty"] = 1;
        state.cartItems.push(action.payload);
      }
      state.totalPrice = Number((state.totalPrice + action.payload.price).toFixed(2));
      state.totalItems = state.totalItems + 1;
      localStorage.setItem("state", JSON.stringify(state));
      // console.log(state);
    },

    minusFromCart: (state: { cartItems: StateProps[] }, payload: any) => {
      console.log("after minus payload is: ", payload);
      const prevItem = state.cartItems.find((item: { name: string }) => item.name == payload.name);
      if (prevItem) {
        if (!prevItem.qty) {
          prevItem.qty = 0;
        } else {
          prevItem.qty--;
        }
      } else {
        return;
      }
    },
    deleteFromCart: (state: { cartItems: StateProps[] }, payload: any) => {
      const prevItem = state.cartItems.find((item) => item.name == payload.name);
      if (prevItem) {
        state.cartItems.filter((item) => item.name !== payload.name);
      } else {
        return;
      }
      console.log("after delete payload is: ", payload);
    },
  },
});

export default itemSlice.reducer;
export const { addToCart, minusFromCart, deleteFromCart } = itemSlice.actions;