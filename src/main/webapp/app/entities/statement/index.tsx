import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Statement from './statement';
import StatementDetail from './statement-detail';
import StatementUpdate from './statement-update';
import StatementDeleteDialog from './statement-delete-dialog';
import {Container} from 'reactstrap';

const Routes = ({ match }) => (
  <Container fluid>
  <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StatementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StatementUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={StatementDetail} />
      <ErrorBoundaryRoute path={match.url} component={Statement} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={StatementDeleteDialog} />
  </Container>
);

export default Routes;
