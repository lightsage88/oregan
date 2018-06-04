import React from 'react';
import {connect} from 'react-redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { Button, Fade, Table, Form, FormGroup, Label, Input, FormText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {activateBT, parcelDetailsToShippo} from '../actions/index';
import DropIn from 'braintree-web-drop-in-react';
import Buy from './buy';
import Thanks from './thanks';
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
            streetNameShipping:'',
            streetNameShipping2: '',
            shippingMethodCost: '',
            shippingMethodID: '',
            serviceFees: '',
            itemCost: '',
            shippingID: '',
            fadeIn: false,
            fadeIn2: false,
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
        console.log(e);
        let shippingMethodID = e.target.getAttribute('shippingid');
        console.log(shippingMethodID);
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
            serviceFees: serviceFees,
            shippingMethodID: shippingMethodID,
            fadeIn2: true
        });
        console.log(this.state);

    }

    // resolution(){
    //     console.log('resolution running...')
    //     console.log(this.props);
    //     render(){
    //     return (
    //         <Thanks shippo={this.props.shippoTransaction}
    //         bT={this.props.btTransaction}/>
    //     );
    //   }
    // }


    render(){
        console.log(this.state);
        console.log(this.props);
        //if this.props.shippoTransaction.status == "SUCCESS"
        //&& this.props.btTransaction.success == true
        //run a function that will send us to a new page
        if( (this.props.shippoTransaction !== undefined) &&
            (this.props.shippoTransaction.status == "SUCCESS") &&
            (this.props.btTransaction !== undefined) && 
            (this.props.btTransaction.success == true) ) {
            return (<Thanks shippo={this.props.shippoTransaction}
            bT={this.props.btTransaction}/>);
        }


        let options = this.state.shippingOptions;
        let shippingChoices = undefined;
        if(options !== undefined) {
            shippingChoices = options.map((item, index)=> {
            let shippingMethodID = item.object_id;
            console.log(shippingMethodID);
          return (<div key={index}>
{/*                < details={item} pageType={this.state.pageType}/>
*/}
                <FormGroup check>
                    <Label check>
                        <Input onChange={(e)=>this.pickShippingMethod(e)} type='radio' name='radio1' shippingid={item.object_id} value={item.amount} />
                       ${item.amount} - Estimated Delivery Time: {item.estimated_days} Days - Provider: {item.provider}
                    </Label>
                </FormGroup>
            </div>
        );
    });

         


  }
        
        return(

            <div className='checkoutMain'>



                <Form>
                <section className='billingSection'>
                    <h3>Billing Address</h3>
                    <FormGroup>
                        <Label for='firstNameBilling'>First Name</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='text' name='firstNameBilling' id='firstNameBilling'
                        placeholder='First Name'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='lastNameBilling'>Last Name</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='text' name='lastNameBilling' id='lastNameBilling'
                        placeholder='Last Name'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='streetNameBilling'>Street</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='text' name='streetNameBilling' id='streetNameBilling'
                        placeholder='Street'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='streetNameBilling2'>Street (cont.)</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='text' name='streetNameBilling2' id='streetNameBilling2'
                        placeholder='Street Ext.'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='cityBilling'>City</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='text' name='cityBilling' id='cityBilling'
                        placeholder='City'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='state/province/regionBilling'>State/Province/Region</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='text' name='sprBilling' id='state/province/regionBilling'
                        placeholder='State/Province/Region'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='zip'>Zipcode</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='text' name='zipBilling' id='zipBilling' placeholder='ZIPCODE'/>
                    </FormGroup>
                    <FormGroup>
                        <Label for='countryBilling'>Country</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='select' name='countryBilling' id='countryBilling'>
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
                        <Input onChange={(e)=>this.onChange(e)} type='tel' name='phoneBilling' id='phoneBilling'/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input required onChange={(e)=>this.onChange(e)} type='email' name='emailBilling' id='emailBilling'/>
                    </FormGroup>
                </section>

                <section className='shippingSection'>
                    <h3>Shipping Address</h3>

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
                        <Label for='streetNameShipping2'>Street (cont.)</Label>
                        <Input onChange={(e)=>this.onChange(e)} type='text' name='streetNameShipping2' id='streetNameShipping2'
                        placeholder='Street Ext.'/>
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
                        <Input onChange={(e)=>this.onChange(e)} type='text' name='zipShipping' id='zipShipping' placeholder='ZIPCODE'/>
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
                    {(this.state.firstNameBilling) &&
                    (this.state.lastNameBilling) &&
                    (this.state.streetNameBilling) &&
                    (this.state.cityBilling) &&
                    (this.state.sprBilling) &&
                    (this.state.zipBilling) &&
                    (this.state.countryBilling) &&
                    (this.state.emailBilling) &&
                    (this.state.firstNameShipping) &&
                    (this.state.lastNameShipping) &&
                    (this.state.streetNameShipping) &&
                    (this.state.cityShipping) &&
                    (this.state.sprShipping) &&
                    (this.state.zipShipping) &&
                    (this.state.countryShipping) ?
                      <Button color='warning' onClick={(e)=>this.onSubmit(e)}>Estimate Shipping</Button>
                      :
                    <div>
                      <Button disabled onClick={(e)=>this.onSubmit(e)}>Estimate Shipping</Button>
                      <aside>You're missing something in the form!</aside>
                    </div>
                    }
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
                </section>
                </Form>
                                <Fade in={this.state.fadeIn2} tag='h3' className='mt-3'>
                                    <Buy totalCost={this.state.totalCost} 
                                         shippingMethod={this.state.shippingMethodID}
                                         //User Account/Customer Props//

                                         id={localStorage.getItem('_id')}
                                         firstNameCustomer={localStorage.getItem('firstName')}
                                         lastNameCustomer={localStorage.getItem('lastName')}
                                         emailCustomer={localStorage.getItem('emailAddress')}
                                         phoneCustomer={localStorage.getItem('cellNumber')}

                                         //Billing Props//
                                         firstNameBilling={this.state.firstNameBilling}
                                         lastNameBilling={this.state.lastNameBilling}
                                         streetNameBilling={this.state.streetNameBilling}
                                         extendedStreetBilling={this.state.streetNameBilling2}
                                         localityBilling={this.state.cityBilling}
                                         regionBilling={this.state.sprBilling}
                                         postalCodeBilling={this.state.zipBilling}
                                         countryNameBilling={this.state.countryBilling}
                                         emailBilling={this.state.emailBilling}
                                         phoneBilling={this.state.phoneBilling}
                                         //Shipping Props//
                                         firstNameShipping={this.state.firstNameShipping}
                                         lastNameShipping={this.state.lastNameShipping}
                                         streetNameShipping={this.state.streetNameShipping}
                                         extendedStreetShipping={this.state.streetNameShipping2}
                                         localityShipping={this.state.cityShipping}
                                         regionShipping={this.state.sprShipping}
                                         postalCodeShipping={this.state.zipShipping}
                                         countryNameShipping={this.state.countryShipping}
                                         emailShipping={this.state.emailShipping}
                                         phoneShipping={this.state.phoneShipping}
                                         //Custom Field Props//
                                         itemCost={this.state.itemCost}
                                         serviceFees={this.state.serviceFees}
                                         shippingMethodCost={this.state.shippingMethodCost}
                                         


                                    />
                                </Fade>

                

                
                

                
            </div>

            );
    }

}


const mapStateToProps = state => ({
    shippingOptions: state.app.shippingOptions,
    btTransaction: state.app.user.btTransaction,
    shippoTransaction: state.app.user.shippoTransaction
});

export default connect(mapStateToProps)(Checkout);
