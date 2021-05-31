import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const AboutMenu = () => (
  <NavDropdown
    name={translate('global.menu.about.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="clipboard-list" to="/about/project">
      <Translate contentKey="global.menu.about.project" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/about/ethics">
      <Translate contentKey="global.menu.about.ethics" />
    </MenuItem>
    <MenuItem icon="phone-alt" to="/about/contact">
      <Translate contentKey="global.menu.about.contact" />
    </MenuItem>
  </NavDropdown>
);
