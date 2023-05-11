import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const FactChecking = () => (
  <NavDropdown
    name={translate('global.menu.fact-checking.main')}
    style={{ maxHeight: '80vh', overflow: 'auto' }}  >
    <MenuItem to="/dissemination">
      <Translate contentKey="global.menu.fact-checking.sub-menu" />
    </MenuItem>
    <MenuItem to="/more/third-party">
      <Translate contentKey="global.menu.more.main" />
    </MenuItem>
  </NavDropdown>
);