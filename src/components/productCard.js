import React from 'react';
import {Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, CardLink, Button} from 'reactstrap';

export default function ProductCard(props) {
	

	return (
		<div>
			<Card>
				<CardBody>
					<CardTitle>Title of the product</CardTitle>
					<CardSubtitle>name of the product's company</CardSubtitle>
					<CardImg src='../staticAssets/shoppingCard.png'/>
					<CardText>
						product description
						<span>productPrice</span>
						<span>shippingPrice</span>
						<span>productStock</span>
					</CardText>
					<Button>add to cart</Button>
				</CardBody>
			</Card>
		</div>
		);
}