import './header.scss';

import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {Translate, translate} from 'react-jhipster';
import {Collapse, Container, Nav, NavbarToggler, NavItem} from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import {Brand} from './header-components';
import {AccountMenu, AdminMenu, EntitiesMenu, LogIn} from '../menus';
import {Social} from 'app/shared/layout/menus/social';
import {AboutMenu} from 'app/shared/layout/menus/about';
import {TopicsMenu} from 'app/shared/layout/menus/topics-menu';
import {MoreMenu} from "app/shared/layout/menus/more";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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
    <header id="app-header" className="">
      <div className="ribbon dev">
        <a href="">
          Πειραματική<br/>Εφαρμογή
        </a>
      </div>
      <LoadingBar className="loading-bar"/>
      <Container>
        <nav className="navbar navbar-expand-lg">
          <div className="d-flex justify-content-between align-items-center navbar-top">
            {/*            <ul className="navbar-left">
            </ul>*/}
            <Brand/>
            <div className="d-flex align-items-center">
                {/* <Nav className="login-drop" id="header-tabs" navbar>
                {props.isAuthenticated ? <AccountMenu isAdmin={props.isAdmin}/> : <LogIn/>}
              </Nav> */}
                <Social/>
              <div className="ekke-logo">
                <img src="../../../../content/images/ekke-logo.png" alt="Ekke logo"></img>
              </div>
            </div>      
          </div>
          <div className="navbar-bottom-menu">
            <NavbarToggler aria-label="Menu" onClick={toggleMenu}/>
            <Collapse isOpen={menuOpen} className="justify-content-center" navbar>
              <Nav id="header-tabs" navbar>
                {props.isAuthenticated && props.isAdmin && <EntitiesMenu/>}
                {props.isAuthenticated && props.isAdmin && <AdminMenu showSwagger={props.isSwaggerEnabled}/>}
                <NavItem><NavLink to="/" exact
                                  className="d-flex align-items-center nav-link">{translate('global.menu.home')}</NavLink></NavItem>
                {props.isAuthenticated && <NavItem><NavLink to="/fact-checking"
                                                            className="d-flex align-items-center nav-link">{translate(('fact-checking.title'))}</NavLink></NavItem>}
                <TopicsMenu/>
                <NavItem><NavLink to="/dissemination" exact
                                  className="d-flex align-items-center nav-link">{translate('global.menu.dissemination.main')}</NavLink></NavItem>
                <AboutMenu/>
                {/* <MoreMenu/> */}
                <NavItem>
                  <NavLink to="/more/third-party" exact className="nav-link"><Translate contentKey="global.menu.more.main" /></NavLink>
                </NavItem>
                {props.isAuthenticated ? <AccountMenu isAdmin={props.isAdmin}/> : <LogIn/>}
                {/* <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} />*/}
              </Nav>
            </Collapse>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
