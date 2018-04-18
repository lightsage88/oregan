require('es6-promise').polyfill();
const {API_BASE_URL} = require('../config');

export const registerUserSuccess = (user) => ({
	type: 'REGISTER_USER_SUCCESS',
	user
});

export const registerUser = (emailAddress, password, firstName, lastName, cellNumber) => {
	return (dispatch) => {
		fetch(`${API_BASE_URL}/api/users/`,
		{
			method: 'POST',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify({emailAddress, password, firstName, lastName, cellNumber})
		})
		.then(response => response.json())
		.then(json => {
			if(json.code === 422) {
				// dispatch(loginFail());
				return;
			} else {
				console.log(json);
				dispatch(registerUserSuccess(json));
				window.location = '/';
			}
		})
		.catch(error=> {
			console.log(error);
			console.error(error);
		})
	}
}