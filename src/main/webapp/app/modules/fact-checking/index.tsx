import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import FactChecking from 'app/modules/fact-checking/fact-checking';
import SubMenus from 'app/modules/fact-checking/sub-menus';
import Ethics from 'app/modules/fact-checking/ethics';
import FactCheckResult from "app/modules/fact-checking/fact-checking-result";


const Routes = ({ match }) => (
  <div>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/result/:id`} component={FactCheckResult} />
      <ErrorBoundaryRoute path={`${match.url}/sub-menu/:id`} component={SubMenus} />
      <ErrorBoundaryRoute path={`${match.url}/ethics`} exact component={Ethics} />
      <ErrorBoundaryRoute path={`${match.url}`} component={FactChecking} />
    </Switch>
  </div>
);

export default Routes;
