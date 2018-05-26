import {combineReducers} from 'redux';
import user from './user';
// import cart from './cart';
import shelf from './shelf';
import shippingOptions from './shippingOptions';
const rootReducer = combineReducers({
	user,
	// shoppingCart: cart,
	shelf,
	shippingOptions
})

export default rootReducer