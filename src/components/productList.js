import React from 'react';
//pagination from reactstrap
import ProductCard from './productCard';

export default class ProductList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search : false
		}
	}

	componentDidMount(){
		// this.addProductCards(); need a component that helps differentiate whether this is a search or a category find
		this.determineSearchType();
	}

	determineSearchType(){
		if(this.props.match.params.productId) {
			this.addProductCards();
		} else {
			//do the searchType
		}

	}

	addProductCards(){
		console.log('addProductCards running...');
		let pageType = this.props.match.params.productId;
		console.log(pageType);
		//dispatch an action to get the kinds of products you want in the reduxState
	}

	render(){
		console.log(this.props);
		return(
		<div>
			<h3>Product List page, a dynamic entity, is under construction</h3>
			<ProductCard productType={this.productType}/>
		</div>
		);
	}
}