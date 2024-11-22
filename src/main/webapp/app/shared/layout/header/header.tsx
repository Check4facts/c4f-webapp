import './header.scss';

import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Translate, translate } from 'react-jhipster';
import { Collapse, Container, Nav, NavbarToggler, NavItem, Fade } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import { Brand } from './header-components';
import { AccountMenu, AdminMenu, EntitiesMenu, LogIn } from '../menus';
import { Social } from 'app/shared/layout/menus/social';
import { AboutMenu } from 'app/shared/layout/menus/about';
import { TopicsMenu } from 'app/shared/layout/menus/topics-menu';
import { MoreMenu } from 'app/shared/layout/menus/more';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FactChecking } from '../menus/fact-checking';

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
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // const handleLocaleChange = event => {
  //   const langKey = event.target.value;
  //   Storage.session.set('locale', langKey);
  //   props.onLocaleChange(langKey);
  // };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <header id="app-header" className="">
      {/*      <div className="ribbon dev">
        <a href="">
          Πειραματική<br/>Εφαρμογή
        </a>
      </div>*/}
      <LoadingBar className="loading-bar" />
      <Container>
        <nav className="navbar navbar-expand-lg">
          <div className="d-flex justify-content-between align-items-center navbar-top">
            {/*            <ul className="navbar-left">
            </ul>*/}
            <Brand />
            <div className="d-flex align-items-center">
              {/* <Nav className="login-drop" id="header-tabs" navbar>
                {props.isAuthenticated ? <AccountMenu isAdmin={props.isAdmin}/> : <LogIn/>}
              </Nav> */}
              <Social />
              <div className="header-ekke-logo">
                <img src="../../../../content/images/ekke-logo.png" alt="Ekke logo" style={{ width: '65px' }}></img>
              </div>
            </div>
          </div>
          <div className="navbar-bottom-menu">
            <NavbarToggler aria-label="Menu" onClick={toggleMenu}>
              <img src="../../../../content/images/bars-solid.svg" width={20}></img>
            </NavbarToggler>
            <Collapse isOpen={menuOpen} className="justify-content-center" style={{width: "101%"}} navbar>
              <Nav id="header-tabs" className="align-items-sm-start align-items-md-center" navbar>
                {props.isAuthenticated && props.isAdmin && <EntitiesMenu />}
                {props.isAuthenticated && props.isAdmin && <AdminMenu showSwagger={props.isSwaggerEnabled} />}
                <NavItem style={{display: "flex", justifyContent: "space-between"}}>
                  <NavLink to="/" exact className="d-flex align-items-center nav-link" style={{flex: 1}}>
                    {translate('global.menu.home')}
                  </NavLink>
                  <button style={{ display: menuOpen ? 'block' : 'none'}} className='navbar-close' onClick={toggleMenu}>
                    <img src="../../../../content/images/close-button.webp" className="mdi mdi-close" width={20} />
                  </button>
                </NavItem>
                <AboutMenu />
                {props.isAuthenticated && (
                  <NavItem>
                    <NavLink to="/statement" className="d-flex align-items-center nav-link">
                      {translate('fact-checking.title')}
                    </NavLink>
                  </NavItem>
                )}
                <TopicsMenu />
                {/* <NavItem><NavLink to="/dissemination" exact className="d-flex align-items-center nav-link">{translate('global.menu.dissemination.main')}</NavLink></NavItem> */}
                <FactChecking />
                {/* <MoreMenu/> */}
                <NavItem>
                  <NavLink to="/news" exact className="d-flex align-items-center nav-link">
                  <Translate contentKey="check4FactsApp.news.home.title" />
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/about/contact" exact className="d-flex align-items-center nav-link">
                    <Translate contentKey="global.menu.about.contact" />
                  </NavLink>
                </NavItem>
                {props.isAuthenticated && <AccountMenu isAdmin={props.isAdmin} />}
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
