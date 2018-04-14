import {combineReducers} from 'redux';
import user from './user';
import cart from './cart';

const rootReducer = combineReducers({
	user,
	shoppingCart: cart
})

export default rootReducer