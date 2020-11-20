import './fact-checking.scss'
import moment from "moment";
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Translate, translate } from 'react-jhipster';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Table, Button, Container, Spinner } from 'reactstrap';
import { setFact, setURLs, searchHarvestStatement } from "app/modules/fact-checking/fact-checking.reducer";
import { getEntity as getStatement, updateEntity as updateStatement } from 'app/entities/statement/statement.reducer';
import { getStatementSourcesByStatement } from 'app/entities/statement-source/statement-source.reducer';
import { getResourcesByStatement } from 'app/entities/resource/resource.reducer';
import { IResource } from 'app/shared/model/resource.model';
import { convertDateTimeToServer } from 'app/shared/util/date-utils';
import { APP_LOCAL_DATETIME_FORMAT } from 'app/config/constants';

export interface IFactCheckHarvestProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FactCheckingHarvest = (props: IFactCheckHarvestProps) => {

  useEffect(() => {
    props.setFact(props.match.params.id);
    props.getStatement(props.match.params.id);
    props.getStatementSourcesByStatement(props.match.params.id);
    props.getResourcesByStatement(props.match.params.id);
  }, []);

  const { statement, sLoading, ssLoading, rLoading, statementSources, resources, searchHarvestLoading } = props;

  const searchAndHarvest = () => {
    // FIXME Remove those ugly ignores when got the time.
    const entity = {
      ...statement,
      registrationDate: convertDateTimeToServer(moment().format(APP_LOCAL_DATETIME_FORMAT)),
      statementSources: [...statementSources]
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    props.searchHarvestStatement(entity);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    props.updateStatement({
      ...entity,
      resources: [...resources]
    });
  };

  const resourcesForDisplay: IResource[] = (resources && resources.length > 0) ? [...resources] : []

  return sLoading || ssLoading || rLoading ? (
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
        <Row className="text-center my-3">
          <Col>
            <h2>{translate("fact-checking.harvest.title")}</h2>
          </Col>
        </Row>
        <Row className="text-center my-3 text-info">
          <Col>
            <h3>{translate("fact-checking.harvest.statement")}</h3>
          </Col>
        </Row>
        <Row className="text-center my-3">
          <Col>
            <h5>{statement.text}</h5>
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
            resourcesForDisplay.length > 0 ? (
              <Col className="d-flex justify-content-center" md={{ size: 2, offset: 5 }}>
                <Button tag={Link} to="/article/new" color="info">
                  {translate("fact-checking.harvest.action.createArticle")}
                </Button>
              </Col>
            ) : (
              statement.registrationDate === null ? (
                !searchHarvestLoading ? (
                  <Col className="d-flex justify-content-center" md={{ size: 2, offset: 5 }}>
                    <Button color="primary" onClick={searchAndHarvest}>
                      {translate("fact-checking.harvest.button")}
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
                  Το αίτημα συγκομιδής είναι υπό επεξεργασία
                </Col>
              )
            )
          }
        </Row>
      </Container>
      {
        resourcesForDisplay.length > 0 ? (
          <Col>
            <h3>Αποτελέσματα Συγκομιδής</h3>
            <Table responsive>
              <thead>
              <tr>
                <th>AA</th>
                <th>
                  <Translate contentKey="check4FactsApp.resource.url">Url</Translate>
                </th>
                <th>
                  <Translate contentKey="check4FactsApp.resource.title">Title</Translate>
                </th>
                <th>
                  <Translate contentKey="check4FactsApp.resource.simSentence">Sim Sentence</Translate>
                </th>
                <th>
                  <Translate contentKey="check4FactsApp.resource.simParagraph">Sim Paragraph</Translate>
                </th>
                 {/* <th>*/}
                 {/* <Translate contentKey="check4FactsApp.resource.body">Body</Translate>*/}
                 {/* </th>*/}
              </tr>
              </thead>
              <tbody>
              {resourcesForDisplay.map((response, i) => (
                <tr key={`entity-${i}`}>
                  <td>{i +1}</td>
                  <td style={{ maxWidth: '8vw' }}><a href={response.url} target="_blank" rel="noopener noreferrer">{response.url}</a></td>
                  <td style={{ maxWidth: '8vw' }}>{response.title}</td>
                  <td style={{ maxWidth: '12vw' }}>{response.simSentence}</td>
                  <td style={{ maxWidth: '15vw' }}><div className="ellipsis">{response.simParagraph}</div></td>
                  {/* <td style={{ maxWidth: '15vw' }}><div className="ellipsis">{response.body}</div></td>*/}
                </tr>
              ))}
              </tbody>
            </Table>
          </Col>
        ) : null
      }
    </>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  statement: storeState.statement.entity,
  statementUpdateSuccess: storeState.statement.updateSuccess,
  statementSources: storeState.statementSource.entities,
  resources: storeState.resource.entities,
  sLoading: storeState.statement.loading,
  ssLoading: storeState.statementSource.loading,
  rLoading: storeState.resource.loading,
  searchHarvestLoading: storeState.factChecking.searchHarvestLoading
});

const mapDispatchToProps = {
  setFact,
  getStatement,
  updateStatement,
  getStatementSourcesByStatement,
  getResourcesByStatement,
  searchHarvestStatement,
  setURLs
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FactCheckingHarvest);
