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
			quantity: 0,
			product: ''
		}
	}

	onChange(e){
		console.log('onChange running');
		console.log(e.target.value);
		this.setState({
			quantity : e.target.value,
			product: this.props.details
		});
	}

	addToCart(e, quantityChoice, productInfo){
		e.preventDefault();
		console.log(this.props);
		console.log('addToCart running');
		console.log(quantityChoice);
		console.log(productInfo);
		//must dispatch an action that will populate the cart with our goods!
		let pageType = this.props.pageType;
		let item = [];
		item.push(quantityChoice);
		item.push(productInfo);
		console.log(item);
		let _id= localStorage.getItem('_id');
		this.props.dispatch(putItemInCart1(_id, item, pageType));
		// this.props.dispatch(retrieveProducts(pageType), 10);


				

	}


	render(){
		let quantityChoice = this.state.quantity;
		let productInfo = this.state.product;
		console.log(quantityChoice);
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

						<Button onClick={(e)=>this.addToCart(e, quantityChoice, productInfo)}>add to cart</Button>
					</Form>
				</CardBody>
			</Card>
		</div>
	);
 }
}


export default connect()(ProductCard);