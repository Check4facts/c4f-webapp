import React from 'react';
import {Switch} from 'react-router-dom';
import Loadable from 'react-loadable';

import Login from 'app/modules/login/login';
import Register from 'app/modules/account/register/register';
import Activate from 'app/modules/account/activate/activate';
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init';
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish';
import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import About from 'app/modules/about';
import FactChecking from 'app/modules/fact-checking';
import More from 'app/modules/more';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import {AUTHORITIES} from 'app/config/constants';
import Dissemination from 'app/modules/dissemination/dissemination';
import ErrorBoundary from 'app/shared/error/error-boundary';
import {Container} from 'reactstrap';
import Article from "app/entities/article";
import Category from "app/entities/category";
import Resource from "app/entities/resource";
import Statement from "app/entities/statement";
import StatementSource from "app/entities/statement-source";
import Topic from "app/entities/topic";
import PageNotFound from "app/shared/error/page-not-found";

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => <div>loading ...</div>,
});

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div>loading ...</div>,
});

const NonFluidContainerRoutes = () => (
  <Container>
    <Switch>
      <ErrorBoundaryRoute path="/" exact component={Home}/>
      <ErrorBoundaryRoute path="/login" component={Login}/>
      <ErrorBoundaryRoute path="/logout" component={Logout}/>
      <ErrorBoundaryRoute path="/account/register" component={Register}/>
      <ErrorBoundaryRoute path="/account/activate/:key?" component={Activate}/>
      <ErrorBoundaryRoute path="/account/reset/request" component={PasswordResetInit}/>
      <ErrorBoundaryRoute path="/account/reset/finish/:key?" component={PasswordResetFinish}/>
      <PrivateRoute path="/account" component={Account}
                    hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]}/>
      <ErrorBoundaryRoute path="/about" component={About}/>
      <ErrorBoundaryRoute path="/dissemination" component={Dissemination}/>
      <ErrorBoundaryRoute path="/fact-checking" component={FactChecking}/>
      <ErrorBoundaryRoute path="/more" component={More}/>
      <ErrorBoundaryRoute component={PageNotFound}/>
    </Switch>
  </Container>
);

const Routes = () => (
  <div className="view-routes">
      <ErrorBoundary>
        <Switch>
          <PrivateRoute path="/admin" component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]}/>
          <ErrorBoundaryRoute path={`/article`} component={Article}/>
          <ErrorBoundaryRoute path={`/category`} component={Category}/>
          <ErrorBoundaryRoute path={`/resource`} component={Resource}/>
          <ErrorBoundaryRoute path={`/statement`} component={Statement}/>
          <ErrorBoundaryRoute path={`/statement-source`} component={StatementSource}/>
          <ErrorBoundaryRoute path={`/topic`} component={Topic}/>
          <ErrorBoundaryRoute component={NonFluidContainerRoutes}/>
        </Switch>
      </ErrorBoundary>
  </div>
);

export default Routes;
