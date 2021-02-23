import {RESET_SCORE, INCREMENT_SCORE} from '../actions/scoreAction';

const scoreReducer = (state = {score: 0}, action) => {
    switch (action.type) {
        case INCREMENT_SCORE:
            return {...state, score: state.value + 1};
        case RESET_SCORE:
            return {...state, score: 0};
        default:
            return {...state};
    }
};

export default scoreReducer;