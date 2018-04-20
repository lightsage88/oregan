//should set up a product page and based on subject picked, will populate from database of objects with things that we have
//for sale, along with 
//PICTURE, QUANTITY AVAILABLE, DESCRIPTION, PRICE, COLOR(s)
//need to use the more abstract parts of React-router to accomplish this, look over Thinkful curriculum again!


import React from 'react';
import {connect} from 'react-redux';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem
} from 'reactstrap';
import {persistData} from '../actions/index';
import {logOut} from '../actions/index';
import Login from './login';
import '../staticAssets/shoppingCart.png';

export class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
      modal: false,
      dropdown: false
		};
    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
	}

  componentDidMount(){
    if(localStorage.getItem('_id')) {
      console.log('theres an id here, yo');
      let id = localStorage.getItem('_id');
      console.log(id);
      this.props.dispatch(persistData(id));
    } else {
      console.log('no id ');
    }
  }

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

  toggleModal(){
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleDropdown(){
    this.setState({
      dropdown: !this.state.dropdown
    });
  }

  handleLogout(e) {
    localStorage.clear();
  }

	render() {
		return (
      <div>
        <Navbar color="faded" light expand="md">
        <NavbarToggler onClick={this.toggle} className='mr-2'/>
        <NavbarBrand href="/home">OREGĂN</NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          
          <Dropdown isOpen={this.state.dropdown}
                    toggle={this.toggleDropdown}>
            <DropdownToggle caret>
              Products
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href='/products/specials'>Specials</DropdownItem>
              <DropdownItem href='/products/clothing'>Clothing</DropdownItem>
              <DropdownItem href='/products/food'>Food</DropdownItem>
              <DropdownItem href='/products/alcohol'>Alcohol</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
          {
            localStorage.getItem('validLogin') ?
             <NavItem> 
              <NavLink>
                Account
              </NavLink>
             </NavItem>
             :
             null
          }
          <NavItem>
            <NavLink href="/cart">Cart</NavLink>
          </NavItem>
          <NavItem>
            {localStorage.getItem('validLogin') ?
            <NavLink href="/" onClick={(e)=>this.handleLogout(e)}>Log Out</NavLink>
            :
            <NavLink onClick={(e)=>this.toggleModal()}>Log In/Sign Up
              <Modal isOpen={this.state.modal}>
                <ModalHeader toggle={this.toggleModal}>Log In</ModalHeader>
                  <ModalBody>
                    <Login/>
                    <NavLink href='/register'>Register</NavLink>
                  </ModalBody>
              </Modal>
            </NavLink>

            }
          </NavItem>
        </Nav>
        </Collapse>
        </Navbar>
      </div>
    );
	}
}

export default connect()(NavBar);