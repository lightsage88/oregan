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
			modal: false
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
		console.log(this.props);
		console.log(nextProps);
	
		console.log(nextProps.currentCart);
		let currentCart = nextProps.currentCart;
		let clientToken = nextProps.clientToken;
		this.setState({
			currentCart: currentCart,
			clientToken: clientToken

		});
		console.log(this.state);
	}


	

	render(){
		console.log(this.state);
		console.log(this.props);
		// let clientToken = this.state.clientToken;
		let currentCart = this.state.currentCart;
		const inventory = Object.values(currentCart);
		const items = inventory.map((item,index)=>
			<div key={index}>
				<CartItem details={item}/>
			</div>
			);
		return (
			<div className='cartMain'>
				<Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
									{/*<DropIn options={{authorization: {clientToken}}}
											onInstance={instance=>(this.instance= instance)}
									/>*/}
									<ModalHeader toggle={this.toggle}>Checkout</ModalHeader>
									<ModalBody>
									<Checkout/>
									</ModalBody>
									<ModalFooter>
										<Button>Hi</Button>
										<Button>Goodbye</Button>
									</ModalFooter>

				</Modal>
				<h3 className='sectionBrand'>Cart</h3>
				<Button color='primary' onClick={this.toggle}>Checkout</Button>
				{items}
			</div>
			);
	}
}

// const mapStateToProps = state => ({
// 	clientToken: state.app.user.btToken
// });

export default connect()(Cart);