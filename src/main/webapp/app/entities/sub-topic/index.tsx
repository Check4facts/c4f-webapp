import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SubTopic from './sub-topic';
import SubTopicDetail from './sub-topic-detail';
import SubTopicUpdate from './sub-topic-update';
import SubTopicDeleteDialog from './sub-topic-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SubTopicUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SubTopicUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SubTopicDetail} />
      <ErrorBoundaryRoute path={match.url} component={SubTopic} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SubTopicDeleteDialog} />
  </>
);

export default Routes;
