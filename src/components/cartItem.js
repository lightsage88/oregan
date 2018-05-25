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

// import {putItemInCart2} from '../actions/index';
import {putItemInCart1} from '../actions/index';
export class CartItem extends React.Component{
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
			dateToCart: '',
			quantityUnavailable: false,
			parcelWeight: '',
			parcelHeight: '',
			parcelLength: '',
			parcelWidth:''

		}
	}

	componentDidMount(){
		console.log(this.props);
		this.setState({
			companyName: this.props.details.companyName,
			dateToCart: this.props.details.dateToCart,
			id:this.props.details.id,
			productDescription:this.props.details.productDescription,
			productName:this.props.details.productName,
			productPrice:this.props.details.productPrice*parseInt(this.props.details.quantityOrdered),
			productRating:this.props.details.productRating,
			productStock:this.props.details.productStock,
			productType:this.props.details.productType,
			quantityOrdered:parseInt(this.props.details.quantityOrdered),
			shippingPrice:this.props.details.shippingPrice


		})
	}

	onChange(e){
		console.log('onchange running...');
		console.log(this.props.details);
		let quantityOrdered = parseInt(e.target.value);
		let productPrice = this.props.details.productPrice * quantityOrdered;
		this.setState({
			quantityOrdered : quantityOrdered,
			companyName: this.props.details.companyName,
			id: this.props.details.id,
			productDescription: this.props.details.productDescription,
			productName: this.props.details.productName,
			productPrice: productPrice,
			shippingPrice: this.props.details.shippingPrice,
			productRating: this.props.details.productRating,
			productStock: this.props.details.productStock,
			productType: this.props.details.productType
		});
		if(e.target.value > this.props.details.productStock) {
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
		let productWeightKg = this.props.details.productWeightKg;
		let productWidthInches = this.props.details.productWidthInches;
		let productHeightInches = this.props.details.productHeightInches;
		let productLengthInches = this.props.details.productLengthInches;


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
			productType,
			productWeightKg: productWeightKg,
			productWidthInches: productWidthInches,
			productHeightInches: productHeightInches,
			productLengthInches: productLengthInches
		};

		
		if(cart.length === 0){
			cart.push(item)
		}


	if(cart.length > 0) {
		for(let i = 0; i<=cart.length-1; i++){
			console.log('cycling thru, we dont play');
			if(cart[i].id === item.id) {
				
				cart.splice(i, 1);
			}
		}
		cart.push(item);
		
	} else {
		cart.push(item);

	}
		

	// this.props.dispatch(putItemInCart1(cart, cartLength, pageType, userid, quantityOrdered, companyName, id, productDescription,productName,productPrice, shippingPrice, productRating, productStock, productType));
	this.props.dispatch(putItemInCart1(cart, userid, pageType));		

}

removeFromCart(e){
	console.log('removeFromCart running...');
	e.preventDefault();
	let id = this.props.details.id;
	let userid = localStorage.getItem('_id');
	let cart = this.props.currentCart;
	for(let i=0; i<cart.length; i++){
		if(cart[i].id===id) {
			console.log('chopchop');
			cart.splice(i,1);
		}
	}
	this.props.dispatch(putItemInCart1(cart,userid));
}


	render(){
	
	let costNumber = this.props.details.productPrice;
		let quantity = this.props.details.quantityOrdered;
		
		let combinedCost = costNumber*quantity;
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
							<li>COST: <span>${Math.round(this.state.productPrice*100)/100}</span></li>
						
						</ul>
					<Form>
						<FormGroup>
						<Label for='quantity'>Qty: </Label>
						<Input onChange={(e)=>this.onChange(e)} id='quantity' name='quantity' placeholder={this.props.details.quantityOrdered} min=
						'1' max={this.props.details.productStock} type='number'></Input>
						
						</FormGroup>
						{
						!this.state.quantityUnavailable ? 
						(<Button onClick={(e)=>this.addToCart(e)}>edit quantity</Button>)
						:
						(<Button disabled>unavailable</Button>)
						}
						<Button color='danger' onClick={(e)=>this.removeFromCart(e)}>remove item</Button>
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
export default connect(mapStateToProps)(CartItem);