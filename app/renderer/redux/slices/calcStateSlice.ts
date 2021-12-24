import { createSlice } from "@reduxjs/toolkit";
import {CalcState} from '../interfaces/index'

const initialState: CalcState = { 
    loading: true,
    error: false,
};

export const CalcStateSlice = createSlice({
  // 名前
  name: "calcState",
  // 初期値
  initialState,
  // reducer
  reducers: {
    setError(state) {
        return {
            loading: state.loading,
            error: true
        };
    },
    clearError(state) {
        console.log('clearError')
        return {
            loading: state.loading,
            error: false
        };
    },
    endLoading(state) {
        return {
            error: state.error,
            loading: false
        };
    },
    startLoading(state) {
        console.log('startload')
        return {
            error: state.error,
            loading: true
        };
    },
  },
});