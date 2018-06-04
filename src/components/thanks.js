import React from 'react';
import {connect} from 'react-redux';
import {emailAdmin, emailCustomer} from '../actions/index';

export class Thanks extends React.Component{
	constructor(props){
		super(props);

	}


// shippingChoices = options.map((item, index)=> {
//             let shippingMethodID = item.object_id;
//             console.log(shippingMethodID);
//           return (<div key={index}>
// {/*                < details={item} pageType={this.state.pageType}/>
// */}
//                 <FormGroup check>
//                     <Label check>
//                         <Input onChange={(e)=>this.pickShippingMethod(e)} type='radio' name='radio1' shippingid={item.object_id} value={item.amount} />
//                        ${item.amount} - Estimated Delivery Time: {item.estimated_days} Days - Provider: {item.provider}
//                     </Label>
//                 </FormGroup>
//             </div>
//         );
//     });

	componentDidMount(){
		console.log(this.props);
		let bT = this.props.bT;
		let shippo = this.props.shippo;
		this.emailCustomer(bT, shippo);
		this.emailAdmin(bT, shippo);

	}

	//need to create two email functions: one for the admin (me and chinh) and one for the customer.
	emailCustomer(bT, shippo){
		console.log('emailCustomer running...');
		console.log(bT);
		console.log(shippo);
		this.props.dispatch(emailCustomer(bT, shippo));

	}

	emailAdmin(bT, shippo){
		console.log('emailAdmin running...');
		console.log(bT);
		console.log(shippo);
		this.props.dispatch(emailAdmin(bT, shippo));


	}




	render(){
		console.log(this.props);
		let itemsBought = this.props.bT.customFields.shopperCart;
		let boughtItems = itemsBought.map((item,index)=>{
			let quantityOrdered = item.quantityOrdered;
			let companyName = item.companyName;
			let productName = item.productName;
			let productPrice = item.productPrice;
			console.log(productName);
			return (<div key={index}>
						<li>Quantity: {quantityOrdered} | Product: {companyName} {productName} | Price: {productPrice}</li>
					</div>);
		});

	return(

		<div>
			<h2>Thanks for your purchase!</h2>
			<p>Your order ID is: <strong>{this.props.bT.id}</strong></p>
			<p>Your shipping tracking number is: <strong>{this.props.shippo.tracking_number}</strong></p>

			<section>
				<h3>Thank you for your purchase of:</h3>
					<div>
						<ul>
							{boughtItems}
						</ul>
					</div>
			</section>
			<p>We sent an email with these details to <strong>{this.props.bT.customFields.billingEmail}</strong>.
			If you have any issues, please email us at <a href='mailto:rosecityshopperUSA@gmail.com?Subject=My%20order' target="_top">rosecityshopperUSA@gmail.com</a>

			</p>
		</div>
		);
	}
}

export default connect()(Thanks);

