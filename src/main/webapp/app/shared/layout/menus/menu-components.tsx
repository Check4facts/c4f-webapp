import React from 'react';

import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NavDropdown = props => (
  <UncontrolledDropdown nav inNavbar id={props.id}>
    <DropdownToggle nav className="d-flex align-items-center">
      <FontAwesomeIcon icon={props.icon} />
      <span>{props.name}</span>&nbsp;
      <FontAwesomeIcon icon="angle-down" size="xs" />
    </DropdownToggle>
    <DropdownMenu style={props.style}>
      {props.children}
    </DropdownMenu>
  </UncontrolledDropdown>
);
