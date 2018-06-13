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
  Modal,
  ModalHeader,
  ModalBody,
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem
} from 'reactstrap';
import {persistData, loginUser} from '../actions/index';
// import {logOut} from '../actions/index';
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

  componentWillMount(){
    if(localStorage.getItem('_id')) {
      let id = localStorage.getItem('_id');
     
      this.props.dispatch(persistData(id));

    } else if(localStorage.getItem('unknownUser')){
      console.log('unknownUser at play!');
      console.log(localStorage);
    } else {
      console.log('no id');
      localStorage.setItem('unknownUser', true);
      localStorage.setItem('cart', JSON.stringify([]));
    }

  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
   
    let currentCart = nextProps.currentCart;
    this.setState({
      currentCart: currentCart
    });
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

  loginSubmit(e, username, password){
    console.log('loginSubmit running');
    console.log(e);
    console.log(username);
    console.log(password);
     this.props.dispatch(loginUser(username, password));
  }

	render() {
    console.log(this.props);
    console.log(this.state);

    // if(localStorage.getItem('unknownUser')){
    //   this.props.dispatch(tempAccount());
    // }
            let cartLength = this.state.currentCart.length;

		return (
      <div className='navbarMain'>

        <Navbar className='navBarBody' color="faded" light expand="md">
        <NavbarToggler onClick={this.toggle} id="NavbarToggler" className='mr-2'/>
        <NavbarBrand href="/home" id="brandType" className='brandType'>Rose City Shopper</NavbarBrand>
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
                    <Login onSubmit={(e, username, password)=>this.loginSubmit(e, username, password)}/>
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