import React from 'react';
import { Switch } from 'react-router-dom';

import { AUTHORITIES } from 'app/config/constants';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Article from './article';
import ArticleDetail from './article-detail';
import ArticleUpdate from './article-update';
import ArticleDisplay from './article-display';
import ArticleDeleteDialog from './article-delete-dialog';
import RedirectToArticle from 'app/shared/util/redirect-to-article';

const Routes = ({ match }) => (
  <>
    <Switch>
      <PrivateRoute exact path={`${match.url}/new/:statementId?`} component={ArticleUpdate} hasAnyAuthorities={[AUTHORITIES.USER]} />
      <PrivateRoute exact path={`${match.url}/:id/edit`} component={ArticleUpdate} hasAnyAuthorities={[AUTHORITIES.USER]} />
      {/* Route below if for old version links like /article/ID/display */}
      <ErrorBoundaryRoute exact path={`${match.url}/:id/display/`} component={RedirectToArticle} />
      <ErrorBoundaryRoute exact path={`${match.url}/display/:greeklish`} component={ArticleDisplay} />
      <PrivateRoute exact path={`${match.url}/:id`} component={ArticleDetail} hasAnyAuthorities={[AUTHORITIES.USER]} />
      <PrivateRoute path={match.url} component={Article} hasAnyAuthorities={[AUTHORITIES.USER]} />
    </Switch>
    <PrivateRoute exact path={`${match.url}/:id/delete`} component={ArticleDeleteDialog} hasAnyAuthorities={[AUTHORITIES.USER]} />
  </>
);

export default Routes;
