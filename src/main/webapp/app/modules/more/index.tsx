import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import {ThirdParty} from "app/modules/more/third-party";


const Routes = ({ match }) => (
  <div>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/third-party`} component={ThirdParty} />
    </Switch>
  </div>
);

export default Routes;
