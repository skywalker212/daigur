import {createStore, combineReducers} from 'redux';
import tempReducer from '../Reducers/tempReducer';
import firebaseReducer from '../Reducers/firebaseReducer';

export default () => {
    const store = createStore(
        combineReducers({
            temp: tempReducer,
            firebase: firebaseReducer
        })
    );
    return store;
}