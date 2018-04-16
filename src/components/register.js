import React from 'react';
import {Field, reduxForm} from 'redux-form';

class Register extends React.Component {
	constructor(props){
		super(props);
	}
	attemptRegister(e){
			e.preventDefault();
			console.log('register!');
		}
	render(){

		

	return (
		<div>
			<h2>Register</h2>
				<section>
					<form onSubmit={(e)=>this.attemptRegister(e)}>
						<fieldset id='firstName'>
							<label htmlFor='firstName'>First Name</label>
							<Field component='input' className='form-control' type='text' name='firstName' id='firstName' required/>
						</fieldset> 
						<fieldset id='lastName'>
							<label htmlFor='lastName'>Last Name</label>
							<Field component='input' className='form-control' type='text' name='lastName' id='lastName' required/>
						</fieldset>
						<fieldset id='cellNumber'>
							<label htmlFor='cellNumber'>Cell Number</label>
							<Field component='input' className='form-control' type='tel' name='cellNumber' id='cellNumber' required/>
						</fieldset>
						<fieldset id='emailAddress'>
							<label htmlFor='emailAddress'>Email Address</label>
							<Field component='input' className='form-control' type='email' name='emailAddress' id='emailAddress' required/>
						</fieldset>
						<button type='submit' className='submitButton' color='info'>Register</button>
					</form>
				</section>
		</div>

		);
	}
}

export default reduxForm({form: 'register'})(Register);