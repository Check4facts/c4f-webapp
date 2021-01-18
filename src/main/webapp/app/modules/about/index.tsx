import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Team from './team'
import Funding from './funding'
import Collaborating from './collaborating'
import Experts from './experts'
import Contact from './contact'

const Routes = ({ match }) => (
  <div>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/team`} component={Team} />
      <ErrorBoundaryRoute path={`${match.url}/funding`} component={Funding} />
      <ErrorBoundaryRoute path={`${match.url}/collaborating`} component={Collaborating} />
      <ErrorBoundaryRoute path={`${match.url}/experts`} component={Experts} />
      <ErrorBoundaryRoute path={`${match.url}/contact`} component={Contact} />
    </Switch>
  </div>
)

export default Routes;
