import React from 'react';
//pagination from reactstrap
import ProductCard from './productCard';
import {retrieveProducts} from '../actions/index';
import {connect} from 'react-redux';
import './productList.css';
export class ProductList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			search : false,
			pageType: this.props.match.params.productId
		};
		// this.determineSearchType = this.determineSearchType.bind(this);
	}

	componentDidMount(){
		if(this.props.match.params.productId) {
			console.log('you came to a section');
			console.log(this.props);
					
					let pageType= this.state.pageType;
					console.log(pageType);
					this.props.dispatch(retrieveProducts(pageType));
		} else {
			//do the searchType
		}

		//no matterwhat, eventually the redux shelf will be
		//populated and we will call faceItems()
		// this.faceItems(); Needs to be part of render()
	}

	render(){
		console.log(this.state);
		console.log(this.props);
		console.log('facingItems...');
		// const inventory = this.props.products;
		const specificType = (this.state.pageType).toUpperCase();
		console.log(specificType);
		const inventory = Object.values(this.props.products);
		console.log(inventory);
		const items = inventory.map((item, index)=>
			<div key={index}>
				<ProductCard details={item} pageType={this.state.pageType}/>
			</div>
		);
		
		return(
		<div className='productListContainer'>
			<h3 className='productListHeader'>PRODUCTS -- {specificType}</h3>
				{items}
		</div>
		);
	}
}

const mapStateToProps = state => ({
	products : state.app.shelf
});


export default connect(mapStateToProps)(ProductList);