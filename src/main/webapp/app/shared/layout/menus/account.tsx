import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import {Translate, translate} from 'react-jhipster';
import {NavDropdown} from './menu-components';
import {NavLink} from "react-router-dom";
import {NavItem} from 'reactstrap';

const accountMenuItemsAuthenticated = (isAdmin) => (
  <>
    <MenuItem icon="wrench" to="/account/settings">
      <Translate contentKey="global.menu.account.settings">Settings</Translate>
    </MenuItem>
    <MenuItem icon="lock" to="/account/password">
      <Translate contentKey="global.menu.account.password">Password</Translate>
    </MenuItem>
    <MenuItem icon="sign-out-alt" to="/logout">
      <Translate contentKey="global.menu.account.logout">Sign out</Translate>
    </MenuItem>
  </>
);

export const LogIn = () => (
  <NavItem>
    <NavLink id="login-item" to="/login" className="d-flex align-items-center nav-link">
      <Translate contentKey="global.menu.account.login">Sign in</Translate>
    </NavLink>
  </NavItem>
);

export const AccountMenu = ({isAdmin = false}) => (
  <NavDropdown style={{ maxHeight: '80vh', overflow: 'auto' }} name={translate('global.menu.account.main')} id="account-menu">
    {accountMenuItemsAuthenticated(isAdmin)}
  </NavDropdown>
);

export default AccountMenu;
