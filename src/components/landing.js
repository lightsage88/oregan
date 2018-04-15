import React, {Component} from 'react';
import {connect} from 'react-redux';

export class Landing extends Component {
	constructor(props) {
		super(props);
		this.state = {

		}
	}

	componentDidMount(){
	console.log('gangsta');
	console.log(this.props);
	console.log(this.state);
	console.log(this.props.firstName);
}

	render() {
//
		return (
			<div>

			<h1>Hello{(this.state.firstName === undefined) ? ', friend': (this.state.firstName)}</h1>
			</div>
			);

	}
}

const mapStateToProps = state => ({
	firstName: state.app.user.firstName
});

export default connect(mapStateToProps)(Landing);


