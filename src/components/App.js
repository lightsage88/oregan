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

export default class App extends Component {
 
  
  
  render() {
    return (
      <Router> 
        <main>
          <NavBar/>
          <Route exact path='/' component={Landing} />
          <Route exact path='/about' component={About} />
          <Route exact path='/register' component={Register}/>
          <Route exact path='/account' component={Account}/>
        </main>
      </Router>
    );
  }


  // App = connect()(Register);

}




