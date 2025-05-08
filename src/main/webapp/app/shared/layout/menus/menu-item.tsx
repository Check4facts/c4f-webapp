import React from 'react';
import { DropdownItem } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IMenuItem {
  icon?: IconProp;
  to: string;
  id?: string;
}

export default class MenuItem extends React.Component<IMenuItem> {
  render() {
    const { to, icon, id, children } = this.props;

    // Ensure icon is valid before rendering
    const isValidIcon = typeof icon !== 'undefined' && icon !== null;

    return (
      <DropdownItem tag={Link} to={to} id={id}>
        {isValidIcon && <FontAwesomeIcon icon={icon} fixedWidth />} {children}
      </DropdownItem>
    );
  }
}
