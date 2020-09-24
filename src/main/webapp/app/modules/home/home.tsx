import './home.scss';

import React, { useEffect } from 'react';
import _ from 'lodash';
import {translate, Translate} from 'react-jhipster';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Row, Col, Container, UncontrolledCarousel, Button } from 'reactstrap';
import { getMostRecentPublishedArticles } from 'app/entities/article/article.reducer';
import {Link} from "react-router-dom";
import moment from "moment";

export interface IHomeProp extends StateProps, DispatchProps {}

export const Home = (props: IHomeProp) => {
  const { articleList } = props;

  useEffect(() => {
    props.getMostRecentPublishedArticles(5);
  }, []);

  const slides = () => _.orderBy(articleList, art => moment(art.articleDate), ['desc']).filter(pubArt => pubArt.published).slice(0,5).map((article, idx) => ({
    src: article.previewImage ? `data:${article.previewImageContentType};base64,${article.previewImage}` : null,
    altText: `Slide ${idx}`,
    caption: article.previewText,
    header: <Link className="slider-header" to={`/article/${article.id}/display`}>{article.previewTitle}</Link>,
    key: `${idx}`
  }));

  const { isAuthenticated } = props;

  return (
    <Container fluid className="my-5">
      { isAuthenticated &&
        <Row className="my-5">
          <Col md={{ size: 2, offset: 5 }} className="py-4 bg-info">
            <Button tag={Link} to="/article" color="primary" style={{ display: 'block', margin: 'auto' }}>
              {translate("home.article.view")}
            </Button>
          </Col>
        </Row>
      }
      <Row className="my-5">
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <h1 className="text-center">
            <Translate contentKey="home.title" /><span className="check-4-fact">Check4Fact.gr</span>
          </h1>
          <p>
            <Translate contentKey="home.subtitle" />
          </p>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={{ size: 4, offset: 4 }}>
          <UncontrolledCarousel items={slides()} />
        </Col>
      </Row>
      <Row className="my-5">
        <Col className="text-center py-5 border-top" md={{ size: 6, offset: 3 }}>
          <h2>
            <Link className="text-primary" to="/fact-checking">
              <Translate contentKey="fact-checking.title" />
            </Link>
          </h2>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  articleList: storeState.article.entities
});

const mapDispatchToProps = {
  getMostRecentPublishedArticles
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
