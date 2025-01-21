import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, InputGroup, Row, Table, Tooltip, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { getSortState, JhiItemCount, JhiPagination, TextFormat, Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, getSearchEntities } from './statement.reducer';
import { APP_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export interface IStatementProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Statement = (props: IStatementProps) => {
  const [search, setSearch] = useState('');
  const [tooltipOpen, setTooltipOpen] = useState(null);
  const toggle = e => setTooltipOpen(state => (state !== e.target.id ? e.target.id : null));
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const shortenURL = (url, maxLength) => {
    if (url.length <= maxLength) return url;
    const ellipsis = '...';
    const domainIndex = url.indexOf('//') + 2;
    const pathIndex = url.indexOf('/', domainIndex);
    const domain = url.substring(0, pathIndex);
    const path = url.substring(pathIndex);
    const shortenedPath = path.substring(0, maxLength - (domain.length + ellipsis.length));
    return domain + shortenedPath + ellipsis;
  };

  const shortenStatementText = text => `${text.substring(0, 60)}${text.length > 60 ? '...' : ''}`;

  const getAllEntities = () => {
    if (search) {
      props.getSearchEntities(
        search,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
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
        paginationState.itemsPerPage
        // `${paginationState.sort},${paginationState.order}`
      );
    }
  };

  const clear = () => {
    setSearch('');
    setPaginationState({
      ...paginationState,
      activePage: 1,
    });
    props.getEntities(0, 12, `${paginationState.sort},${paginationState.order}`);
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
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

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

  const { statementList, match, loading, totalItems, isAdmin } = props;
  return (
    <div>
      <Row style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem', paddingBottom: '2rem' }}>
        <Col sm="12" style={{ display: 'flex', justifyContent: 'center' }}>
          <h2 id="statement-heading">
            <Translate contentKey="check4FactsApp.statement.home.title">Statements</Translate>
          </h2>
        </Col>
      </Row>
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <Col sm="12" md="8">
          <AvForm onSubmit={startSearching}>
            <AvGroup>
              <InputGroup>
                <AvInput
                  type="text"
                  name="search"
                  value={search}
                  onChange={handleSearch}
                  placeholder={translate('check4FactsApp.statement.home.search')}
                />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="backspace" />
                </Button>
                {/* <Link to={`/fact-checking`}> */}
                <Button
                  tag={Link}
                  to="/fact-checking"
                  className="input-group-addon"
                  id={'new-statement-button'}
                  style={{ alignItems: 'center', display: 'flex' }}
                  color="primary"
                >
                  <FontAwesomeIcon icon="plus" />
                  {/* &nbsp;
              <Translate contentKey="check4FactsApp.statement.home.createLabel">Create new Statement</Translate> */}
                </Button>
                <Tooltip isOpen={tooltipOpen === `new-statement-button`} target={`new-statement-button`} toggle={toggle}>
                  <Translate contentKey="check4FactsApp.statement.home.createLabel">Create new Article</Translate>
                </Tooltip>
                {/* </Link> */}
              </InputGroup>
            </AvGroup>
          </AvForm>
        </Col>
        {/* <Col sm="12" md="6">
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="check4FactsApp.article.home.createLabel">Create new Article</Translate>
        </Link>
        </Col> */}
      </Row>
      <div className="table-responsive" style={{ paddingLeft: '2%', paddingRight: '2%' }}>
        {statementList && statementList.length > 0 ? (
          <Table responsive hover bordered size="sm">
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <span style={{ display: 'flex' }}>
                    <Translate contentKey="global.field.id">ID</Translate>
                    <FontAwesomeIcon icon="sort" />
                  </span>
                </th>
                <th>
                  <Translate contentKey="check4FactsApp.statement.text">Text</Translate>
                </th>
                <th>
                  <Translate contentKey="check4FactsApp.statement.author">Author</Translate>
                </th>
                <th>
                  <Translate contentKey="check4FactsApp.article.author">Author</Translate>
                </th>
                <th className="hand" onClick={sort('statementDate')}>
                  <Translate contentKey="check4FactsApp.statement.statementDate">Statement Date</Translate>
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('publicationDate')}>
                  <Translate contentKey="check4FactsApp.statement.publicationDate">Publication Date</Translate>
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('articleDateUpdated')}>
                  <Translate contentKey="check4FactsApp.article.articleDateUpdated">Article Update Date</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('registrationDate')}>
                  <Translate contentKey="check4FactsApp.statement.registrationDate">Registration Date</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                {/* <th className="hand" onClick={sort('mainArticleText')}>*/}
                {/*  <Translate contentKey="check4FactsApp.statement.mainArticleText">Main Article Text</Translate>{' '}*/}
                {/*  <FontAwesomeIcon icon="sort" />*/}
                {/* </th>*/}
                <th className="hand">
                  <Translate contentKey="check4FactsApp.statement.mainArticleUrl">Main Article Url</Translate>{' '}
                </th>
                <th>
                  <Translate contentKey="check4FactsApp.statement.topic">Topic</Translate>
                </th>
                <th>
                  <Translate contentKey="check4FactsApp.statement.subTopics">Sub Topics</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {statementList.map((statement, i) => (
                <tr key={`entity-${i}`}>
                  <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{statement.id}</td>
                  <td style={{ verticalAlign: 'middle' }}>
                    <p title={statement.text}>{shortenStatementText(statement.text)}</p>
                  </td>
                  <td style={{ verticalAlign: 'middle' }}>{statement.author}</td>
                  <td style={{ verticalAlign: 'middle' }}>{statement.article ? statement.article.author : 'N/A'}</td>
                  <td style={{ verticalAlign: 'middle' }}>
                    {statement.statementDate ? <TextFormat type="date" value={statement.statementDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td style={{ verticalAlign: 'middle' }}>
                    {statement.publicationDate ? (
                      <TextFormat type="date" value={statement.publicationDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td style={{ verticalAlign: 'middle' }}>
                    {statement.article?.articleDateUpdated ? (
                      <TextFormat type="date" value={statement.article.articleDateUpdated} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td style={{ verticalAlign: 'middle' }}>
                    {statement.registrationDate ? (
                      <TextFormat type="date" value={statement.registrationDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  {/* <td>{statement.mainArticleText}</td>*/}
                  <td style={{ verticalAlign: 'middle' }}>
                    <a href={statement.mainArticleUrl} target="_blank" rel="noopener noreferrer">
                      {shortenURL(statement.mainArticleUrl, 30)}
                    </a>
                  </td>
                  <td style={{ verticalAlign: 'middle' }}>
                    {statement.topic ? translate(`fact-checking.sub-menus.${statement.topic.name}`) : ''}
                  </td>
                  <td style={{ verticalAlign: 'middle' }}>{statement.subTopics.join(', ')}</td>
                  <td className="text-right" style={{ verticalAlign: 'middle' }}>
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`${match.url}/${statement.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="md"
                        id={`Tooltip-Edit-${i}`}
                      >
                        <FontAwesomeIcon icon="pencil-alt" />
                      </Button>
                      <Button tag={Link} to={`/fact-checking/report/${statement.id}`} color="warning" size="md" id={`Tooltip-Analyze-${i}`}>
                        <FontAwesomeIcon icon="file-alt" />
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${statement.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        id={`Tooltip-Delete-${i}`}
                        size="md"
                      >
                        <FontAwesomeIcon icon="trash" />
                      </Button>
                      <Tooltip isOpen={tooltipOpen === `Tooltip-Edit-${i}`} target={`Tooltip-Edit-${i}`} toggle={toggle}>
                        <Translate contentKey="entity.action.editAlt">Edit</Translate>
                      </Tooltip>
                      <Tooltip isOpen={tooltipOpen === `Tooltip-Analyze-${i}`} target={`Tooltip-Analyze-${i}`} toggle={toggle}>
                        <Translate contentKey="entity.action.editArticle" />
                      </Tooltip>
                      <Tooltip isOpen={tooltipOpen === `Tooltip-Delete-${i}`} target={`Tooltip-Delete-${i}`} toggle={toggle}>
                        <Translate contentKey="entity.action.delete">Delete</Translate>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="check4FactsApp.statement.home.notFound">No Statements found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={statementList && statementList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </Row>
          <Row style={{ display: 'flex', justifyContent: 'center' }}>
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={3}
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

const mapStateToProps = ({ statement, authentication }: IRootState) => ({
  statementList: statement.entities,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  loading: statement.loading,
  totalItems: statement.totalItems,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Statement);
