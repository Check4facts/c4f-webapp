import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown } from './menu-components';

export const DisseminationMenu = () => (
  <NavDropdown
    name={translate('global.menu.dissemination.main')}
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="file" to="/dissemination/publications">
      <Translate contentKey="global.menu.dissemination.publications" />
    </MenuItem>
    <MenuItem icon="file" to="/dissemination/videos">
      <Translate contentKey="global.menu.dissemination.videos" />
    </MenuItem>
  </NavDropdown>
);
