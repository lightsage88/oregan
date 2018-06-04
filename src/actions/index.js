require('es6-promise').polyfill();
const {API_BASE_URL} = require('../config');
let transactionObject = {
	braintreeReceipt:'',
	shippoReceipt:'',
	cart: ''
};



export const registerUserSuccess = (user) => ({
	type: 'REGISTER_USER_SUCCESS',
	user
});

export const registerUserFail = ()=> ({
	type: 'REGISTER_USER_FAIL'
});

export const loginUserSuccess = (_id, authToken, username, emailAddress, firstName, lastName, cellNumber, cart, pastPurchases, checkout) => ({
	type: 'LOGIN_USER_SUCCESS',
	_id,
	authToken,
	username,
	emailAddress,
	firstName,
	lastName,
	cellNumber,
	cart,
	pastPurchases,
	checkout
});

export const propsToCheckout = (cartState) => ({
	type: 'PROPS_TO_CHECKOUT',
	cartState
});

export const sendShippingOptionsToClient = (shippingOptions)=> ({
	type: 'SEND_SHIPPING_OPTIONS_TO_CLIENT',
	shippingOptions
});

export const persistUserData = (_id, authToken, username, emailAddress, firstName, lastName, cellNumber, cart, pastPurchases, checkout) => ({
	type: 'PERSIST_USER_DATA',
	_id,
	authToken,
	username,
	emailAddress,
	firstName,
	lastName,
	cellNumber,
	cart,
	pastPurchases,
	checkout
});

export const stockShelf = (set) => ({
	type: 'STOCK_SHELF',
	set
});

export const sendClientToken = (token) =>({
	type: 'SEND_CLIENT_TOKEN',
	token
});

export const addShippoTransactionToState = (shippoObject) => ({
	type: 'ADD_SHIPPO_TRANSACTION_TO_STATE',
	shippoObject
});

export const addBTTransactionToState = (btObject) => ({
	type: 'ADD_BT_TRANSACTION_TO_STATE',
	btObject
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
			const cart = userData.cart;
			const checkout = userData.checkout;
			const pastPurchases = userData.pastPurchases;
			localStorage.setItem('authToken', authToken);
			localStorage.setItem('username', username);
			localStorage.setItem('firstName', firstName);
			localStorage.setItem('lastName', lastName);
			localStorage.setItem('emailAddress', emailAddress);
			localStorage.setItem('cellNumber', cellNumber);
			localStorage.setItem('_id', _id);
			localStorage.setItem('validLogin', true);
			dispatch(loginUserSuccess(_id, authToken, username, emailAddress, firstName, lastName, cellNumber, cart, pastPurchases, checkout));
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
			const cart = userData.cart;
			const pastPurchases = userData.pastPurchases;
			const checkout = userData.checkout;
			dispatch(persistUserData(_id, authToken, username, emailAddress, firstName, lastName, cellNumber, cart, pastPurchases, checkout));
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
			let set = json;
			dispatch(stockShelf(set));
		})
		.catch(err =>{
			console.log(err);
			console.error(err);

		})
	}
}

export const putItemInCart1 = (cart, userid, pageType) => {
	console.log('putItemInCart1 running...');

	return (dispatch) => {
		fetch(`${API_BASE_URL}/api/users/itemIntoCart`,
		{
			method: 'PUT',
			headers: {
				'Content-Type':'application/json'
			},
			// body: JSON.stringify({cart, cartLength, pageType, userid, quantityOrdered, companyName, id, productDescription,productName,productPrice, shippingPrice, productRating, productStock, productType})
			body: JSON.stringify({cart, userid, pageType})
		})
		.then(response => response.json())
		.then(json=> {
			console.log(json);
			dispatch(persistData(userid));
			// dispatch(putItemInCart2(item));
			
		})
		.then(()=>{
			dispatch(retrieveProducts(pageType));
		})
		.catch(err => {
			console.log(err);
			console.error(err);
		})
	}
}

export const putItemInCart2 = (cart, cartLength, pageType, userid, quantityOrdered, companyName, id, productDescription,productName,productPrice, shippingPrice, productRating, productStock, productType) => {
	console.log('putItemInCart2 running...');
	
	return (dispatch) => {
		fetch(`${API_BASE_URL}/api/users/followingItems`,
		{
			method: 'PUT',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify({cart, cartLength, pageType, userid, quantityOrdered, companyName, id, productDescription,productName,productPrice, shippingPrice, productRating, productStock, productType})
		})
		.then(response => response.json())
		.then(json=> {
			console.log(json);
			dispatch(persistData(userid));
		})
		.then(()=>{
			dispatch(retrieveProducts(pageType));
		})
		.catch(err => {
			console.log(err);
			console.error(err);
		})
	}
}

export const activateBT =()=> {
	console.log('activateBT running...');
	return (dispatch)=>{
		fetch(`${API_BASE_URL}/api/braintree/client_token`,
			{
				method: 'GET',
				headers: {
					'Content-Type':'application/json'
				}
			})
		.then(response => response.json())
		.then(json => {
			console.log('okay, we should have a json');
			let token = json;
			// console.log(token);
			dispatch(sendClientToken(token));
		})
		.catch(err => {
			console.log(err);
			console.error(err);
		})
	}
}





