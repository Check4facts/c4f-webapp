import './header.scss';

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { translate } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, Collapse, Row, Col } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Brand } from './header-components';
import {AdminMenu, EntitiesMenu, AccountMenu, LogIn} from '../menus';
import { Social } from 'app/shared/layout/menus/social';
import { AboutMenu } from 'app/shared/layout/menus/about';
import { DisseminationMenu } from 'app/shared/layout/menus/dissemination';
import { TopicsMenu } from 'app/shared/layout/menus/topics-menu';
import { MoreMenu } from "app/shared/layout/menus/more";

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // const handleLocaleChange = event => {
  //   const langKey = event.target.value;
  //   Storage.session.set('locale', langKey);
  //   props.onLocaleChange(langKey);
  // };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header" className="bg-dark fixed-top">
      <LoadingBar className="loading-bar" />
        <Row xs="2">
          <Col className="d-flex justify-content-center" md={{ size:3, offset: 3 }} sm="6" >
            <Brand />
          </Col>
          <Col className="d-flex justify-content-center" sm="6" md="3" >
            <Social />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center" md={{ size: 6, offset: 3 }} >
            <Navbar className="pt-0" dark expand="sm" style={{ borderStyle: 'none' }}>
              <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
              <Collapse isOpen={menuOpen} navbar>
                <Nav id="header-tabs" className="ml-auto" navbar>
                  {props.isAuthenticated && props.isAdmin && <EntitiesMenu />}
                  {props.isAuthenticated && props.isAdmin && <AdminMenu showSwagger={props.isSwaggerEnabled} />}
                  <NavLink to="/" exact className="d-flex align-items-center nav-link">{translate('global.menu.home')}</NavLink>
                  {props.isAuthenticated && <NavLink to="/fact-checking" className="d-flex align-items-center nav-link">{translate(('fact-checking.title'))}</NavLink>}
                  <TopicsMenu />
                  <DisseminationMenu />
                  <AboutMenu />
                  <MoreMenu />
                  {props.isAuthenticated ? <AccountMenu isAdmin={props.isAdmin}/> : <LogIn />}
                  {/* <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />*/}
                </Nav>
              </Collapse>
            </Navbar>
          </Col>
        </Row>
    </div>
  );
};

export default Header;
