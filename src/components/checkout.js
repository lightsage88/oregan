import React from 'react';
import {connect} from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {activateBT} from '../actions/index';
import DropIn from 'braintree-web-drop-in-react';
import Buy from './buy';
import './checkout.css';
export default class Checkout extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            firstNameShipping:'',
            lastNameShipping:'',
            cityShipping: '',
            sprShipping:'',
            zipShipping: '',
            countryShipping:''
          }
       
    }

    onSubmit(e, values) {
        e.preventDefault();
        console.log('onSubmit running.');
        console.log(e.target);
        console.log(values);

    }

    onChange(e){
        console.log(e);
        console.log(e.target.name);
        console.log(e.target.value);
        let infoPart = e.target.name;
        let value = e.target.value;
        console.log(infoPart);
        this.setState({
            [e.target.name]: value
        });


    }


    render(){
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
                        <Input type='text' name='countryShipping' id='countryShipping'
                        placeholder='Country'/>
                    </FormGroup>

                    <Button onClick={(e, values)=>this.onSubmit(e, values)}>Submit</Button>
                </Form>
                <Buy/>
            </div>

            );
    }

}


const mapStateToProps = state => ({
    
})
