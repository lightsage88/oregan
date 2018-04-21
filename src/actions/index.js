require('es6-promise').polyfill();
const {API_BASE_URL} = require('../config');


export const registerUserSuccess = (user) => ({
	type: 'REGISTER_USER_SUCCESS',
	user
});

export const registerUserFail = ()=> ({
	type: 'REGISTER_USER_FAIL'
});

export const loginUserSuccess = (_id, authToken, username, emailAddress, firstName, lastName, cellNumber) => ({
	type: 'LOGIN_USER_SUCCESS',
	_id,
	authToken,
	username,
	emailAddress,
	firstName,
	lastName,
	cellNumber
});

export const persistUserData = (_id, authToken, username, emailAddress, firstName, lastName, cellNumber) => ({
	type: 'PERSIST_USER_DATA',
	_id,
	authToken,
	username,
	emailAddress,
	firstName,
	lastName,
	cellNumber
});


export const logOut = () => ({
	type: 'LOG_OUT'
});

export const registerUser = (username, emailAddress, password, firstName, lastName, cellNumber) => {
	return (dispatch) => {
		fetch(`${API_BASE_URL}/api/users`,
		{
			method: 'POST',
			headers: {
				'Content-Type':'application/json'
			},
			dataType: 'json',
			body: JSON.stringify({username, emailAddress, password, firstName, lastName, cellNumber})
		})
		.then(response => response.json())
		.then(json => {
			if(json.code === 422) {
				dispatch(registerUserFail());
				return;
			} else {
				console.log(json);
				console.log('success');
				dispatch(registerUserSuccess(json));
				setTimeout(()=>{
					window.location = '/';
				}, 2000);
			}
		})
		.catch(error=> {
			console.log(error);
			console.error(error);
		})
	}
}



export const loginUser = (username, password) => {
	return (dispatch) => {
		fetch(`${API_BASE_URL}/api/auth/login`,
		{
			method:'POST',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify({username, password})
		})
		.then(response => response.json())
		.then(json => {
			console.log('go mandrake go!');
			console.log(json);
			const {authToken} = json;
			const {userData} = json;
			const username = userData.username;
			const firstName = userData.firstName;
			const lastName = userData.lastName;
			const cellNumber = userData.cellNumber;
			const emailAddress = userData.emailAddress;
			const _id = userData._id;
			localStorage.setItem('authToken', authToken);
			localStorage.setItem('username', username);
			localStorage.setItem('firstName', firstName);
			localStorage.setItem('lastName', lastName);
			localStorage.setItem('emailAddress', emailAddress);
			localStorage.setItem('cellNumber', cellNumber);
			localStorage.setItem('_id', _id);
			localStorage.setItem('validLogin', true);
			dispatch(loginUserSuccess(_id, authToken, username, emailAddress, firstName, lastName, cellNumber));
			window.location = '/';
		})
		.catch(error => {
			console.error(error);
			console.log(error);
		});
	}
}

export const persistData = (_id) => {
	console.log('persistData running from action index');
	return (dispatch) => {
		fetch(`${API_BASE_URL}/api/users/persist`, 
			{
			method: 'POST',
			headers:{
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({_id})
		})
		.then(response => response.json())
		.then(json => {
			const userData = json;
			const authToken = localStorage.getItem('authToken');
			const firstName = userData.firstName;
			const lastName = userData.lastName;
			const cellNumber = userData.cellNumber;
			const emailAddress = userData.emailAddress;
			const _id = userData._id;
			const username = userData.username;
			dispatch(persistUserData(_id, authToken, username, emailAddress, firstName, lastName, cellNumber));
		})
		.catch(error => console.log(error));
	}
}

//a thunk action that sends a request with the productType from the productList.js file
//to 
//productType and pageType have an interchangeable relationship at the moment below
export const retrieveProducts = (productType) => {
	console.log('retrieveProducts running...');
	return (dispatch) => {
		fetch(`${API_BASE_URL}/api/products/retrieve`,
		{
			method: "POST",
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify({productType})
		})
		.then(response => response.json())
		.then(json =>{
			console.log(json);
		})
		.catch(err =>{
			console.log(err);
			console.error(err);

		})
	}
}


