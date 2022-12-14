import React from 'react';

import {NavbarBrand} from 'reactstrap';
import {NavLink as Link} from 'react-router-dom';

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <span className="brand-title">
      {/* <Translate contentKey="global.title">Check4facts</Translate> */}
      <img src='/content/images/check4facts_science_logo.jpg' width="350px" alt="Check4Facts"/>
    </span>
  </NavbarBrand>
);
