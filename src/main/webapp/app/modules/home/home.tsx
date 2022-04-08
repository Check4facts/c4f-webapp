import '../../../content/scss/home.scss';

import React, {useEffect, useState} from 'react';
import {JhiItemCount, JhiPagination} from 'react-jhipster';
import {connect} from 'react-redux';
import {IRootState} from 'app/shared/reducers';
import {Container, Row} from 'reactstrap';
import {getAllPublishedArticles, getSearchEntities} from 'app/entities/article/article.reducer';
import {RouteComponentProps} from 'react-router-dom';
import ArticlesFeed from 'app/shared/layout/templates/articles-feed';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import HomeCarousel from 'app/entities/homeCarousel/HomeCarousel';

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Home = (props: IHomeProp) => {
  // const { carouselItems } = props;
  const [paginationState, setPaginationState] = useState({
    query: '',
    activePage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    sort: 'articleDate',
    order: 'desc',
  });

  const [search, setSearch] = React.useState('');


  const getEntities = () => {
    if (paginationState.query) {
      props.getSearchEntities(
        paginationState.query,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `_score,desc`,
        true
      );
    } else
      props.getAllPublishedArticles(
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
      );

  };

/*
  useEffect(() => {
   search === '' && getPublishedEntities();
  }, []);
*/

  useEffect(() => {
   getEntities();
  }, [paginationState.activePage, paginationState.query]);

  const handlePagination = currentPage => {
    setSearch(paginationState.query);
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });
  }

  return (
    <div>
      <HomeCarousel search={search} setSearch={setSearch} paginationState={paginationState} setPaginationState={setPaginationState}/>
      {/* <div className={`${paginationState.activePage > 1 && 'd-none'}`}>
        <Row className="mb-5">
          <Col sm="12">
            <div className="text-center">
              <h1 className="text-center mt-5">
                <Translate contentKey="home.title" />
              </h1>
              <p className="text-secondary fs-15">
                <Translate contentKey="home.subtitle" />
              </p>
            </div>
          </Col>
        </Row>
      </div> */}
      <Container >
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
       </Container>
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
  getSearchEntities,
  getAllPublishedArticles,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
