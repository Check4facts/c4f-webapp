import 'react-toastify/dist/ReactToastify.css';
import '../content/scss/app.scss';

import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { connect } from 'react-redux';
import { BrowserRouter as Router, withRouter, RouteComponentProps } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { hot } from 'react-hot-loader';

import { Container } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import { setLocale } from 'app/shared/reducers/locale';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import ScrollToTop from 'app/scroll-to-top';
import CookieConsent from 'react-cookie-consent';
import { translate } from 'react-jhipster';

ReactGA.initialize('G-SB0BFWXW1Q');

const GAListener = withRouter(({ history }: RouteComponentProps) => {
  useEffect(() => {
    const unlisten = history.listen(location => {
      ReactGA.send({ hitType: 'pageview', page: location.pathname + location.search });
    });

    return () => unlisten();
  }, [history]);

  return null;
});

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

export interface IAppProps extends StateProps, DispatchProps {}

export const App = (props: IAppProps) => {
  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
    props.getSession();
    props.getProfile();
  }, []);

  return (
    <Router basename={baseHref}>
      <div className="app-container">
        <GAListener />
        <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
        <ScrollToTop />
        <ErrorBoundary>
          <Header
            isAuthenticated={props.isAuthenticated}
            isAdmin={props.isAdmin}
            currentLocale={props.currentLocale}
            onLocaleChange={props.setLocale}
            ribbonEnv={props.ribbonEnv}
            isInProduction={props.isInProduction}
            isSwaggerEnabled={props.isSwaggerEnabled}
          />
        </ErrorBoundary>
        {/* <Container fluid className="view-container"> */}
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
        {/* </Container> */}
        <Footer isAuthenticated={props.isAuthenticated} currentLocale={props.currentLocale} />
        <CookieConsent
          location="bottom"
          buttonText={translate('global.cookie.dismiss')}
          cookieName="check4facts-cookie"
          style={{ background: '#2B373B' }}
          buttonStyle={{ color: '#4e503b', fontSize: '13px' }}
          expires={150}
        >
          {translate('global.cookie.message')}{' '}
          <a href="https://check4facts.gr/files/c4f-privacy-policy-gr.pdf" style={{ color: '#007bff' }}>
            {translate('global.cookie.link')}
          </a>
        </CookieConsent>
      </div>
    </Router>
  );
};

const mapStateToProps = ({ authentication, applicationProfile, locale }: IRootState) => ({
  currentLocale: locale.currentLocale,
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  ribbonEnv: applicationProfile.ribbonEnv,
  isInProduction: applicationProfile.inProduction,
  isSwaggerEnabled: applicationProfile.isSwaggerEnabled,
});

const mapDispatchToProps = { setLocale, getSession, getProfile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(hot(module)(App));
