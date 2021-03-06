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
	pastPurchases: [],
	btToken: '',
	checkout: [],
	shippoTransaction: '',
	btTransaction: ''
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
				pastPurchases: action.pastPurchases,
				btToken: ''
			})

		case 'PERSIST_USER_DATA':
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
				pastPurchases: action.pastPurchases,
				btToken: '',
				checkout: action.checkout
				
			})

		case 'SEND_CLIENT_TOKEN':
			return Object.assign({}, state, {
				btToken: action.token
			})

		case 'ADD_SHIPPO_TRANSACTION_TO_STATE':
			return Object.assign({}, state, {
				shippoTransaction: action.shippoObject
			})

		case 'ADD_BT_TRANSACTION_TO_STATE':
			return Object.assign({}, state, {
				btTransaction: action.btObject
			})

		case 'PROPS_TO_CHECKOUT': 
			return Object.assign({}, state, {
				checkout:action.cartState
			})
		// case 'PUT_ITEM_IN_CART2':
		// 	return  {...state, cart: this.cart.push(action.item)}
		case 'SEND_SHIPPING_OPTIONS_TO_CLIENT':
			return {...state}
		case 'STOCK_SHELF':
			return {...state}

		case '@@redux-form/DESTROY':
			return {...state}

		case 'LOG_OUT':
			return {}

		default:
			return {}
			
	}
}

export default user;