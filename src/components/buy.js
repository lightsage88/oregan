import React from 'react';
import {connect} from 'react-redux';
import {activateBT} from '../actions/index';
import DropIn from 'braintree-web-drop-in-react';
export class Buy extends React.Component {
	instance;
	state = {
		clientToken: null
	}; 

	async componentWillMount() {
        // Get a client token for authorization from your server
        // const response = await fetch("server.test/client_token");
        // const clientToken = await response.json(); // If returned as JSON string
        await this.props.dispatch(activateBT());
        // this.setState({
        //     clientToken
        // });
        console.log(this.props);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            clientToken: nextProps.clientToken
        });
    }


 
    async buy() {
        // Send the nonce to your server
        const { nonce } = await this.instance.requestPaymentMethod();
        await fetch(`server.test/purchase/${nonce}`);
    }
 
    render() {
    	console.log(this.state);
        if (!this.state.clientToken) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <DropIn
                        options={{ authorization: this.state.clientToken }}
                        onInstance={instance => (this.instance = instance)}
                    />
                    <button onClick={this.buy.bind(this)}>Buy</button>
                </div>
            );
        }
    }

}

const mapStateToProps = state => ({
    clientToken : state.app.user.btToken
});

export default connect(mapStateToProps)(Buy);