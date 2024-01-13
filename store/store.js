import { configureStore } from "@reduxjs/toolkit";
import { shiftSlice } from "./shiftSlice";

const store= configureStore({
    reducer: {
      [shiftSlice.name]: shiftSlice.reducer,
    },
    devTools: true,
  });

export default store
