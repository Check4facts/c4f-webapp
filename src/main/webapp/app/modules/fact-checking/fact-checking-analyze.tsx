import './fact-checking.scss'
import moment from "moment";
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Translate, translate } from 'react-jhipster';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Table, Button, Container, Spinner } from 'reactstrap';
import { setFact, analyzeStatement } from "app/modules/fact-checking/fact-checking.reducer";
import { getEntity as getStatement, updateEntity as updateStatement } from 'app/entities/statement/statement.reducer';
import { getStatementSourcesByStatement } from 'app/entities/statement-source/statement-source.reducer';
import { countFeatureStatementsByStatement } from 'app/entities/feature-statement/feature-statement.reducer';
import { convertDateTimeToServer } from 'app/shared/util/date-utils';
import { APP_LOCAL_DATETIME_FORMAT } from 'app/config/constants';

export interface IFactCheckAnalyzeProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FactCheckingAnalyze = (props: IFactCheckAnalyzeProps) => {

  useEffect(() => {
    props.setFact(props.match.params.id);
    props.getStatement(props.match.params.id);
    props.getStatementSourcesByStatement(props.match.params.id);
    props.countFeatureStatementsByStatement(props.match.params.id);
  }, []);

  const { currentLocale, statement, sLoading, ssLoading, statementSources, analyzeLoading, featureStatementCount } = props;

  const analyze = () => {
    // FIXME Remove those ugly ignores when got the time.
    const entity = {
      ...statement,
      registrationDate: convertDateTimeToServer(moment().format(APP_LOCAL_DATETIME_FORMAT)),
      statementSources: [...statementSources],
      resources: []
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    props.analyzeStatement(entity);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    props.updateStatement({
      ...entity
    });
  };


  return sLoading || ssLoading ? (
    <div>
      <Spinner style={{ width: '5rem', height: '5rem', margin: '10% 0 10% 45%' }} color="dark" />
    </div>
  ) : (
    <>
      <Container>
        <Row className="text-center my-5 text-primary">
          <Col>
            <h1>{translate('fact-checking.title')}</h1>
          </Col>
        </Row>
        <Row className="text-center my-3 text-info">
          <Col>
            <h3>{translate("fact-checking.analyze.statement")}</h3>
          </Col>
        </Row>
        <Row className="text-center my-3">
          <Col>
            <h5>{statement.text}</h5>
          </Col>
        </Row>
        <Row className="text-center my-3 text-info">
          <Col>
            <h4>{translate("check4FactsApp.statement.author")}</h4>
          </Col>
          <Col>
            <h4>{translate("check4FactsApp.statement.statementDate")}</h4>
          </Col>
        </Row>
        <Row className="text-center my-3">
          <Col>
            <h5>{statement.author}</h5>
          </Col>
          <Col>
            <h5>{moment.locale(currentLocale) && moment(statement.statementDate).format("LL")}</h5>
          </Col>
        </Row>
        <Row className="text-center my-3 text-info">
          <Col><h4>{translate("check4FactsApp.statement.topic")}</h4></Col>
          <Col><h4>{translate("check4FactsApp.statement.subTopics")}</h4></Col>
        </Row>
        <Row  className="text-center my-3">
          <Col><h5>{statement.topic && translate(`fact-checking.sub-menus.${statement.topic.name}`)}</h5></Col>
          <Col><h5>{statement.subTopics && statement.subTopics.map(subTopic => subTopic.name).join(",")}</h5></Col>
        </Row>
        <Row className="text-center my-3 text-info">
          <Col>
            <h3>{translate("check4FactsApp.statement.mainArticleText")}</h3>
          </Col>
        </Row>
        <Row className="text-center my-3">
          <Col>
            <h5>{statement.mainArticleText}</h5>
          </Col>
        </Row>
        <Row className="text-center my-3 text-info">
          <Col>
            <h3>{translate("check4FactsApp.statement.mainArticleUrl")}</h3>
          </Col>
        </Row>
        <Row className="text-center my-3">
          <Col>
            <h5><a href={statement.mainArticleUrl} target="_blank" rel="noopener noreferrer">{statement.mainArticleUrl}</a></h5>
          </Col>
        </Row>
        <Row className="text-center my-3 text-info">
          <Col>
            <h3>{translate("check4FactsApp.statement.statementSources")}</h3>
            <p className="text-muted">εισηγμένες από τον ειδικό ελεγκτή δήλωσης</p>
          </Col>
        </Row>
        <Row className="my-3">
          {statementSources.length > 0 ? (
            <Col>
              <Table responsive>
                <thead>
                <tr>
                  <th>AA</th>
                  <th>
                    <Translate contentKey="check4FactsApp.statementSource.url">Url</Translate>
                  </th>
                  <th>
                    <Translate contentKey="check4FactsApp.statementSource.title">Title</Translate>
                  </th>
                  <th>
                    <Translate contentKey="check4FactsApp.statementSource.snippet">Snippet</Translate>
                  </th>
                </tr>
                </thead>
                <tbody>
                {statementSources.map((statementSource, i) => (
                  <tr key={`entity-${i}`}>
                    <td>{i+1}</td>
                    <td><a href={statementSource.url} target="_blank" rel="noopener noreferrer">{statementSource.url}</a></td>
                    <td>{statementSource.title}</td>
                    <td>{statementSource.snippet}</td>
                  </tr>
                ))}
                </tbody>
              </Table>
            </Col>
          ) : (
            <Col md={{ size: 4, offset: 4 }} className="alert alert-warning text-center">
              <Translate contentKey="fact-checking.check.statementSources.notAdded"/>
            </Col>
          )}
        </Row>
        <Row className="my-3">
          {
             featureStatementCount > 0 ? (
              <Col className="d-flex justify-content-center" md={{ size: 2, offset: 5 }}>
                <Button tag={Link} to={`/fact-checking/results/${statement.id}`} color="info">
                  {translate("fact-checking.results.title")}
                </Button>
              </Col>
            ) : (
              statement.registrationDate === null ? (
                !analyzeLoading && !sLoading ? (
                  <Col className="d-flex justify-content-center" md={{ size: 2, offset: 5 }}>
                    <Button color="primary" onClick={analyze}>
                      {translate("fact-checking.analyze.button")}
                    </Button>
                  </Col>
                ) : (
                  <Col className="d-flex justify-content-center" md={{ size: 2, offset: 5 }}>
                    <Button color="primary">
                      <Spinner size="sm" color="dark" />
                    </Button>
                  </Col>
                )
              ) : (
                <Col className="d-flex justify-content-center alert alert-info py-3" md={{ size: 4, offset: 4 }} style={{ borderRadius: '30px' }}>
                  Το αίτημα ανάλυσης είναι υπό επεξεργασία
                </Col>
              )
            )
          }
        </Row>
      </Container>
    </>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  currentLocale: storeState.locale.currentLocale,
  statement: storeState.statement.entity,
  statementUpdateSuccess: storeState.statement.updateSuccess,
  statementSources: storeState.statementSource.entities,
  sLoading: storeState.statement.loading,
  ssLoading: storeState.statementSource.loading,
  featureStatementCount: storeState.featureStatement.count,
  analyzeLoading: storeState.factChecking.analyzeLoading
});

const mapDispatchToProps = {
  setFact,
  getStatement,
  updateStatement,
  getStatementSourcesByStatement,
  countFeatureStatementsByStatement,
  analyzeStatement
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FactCheckingAnalyze);
