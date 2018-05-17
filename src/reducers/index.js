import {combineReducers} from 'redux';
import user from './user';
// import cart from './cart';
import shelf from './shelf';

const rootReducer = combineReducers({
	user,
	// shoppingCart: cart,
	shelf
})

export default rootReducer