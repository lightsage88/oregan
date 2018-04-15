//just make the login register page a different page, fuck it.

import React from 'react';
import {reduxForm} from 'redux-form';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
//need to create an action and reducers etc.
// import {connect} from 'react-redux';

class LoginRegister extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false
		};

		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	render(){
		return (
			<div>
				<h1>help</h1>
			</div>
			);
	}
}

export default reduxForm({form: 'registration'})(Register);