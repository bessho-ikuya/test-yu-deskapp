import { useDispatch, useSelector } from "react-redux";
import {CalcStateSlice} from '../slices/calcStateSlice'

function calcStateHandler(){
    const dispatch = useDispatch();
    const { endLoading, startLoading, setError, clearError } = CalcStateSlice.actions;
    const selector = useSelector((state: any) => state.CalcState);
    return {
        loading: selector.loading,
        hasError: selector.error,
        endLoading: () => dispatch(endLoading()),
        startLoading: () => dispatch(startLoading()),
        setError: () => dispatch(setError()),
        clearError: () => dispatch(clearError()),
      };
}

export default calcStateHandler