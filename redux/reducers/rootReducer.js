import scoreReducer from './scoreReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    score: scoreReducer
});

export default rootReducer;