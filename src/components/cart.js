import React from 'react';
import {connect} from 'react-redux';
import CartItem from './cartItem';
import {Button} from 'reactstrap';
import './cart.css';
export default class Cart extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			currentCart: ''
		};
	}

	componentWillReceiveProps(nextProps){
		console.log(this.props);
		console.log(nextProps);
	
		console.log(nextProps.currentCart);
		let currentCart = nextProps.currentCart;
		this.setState({
			currentCart: currentCart
		});
		// return currentCart;
	}


	

	render(){
		console.log(this.state);
		let currentCart = this.state.currentCart;
		console.log(currentCart);
		const inventory = Object.values(currentCart);
		const items = inventory.map((item,index)=>
			<div key={index}>
				<CartItem details={item}/>
			</div>
			);
		return (
			<div className='cartMain'>
				<h3 className='sectionBrand'>Cart</h3>
				<Button color='primary'><a href='/checkout'>Checkout</a></Button>

				{items}
			</div>
			);
	}
}
