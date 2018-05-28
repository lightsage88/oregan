import React from 'react';
import {connect} from 'react-redux';
import { Button, Fade, Table, Form, FormGroup, Label, Input, FormText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
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
            shippingMethodCost: '',
            serviceFees: '',
            itemCost: '',
            fadeIn: false,
            dropdownOpen: false
          }
       
    }

    
    componentWillReceiveProps(nextProps){
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
        let itemPrice = 0;
        let heightArray = [];
        let lengthArray = [];
        let weightArray = [];
        currentCart.forEach(function(item){
            heightArray.push(item.productHeightInches);
            lengthArray.push(item.productLengthInches);
            weightArray.push(Number((item.productWeightKg * item.quantityOrdered).toFixed(2)));
            parcelWidth +=item.productWidthInches;
            parcelWeightKg = item.productWeightKg;
            itemPrice += item.productPrice * item.quantityOrdered;
            quantity = item.quantityOrdered;
        });
        console.log(itemPrice.toFixed(2));
        let goalWeight = weightArray.reduce((accumulator, currentValue)=>{
                return accumulator + currentValue;}, 0);
        
        this.setState({
            weightShipping: Number(goalWeight.toFixed(2)),
            heightShipping: Math.max(...heightArray),
            lengthShipping: Math.max(...lengthArray),
            widthShipping: parcelWidth,
            itemCost: Number(itemPrice.toFixed(2))

        });
        //need to get the highest of all singular lengths, heights, and the sum of all widths...not sum of ALL categories
        let shippingOptions = nextProps.shippingOptions;
        if(shippingOptions.length !== 0 ) {
            
            this.setState({
                shippingOptions: shippingOptions,
                fadeIn: true
            });
        }
    }

    async onSubmit(e) {
        e.preventDefault();
        
        let parcelDetails = this.state;
        this.props.dispatch(parcelDetailsToShippo(parcelDetails));
    }

    onChange(e){
        console.log(e);
        console.log(e.target);
        console.log(e.target.value);
        let infoPart = e.target.name;
        let value = e.target.value;
        this.setState({
            [e.target.name]: value
        });
    }

    
 //         <FormGroup check>
 //            <Label check>
 //              <Input type="radio" name="radio1" />{' '}
 //              Option one is this and that—be sure to include why it's great
 //            </Label>
 //          </FormGroup>
    pickShippingMethod(e){
        this.setState({
            shippingMethodCost: 0,
            serviceFees:0
        });
        let serviceFees;
        let shippingMethodCost = Number(e.target.value);
        serviceFees = Number(((Number(e.target.value) + this.state.itemCost) * 0.029) + 1.00).toFixed(2);
        console.log(serviceFees);
        this.setState({
            shippingMethodCost: shippingMethodCost,
            totalCost: (this.state.itemCost + shippingMethodCost + Number(serviceFees)).toFixed(2),
            serviceFees: serviceFees 
        });
        console.log(this.state);

    }



    render(){
        console.log(this.state);
        

        let options = this.state.shippingOptions;
        let shippingChoices = undefined;
        if(options !== undefined) {
            shippingChoices = options.map((item, index)=>
            <div key={index}>
{/*                < details={item} pageType={this.state.pageType}/>
*/}
                <FormGroup check>
                    <Label check>
                        <Input onChange={(e)=>this.pickShippingMethod(e)} type='radio' name='radio1' value={item.amount} />
                       ${item.amount} - Estimated Delivery Time: {item.estimated_days} Days - Provider: {item.provider}
                    </Label>
                </FormGroup>
            </div>
        );


        }
        
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
                        <Input onChange={(e)=>this.onChange(e)} type='select' name='countryShipping' id='countryShipping'>
                            <option value=''>SELECT COUNTRY</option>
                            <option value='AR'>Argentina</option>
                            <option value='CA'>Canada</option>
                            <option value='CN'>China</option>
                            <option value='ID'>Indonesia</option>
                            <option value='JP'>Japan</option>
                            <option value='JM'>Jamaica</option>
                            <option value='MX'>Mexico</option>
                            <option value='MM'>Myanmar</option>    
                            <option value='SP'>Spain</option>
                            <option value='KR'>South Korea</option>    
                            <option value='TW'>Taiwan</option>    
                            <option value='TH'>Thailand</option>                
                            <option value='US'>United States of America</option>
                            <option value='VN'>Vietnam</option>
                        </Input>
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
                

                <Fade in={this.state.fadeIn} tag='h3' className='mt-3'>
                        Hello, hooman
                        <Form>
                            <FormGroup tag='fieldset'><legend>Shipping Option</legend>
                            {(shippingChoices) ? shippingChoices : null}

                            </FormGroup>
                        </Form>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Item Cost</th>
                                    <th>Shipping Cost</th>
                                    <th>Service Fees</th>
                                    <th>Total Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    
                                    <td>{this.state.itemCost}</td>

                                    <td>{this.state.shippingMethodCost}</td>
                                    <td>{this.state.serviceFees}</td>
                                    <td>{this.state.totalCost}</td>
                                </tr>
                            </tbody>    
                        </Table>


                </Fade>
                

                <Buy totalCost={this.state.totalCost} shippingMethod={}/>
                
            </div>

            );
    }

}


const mapStateToProps = state => ({
    shippingOptions: state.app.shippingOptions
});

export default connect(mapStateToProps)(Checkout);
