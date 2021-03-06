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
import './productCard.css';
// import {putItemInCart2} from '../actions/index';
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
//need to make sure that dimensions and weight are included for each thing...across all reducers
//and across all actions that deal with managing products. We are going to have to add up the inches
//and give a little padding so that we can enter that info on the front end of the checkout thing so that
//we can make a parcel with the right shipping label,
		}
	}

	componentWillMount(){
		console.log('cwm running');
		if(localStorage.getItem('unknownUser')){
			let cart = localStorage.getItem('cart');
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

	addToBasket(e){
		console.log(localStorage)
		e.preventDefault();
		console.log('trying to see something about the dimensions');
		console.log(this.props.details);
		console.log(this.props.currentCart);
		
		
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

	addToCart(e){
		console.log(localStorage)
		e.preventDefault();
		console.log('trying to see something about the dimensions');
		console.log(this.props.details);
		console.log(this.props.currentCart);
		
		
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
    clickProduct(e){
        console.log('running clickProduct');
        console.log(e);
    }


	render(){
        
		
		return (
		<div onClick={(e)=>this.clickProduct(e)} className='productCardMain'>
			<Card className='cardInit'>
				<CardBody className='cardBody'>
					<CardTitle>{this.props.details.productName}</CardTitle>
					<CardSubtitle>{this.props.details.companyName}</CardSubtitle>

					{this.props.details.images ?
					<CardImg className='pC-primaryImage' src={this.props.details.images[0]}/>
					: null}

					<ul>
							<li>COST: <span>{this.props.details.productPrice}</span></li>
							
						</ul>
					
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