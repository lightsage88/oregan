import user from './user';

const initialState = {
	user: user,
	shelf: []
}

const shelf = (state=initialState, action) => {
	switch(action.type) {
		case 'STOCK_SHELF':
			console.log('stockshelf running');
			console.log(action.set);
			return Object.assign({}, ...state, action.set)

		default:
			return {}
	}
}

export default shelf