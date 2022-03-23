import { createSlice } from "@reduxjs/toolkit";
import {CalcState} from '../interfaces/index'

const initialState: CalcState = { 
    loading: true,
    error: false,
    errorMessage: "",
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
            errorMessage: state.errorMessage,
            error: true
        };
    },
    setErrorMessage(state, action: any) {
        return {
            loading: state.loading,
            errorMessage: action.payload.errorMessage,
            error: true
        };
    },
    clearError(state) {
        return {
            loading: state.loading,
            errorMessage: "",
            error: false
        };
    },
    endLoading(state) {
        return {
            error: state.error,
            errorMessage: state.errorMessage,
            loading: false
        };
    },
    startLoading(state) {
        return {
            error: state.error,
            errorMessage: state.errorMessage,
            loading: true
        };
    },
  },
});