import React from 'react';
import {connect} from 'react-redux';
import {activateBT, checkoutBT, createShippoTransaction} from '../actions/index';
import DropIn from 'braintree-web-drop-in-react';
export class Buy extends React.Component {
	instance;
	state = {
        cart:'',
		clientToken: null,
        totalCost: 0,
        shippingMethodID: '',
        countryNameBilling: '',
        countryNameShipping: '',
        emailBilling:'',
        emailShipping:'',
        extendedStreetBilling:'',
        extendedStreetShipping:'',
        firstNameBilling:'',
        firstNameShipping: '',
        lastNameBilling:'',
        lastNameShipping:'',
        id: '',
        localityShipping:'',
        localityBilling:'',
        phoneBilling:'',
        phoneShipping:'',
        postalCodeBilling:'',
        postalCodeShipping:'',
        regionBilling:'',
        regionShipping:'',
        streetNameBilling:'',
        streetNameShipping:'',
        itemCost:'',
        serviceFees:'',
        shippingMethodCost:'',
        shippoTransaction: ''


	}; 

	async componentWillMount() {
        
        await this.props.dispatch(activateBT());
       
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        this.setState({
            cart: nextProps.cart,
            clientToken: nextProps.clientToken,
            totalCost: Number(nextProps.totalCost),
            shippingMethodID: nextProps.shippingMethod,
            countryNameBilling: nextProps.countryNameBilling,
            countryNameShipping: nextProps.countryNameShipping,
            emailBilling:nextProps.emailBilling,
            emailShipping:nextProps.emailShipping,
            extendedStreetBilling:nextProps.extendedStreetBilling,
            extendedStreetShipping:nextProps.extendedStreetShipping,
            firstNameBilling:nextProps.firstNameBilling,
            firstNameShipping: nextProps.firstNameShipping,
            lastNameBilling:nextProps.lastNameBilling,
            lastNameShipping:nextProps.lastNameShipping,
            id: nextProps.id,
            localityShipping:nextProps.localityShipping,
            localityBilling:nextProps.localityBilling,
            phoneBilling:nextProps.phoneBilling,
            phoneShipping:nextProps.phoneShipping,
            postalCodeBilling:nextProps.postalCodeBilling,
            postalCodeShipping:nextProps.postalCodeShipping,
            regionBilling:nextProps.regionBilling,
            regionShipping:nextProps.regionShipping,
            streetNameBilling:nextProps.streetNameBilling,
            streetNameShipping:nextProps.streetNameShipping,
            firstNameCustomer: nextProps.firstNameCustomer,
            lastNameCustomer: nextProps.lastNameCustomer,
            emailCustomer: nextProps.emailCustomer,
            phoneCustomer: nextProps.phoneCustomer,
            itemCost:nextProps.itemCost,
            serviceFees: nextProps.serviceFees,
            shippingMethodCost: nextProps.shippingMethodCost,
            shippoTransaction: nextProps.shippoTransaction

        });
    }


 
    async buy() {

        console.log('async buy running...');
        // Send the nonce to your server
        const { nonce } = await this.instance.requestPaymentMethod();
        let cart = this.state.cart;
        let totalCost = this.state.totalCost;
        let firstNameCustomer=this.state.firstNameCustomer;
                                         let lastNameCustomer= this.state.lastNameCustomer;
                                         let emailCustomer=this.state.emailCustomer;;
                                         let phoneCustomer=this.state.phoneCustomer;
        let shippingMethodID= this.state.shippingMethodID;
            let countryNameBilling= this.state.countryNameBilling;
            let countryNameShipping= this.state.countryNameShipping;
            let emailBilling=this.state.emailBilling;
            let emailShipping=this.state.emailShipping;
            let extendedStreetBilling=this.state.extendedStreetBilling;
            let extendedStreetShipping=this.state.extendedStreetShipping;
            let firstNameBilling=this.state.firstNameBilling;
            let firstNameShipping= this.state.firstNameShipping;
            let lastNameBilling=this.state.lastNameBilling;
            let lastNameShipping=this.state.lastNameShipping;
            let id= this.state.id;
            let localityShipping=this.state.localityShipping;
            let localityBilling=this.state.localityBilling;
            let phoneBilling=this.state.phoneBilling;
            let phoneShipping=this.state.phoneShipping;
            let postalCodeBilling=this.state.postalCodeBilling;
            let postalCodeShipping=this.state.postalCodeShipping;
            let regionBilling=this.state.regionBilling;
            let regionShipping=this.state.regionShipping;
            let streetNameBilling=this.state.streetNameBilling;
            let streetNameShipping=this.state.streetNameShipping;
        let itemCost = this.state.itemCost;
        let serviceFees = this.state.serviceFees;
        let shippingMethodCost = this.state.shippingMethodCost;




       
        await fetch(`server.test/purchase/${nonce}`);
        await this.props.dispatch(createShippoTransaction(shippingMethodID));
        console.log('thanks for waiting');
        console.log(this.state.shippoTransaction);
        console.log(this.state.cart);
        //get the id of the shippoTransaction as well as specific bits of the cart and pass them into checkoutBT, which we can then parlay into 
        //passing that as pastPurchases
            this.props.dispatch(checkoutBT(cart, nonce, totalCost, countryNameShipping, countryNameBilling, emailShipping, emailBilling, extendedStreetShipping, extendedStreetBilling,firstNameShipping,firstNameBilling,lastNameShipping,lastNameBilling,id,localityBilling, localityShipping,phoneShipping,phoneBilling,postalCodeShipping,postalCodeBilling,regionShipping,regionBilling, streetNameShipping, streetNameBilling, firstNameCustomer, lastNameCustomer, emailCustomer, phoneCustomer, itemCost, shippingMethodCost, serviceFees, shippingMethodID));
        

    }


 
    render() {
        console.log(this.props);
    	console.log(this.state);
        let token = localStorage.getItem('braintreeToken');
        if (!token) {
            return (
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        } else {
            return (
                <div>
                    <DropIn
                        options={{ authorization: token }}
                        onInstance={instance => (this.instance = instance)}
                    />
                    <button onClick={this.buy.bind(this)}>Buy</button>
                </div>
            );
        }
    }

}

const mapStateToProps = state => ({
    clientToken : state.app.user.btToken,
    cart: state.app.user.cart
});

export default connect(mapStateToProps)(Buy);