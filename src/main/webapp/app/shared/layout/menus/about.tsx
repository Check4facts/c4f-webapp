import React, { useState } from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { Translate, translate } from 'react-jhipster';
import { NavDropdown, NavDropdownSubMenu } from './menu-components';

export const AboutMenu = () => {

  return (
    <NavDropdown name={translate('global.menu.about.main')} id="entity-menu">
      <MenuItem to="/about/project">
        <Translate contentKey="global.menu.about.project" />
      </MenuItem>
      <MenuItem to="/about/ethics">
        <Translate contentKey="global.menu.about.ethics" />
      </MenuItem>
      <MenuItem to="/about/events">
        <Translate contentKey="global.menu.about.events" />
      </MenuItem>
    </NavDropdown>
  );
};
