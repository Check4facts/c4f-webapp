import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Project from './project'
import Ethics from './ethics'
import Contact from './contact'
import Seminar from './seminar'

const Routes = ({ match }) => (
  <div>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/project`} component={Project} />
      <ErrorBoundaryRoute path={`${match.url}/ethics`} component={Ethics} />
      <ErrorBoundaryRoute path={`${match.url}/contact`} component={Contact} />
      <ErrorBoundaryRoute path={`${match.url}/seminar`} component={Seminar} />
    </Switch>
  </div>
)

export default Routes;
