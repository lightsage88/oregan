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
			<section className='todos'>
				<h3>Things that still need to happen:</h3>
					<ul>
						<li>Need to enable a 'guest mode', meaning for now you MUST create an account or play around with the demo.
						I plan to create a temporary account each time the site is accessed that will be destroyed once you log into an existing one that is not a dummy or make a purchase</li>
						<li>We need some CSS work badly, I'm aware of this and will be coming up with something to reflect our new name "Rose City Shopper USA"</li>
						<li>To sample creating a transaction, make sure that you enter at least an email address for billing, that way you can get an email detailing your 'purchase'</li>
						<li>The purchase action uses Braintree by PayPal. You should refer to <a href='https://developers.braintreepayments.com/reference/general/testing/ruby'>this page</a> to get a fake CC number to use.</li>
						<li>If you have any questions, complaints, ideas, or suggestions, please let me know at <a href="mailto:rosecityshopperusa@gmail.com">rosecityshipperusa@gmail.com</a>.</li>
					</ul>
			</section>

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


