import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import FactChecking from 'app/modules/fact-checking/fact-checking';
import SubMenus from 'app/modules/fact-checking/sub-menus';
import FactCheckingAnalyze from "app/modules/fact-checking/fact-checking-analyze";
import FactCheckingResults from "app/modules/fact-checking/fact-checking-results";
import PrivateRoute from "app/shared/auth/private-route";
import {AUTHORITIES} from "app/config/constants";
import FactCheckingReport from './fact-checking-report/fact-checking-report';


const Routes = ({ match }) => (
  <div>
    <Switch>
      <PrivateRoute path={`${match.url}/analyze/:id`} component={FactCheckingAnalyze} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
      <PrivateRoute path={`${match.url}/results/:id`} component={FactCheckingResults} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
      <PrivateRoute path={`${match.url}/report/:id`} component={FactCheckingReport} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
      <ErrorBoundaryRoute path={`${match.url}/sub-menu/:id`} component={SubMenus} />
      <PrivateRoute path={`${match.url}`} component={FactChecking} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
    </Switch>
  </div>
);

export default Routes;
