import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import LinkContainer from 'react-router-bootstrap/lib/LinkContainer';
import SettingsModal from './../settings/components/SettingsModal';
import checkAuth from '../auth/helpers';
import { IndexLink } from 'react-router'

export default class NavBar extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to={`/`}>UMS</IndexLink>
          </Navbar.Brand>
        </Navbar.Header>

        <Nav>
          <LinkContainer to={{ pathname: '/enrolments'}}>
            <NavItem>Заяви</NavItem>
          </LinkContainer>

          <LinkContainer to={{ pathname: '/statistics'}}>
            <NavItem>Статистика</NavItem>
          </LinkContainer>

          <LinkContainer to={{ pathname: '/rating', query: this.props.ratingQueryParams }}>
            <NavItem>Рейтинг</NavItem>
          </LinkContainer>

          {this.authItem('persons', 'Персони')}
        </Nav>

        <Nav className='pull-right'>
          {this.loginItem()}
        </Nav>

        <SettingsModal ref='SetModal'/>
      </Navbar>
    );
  }
  _onSettingModalClick = () => {
    this.refs.SetModal.openModal();
  };

  authItem(path, name) {
    if (checkAuth(this.props.auth, path)) {
      return (
        <LinkContainer to={{ pathname: path}}>
          <NavItem>{name}</NavItem>
        </LinkContainer>
       );
    }
    return null;
  }

  loginItem() {
    let {user} = this.props.auth;
    if (user.authenticated) {
      return (
        <NavDropdown eventKey={3} title={user.login} id="basic-nav-dropdown">
          <MenuItem eventKey={3.1} onClick={this._onSettingModalClick}>Налаштування</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>
            <LinkContainer to={{pathname: '/logout'}}>
              <NavItem >Logout</NavItem>
            </LinkContainer>
          </MenuItem>
        </NavDropdown>
      );
    } else {
      return (
        <LinkContainer to={{pathname: '/login'}}>
          <NavItem >Login</NavItem>
        </LinkContainer>
      );
    }
  }
}

NavBar.propTypes = {
  auth: PropTypes.object.isRequired
};

function select(state) {
  return {
    auth: state.auth,
    ratingQueryParams: {
      departmentId: state.rating.specofferChooser.departmentId,
      specofferId: state.rating.specofferChooser.specofferId
    }
  };
}

export default connect(select)(NavBar);