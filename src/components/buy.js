import React from 'react';
import {connect} from 'react-redux';
import {activateBT, checkoutBT, createShippoTransaction} from '../actions/index';
import DropIn from 'braintree-web-drop-in-react';
export class Buy extends React.Component {
	instance;
	state = {
		clientToken: null,
        totalCost: 0,
        shippingMethodID: ''
	}; 

	async componentWillMount() {
        
        await this.props.dispatch(activateBT());
       
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            clientToken: nextProps.clientToken,
            totalCost: Number(nextProps.totalCost),
            shippingMethodID: nextProps.shippingMethod


        });
    }


 
    async buy() {

        console.log('async buy running...');
        // Send the nonce to your server
        const { nonce } = await this.instance.requestPaymentMethod();
        let totalCost = this.state.totalCost;
        let shippingMethodID= this.state.shippingMethodID;
        console.log(shippingMethodID);
        console.log(totalCost);
        await fetch(`server.test/purchase/${nonce}`);
        console.log(nonce);
        this.props.dispatch(createShippoTransaction(shippingMethodID));
        this.props.dispatch(checkoutBT(nonce, totalCost));

    }
 
    render() {
        console.log(this.props);
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