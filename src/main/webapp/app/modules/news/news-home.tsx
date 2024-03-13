import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Container, Row, Col, Button, InputGroup, Spinner, Tooltip } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, getSortState, translate } from 'react-jhipster';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';
import { getEntities, getSearchEntities } from 'app/entities/news/news.reducer';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import moment from 'moment';
import { debounce } from 'lodash';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export interface INewsHome extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

const NewsHome = (props: INewsHome) => {
  const { newsList, loading, totalItems, currentLocale, match, authenticated } = props;
  const [search, setSearch] = React.useState('');
  const [timeoutFunc, setTimeoutFunc] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState(null);
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const toggle = e => setTooltipOpen(state => (state !== e.target.id ? e.target.id : null));

  useEffect(() => {
    props.getEntities();
  }, []);

  const debounceSearch = (func, delay) => {
    return (...args) => {
      clearTimeout(timeoutFunc);
      setTimeoutFunc(
        setTimeout(() => {
          func(...args);
        }, delay)
      );
    };
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
    setPaginationState({ ...paginationState, activePage: 1 });
    props.getEntities();
  };

  const delayedStartSearching = debounceSearch(startSearching, 500);

  useEffect(() => {
    if (search.length > 0) {
      delayedStartSearching();
    } else {
      clearTimeout(timeoutFunc);
      props.getEntities();
    }
    return () => {
      clearTimeout(timeoutFunc);
    };
  }, [search]);

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  return (
    <>
      <Container>
        <Row className="mt-5 mt-sm-5 d-flex justify-content-center">
          <Col sm="10">
            <AvForm onSubmit={startSearching}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={search}
                    onChange={handleSearch}
                    placeholder={translate('check4FactsApp.news.home.search')}
                  />
                  <Button type="submit" className="input-group-addon" onClick={clear}>
                    {!loading && search.length === 0 ? (
                      <FontAwesomeIcon icon="search" />
                    ) : !loading && search.length > 0 ? (
                      <FontAwesomeIcon icon="times" />
                    ) : (
                      <Spinner style={{ height: '0.6rem', width: '0.75rem' }} size="lg">
                        Loading...
                      </Spinner>
                    )}
                  </Button>
                  {authenticated && (
                    <Button
                      tag={Link}
                      to={`${match.url}/new`}
                      className="input-group-addon"
                      id={'new-statement-button'}
                      style={{ alignItems: 'center', display: 'flex' }}
                      color="primary"
                    >
                      <Tooltip isOpen={tooltipOpen === `new-statement-button`} target={`new-statement-button`} toggle={toggle}>
                        <Translate contentKey="check4FactsApp.news.home.createLabel">Create new New</Translate>
                      </Tooltip>
                      <FontAwesomeIcon icon="plus" />
                    </Button>
                  )}
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        {newsList.length > 0 ? (
          newsList.map((news, i) => (
            <Row key={`${news.title}-${i}`} className="mt-5">
              <Col className="d-none d-sm-block" sm="2" style={{ borderRight: '1px solid rgba(0,0,0,0.2)' }}>
                <Row>
                  {authenticated ? (
                    <Col style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
                      <Col>
                      <Button
                        tag={Link}
                        to={`${match.url}/${news.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="warning"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${news.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <FontAwesomeIcon icon="trash" />
                      </Button>
                      </Col>
                      <Col>
                      <p style={{ fontSize: '2.5rem' }}>{moment.locale(currentLocale) && moment(news.date).format('D')}</p>
                      </Col>
                    </Col>
                  ) : (
                    <Col style={{ display: 'flex', justifyContent: 'right' }}>
                      <p style={{ fontSize: '2.5rem' }}>{moment.locale(currentLocale) && moment(news.date).format('D')}</p>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col style={{ display: 'flex', justifyContent: 'right', columnGap: '0.5rem' }}>
                    <p>{moment.locale(currentLocale) && moment(news.date).format('MMMM')}</p>
                    <p>{moment.locale(currentLocale) && moment(news.date).format('Y')}</p>
                  </Col>
                </Row>
              </Col>
              <Col xs="12" sm="8">
                <Row>
                  <Col style={{ display: 'flex', justifyContent: 'left', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>
                    <Link to={`/news/${news.id}`} className="news-link-color" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <p
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: 500,
                          textDecoration: 'underline',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {news.title}
                      </p>
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col style={{ display: 'flex', justifyContent: 'left' }}>
                    <p style={{ fontSize: '1rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {news.previewText}
                    </p>
                  </Col>
                </Row>
                <Row className="d-block d-sm-none">
                  <Col style={{ display: 'flex', justifyContent: 'left' }}>
                    <p className="text-muted" style={{ fontSize: '1rem', fontWeight: 500 }}>
                      {moment.locale(currentLocale) && moment(news.date).format('LL')}
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col sm="2" className="d-none d-sm-flex align-items-center">
                <Row>
                  <Col>
                    <Link to={`/news/${news.id}`} className="news-link-color">
                      <FontAwesomeIcon icon="angle-right" style={{ fontSize: '5rem' }} />
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          ))
        ) : (
          !loading && <Row>
            <Col sm="12" className="alert alert-warning">
              <Translate contentKey="check4FactsApp.news.home.notFound">No News found</Translate>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
};

const mapStateToProps = ({ news, locale, authentication }: IRootState) => ({
  newsList: news.entities,
  loading: news.loading,
  totalItems: news.totalItems,
  currentLocale: locale.currentLocale,
  authenticated: authentication.isAuthenticated,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NewsHome);
