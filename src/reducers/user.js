const initialState = {
	token: '',
	firstName: '',
	lastName: '',
	emailAddress: '',
	cellNumber: '',
	_id: '',
	validLogin: ''
}

const user = (state=initialState, action) => {
	switch(action.type) {
		case 'REGISTER_USER_SUCCESS':
			return {}

		case 'LOGIN_USER_SUCCESS':
			return Object.assign({}, state, {
				token: action.token,
				firstName: action.firstName ,
				lastName: action.lastName ,
				emailAddress: action.emailAddress ,
				cellNumber: action.cellNumber ,
				_id: action._id ,
				validLogin: true

			})

		default:
			return {}
			
	}
}

export default user;