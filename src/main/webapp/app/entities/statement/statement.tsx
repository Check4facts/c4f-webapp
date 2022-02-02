import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, InputGroup, Row, Table} from 'reactstrap';
import {AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {getSortState, JhiItemCount, JhiPagination, TextFormat, Translate, translate,} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {IRootState} from 'app/shared/reducers';
import {getEntities, getSearchEntities} from './statement.reducer';
import {APP_DATE_FORMAT, AUTHORITIES} from 'app/config/constants';
import {ITEMS_PER_PAGE} from 'app/shared/util/pagination.constants';
import {overridePaginationStateWithQueryParams} from 'app/shared/util/entity-utils';
import {hasAnyAuthority} from 'app/shared/auth/private-route';

export interface IStatementProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {
}

export const Statement = (props: IStatementProps) => {
  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

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
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
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
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort, search]);

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

  const {statementList, match, loading, totalItems, isAdmin} = props;
  return (
    <div>
      <h2 id="statement-heading">
        <Translate contentKey="check4FactsApp.statement.home.title">Statements</Translate>
      </h2>
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
                  placeholder={translate('check4FactsApp.statement.home.search')}
                />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search"/>
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="backspace"/>
                </Button>
              </InputGroup>
            </AvGroup>
          </AvForm>
        </Col>
      </Row>
      <div className="table-responsive">
        {statementList && statementList.length > 0 ? (
          <Table responsive>
            <thead>
            <tr>
              <th className="hand" onClick={sort('id')}>
                <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('text')}>
                <Translate contentKey="check4FactsApp.statement.text">Text</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('author')}>
                <Translate contentKey="check4FactsApp.statement.author">Author</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th>
                <Translate contentKey="check4FactsApp.article.author">Author</Translate>
              </th>
              <th className="hand" onClick={sort('statementDate')}>
                <Translate contentKey="check4FactsApp.statement.statementDate">Statement Date</Translate>
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('publicationDate')}>
                <Translate contentKey="check4FactsApp.statement.publicationDate">Publication Date</Translate>
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th className="hand" onClick={sort('registrationDate')}>
                <Translate contentKey="check4FactsApp.statement.registrationDate">Registration Date</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              {/* <th className="hand" onClick={sort('mainArticleText')}>*/}
              {/*  <Translate contentKey="check4FactsApp.statement.mainArticleText">Main Article Text</Translate>{' '}*/}
              {/*  <FontAwesomeIcon icon="sort" />*/}
              {/* </th>*/}
              <th className="hand" onClick={sort('mainArticleUrl')}>
                <Translate contentKey="check4FactsApp.statement.mainArticleUrl">Main Article Url</Translate>{' '}
                <FontAwesomeIcon icon="sort"/>
              </th>
              <th>
                <Translate contentKey="check4FactsApp.statement.topic">Topic</Translate> <FontAwesomeIcon icon="sort"/>
              </th>
              <th>
                <Translate contentKey="check4FactsApp.statement.subTopics">Sub Topics</Translate> <FontAwesomeIcon
                icon="sort"/>
              </th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {statementList.map((statement, i) => (
              <tr key={`entity-${i}`}>
                <td>
                  {statement.id}
                </td>
                <td>{statement.text}</td>
                <td>{statement.author}</td>
                <td>{statement.article? statement.article.author : 'N/A'}</td>
                <td>
                  {statement.statementDate ?
                    <TextFormat type="date" value={statement.statementDate} format={APP_DATE_FORMAT}/> : null}
                </td>
                <td>
                  {statement.publicationDate ?
                    <TextFormat type="date" value={statement.publicationDate} format={APP_DATE_FORMAT}/> : null}
                </td>
                <td>
                  {statement.registrationDate ? (
                    <TextFormat type="date" value={statement.registrationDate} format={APP_DATE_FORMAT}/>
                  ) : null}
                </td>
                {/* <td>{statement.mainArticleText}</td>*/}
                <td style={{
                  MozHyphens: "auto",
                  msHyphens: "auto",
                  msWordBreak: "break-all",
                  WebkitHyphens: "auto",
                  hyphens: "auto",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                  wordWrap: "break-word"
                }}><a href={statement.mainArticleUrl} target="_blank"
                      rel="noopener noreferrer">{statement.mainArticleUrl}</a></td>
                <td>{statement.topic ? translate(`fact-checking.sub-menus.${statement.topic.name}`) : ''}</td>
                <td>{statement.subTopics.join(', ')}</td>
                <td className="text-right">
                  <div className="btn-group flex-btn-group-container">
                    <Button
                      tag={Link}
                      to={`${match.url}/${statement.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                      color="primary"
                      size="md"
                    >
                      <FontAwesomeIcon icon="pencil-alt"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                    </Button>
                    <Button tag={Link} to={`/fact-checking/analyze/${statement.id}`} color="warning" size="md">
                      <FontAwesomeIcon icon="sync"/>{' '}
                      <span className="d-none d-md-inline">
                          <Translate contentKey="fact-checking.analyze.button"/>
                        </span>
                    </Button>
                    <Button
                      tag={Link}
                      to={`${match.url}/${statement.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                      color="danger"
                      size="md">
                      <FontAwesomeIcon icon="trash"/>{' '}
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
              <Translate contentKey="check4FactsApp.statement.home.notFound">No Statements found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={statementList && statementList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems}
                          itemsPerPage={paginationState.itemsPerPage} i18nEnabled/>
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

const mapStateToProps = ({statement, authentication}: IRootState) => ({
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
