import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {registerUser} from '../actions/index.js';
import {connect} from 'react-redux';

class Register extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			pw: '',
			pw2:'',
			pwStrength: ''
		}

	}
	handleSubmit(e){
			e.preventDefault();
			console.log('register!');
			console.log(e.target);
			const emailAddress = e.target.emailAddress.value;
			const firstName = e.target.firstName.value;
			const lastName = e.target.lastName.value;
			const cellNumber = e.target.cellNumber.value;
			console.log(emailAddress);
			console.log(firstName);
			console.log(lastName);
			console.log(cellNumber);
		}

	checkPasswordStrength(passwordString){
		let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
									// ("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
		if(strongRegex.test(passwordString)) {
			console.log('bazinga!');
		} else {
			console.log('not yet');
		}
	}


	onChange(e){
		console.log(e.target);
		if(e.target.name == 'password') {
			console.log('kendo');
			let passwordString = e.target.value;
			this.checkPasswordStrength(passwordString);
			this.setState({
				pw : e.target.value
			});
		} else {
			if(e.target.name == 'passwordCheck'){
				this.setState({
					pw2: e.target.value
				});
			}
		}

	}


	render(){

		

	return (
		<div>
			<h2>Register</h2>
				<section>
					<form onSubmit={(e)=>this.handleSubmit(e)}>
						<fieldset>
							<label htmlFor='firstName'>First Name</label>
							<Field component='input' className='form-control' type='text' name='firstName' id='firstName' required/>
						</fieldset> 
						<fieldset>
							<label htmlFor='lastName'>Last Name</label>
							<Field component='input' className='form-control' type='text' name='lastName' id='lastName' required/>
						</fieldset>
						<fieldset>
							<label htmlFor='cellNumber'>Cell Number</label>
							<Field component='input' className='form-control' type='tel' name='cellNumber' id='cellNumber' required/>
						</fieldset>
						<fieldset>
							<label htmlFor='emailAddress'>Email Address</label>
							<Field component='input' className='form-control' type='email' name='emailAddress' id='emailAddress' required/>
						</fieldset>
						<fieldset>
							<label htmlFor='password'>Password</label>
							<Field onChange={(e)=>this.onChange(e)} component='input' className='form-control' type='password' name='password' id='password' required/>
						</fieldset>
						<fieldset>
							<label htmlFor='passwordCheck'>Retype Password</label>
							<Field onChange={(e)=>this.onChange(e)} component='input' className='form-control' type='text' name='passwordCheck' id='passwordCheck' required/>
						</fieldset>
						{(this.state.pw === this.state.pw2) ? 
						  (<button type='submit' className='submitButton' color='info'>Register</button>)
						  :
						  (<div><button type='submit' className='submitButton' color='info' disabled>Register</button>
						  	<span>PASSWORDS MUST MATCH!</span>

						  	</div>)}
					</form>
				</section>
		</div>

		);
	}
}

//Register = connect(mapStateToProps)(Register);
export default reduxForm({form: 'register'})(Register);