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

	// async componentDidMount(){
	// 	this.props.dispatch(activateBT());
	// }

	// async buy() {
	// 	const {nonce} = await this.instance.requestPaymentMethod();
	// 	await fetch(`http://localhost:8080/api/checkout`)	
	// }

	componentWillReceiveProps(nextProps){
		
		let currentCart = nextProps.currentCart;
		let clientToken = nextProps.clientToken;
		this.setState({
			currentCart: currentCart,
			clientToken: clientToken

		});
	}



	componentDidUpdate(){
		console.log(this.state);
		let parcelWeightKg=0;
		let parcelHeight=0;
		let parcelLength=0;
		let parcelWidth=0;
		let currentCart = this.state.currentCart;
		console.log(currentCart);
		currentCart.forEach(function(item){
			console.log(item.productWeightKg);
			console.log(parcelWeightKg);
			parcelWeightKg +=item.productWeightKg;
			console.log(parcelWeightKg);
			
		});
		console.log(this.state);

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

// const mapStateToProps = state => ({
// 	clientToken: state.app.user.btToken
// });

export default connect()(Cart);