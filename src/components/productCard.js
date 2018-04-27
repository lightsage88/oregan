import React from 'react';
import {Card, 
	CardImg, 
	CardText, 
	CardBody,
  CardTitle, 
  CardSubtitle, 
  CardLink, 
  Button,
Form,
FormGroup,
Label,
Input} from 'reactstrap';

import {connect} from 'react-redux';
import {retrieveProducts} from '../actions/index';

import {putItemInCart2} from '../actions/index';
import {putItemInCart1} from '../actions/index';
export class ProductCard extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			quantityOrdered: 0,
			companyName: '',
			productName: '',
			productDescription: '',
			productRating: '',
			productPrice: '',
			shippingPrice:'',
			productStock:'',
			productType: '',
			id: '',
			quantityUnavailable: false

		}
	}

	onChange(e){
		console.log('onChange running');
		console.log(e.target.value);
		this.setState({
			quantityOrdered : e.target.value,
			companyName: this.props.details.companyName,
			id: this.props.details.id,
			productDescription: this.props.details.productDescription,
			productName: this.props.details.productName,
			productPrice: this.props.details.productPrice,
			shippingPrice: this.props.details.shippingPrice,
			productRating: this.props.details.productRating,
			productStock: this.props.details.productStock,
			productType: this.props.details.productType
		});
		if(e.target.value > this.props.details.productStock) {
			console.log('too much, hooman');
			this.setState({
				quantityUnavailable: true
			});
		} else {
			this.setState({
				quantityUnavailable: false
			});
		}

	}

	addToCart(e){
		e.preventDefault();
		let cart = this.props.currentCart;

		let dateToCart = new Date;
		let cartLength = cart.length;
		let pageType = this.props.pageType;
		let userid= localStorage.getItem('_id');
		let quantityOrdered = this.state.quantityOrdered;
		let companyName = this.props.details.companyName;
		let id = this.props.details.id;
		let productDescription= this.props.details.productDescription;
		let productName= this.props.details.productName;
		let productPrice= this.props.details.productPrice;
		let shippingPrice= this.props.details.shippingPrice;
		let productRating= this.props.details.productRating;
		let productStock= this.props.details.productStock;
		let productType= this.props.details.productType;

		let item = {quantityOrdered,
			dateToCart, 
			companyName,
			id,
			productDescription,
			productName,
			productPrice,
			shippingPrice,
			productRating,
			productStock,
			productType
		};

		console.log(cart);
		console.log(item);
		if(cart.length === 0){
			cart.push(item)
		}


	if(cart.length > 0) {
		for(let i = 0; i<=cart.length-1; i++){
			console.log('cycling thru, we dont play');
			if(cart[i].id === item.id) {
				console.log(cart[i]);
				console.log(item);	
				cart.splice(i, 1);
				console.log(cart);			
			}
		}
		cart.push(item);
		console.log('newcart?');
		console.log(cart);
	} else {
		console.log('NEWB');
		cart.push(item);
		console.log(cart);

	}
		

	// this.props.dispatch(putItemInCart1(cart, cartLength, pageType, userid, quantityOrdered, companyName, id, productDescription,productName,productPrice, shippingPrice, productRating, productStock, productType));
	this.props.dispatch(putItemInCart1(cart, userid, pageType));		

}


	render(){
		// let quantityChoice = this.state.quantityOrdered;
		// let productInfo = this.state.product;
		// console.log(quantityChoice);
		return (
		<div>
			<Card>
				<CardBody>
					<CardTitle>{this.props.details.productName}</CardTitle>
					<CardSubtitle>{this.props.details.companyName}</CardSubtitle>
					<CardImg src='../staticAssets/shoppingCard.png'/>
					<CardText>
						{this.props.details.productDescription}
					</CardText>
					<ul>
							<li>COST: <span>{this.props.details.productPrice}</span></li>
							<li>SHIPPING: <span>{this.props.details.shippingPrice}</span></li>
							<li>STOCK: <span>{this.props.details.productStock}</span></li>
						</ul>
					<Form>
						<FormGroup>
						<Label for='quantity'>Qty: </Label>
						<Input onChange={(e)=>this.onChange(e)} id='quantity' name='quantity' placeholder='1' min=
						'1' max={this.props.details.productStock} type='number'></Input>
						
						</FormGroup>
						{
						!this.state.quantityUnavailable ? 
						(<Button onClick={(e)=>this.addToCart(e)}>add to cart</Button>)
						:
						(<Button disabled>unavailable</Button>)
						}
					</Form>
				</CardBody>
			</Card>
		</div>
	);
 }
}

const mapStateToProps = state => ({
	currentCart : state.app.user.cart
});
export default connect(mapStateToProps)(ProductCard);