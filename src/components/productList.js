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

		//no matterwhat, eventually the redux shelf will be
		//populated and we will call faceItems()
		// this.faceItems(); Needs to be part of render()
	}

	render(){
		console.log(this.props);
		console.log('facingItems...');
		// const inventory = this.props.products;
		const inventory = Object.values(this.props.products);
		console.log(inventory);
		const items = inventory.map((item, index)=>
			<div key={index}>
				<ProductCard details={item}/>
			</div>
		);
		
		return(
		<div>
			<h3>Product List page, a dynamic entity, is under construction</h3>
				{items}
		</div>
		);
	}
}

const mapStateToProps = state => ({
	products : state.app.shelf
});


export default connect(mapStateToProps)(ProductList);