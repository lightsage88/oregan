import React from 'react';
import {connect} from 'react-redux';
import ProductCard from './productCard';
export default class Cart extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			carty:''
		}
	}
	

	render(){
		console.log(this.props);
		return (
			<div>
				<h3>Cart</h3>
			</div>
			);
	}
}
