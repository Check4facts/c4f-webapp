import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table, Input, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import {
  openFile,
  byteSize,
  Translate,
  translate,
  TextFormat,
  getSortState,
  JhiPagination,
  JhiItemCount,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities, updateEntity, getArticlesByPublishedAndCategoryName } from './article.reducer';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { ICategory } from 'app/shared/model/category.model';
import { IArticle } from 'app/shared/model/article.model';

export interface IArticleProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Article = (props: IArticleProps) => {
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    if (search) {
      props.getSearchEntities(
        search,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`,
        false
      );
    } else {
      props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
    }
  };

  const startSearching = () => {
    if (search) {
      setPaginationState({
        ...paginationState,
        activePage: 1,
      });
      props.getSearchEntities(
        search,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`,
        false
      );
    }
  };

  const clear = () => {
    setSearch('');
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    props.getCategories();
  }, [])

  useEffect(() => {
    if(`${categoryId}` !== '0') {
      props.getArticlesByPublishedAndCategoryName(false, props.categories[categoryId-1].name, paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
    } else {
      sortEntities();
    }
  }, [paginationState.activePage, paginationState.order, paginationState.sort, categoryId]);

  useEffect(() => {
    if(search === '') {
      sortEntities();
    }
  }, [search])

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

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const togglePublished = (article: IArticle) => () => {
    const entity = {
      ...article,
      published: !article.published
    };

    if (article.statement !== null) {
      props.updateEntity({
        ...entity,
        statement: {
          id: article.statement.id
        }
      })
    } else {
      props.updateEntity(entity);
    }
  }

  const dropDownCategories: ICategory[] = [
    {
      id: 0,
      name: 'all'
    }
  ]

  const { articleList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="article-heading">
        <Translate contentKey="check4FactsApp.article.home.title">Articles</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="check4FactsApp.article.home.createLabel">Create new Article</Translate>
        </Link>
      </h2>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
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
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="backspace" />
                </Button>
              </InputGroup>
            </AvGroup>
          </AvForm>
        </Col>
      </Row>
      <Row>
        <Col md={{ size: 3, offset: 5 }}>
          <InputGroup>
            <Label for="article-category" className="mx-1 p-2">
              <Translate contentKey="check4FactsApp.article.category">Category</Translate>
            </Label>
            <Input
              id="article-category"
              type="select"
              name="category.id"
              onChange={e => setCategoryId(e.target.value)}
              value={categoryId}
            >
              {props.categories
                ? dropDownCategories.concat(props.categories).map(otherEntity => (
                  <option value={otherEntity.id} key={otherEntity.id}>
                    {translate(`check4FactsApp.category.${otherEntity.name}`)}
                  </option>
                ))
                : null}
            </Input>
          </InputGroup>
        </Col>
      </Row>
      <div className="table-responsive">
        {articleList && articleList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="check4FactsApp.article.previewTitle">Preview Title</Translate>
                </th>
                <th>
                  <Translate contentKey="check4FactsApp.article.previewText">Preview Text</Translate>
                </th>
                <th>
                  <Translate contentKey="check4FactsApp.article.category">Category</Translate>
                </th>
                <th>
                  <Translate contentKey="check4FactsApp.article.author">Author</Translate>
                </th>
                <th>
                  <Translate contentKey="check4FactsApp.article.previewImage">Preview Image</Translate>
                </th>
                <th className="hand" onClick={sort('articleDate')}>
                  <Translate contentKey="check4FactsApp.article.articleDate">Article Date</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="check4FactsApp.article.statement">Statement</Translate>
                </th>
                <th/>
                <th />
              </tr>
            </thead>
            <tbody>
              {articleList.map((article, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${article.id}`} color="link" size="sm">
                      {article.id}
                    </Button>
                  </td>
                  <td>{article.previewTitle}</td>
                  <td>{article.previewText}</td>
                  <td>{article.category ? <Translate contentKey={`check4FactsApp.category.${article.category.name}`}/> : ''}</td>
                  <td>{article.author}</td>
                  <td>
                    {article.previewImage ? (
                      <div>
                        {article.previewImageContentType ? (
                          <a onClick={openFile(article.previewImageContentType, article.previewImage)}>
                            <img
                              src={`data:${article.previewImageContentType};base64,${article.previewImage}`}
                              style={{ maxHeight: '30px' }} alt="previewImage"
                            />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {article.previewImageContentType}, {byteSize(article.previewImage)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{article.articleDate ? <TextFormat type="date" value={article.articleDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{article.statement ? <Link to={`statement/${article.statement.id}`}>{article.statement.id}</Link> : ''}</td>
                  <td>
                    <Button
                      color={article.published ? 'success' : 'danger' }
                      onClick={togglePublished(article)}
                      style={{
                        display: 'block',
                        margin:'auto'
                      }}
                    >
                      {translate(`check4FactsApp.article.${article.published ? 'published' : 'unpublished'}`)}
                    </Button>
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${article.id}/display`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="check4FactsApp.article.display" />
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${article.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${article.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="check4FactsApp.article.home.notFound">No Articles found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={articleList && articleList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
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
  articleList: storeState.article.entities,
  categories: storeState.category.entities,
  loading: storeState.article.loading,
  totalItems: storeState.article.totalItems,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  getCategories,
  getArticlesByPublishedAndCategoryName,
  updateEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Article);
