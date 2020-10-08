import React from 'react';
import { Row, Col, Container, UncontrolledCarousel, Button } from 'reactstrap';
import { Translate, translate } from "react-jhipster";
import {IRootState} from "app/shared/reducers";
import { connect } from 'react-redux';

type IArticlesFeedProps = StateProps;

export const ArticlesFeed = (props: IArticlesFeedProps) => {

  const { articles, loading, isAuthenticated } = props;

  return (
    <>
      {articles && articles.length > 0 ? articles.map(article => (
        <Row className="my-5" key={article.id}>
          <Col md="3">
            {article.previewImage
              ? <img src={`data:${article.previewImageContentType};base64,${article.previewImage}`} alt="previewImage" style={{ display: 'block', margin: 'auto', width: '10vw' }} />
              : null
            }
          </Col>
          <Col md="9" className="border-left">
            <h2 className="text-center">{article.previewTitle}/{article.id}</h2>
            <p className="mt-5">{article.previewText}</p>
            {isAuthenticated && !article.published && <p className="text-right text-danger text-uppercase">{translate('check4FactsApp.article.unpublished')}</p>}
          </Col>
        </Row>
      )) : (
        !loading && (
          <div className="alert alert-warning">
            <Translate contentKey="check4FactsApp.article.home.notFound">No Articles found</Translate>
          </div>
        )
      )}
    </>
  )
};

const mapStateToProps = (storeState: IRootState) => ({
  isAuthenticated: storeState.authentication.isAuthenticated,
  articles: storeState.article.entities,
  loading: storeState.article.loading
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(ArticlesFeed);
