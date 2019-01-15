import {createStore, combineReducers} from 'redux';
import tempReducer from '../Reducers/tempReducer';

export default () => {
    const store = createStore(
        combineReducers({
            temp: tempReducer
        })
    );
    return store;
}