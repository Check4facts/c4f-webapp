import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown name={translate('global.menu.entities.main')} id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/article">
      <Translate contentKey="global.menu.entities.article" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/category">
      <Translate contentKey="global.menu.entities.category" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/resource">
      <Translate contentKey="global.menu.entities.resource" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/statement">
      <Translate contentKey="global.menu.entities.statement" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/statement-source">
      <Translate contentKey="global.menu.entities.statementSource" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/topic">
      <Translate contentKey="global.menu.entities.topic" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/news/list">
      <Translate contentKey="global.menu.entities.news" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
