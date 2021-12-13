import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { RouteComponentProps } from 'react-router-dom';
import { Row, Container, Col, Button, InputGroup } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { getSortState, JhiItemCount, JhiPagination, translate, Translate } from 'react-jhipster';
import { getArticlesByPublishedAndCategoryName, getSearchEntitiesInCategory } from 'app/entities/article/article.reducer';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ArticlesFeed from 'app/shared/layout/templates/articles-feed';

export interface ISubMenusProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SubMenus = (props: ISubMenusProps) => {
  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    if (search) {
      props.getSearchEntitiesInCategory(
        search,
        !props.isAuthenticated,
        props.match.params.id,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
      );
    } else {
      props.getArticlesByPublishedAndCategoryName(
        !props.isAuthenticated,
        props.match.params.id,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
      );
    }
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  const startSearching = () => {
    if (search) {
      setPaginationState({
        ...paginationState,
        activePage: 1,
      });
      props.getSearchEntitiesInCategory(
        search,
        !props.isAuthenticated,
        props.match.params.id,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
      );
    }
  };

  const handleSearch = event => setSearch(event.target.value);

  // const clear = () => {
  //   setSearch('');
  //   setPaginationState({
  //     ...paginationState,
  //     activePage: 1,
  //   });
  //   props.getArticlesByPublishedAndCategoryName(!props.isAuthenticated, props.match.params.id);
  // };

  useEffect(() => {
    sortEntities();
  }, [props.isAuthenticated, paginationState.activePage, paginationState.order, paginationState.sort, props.match.params.id]);

  useEffect(() => {
    if (search === '') {
      sortEntities();
    }
  }, [search]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const { articlesByCategory, isAuthenticated } = props;

  return (
    <Container>
      <Row className="my-5">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h1 className="text-center">
            <Translate contentKey={`fact-checking.sub-menus.${props.match.params.id}`} />
          </h1>
          <br />
          {props.match.params.id === 'immigration' ? (
            <p>
              <Translate contentKey={`fact-checking.sub-menus.immigration-details`} />
            </p>
          ) : (
            <p>
              <Translate contentKey={`fact-checking.sub-menus.crime-details`} />
            </p>
          )}
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
      <ArticlesFeed showButtons />
      {props.totalItems ? (
        <div className={articlesByCategory && articlesByCategory.length > 0 ? '' : 'd-none'}>
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
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SubMenus);
