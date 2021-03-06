//just make the login register page a different page, fuck it.

import React from 'react';
import {Field, reduxForm} from 'redux-form';
// import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
//need to create an action and reducers etc.
// import {connect} from 'react-redux';
import './login.css';
class Login extends React.Component {
	constructor(props) {
		super(props);
		
	}

	attemptLogin(e){
		e.preventDefault();
		console.log(this.props.onSubmit);
		console.log('submit');
		let username = e.target.username.value;
		let password = e.target.password.value;
		console.log(username);
		console.log(password);
		
			this.props.onSubmit(e, username, password)
		
		// this.props.dispatch(loginUser(username, password));
		//we need to create an action to be dispatched here
		//that will get information from a database and populate
		//our reduxState so the user can have a more personalized 
		//and easier experience that comes with registering with us
	}

	

	render(){
		return (
			<div className='loginMain'>
					<section>
						<form  className='loginForm' onSubmit={(e)=>this.attemptLogin(e)}>
							<fieldset className='loginFormFieldSet'>
								<label htmlFor='username'>Username</label>
								<Field component='input' className='form-control' type='text' name='username' id='username' required/>
							</fieldset>
							<fieldset className='loginFormFieldSet'>
								<label htmlFor='password'>Password</label>
								<Field component='input' className='form-control' type='password' name='password' id='password' required/>
							</fieldset>
							<button type='submit' className='submitButton' color='info'>Log In</button>
						</form>
					</section>
			</div>
			);
	}
}

export default reduxForm({form: 'login'})(Login);