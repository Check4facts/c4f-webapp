import './templates.scss';
import React from 'react';
import { Row, Col } from 'reactstrap';
import { Translate, translate } from "react-jhipster";
import {IRootState} from "app/shared/reducers";
import { connect } from 'react-redux';
import {Link} from "react-router-dom";

type IArticlesFeedProps = StateProps;

export const ArticlesFeed = (props: IArticlesFeedProps) => {

  const { articles, loading, isAuthenticated } = props;

  return (
    <>
      {articles && articles.length > 0 ? articles.map(article => (
        <div className="my-5 py-3 article-feed-entry" key={article.id} >
          <Row>
            <Col md={{ size: 10, offset: 1 }}>
              <h2><Link to={`/article/${article.id}/display`} className="text-primary">{article.previewTitle}</Link></h2>
            </Col>
          </Row>
          <Row className="py-2">
            <Col md={{ size: 3, offset: 1 }}>
              {article.previewImage
                ? <Link to={`/article/${article.id}/display`}><img className="img-fluid" src={`data:${article.previewImageContentType};base64,${article.previewImage}`} alt="previewImage" style={{ display: 'block', margin: 'auto' }} /></Link>
                : null
              }
            </Col>
            <Col md="7" className="border-left d-flex">
              <p className="article-feed-entry-content align-self-center">{article.previewText}</p>
              {isAuthenticated && !article.published && <p className="text-right text-danger text-uppercase">{translate('check4FactsApp.article.unpublished')}</p>}
            </Col>
          </Row>
        </div>
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
