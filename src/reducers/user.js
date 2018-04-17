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
			return {
				
			}
	}
}

export default user