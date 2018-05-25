import React from 'react';
import {connect} from 'react-redux';
import CartItem from './cartItem';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {activateBT} from '../actions/index';
import DropIn from 'braintree-web-drop-in-react';
import Checkout from './checkout';
import './cart.css';

export class Cart extends React.Component {

	constructor(props){ 

		super(props);
		let instance;
		this.state = {
			currentCart: '',
			modal: false,
			parcelWeight: '',
			parcelHeight: '',
			parcelLength: '',
			parcelWidth:''
		};
		this.toggle = this.toggle.bind(this);
	}

	toggle(){
		this.setState({
			modal: !this.state.modal
		});
	}


	componentWillReceiveProps(nextProps){
		
		let currentCart = nextProps.currentCart;
		let clientToken = nextProps.clientToken;
		this.setState({
			currentCart: currentCart,
			clientToken: clientToken

		});


//simple just multply line 69 by quantity ;)

		let parcelWeightKg=0;
		let parcelHeight=0;
		let parcelLength=0;
		let parcelWidth=0;
		let quantity = 0;
		console.log(quantity);
		let heightArray = [];
		let lengthArray = [];
		console.log(currentCart);
		currentCart.forEach(function(item){
			console.log(item.productWeightKg);
			console.log(parcelHeight);
			// parcelWeightKg +=item.productWeightKg;
			// parcelHeight +=item.productHeightInches;
			// parcelLength +=item.productLengthInches;
			heightArray.push(item.productHeightInches);
			lengthArray.push(item.productLengthInches);
			parcelWidth +=item.productWidthInches;
			parcelWeightKg = item.productWeightKg;
			console.log(heightArray);
			console.log(lengthArray);
			quantity = item.quantityOrdered;
		});
		console.log(quantity);
		this.setState({
			parcelWeight: (parcelWeightKg * quantity).toFixed(2),
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
				<Button color='primary' onClick={this.toggle}><a href='/checkout'>Checkout</a></Button>
				{items}
			</div>
			);
	}
}


export default connect()(Cart);