import React from 'react';
import {connect} from 'react-redux';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from 'reactstrap';

export class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false
		};
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
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
          <NavItem>
            <NavLink href="/about">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/cart">Cart</NavLink>
          </NavItem>
          <NavItem>
            {(this.state.validLogin)?
            <NavLink href="/" onClick={(e)=>this.handleLogout(e)}>Log Out</NavLink>
            :
            <NavLink href="/" >Log In/Sign Up <loginRegister/></NavLink>

            }

         


          </NavItem>
        </Nav>
        </Collapse>
        </Navbar>
      </div>
    );
	}
}

const mapStateToProps = state => ({
  validLogin: state.app.user.validLogin
});

export default connect()(NavBar);