import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import StatementSource from './statement-source';
import StatementSourceDetail from './statement-source-detail';
import StatementSourceUpdate from './statement-source-update';
import StatementSourceDeleteDialog from './statement-source-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StatementSourceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StatementSourceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StatementSourceDetail} />
      <ErrorBoundaryRoute path={match.url} component={StatementSource} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={StatementSourceDeleteDialog} />
  </>
);

export default Routes;
