const initialState = {
	token: '',
	username: '',
	firstName: '',
	lastName: '',
	emailAddress: '',
	cellNumber: '',
	_id: '',
	validLogin: '',
	cart: [],
	pastPurchases: []
}

const user = (state=initialState, action) => {
	switch(action.type) {
		case 'REGISTER_USER_SUCCESS':
			return Object.assign({}, state, {
				validRegistration: true
			})

		case 'REGISTER_USER_FAIL' :
			return Object.assign({}, state, {
				validRegistration: false
			})	

		case 'LOGIN_USER_SUCCESS':
			return Object.assign({}, state, {
				_id: action._id,
				authToken: action.authToken,
				username: action.username,
				emailAddress: action.emailAddress,
				firstName: action.firstName ,
				lastName: action.lastName ,
				cellNumber: action.cellNumber ,
				validLogin: true,
				cart : action.cart,
				pastPurchases: action.pastPurchases
			})

		case 'PERSIST_USER_DATA' || 'STOCK_SHELF':
			return Object.assign({}, state, {
				_id: action._id,
				authToken: action.authToken,
				username: action.username,
				emailAddress: action.emailAddress,
				firstName: action.firstName ,
				lastName: action.lastName ,
				cellNumber: action.cellNumber ,
				validLogin: true,
				cart: action.cart,
				pastPurchases: action.pastPurchases
				
			})

		// case 'PUT_ITEM_IN_CART':
		// 	return  Object.assign({}, state, {...state, cart: action.item})

		case 'LOG_OUT':
			return {}

		default:
			return {}
			
	}
}

export default user;