import React from 'react';
//pagination from reactstrap
import ProductCard from './productCard';
import {retrieveProducts} from '../actions/index';
import {connect} from 'react-redux';

export class ProductList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search : false
		};
		// this.determineSearchType = this.determineSearchType.bind(this);
	}

	componentDidMount(){
		if(this.props.match.params.productId) {
			console.log(this.props);
					let pageType = this.props.match.params.productId;
					this.props.dispatch(retrieveProducts(pageType));
		} else {
			//do the searchType
		}
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



export default connect()(ProductList);