import '../../../content/scss/home.scss';

import React, {useEffect, useState} from 'react';
import {translate} from 'react-jhipster';
import {connect} from 'react-redux';
import {IRootState} from 'app/shared/reducers';
import {Button, Container, Spinner, Row, Col} from 'reactstrap';
import {getAllPublishedArticles, getFrontPageArticles, getSearchEntities, reset} from 'app/entities/article/article.reducer';
import {RouteComponentProps} from 'react-router-dom';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import HomeCarousel from 'app/entities/homeCarousel/HomeCarousel';
import {AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import FrontPageFeed from 'app/shared/layout/templates/front-page-feed';

export interface IHomeProp extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export const Home = (props: IHomeProp) => {
  const {articles, totalItems, frontPageArticles} = props;
  const [paginationState, setPaginationState] = useState({
    query: '',
    activePage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    sort: 'articleDate',
    order: 'desc',
  });

  const [search, setSearch] = React.useState('');

  // INFINITE SCROLLING
  // const articleRef = useRef(null);

  // const lastArticleElement = useCallback((node) => {
  //   if (props.loading) return;
  //   if (articleRef.current) articleRef.current.disconnect();
  //   articleRef.current = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting && paginationState.itemsPerPage * paginationState.activePage <= totalItems) {
  //       setPaginationState(prev => ({...prev, activePage: prev.activePage + 1}))
  //     }
  //   })
  //   if (node) articleRef.current.observe(node)
  // }, [props.loading])

  const handleOnClick = () => {
    setPaginationState(prev => ({...prev, activePage: prev.activePage + 1}));
  }

  const getEntities = () => {
    if (paginationState.activePage === 1) {
      props.reset();
    }
    if (paginationState.query) {
      props.getSearchEntities(
        paginationState.query,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `_score,desc`,
        true
      );
    } else {
      props.getAllPublishedArticles(
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
      );
    }
  };


  useEffect(() => {
    props.getFrontPageArticles();
    props.reset();
  }, []);

  useEffect(() => {
    getEntities();
  }, [paginationState.activePage, paginationState.query, paginationState.itemsPerPage]);

  const handlePagination = currentPage => {
    setSearch(paginationState.query);
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });
  }

  const startSearching = () => {
    setPaginationState({
      ...paginationState,
      query: search,
      activePage: 1,
    });
  };

  return (
    <div>
      <HomeCarousel search={search} setSearch={setSearch} paginationState={paginationState}
                    setPaginationState={setPaginationState}/>
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
      <Container>
        <div className="home-mobile-search">
          <AvForm onSubmit={startSearching}>
            <AvGroup style={{display: "flex"}} className="home-search-group">
              <AvInput
                type="text"
                name="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                }}
                placeholder={translate('check4FactsApp.article.home.search')}
              />
              <Button>
                <FontAwesomeIcon icon="search" color='black'/>
              </Button>
            </AvGroup>
          </AvForm>
        </div>
        <FrontPageFeed />
        {/* <ArticlesFeed/> */}

        {/* INFINITE SCROLLING */}
        {/* <div ref={lastArticleElement}/> */}
        {/* {props.totalItems > 0 && !props.loading &&
          <div className="text-center mt-5">
            {paginationState.itemsPerPage * paginationState.activePage <= totalItems ?
              <>
                <Button onClick={handleOnClick}>{translate("home.load-button.hasLoad")}</Button>
              </> : <>
                {translate("home.load-button.noLoad")}
              </>
            }
          </div>} */}
        {props.loading &&
        <div className="text-center">
          <Spinner size="lg">
            Loading...
          </Spinner>
        </div>
        }
      </Container>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  totalItems: storeState.article.totalItems,
  articles: storeState.article.entities,
  loading: storeState.article.loading,
  frontPageArticles: storeState.article.frontPageArticles
});

const mapDispatchToProps = {
  getSearchEntities,
  getAllPublishedArticles,
  getFrontPageArticles,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
