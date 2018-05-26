import React from 'react';
import {connect} from 'react-redux';
import { Button, Fade, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {activateBT, parcelDetailsToShippo} from '../actions/index';
import DropIn from 'braintree-web-drop-in-react';
import Buy from './buy';
import './checkout.css';
export class Checkout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstNameShipping:'',
            lastNameShipping:'',
            cityShipping: '',
            sprShipping:'',
            zipShipping: '',
            phoneShipping: '',
            emailShipping: '',
            countryShipping:'',
            widthShipping: '',
            heightShipping: '',
            lengthShipping: '',
            weightShipping: '',
            fadeIn: false
          }
       
    }

    componentDidMount(){
        console.log('component mounting!');
        console.log(this.props);
    }

    componentWillReceiveProps(nextProps){
        console.log('componentWillReceiveProps running...');
        let currentCart = nextProps.currentCart;
        let clientToken = nextProps.clientToken;
        this.setState({
            currentCart: currentCart,
            clientToken: clientToken
        });
        let parcelWeightKg=0;
        let parcelHeight=0;
        let parcelLength=0;
        let parcelWidth=0;
        let quantity = 0;
        let heightArray = [];
        let lengthArray = [];
        let weightArray = [];
        currentCart.forEach(function(item){
            heightArray.push(item.productHeightInches);
            lengthArray.push(item.productLengthInches);
            weightArray.push(Number((item.productWeightKg * item.quantityOrdered).toFixed(2)));
            parcelWidth +=item.productWidthInches;
            parcelWeightKg = item.productWeightKg;

            quantity = item.quantityOrdered;
        });

        let goalWeight = weightArray.reduce((accumulator, currentValue)=>{
                return accumulator + currentValue;}, 0);
        this.setState({
            weightShipping: Number(goalWeight.toFixed(2)),
            heightShipping: Math.max(...heightArray),
            lengthShipping: Math.max(...lengthArray),
            widthShipping: parcelWidth
        });
        //need to get the highest of all singular lengths, heights, and the sum of all widths...not sum of ALL categories
        console.log(nextProps);
        let shippingOptions = nextProps.shippingOptions;
        if(shippingOptions.length !== 0 ) {
            console.log('bingo');
            console.log(shippingOptions);
            this.setState({
                shippingOptions: shippingOptions
            });
        }
        console.log(this.state);
    }

    async onSubmit(e) {
        e.preventDefault();
        console.log('onSubmit running.');
        console.log(this.state);
        let parcelDetails = this.state;
        this.props.dispatch(parcelDetailsToShippo(parcelDetails));
    }

    onChange(e){
        
        let infoPart = e.target.name;
        let value = e.target.value;
        console.log(infoPart);
        this.setState({
            [e.target.name]: value
        });
    }

    


    render(){
        console.log(this.state);
            console.log(this.props);
        return(

            <div className='checkoutMain'>
                <h3>Shipping Address</h3>
                <Form>
                    <FormGroup>
                        <Label for='firstNameShipping'>First Name</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='text' name='firstNameShipping' id='firstNameShipping'
                        placeholder='First Name'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='lastNameShipping'>Last Name</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='text' name='lastNameShipping' id='lastNameShipping'
                        placeholder='Last Name'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='streetNameShipping'>Street</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='text' name='streetNameShipping' id='streetNameShipping'
                        placeholder='Street'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='cityShipping'>City</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='text' name='cityShipping' id='cityShipping'
                        placeholder='City'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='state/province/regionShipping'>State/Province/Region</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='text' name='sprShipping' id='state/province/regionShipping'
                        placeholder='State/Province/Region'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='zip'>Zipcode</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='text' name='zipShipping' id='zip' placeholder='ZIPCODE'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='countryShipping'>Country</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='text' name='countryShipping' id='countryShipping'
                        placeholder='Country'/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Phone</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='tel' name='phoneShipping' id='phoneShipping'/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='email' name='emailShipping' id='emailShipping'/>
                    </FormGroup>

                    <Button onClick={(e)=>this.onSubmit(e)}>Estimate Shipping</Button>
                </Form>
                <Buy/>
                
            </div>

            );
    }

}


const mapStateToProps = state => ({
    shippingOptions: state.app.shippingOptions
});

export default connect(mapStateToProps)(Checkout);
