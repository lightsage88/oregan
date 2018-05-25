import React from 'react';
import {connect} from 'react-redux';
import CartItem from './cartItem';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import DropIn from 'braintree-web-drop-in-react';
import {propsToCheckout, activateBT, parcelDetailsToShippo} from '../actions/index';
import Checkout from './checkout';
import './cart.css';

export class Cart extends React.Component {

	constructor(props){ 

		super(props);
		let instance;
		this.state = {
			currentCart: '',
			parcelWeight: '',
			parcelHeight: '',
			parcelLength: '',
			parcelWidth:''
		};
	}

	sendToCheckout(e){
		console.log('sendToCheckout Running');
		// this.props.dispatch(parcelDetailsToShippo(this.state));
		this.props.dispatch(propsToCheckout(this.state));

	}


	componentWillReceiveProps(nextProps){
		
		let currentCart = nextProps.currentCart;
		let clientToken = nextProps.clientToken;
		this.setState({
			currentCart: currentCart,
			clientToken: clientToken
		});
		let parcelWeightKg=0;
		let parcelHeight=0;
		let parcelLength=0;
		let parcelWidth=0;
		let quantity = 0;
		let heightArray = [];
		let lengthArray = [];
		let weightArray = [];
		currentCart.forEach(function(item){
			heightArray.push(item.productHeightInches);
			lengthArray.push(item.productLengthInches);
			weightArray.push(Number((item.productWeightKg * item.quantityOrdered).toFixed(2)));
			parcelWidth +=item.productWidthInches;
			parcelWeightKg = item.productWeightKg;

			quantity = item.quantityOrdered;
		});

		let goalWeight = weightArray.reduce((accumulator, currentValue)=>{
				return accumulator + currentValue;}, 0);
		this.setState({
			parcelWeight: Number(goalWeight.toFixed(2)),
			parcelHeight: Math.max(...heightArray),
			parcelLength: Math.max(...lengthArray),
			parcelWidth: parcelWidth
		});
		//need to get the highest of all singular lengths, heights, and the sum of all widths...not sum of ALL categories
	}

	render(){
		console.log(this.state);
		console.log(this.props);

		let currentCart = this.state.currentCart;
		const inventory = Object.values(currentCart);
		const items = inventory.map((item,index)=>
			<div key={index}>
				<CartItem details={item}/>
			</div>
			);
		return (
			<div className='cartMain'>

				<h3 className='sectionBrand'>Cart</h3>
				<Button color='primary' onClick={(e)=>this.sendToCheckout(e)}><a href='/checkout'>Checkout</a></Button>
				{items}
			</div>
			);
	}
}


export default connect()(Cart);