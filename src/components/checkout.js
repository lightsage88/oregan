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
       
    }

    onSubmit(values) {
        console.log(values);
    }


    render(){
        return(
            <div>
                <h3>Shipping Address</h3>
                <Form>
                    <FormGroup>
                        <Label for='firstNameShipping'>First Name</Label>
                        <Input type='text' name='firstNameShipping' id='firstNameShipping'
                        placeholder='First Name'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='lastNameShipping'>Last Name</Label>
                        <Input type='text' name='lastNameShipping' id='lastNameShipping'
                        placeholder='Last Name'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='streetNameShipping'>Street</Label>
                        <Input type='text' name='streetNameShipping' id='streetNameShipping'
                        placeholder='Street'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='cityShipping'>City</Label>
                        <Input type='text' name='cityShipping' id='cityShipping'
                        placeholder='City'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='state/province/regionShipping'>State/Province/Region</Label>
                        <Input type='text' name='state/province/regionShipping' id='state/province/regionShipping'
                        placeholder='State/Province/Region'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='countryShipping'>Country</Label>
                        <Input type='text' name='countryShipping' id='countryShipping'
                        placeholder='Country'/>
                    </FormGroup>


                </Form>
                <Buy/>
            </div>

            );
    }

}



