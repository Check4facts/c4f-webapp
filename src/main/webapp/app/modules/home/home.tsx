import '../../../content/scss/home.scss';

import React, { useEffect, useState } from 'react';
import { JhiItemCount, JhiPagination, Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Col, Row } from 'reactstrap';
import { getAllPublishedArticles } from 'app/entities/article/article.reducer';
import { RouteComponentProps } from 'react-router-dom';
import ArticlesFeed from 'app/shared/layout/templates/articles-feed';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import HomeCarousel from 'app/entities/homeCarousel/HomeCarousel';

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Home = (props: IHomeProp) => {
  // const { carouselItems } = props;
  const [paginationState, setPaginationState] = useState({
    activePage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    sort: 'articleDate',
    order: 'desc',
  });

  const getPublishedEntities = () => {
    props.getAllPublishedArticles(
      paginationState.activePage - 1,
      paginationState.itemsPerPage,
      `${paginationState.sort},${paginationState.order}`
    );
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    // props.getCarouselArticles(5);
    getPublishedEntities();
  }, []);

  useEffect(() => {
    getPublishedEntities();
  }, [paginationState.activePage]);

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  /*
    const slides = () => carouselItems.map((article, idx) => ({
      src: article.previewImage ? `data:${article.previewImageContentType};base64,${article.previewImage}` : null,
      altText: `Slide ${idx}`,
      caption: <span className="slider-text container-fluid d-none d-md-block">{article.previewText}</span>,
      header: <>
                <Link className="slider-header container-fluid" to={`/article/${article.id}/display`}>{article.previewTitle}</Link><br/>
                <span className={`fact-checker-label ${article.statement && article.statement.factCheckerLabel ? 'label-true' : 'label-false'}`}>
                  {article.statement ?( article.statement.factCheckerLabel ? 'Ακριβής' : 'Ανακριβής') : null}
                </span>
              </>,
      key: `${idx}`
    }));
  */

  return (
    <div>
      <div className={`${paginationState.activePage > 1 && 'd-none'}`}>
        <Row className="mb-5">
          <Col sm="12">
            <div className="text-center">
              <h1 className="text-center mt-5">
                <Translate contentKey="home.title" />
                <span className="check-4-fact">Check4Facts.gr</span>
              </h1>
              <p className="text-secondary fs-15">
                <Translate contentKey="home.subtitle" />
              </p>
            </div>
          </Col>
        </Row>
      </div>
      <HomeCarousel />
      <ArticlesFeed />
      {props.totalItems ? (
        <div className={props.totalItems > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount
              page={paginationState.activePage}
              total={props.totalItems}
              itemsPerPage={paginationState.itemsPerPage}
              i18nEnabled
            />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  totalItems: storeState.article.totalItems,
  // carouselItems: storeState.article.carouselItems
});

const mapDispatchToProps = {
  // getCarouselArticles,
  getAllPublishedArticles,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
