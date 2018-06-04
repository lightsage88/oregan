import React, { Component } from 'react';
import logo from '../logo.svg';
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
          <Route exact path='/checkout' render={()=><Checkout parcelGame={this.state} currentCart={this.props.currentCart}/>}/>
          <Route exact path='/thanks' render={()=><Thanks btObject={this.props.btTransaction} shippoObject={this.props.shippoTransaction}/>}/>          
                <script src="https://js.braintreegateway.com/js/braintree-2.32.1.min.js"></script>

        </main>
      </Router>
    );
  }


  // App = connect()(Register);

}

const mapStateToProps = state => ({
  currentCart : state.app.user.cart
});
export default connect(mapStateToProps)(App);



