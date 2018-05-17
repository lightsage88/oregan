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
import './navBar.css';
export class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
      modal: false,
      dropdown: false,
      currentCart: ''
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
      console.log(this.props);
      this.props.dispatch(persistData(id));

    } else {
      console.log('no id ');
    }

  }

  componentWillReceiveProps(nextProps){
    console.log(this.props);
    console.log(nextProps);
  
    console.log(nextProps.currentCart);
    let currentCart = nextProps.currentCart;
    this.setState({
      currentCart: currentCart
    });
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
        console.log(this.state.currentCart);
        let cartLength = this.state.currentCart.length;
		return (
      <div>

        <Navbar className='navBarBody' color="faded" light expand="md">
        <NavbarToggler onClick={this.toggle} id="NavbarToggler" className='mr-2'/>
        <NavbarBrand href="/home" id="brandType" className='brandType'>OREGĂN</NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
                                    <img src={require('../uxResources/oregonFlag.png')} alt='https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fb%2Fb9%2FFlag_of_Oregon.svg%2F2000px-Flag_of_Oregon.svg.png&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FFlag_of_Oregon&docid=0_W84AwX19K10M&tbnid=SCRjsfZfCWbVrM%3A&vet=10ahUKEwiSxarKpuraAhUR92MKHQvAAHYQMwg0KAAwAA..i&w=2000&h=1200&client=firefox-b-1-ab&bih=845&biw=1012&q=oregon%20flag&ved=0ahUKEwiSxarKpuraAhUR92MKHQvAAHYQMwg0KAAwAA&iact=mrc&uact=8'/>

        <Nav className="ml-auto" navbar>

          <NavItem>
            <NavLink className='navClickables' href="/">Home</NavLink>
          </NavItem>
          
          <Dropdown isOpen={this.state.dropdown}
                    toggle={this.toggleDropdown}>
            <DropdownToggle className='navClickables' caret>
              Products
            </DropdownToggle>
            <DropdownMenu>

              <DropdownItem className='navClickables' href='/products/specials'>Specials</DropdownItem>
              <DropdownItem className='navClickables' href='/products/clothing'>Clothing</DropdownItem>
              <DropdownItem className='navClickables' href='/products/food'>Food</DropdownItem>
              <DropdownItem className='navClickables' href='/products/alcohol'>Alcohol</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <NavItem>
            <NavLink className='navClickables' href="/about">About</NavLink>
          </NavItem>
          {
            localStorage.getItem('validLogin') ?
             <NavItem> 
              <NavLink className='navClickables'>
                Account
              </NavLink>
             </NavItem>
             :
             null
          }
          <NavItem>
          {cartLength === 0 ?
            <NavLink className='navClickables' href="/cart">Cart</NavLink>
            :
            <NavLink className='navClickables' href="/cart">Cart ({this.state.currentCart.length})</NavLink>
          }
          
          </NavItem>
          <NavItem>
            {localStorage.getItem('validLogin') ?
            <NavLink className='navClickables' href="/" onClick={(e)=>this.handleLogout(e)}>Log Out</NavLink>
            :
            <NavLink className='navClickables' onClick={(e)=>this.toggleModal()}>Log In/Sign Up
              <Modal isOpen={this.state.modal}>
                <ModalHeader className='navClickables' toggle={this.toggleModal}>Log In</ModalHeader>
                  <ModalBody>
                    <Login/>
                    <NavLink href='/register'><button className='loginRegisterLink'>Register</button></NavLink>
                  </ModalBody>
              </Modal>
            </NavLink>

            }
          </NavItem>
          <NavItem>
            <input className='form-control' type='search' placeholder="Search Under Construction"/>
          </NavItem>
        </Nav>
        </Collapse>
        </Navbar>


      </div>
    );
	}
}

const mapStateToProps = state => ({
  currentCart: state.app.user.cart
});

export default connect(mapStateToProps)(NavBar);