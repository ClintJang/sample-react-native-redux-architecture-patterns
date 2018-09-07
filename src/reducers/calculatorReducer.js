import types from '../actions/types';

const defaultState = {
    result : 0,
    sumInfo: {
        frist : 0,
        second : 0,
    },
}

export default calculator = (state = defaultState, action) => {    
    // For Debugger
    // console.log('payload:' + action.payload);

    switch (action.type) {
        case types.CALCULATOR_UPDATE_SUM_FIRST:
            return {
                // ...state,
                result : action.payload + state.sumInfo.second,
                sumInfo: {
                    frist:action.payload,
                    second:state.sumInfo.second
                }
            };
        case types.CALCULATOR_UPDATE_SUM_SECOND:
            return {
                // ...state,
                result : action.payload + state.sumInfo.frist,
                sumInfo: {
                    frist:state.sumInfo.frist,
                    second:action.payload
                }
            };
        default:
            return state;
    }
};
