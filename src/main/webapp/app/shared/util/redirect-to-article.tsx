import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { IRootState } from '../reducers';
import { getEntity } from 'app/entities/article/article.reducer';
import article from 'app/entities/article/article';
import { defaultValue } from '../model/article.model';

export interface IRedirectToArticleProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

const RedirectToArticle = (props: IRedirectToArticleProps) => {
  useEffect(() => {
    const id = props.match.params.id;
    props.getEntity(id);
  }, []);

  useEffect(() => {
    if (!props.loading && props.article.greeklish) {
      props.history.replace(`/article/display/${props.article.greeklish}`, { article: props.article });
    }
  }, [props.article]);

  return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Redirecting...</div>;
};

const mapStateToProps = (storeState: IRootState) => ({
  article: storeState.article.entity,
  loading: storeState.article.loading,
});

const mapDispatchToProps = {
  getEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RedirectToArticle);
