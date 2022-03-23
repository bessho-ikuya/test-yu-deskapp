import { useDispatch, useSelector } from "react-redux";
import {CalcStateSlice} from '../slices/calcStateSlice'

function calcStateHandler(){
    const dispatch = useDispatch();
    const { endLoading, startLoading, setError, clearError, setErrorMessage } = CalcStateSlice.actions;
    const selector = useSelector((state: any) => state.CalcState);
    return {
      loading: selector.loading,
      hasError: selector.error,
      errorMessage: selector.errorMessage,
      endLoading: () => dispatch(endLoading()),
      startLoading: () => dispatch(startLoading()),
      setError: () => dispatch(setError()),
      clearError: () => dispatch(clearError()),
      setErrorMessage: (errorMessage: string) => dispatch(setErrorMessage({ errorMessage })),
    };
}

export default calcStateHandler