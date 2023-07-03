import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      if (state.value === 0) return;
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.payload.id}) as it's not in basket`
        );
      }

      state.items = newBasket;
    },
    resetBasket: (state) => {
      state.items = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket, incrementByAmount, resetBasket } =
  basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketitemsWithId = (state, id) =>
  state.basket.items.filter((item) => item.id === id);

export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => {
    return total + item.price;
  }, 0);

export default basketSlice.reducer;