export const parcelDetailsToShippo = (parcelDetails) => {
	console.log(parcelDetails);
	console.log('addressToShippo running');
	return (dispatch)=>{
		fetch(`${API_BASE_URL}/api/shippo/createShipment`,
		{
			method: "POST",
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify(parcelDetails)
		})
		.then(response => response.json())
		.then(json=>{
			console.log(json);
			let shippingOptions = json;
			dispatch(sendShippingOptionsToClient(shippingOptions));
		})
		.catch(err =>{
			console.log(err);
			console.error(err);
		});
	}
}

export const createShippoTransaction = (shippingMethodID) => {
	console.log('createShippoTransaction action running...');
	console.log(shippingMethodID);
	return (dispatch) => {
		fetch(`${API_BASE_URL}/api/shippo/createTransaction`,
		{
			method: 'POST',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify({shippingMethodID})
		})
		.then(response => response.json())
		.then(json =>{
			console.log('shippoTransaction');
			console.log(json);
			let shippoObject = json;
			dispatch(addShippoTransactionToState(shippoObject));
		})
		.catch(err =>{
			console.log(err);
			console.error(err);
		});
	}
}


export const checkoutBT = (cart, nonce, totalCost, countryNameShipping, countryNameBilling, emailShipping, emailBilling, extendedStreetShipping, extendedStreetBilling,firstNameShipping,firstNameBilling,lastNameShipping,lastNameBilling,id,localityBilling, localityShipping,phoneShipping,phoneBilling,postalCodeShipping,postalCodeBilling,regionShipping,regionBilling, streetNameShipping, streetNameBilling, firstNameCustomer, lastNameCustomer, emailCustomer, phoneCustomer, itemCost, serviceFees, shippingMethodCost, shippingMethodID) => {
	console.log('checkoutBT running...');
	console.log(nonce);
	return (dispatch) => {
		fetch(`${API_BASE_URL}/api/braintree/checkout`,
			{
			 method: 'POST',
			 headers: {
				'Content-Type':	'application/json' 	
			 },
			body: JSON.stringify({cart, nonce, totalCost, countryNameShipping, countryNameBilling, emailShipping, emailBilling, extendedStreetShipping, extendedStreetBilling,firstNameShipping,firstNameBilling,lastNameShipping,lastNameBilling,id,localityBilling, localityShipping,phoneShipping,phoneBilling,postalCodeShipping,postalCodeBilling,regionShipping,regionBilling, streetNameShipping, streetNameBilling, firstNameCustomer, lastNameCustomer, emailCustomer, phoneCustomer, itemCost, serviceFees, shippingMethodCost, shippingMethodID})
		})
		.then(response => response.json())
		.then(json =>{
			console.log('braintree transaction');
			console.log(json);
			let btObject = json;
			dispatch(sendTransactionRecordToDataBase(btObject));
			let objecto = {};
			objecto.success = btObject.success;
			objecto.id = btObject.transaction.id;
			objecto.status = btObject.transaction.status;
			objecto.type = btObject.transaction.type;
			objecto.currencyIsoCode = btObject.transaction.currencyIsoCode;
			objecto.amount = btObject.transaction.amount;
			objecto.createdAt = btObject.transaction.createdAt;
			objecto.updatedAt = btObject.transaction.updatedAt;
			objecto.billing = btObject.transaction.billing;
			objecto.shipping = btObject.transaction.shipping;
			objecto.customFields = btObject.transaction.customFields;
			console.log(objecto);
			console.log(objecto.id);
			dispatch(addBTTransactionToState(objecto));
		})
		//now we try a fetch to the user router
		.catch(err => {
			console.log(err);
			console.error(err);
		});
	}
}

export const sendTransactionRecordToDataBase = (receipt) => {
	console.log('sendTransactionRecordToDataBase running...');
	console.log(receipt);
	return(dispatch)=> {
		fetch(`${API_BASE_URL}/api/users/finishTransaction`,
				{
				method: 'PUT',
				headers: {
						'Content-Type':'application/json'
					},
				body: JSON.stringify({receipt})	
			})
		.then(response => response.json())
		.then(json =>{
			console.log(json);
		})
		.catch(err=>{
			console.log(err);
			console.error(err);
		});
	}

}

export const emailCustomer = (payload) =>{
	console.log('emailCustomer running...');
	console.log(payload);
	return(dispatch)=>{
		fetch(`${API_BASE_URL}/api/nodemailer/emailCustomer`,
		{
			method: 'POST',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify({payload})
		})
		.then(response => response.json())
		.then(json => {
			console.log(json);
		})
		catch(err=>{
			console.log(err);
			console.error(err);
		});
	}
}

export const emailAdmin = (payload) =>{
	console.log('emailAdmin running...');
	console.log(payload);
	return(dispatch)=>{
		fetch(`${API_BASE_URL}/api/nodemailer/emailAdmin`,
		{
			method: 'POST',
			headers: {
				'Content-Type':'application/json'
			},
			body: JSON.stringify({payload})
		})
		.then(response => response.json())
		.then(json => {
			console.log(json);
		})
		catch(err=>{
			console.log(err);
			console.error(err);
		});
	}
}