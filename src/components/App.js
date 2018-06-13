import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Landing from './landing';
import NavBar from './navBar';
import About from './about';
import Register from './register';
import Account from './account';
import ProductList from './productList';
import Cart from './cart';
import Thanks from './thanks';
import Checkout from './checkout';
export class App extends Component {

//TODO:
//1. Establish an algorithm that will make sure that once we have an
//anonymous account we are locked into that. we can do this with the localStorage
//2. Make an action that will delete the new account while routing the purchase to the DB somewhere
//3. set up action patterns that will delete the guest account at the right time and will time it out to deletion in 30 minutes if left alone.

 render() {
    return (
      <Router> 
        <main>
          <NavBar/>
          <Route exact path='/' component={Landing} />
          <Route exact path='/about' component={About} />
          <Route exact path='/register' component={Register}/>
          <Route exact path='/account' component={Account}/>
          <Route path='/products/:productId' component={ProductList}/>
          <Route exact path='/cart' render={()=><Cart currentCart={this.props.currentCart}/>}/>
          <Route exact path='/checkout' component={Checkout}/>
          <Route exact path='/thanks' render={()=><Thanks btObject={this.props.btTransaction} shippoObject={this.props.shippoTransaction}/>}/>          
                <script src="https://js.braintreegateway.com/js/braintree-2.32.1.min.js"></script>

        </main>
      </Router>
    );
  }


  // App = connect()(Register);

}

// const mapStateToProps = state => ({
//   currentCart : state.app.user.cart
// });
export default connect()(App);



