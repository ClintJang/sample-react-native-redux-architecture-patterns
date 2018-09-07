import types from './types';

export function updateSumValueFirst(num) {
    return {
        type: types.CALCULATOR_UPDATE_SUM_FIRST,
        payload: num
    };
}

export function updateSumValueSecond(num) {
    return {
        type: types.CALCULATOR_UPDATE_SUM_SECOND,
        payload: num
    };
}
