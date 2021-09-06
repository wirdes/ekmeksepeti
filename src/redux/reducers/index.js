import {combineReducers} from 'redux';
import {auth} from './authReducer';
import {cart} from './cartReducer';

const rootReducer = combineReducers({
  auth,
  cart,
});

export default rootReducer;
