//just make the login register page a different page, fuck it.

import React from 'react';
import {Field, reduxForm} from 'redux-form';
// import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
//need to create an action and reducers etc.
// import {connect} from 'react-redux';

class Login extends React.Component {
	constructor(props) {
		super(props);
		
	}

	attemptLogin(e){
		e.preventDefault();
		console.log('submit');
		//we need to create an action to be dispatched here
		//that will get information from a database and populate
		//our reduxState so the user can have a more personalized 
		//and easier experience that comes with registering with us
	}

	

	render(){
		return (
			<div>
				<h2>Login</h2>
					<section>
						<form onSubmit={(e)=>this.attemptLogin(e)}>
							<fieldset id='email'>
								<label htmlFor='email'>Email</label>
								<Field component='input' className='form-control' type='email' name='email' id='email' required/>
							</fieldset>
							<fieldset id='password'>
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