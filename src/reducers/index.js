import { combineReducers } from 'redux';
import CalculatorReducer from './calculatorReducer';

export default combineReducers({
    calculator: CalculatorReducer,
});