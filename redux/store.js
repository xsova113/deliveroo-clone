import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./featured/basketSlice";
import restaurantReducer from "./featured/restaurantSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    restaurant: restaurantReducer,
  },
});
