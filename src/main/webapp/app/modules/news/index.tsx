import React from 'react';
import { Switch } from 'react-router-dom';
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import newsHome from './news-home';
import { AUTHORITIES } from 'app/config/constants';
import PrivateRoute from 'app/shared/auth/private-route';
import NewsDetail from 'app/entities/news/news-detail';
import NewsDeleteDialog from 'app/entities/news/news-delete-dialog';
import NewsUpdate from 'app/entities/news/news-update';


const Routes = ({ match }) => (
  <div>
    <Switch>
      <PrivateRoute exact path={`${match.url}/new`} component={NewsUpdate} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
      <PrivateRoute exact path={`${match.url}/:id/edit`} component={NewsUpdate} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NewsDetail} />
      <ErrorBoundaryRoute path={`${match.url}`} component={newsHome} />
    </Switch>
      <PrivateRoute exact path={`${match.url}/:id/delete`} component={NewsDeleteDialog} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
  </div>
);

export default Routes;
