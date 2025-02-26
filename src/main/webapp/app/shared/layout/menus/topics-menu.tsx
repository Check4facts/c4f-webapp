import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const TopicsMenu = () => (
  <NavDropdown name={translate('fact-checking.sub-menus.main')} style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem to="/fact-checking/sub-menu/immigration">
      <Translate contentKey="fact-checking.sub-menus.immigration" />
    </MenuItem>
    <MenuItem to="/fact-checking/sub-menu/crime">
      <Translate contentKey="fact-checking.sub-menus.crime" />
    </MenuItem>
    <MenuItem to="/fact-checking/sub-menu/climate_change">
      <Translate contentKey="fact-checking.sub-menus.climate_change" />
    </MenuItem>
    <MenuItem to="/fact-checking/sub-menu/pandemic">
      <Translate contentKey="fact-checking.sub-menus.pandemic" />
    </MenuItem>
    <MenuItem to="/fact-checking/sub-menu/digital_transition">
      <Translate contentKey="fact-checking.sub-menus.digital_transition" />
    </MenuItem>
  </NavDropdown>
);
