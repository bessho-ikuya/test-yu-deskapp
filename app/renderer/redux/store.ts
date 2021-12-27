import { configureStore, createSlice } from "@reduxjs/toolkit";
import {CalcStateSlice} from "./slices/calcStateSlice";

export const store = configureStore({
  reducer: {
    CalcState: CalcStateSlice.reducer,
  },
});