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
      <ErrorBoundaryRoute path={`/entities/article`} component={Article} />
      <ErrorBoundaryRoute path={`/entities/category`} component={Category} />
      <ErrorBoundaryRoute path={`/entities/resource`} component={Resource} />
      <ErrorBoundaryRoute path={`/entities/statement`} component={Statement} />
      <ErrorBoundaryRoute path={`/entities/statement-source`} component={StatementSource} />
      <ErrorBoundaryRoute path={`/entities/topic`} component={Topic} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
);

export default Routes;
