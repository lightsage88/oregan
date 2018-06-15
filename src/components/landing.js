import React, {Component} from 'react';
import {connect} from 'react-redux';
import './landing.css';
import './landing-grid.css';
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
                <div className='landingInfo'>
                    <h2>Welcome to Rose City Shopper USA</h2>
                    <aside>The Pacific Northwest's bounty is at your fingertips</aside>
                </div>
            
                <div className='greeting'>
                    <span>Greetings, {(this.props.firstName === undefined) ? ' friend, sign in to shop!': 
                    (this.props.firstName)}</span>
                   
                </div>{/*greeting*/}
                    
                <div className='demo'>
                    <p>demo</p>
                    <h3>Username: dennis</h3>
                    <h3>pw: Walruses8</h3>
                </div>
			</div>
			);

	}
}

const mapStateToProps = state => ({
	firstName: state.app.user.firstName
});

export default connect(mapStateToProps)(Landing);


