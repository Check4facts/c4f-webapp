import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Ethics from "app/modules/more/ethics";
import {ThirdParty} from "app/modules/more/third-party";


const Routes = ({ match }) => (
  <div>
    <Switch>
      <ErrorBoundaryRoute path={`${match.url}/ethics`} component={Ethics} />
      <ErrorBoundaryRoute path={`${match.url}/third-party`} component={ThirdParty} />
    </Switch>
  </div>
);

export default Routes;
