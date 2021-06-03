import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Publications from './publications';
import Videos from './videos';

const Routes = ({ match }) => (
  <div>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/publications`} component={Publications} />
      <ErrorBoundaryRoute path={`${match.url}/videos`} component={Videos} />
    </Switch>
  </div>
);

export default Routes;
