import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Article from './article';
import Category from './category';
import PageNotFound from 'app/shared/error/page-not-found';
import Resource from './resource';
import Statement from './statement';
import StatementSource from './statement-source';
import Topic from './topic';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}article`} component={Article} />
      <ErrorBoundaryRoute path={`${match.url}category`} component={Category} />
      <ErrorBoundaryRoute path={`${match.url}resource`} component={Resource} />
      <ErrorBoundaryRoute path={`${match.url}statement`} component={Statement} />
      <ErrorBoundaryRoute path={`${match.url}statement-source`} component={StatementSource} />
      <ErrorBoundaryRoute path={`${match.url}topic`} component={Topic} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;
