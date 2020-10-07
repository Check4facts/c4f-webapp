import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const MoreMenu = () => (
  <NavDropdown
    name={translate('global.menu.more.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/more/ethics">
      <Translate contentKey="global.menu.more.ethics" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/more/third-party">
      <Translate contentKey="global.menu.more.third-party" />
    </MenuItem>
  </NavDropdown>
);
