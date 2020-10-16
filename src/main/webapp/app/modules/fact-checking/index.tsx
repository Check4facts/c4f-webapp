import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import FactChecking from 'app/modules/fact-checking/fact-checking';
import SubMenus from 'app/modules/fact-checking/sub-menus';
import FactCheckResult from "app/modules/fact-checking/fact-checking-result";
import PrivateRoute from "app/shared/auth/private-route";
import {AUTHORITIES} from "app/config/constants";


const Routes = ({ match }) => (
  <div>
    <Switch>
      <PrivateRoute path={`${match.url}/result/:id`} component={FactCheckResult} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
      <ErrorBoundaryRoute path={`${match.url}/sub-menu/:id`} component={SubMenus} />
      <PrivateRoute path={`${match.url}`} component={FactChecking} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
    </Switch>
  </div>
);

export default Routes;
