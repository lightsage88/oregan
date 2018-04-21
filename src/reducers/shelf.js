const initialState = {
	shelf: []
}

const shelf = (state=initialState, action) => {
	switch(action.type) {
		case 'STOCK_SHELF':
			return Object.assign({}, state, action.set)

		default:
			return {}
	}
}

export default shelf