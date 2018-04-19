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
			const username = e.target.username.value;
			const emailAddress = e.target.emailAddress.value;
			const password = e.target.password.value;
			const firstName = e.target.firstName.value;
			const lastName = e.target.lastName.value;
			const cellNumber = e.target.cellNumber.value;
			console.log(username);
			this.props.dispatch(registerUser(username, emailAddress, password, firstName, lastName, cellNumber));

		}

	checkPasswordStrength(passwordString){
		let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{10,})");
		let mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})");
		if(strongRegex.test(passwordString)) {
			console.log('bazinga!');
			this.setState({
				pwStrength: 'STRONG'
			})
		} else if(mediumRegex.test(passwordString)){
			this.setState({
				pwStrength: 'MEDIUM'
			});
		} else if(passwordString === '' || !(mediumRegex.test(passwordString))){
			this.setState({
				pwStrength: ''
			});
		}
	}


	onChange(e){
		console.log(e.target);
		if(e.target.name == 'password') {
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
			{this.props.validRegistration === true ? (<span>Registration Successful</span>): (this.props.validRegistration === false) ? (<span>Registration Error</span>) : (<span>Please fill the form below</span>)}
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
							<label htmlFor='username'>Username</label>
							<Field component='input' className='form-control' type='text' name='username' id='username' required/>
						</fieldset>
						<fieldset>
							<label htmlFor='password'>Password</label>
							{(this.state.pwStrength === 'MEDIUM')?(<span> {this.state.pwStrength} PASSWORD</span>): (this.state.pwStrength === 'STRONG')?(<span> {this.state.pwStrength} PASSWORD</span>):(<span> </span>)}
							<Field onChange={(e)=>this.onChange(e)} component='input' className='form-control' type='password' name='password' id='password' required/>
						</fieldset>
						<fieldset>
							<label htmlFor='passwordCheck'>Retype Password</label>
							<Field onChange={(e)=>this.onChange(e)} component='input' className='form-control' type='password' name='passwordCheck' id='passwordCheck' required/>
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

const mapStateToProps = state => ({
	validRegistration : state.app.user.validRegistration
});

Register = connect(mapStateToProps)(Register);
export default reduxForm({form: 'register'})(Register);