import user from './user';

const initialState = {
	shelf: []
}

const shelf = (state=initialState, action) => {
	switch(action.type) {
		case 'STOCK_SHELF':
			// console.log('stockshelf running');
			// console.log(action.set);
			// return Object.assign({}, ...state, action.set)
			return 	action.set
		case 'PUT_ITEM_IN_CART2' || 'PERSIST_USER_DATA':
			return {...state}



		default:
			return {}
	}
}

export default shelf