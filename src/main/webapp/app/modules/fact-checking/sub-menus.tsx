import React, {useCallback, useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {IRootState} from 'app/shared/reducers';
import {RouteComponentProps} from 'react-router-dom';
import {Button, Col, Container, InputGroup, Row, Spinner} from 'reactstrap';
import {AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {JhiItemCount, JhiPagination, translate, Translate} from 'react-jhipster';
import {getArticlesByPublishedAndCategoryName, getSearchEntitiesInCategory, reset} from 'app/entities/article/article.reducer';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ArticlesFeed from 'app/shared/layout/templates/articles-feed';

export interface ISubMenusProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SubMenus = (props: ISubMenusProps) => {
  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState({
    query: '',
    activePage: 1,
    itemsPerPage: ITEMS_PER_PAGE
  });

  // INFINITE SCROLLING
  // const articleRef = useRef(null);

  // const lastArticleElement = useCallback((node) => {
  //   if(props.loading) return;
  //   if (articleRef.current) articleRef.current.disconnect();
  //   articleRef.current = new IntersectionObserver(entries => {
  //     if(entries[0].isIntersecting && paginationState.itemsPerPage  * paginationState.activePage <= props.totalItems){
  //       setPaginationState(prev => ({...prev, activePage: prev.activePage + 1}))
  //     }
  //   })
  //   if(node) articleRef.current.observe(node)
  // }, [props.loading])

  const handleOnClick = () => {
    setPaginationState(prev => ({...prev, activePage: prev.activePage + 1}));
  }

  const getEntities = () => {
    if (paginationState.activePage === 1)
      props.reset();

    if (paginationState.query) {
      props.getSearchEntitiesInCategory(
        paginationState.query,
        !props.isAuthenticated,
        props.match.params.id,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `_score,desc`
      );
    } else {
      props.getArticlesByPublishedAndCategoryName(
        !props.isAuthenticated,
        props.match.params.id,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `articleDate,desc`
      );
    }
  };

  const startSearching = () => {
    setPaginationState({
      ...paginationState,
      query: search,
      activePage: 1,
    });
  };

  const handleSearch = event => setSearch(event.target.value);

  useEffect(() => {
    props.reset();
  }, []);

  useEffect(() => {
    props.reset();
    setPaginationState(prev => ({...prev, activePage: 1}));
  }, [props.match.params.id]);


  useEffect(() => {
    getEntities();
  }, [props.isAuthenticated, paginationState.activePage, paginationState.query, props.match.params.id, paginationState.itemsPerPage]);



  const handlePagination = currentPage => {
    setSearch(paginationState.query);
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });
  }
  const { articlesByCategory, isAuthenticated } = props;

  return (
    <Container>
      <Row className="my-5">
        <Col sm="12" md={{size: 6, offset: 3}}>
          <h1 className="text-center">
            <Translate contentKey={`fact-checking.sub-menus.${props.match.params.id}`}/>
          </h1>
          <br/>
          <p>
            <Translate contentKey={`fact-checking.sub-menus.${props.match.params.id}-details`}/>
          </p>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <AvForm onSubmit={startSearching}>
            <AvGroup>
              <InputGroup>
                <AvInput
                  type="text"
                  name="search"
                  value={search}
                  onChange={handleSearch}
                  placeholder={translate('check4FactsApp.article.home.search')}
                />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                {/* <Button type="reset" className="input-group-addon" onClick={clear}>*/}
                {/*  <FontAwesomeIcon icon="trash" />*/}
                {/* </Button>*/}
              </InputGroup>
            </AvGroup>
          </AvForm>
        </Col>
      </Row>
      <ArticlesFeed />
      {/* INFINITE SCROLLING */}
      {/* <div ref={lastArticleElement} /> */}
      {props.totalItems >= 0 && props.loading === false ? (
        <div className="text-center">
        {paginationState.itemsPerPage * paginationState.activePage <= props.totalItems ?
        <>
        <Button onClick={handleOnClick}>{translate("home.load-button.hasLoad")}</Button>
        </>
        :
        <>
        {/* {translate("home.load-button.noLoad")} */}
        </>
        }
        </div>
        // <div className={articlesByCategory && articlesByCategory.length > 0 ? '' : 'd-none'}>
        //   <Row className="justify-content-center">
        //     <JhiItemCount
        //       page={paginationState.activePage}
        //       total={props.totalItems}
        //       itemsPerPage={paginationState.itemsPerPage}
        //       i18nEnabled
        //     />
        //   </Row>
        //   <Row className="justify-content-center">
        //     <JhiPagination
        //       activePage={paginationState.activePage}
        //       onSelect={handlePagination}
        //       maxButtons={5}
        //       itemsPerPage={paginationState.itemsPerPage}
        //       totalItems={props.totalItems}
        //     />
        //   </Row>
        // </div>
      ) : (
        <div className="text-center" >
        <Spinner size="lg" >
        Loading...
        </Spinner>
        </div>
      )}
    </Container>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  isAuthenticated: storeState.authentication.isAuthenticated,
  articlesByCategory: storeState.article.entities,
  loading: storeState.article.loading,
  totalItems: storeState.article.totalItems,
});

const mapDispatchToProps = {
  getArticlesByPublishedAndCategoryName,
  getSearchEntitiesInCategory,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubMenus);
