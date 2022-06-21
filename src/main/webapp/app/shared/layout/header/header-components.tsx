import React from 'react';

import {NavbarBrand} from 'reactstrap';
import {NavLink as Link} from 'react-router-dom';

export const Brand = () => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <span className="brand-title">
      {/* <Translate contentKey="global.title">Check4facts</Translate> */}
      <img src='/content/images/CHECK 4 FACTS MAIN BRAND WHITE 2.png' width="300px" alt="Check4Facts"/>
    </span>
  </NavbarBrand>
);
