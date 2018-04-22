import React from 'react';
import {Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardLink, Button} from 'reactstrap';

export default function ProductCard(props){
	

	console.log('help me obiwan');
	console.log(props);
		return (
		<div>
			<Card>
				<CardBody>
					<CardTitle>{props.details.productName}</CardTitle>
					<CardSubtitle>{props.details.companyName}</CardSubtitle>
					<CardImg src='../staticAssets/shoppingCard.png'/>
					<CardText>
						{props.details.productDescription}
						<ul>
							<li>COST: <span>{props.details.productPrice}</span></li>
							<li>SHIPPING: <span>{props.details.shippingPrice}</span></li>
							<li>STOCK: <span>{props.details.productStock}</span></li>
						</ul>
					</CardText>
					<Button>add to cart</Button>
				</CardBody>
			</Card>
		</div>
	);
}


// export default class ProductCard extends React.Component {
// 	constructor(props) {
// 		super(props);
// 	}


// 	render() {

// 	console.log('help me obiwan');
// 	console.log(this.props);
// 		return (
// 		<div>
// 			<Card>
// 				<CardBody>
// 					<CardTitle>Title of the product ${this.props.productName}</CardTitle>
// 					<CardSubtitle>name of the product's company</CardSubtitle>
// 					<CardImg src='../staticAssets/shoppingCard.png'/>
// 					<CardText>
// 						product description
// 						<span>productPrice</span>
// 						<span>shippingPrice</span>
// 						<span>productStock</span>
// 					</CardText>
// 					<Button>add to cart</Button>
// 				</CardBody>
// 			</Card>
// 		</div>
// 		);
// 	}
// }