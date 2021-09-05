import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const TopicsMenu = () => (
  <NavDropdown
    name={translate('fact-checking.sub-menus.main')}
    style={{ maxHeight: '80vh', overflow: 'auto' }}  >
    <MenuItem to="/fact-checking/sub-menu/immigration?page=1&sort=articleDate,desc">
      <Translate contentKey="fact-checking.sub-menus.immigration" />
    </MenuItem>
    <MenuItem to="/fact-checking/sub-menu/crime?page=1&sort=articleDate,desc">
      <Translate contentKey="fact-checking.sub-menus.crime" />
    </MenuItem>
  </NavDropdown>
);
