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
  ModalFooter
} from 'reactstrap';

export class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
      modal: false
		};
    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
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
            <NavLink onClick={(e)=>this.toggleModal()}>Log In/Sign Up
              <Modal isOpen={this.state.modal}>
                <ModalHeader toggle={this.toggleModal}>Log In</ModalHeader>
                  <ModalBody>
                    <h3>Register</h3>
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

const mapStateToProps = state => ({
  validLogin: state.app.user.validLogin
});

export default connect()(NavBar);