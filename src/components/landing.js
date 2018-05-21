import React, {Component} from 'react';
import {connect} from 'react-redux';
import './landing.css';
export class Landing extends Component {
	constructor(props) {
		super(props);

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
			<div className='landingMain'>
			<h1>Hello, {(this.props.firstName === undefined) ? ' friend': (this.props.firstName)}</h1>
			{this.props.firstName===undefined ? <span>sign in for a better experience</span> : <span>welcome back!</span>}
			
			<br/><br/><br/>
			<section className='demo'>
				<p>demo</p>
				<h3>Username: dennis</h3>
				<h3>pw: Walruses8</h3>
			</section>
			</div>
			);

	}
}

const mapStateToProps = state => ({
	firstName: state.app.user.firstName
});

export default connect(mapStateToProps)(Landing);


