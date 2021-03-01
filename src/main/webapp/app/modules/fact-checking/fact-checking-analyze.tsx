import './fact-checking.scss'
import _ from 'lodash';
import moment from "moment";
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Translate, translate } from 'react-jhipster';
import { Link, RouteComponentProps } from 'react-router-dom';
import {IModalContent, ITaskStatus} from 'app/shared/model/util.model';
import { Row, Col, Table, Button, Container, Spinner, Modal, ModalHeader, ModalBody, ModalFooter, Progress } from 'reactstrap';
import { setFact, analyzeStatement, getTaskStatus, removeTaskStatus } from "app/modules/fact-checking/fact-checking.reducer";
import { getEntity as getStatement, updateEntity as updateStatement } from 'app/entities/statement/statement.reducer';
import { getStatementSourcesByStatement } from 'app/entities/statement-source/statement-source.reducer';
import { countFeatureStatementsByStatement } from 'app/entities/feature-statement/feature-statement.reducer';
import { convertDateTimeToServer } from 'app/shared/util/date-utils';
import { getActiveCeleryTasks } from 'app/entities/kombu-message/kombu-message.reducer';
import { APP_LOCAL_DATETIME_FORMAT } from 'app/config/constants';

export const progressBar = (message: string, task: ITaskStatus) => (
  task.taskInfo &&
  <Col md={{ size: 4, offset: 4 }}>
    <div className="text-center">{message}</div>
    <Progress animated color="info" value={task.taskInfo.current * (100/task.taskInfo.total)} />
    <div className="text-center">Βήμα <span className="text-info">{task.taskInfo.current}</span> από <span className="text-success">{task.taskInfo.total}</span></div>
  </Col>
);

export interface IFactCheckAnalyzeProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FactCheckingAnalyze = (props: IFactCheckAnalyzeProps) => {
  const statusInterval = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [reAnalyze, setReAnalyze] = useState(false);
  const [modalContent, setModalContent] = useState({} as IModalContent);
  const [analyzeStatus, setAnalyzeStatus] = useState({} as ITaskStatus);

  const openModal = (content: IModalContent) => {
    setModalContent(content);
    setModalOpen(true);
  };

  useEffect(() => {
    props.getActiveCeleryTasks();
    props.setFact(props.match.params.id);
    props.getStatement(props.match.params.id);
    props.getStatementSourcesByStatement(props.match.params.id);
    props.countFeatureStatementsByStatement(props.match.params.id);
  }, []);

  const { currentLocale, statement, sLoading, ssLoading, statementSources, analyzeLoading, featureStatementCount, activeStatuses, taskStatuses, kLoading } = props;

  useEffect(() => {
    taskStatuses.forEach(task => {
      if (_.isEmpty(analyzeStatus) && task.taskInfo !== null && task.taskInfo.type === props.match.params.id) {
        setAnalyzeStatus(task);
      } else if (task.taskId === analyzeStatus.taskId) {
        setAnalyzeStatus(task);
      }
    });
  }, [taskStatuses]);

  useEffect(() => {
    // Hook to set analyze status from active statuses.
    activeStatuses.forEach(value => {
      if (value.taskInfo !== null && value.taskInfo.type === props.match.params.id) {
        setAnalyzeStatus(value);
      }
    });
  }, [activeStatuses]);

  useEffect(() => {
    if (analyzeStatus) {
      // Hook to set interval for calling getTaskStatus to update status of analyze.
      if (!_.isEmpty(analyzeStatus) && statusInterval.current === null) {
        statusInterval.current = setInterval(() => {
          props.getTaskStatus(analyzeStatus.taskId);
        }, 10000);
      }
      // When analyze task is finished stop interval and fetch FeatureStatements count to display results button.
      if (analyzeStatus.status === 'SUCCESS') {
        props.removeTaskStatus(analyzeStatus.taskId);
        setAnalyzeStatus({});
        setReAnalyze(false);
        clearInterval(statusInterval.current);
        props.countFeatureStatementsByStatement(props.match.params.id);
      }
    }
  }, [analyzeStatus]);

  const analyze = () => {
    setReAnalyze(true);
    // FIXME Remove those ugly ignores when got the time.
    const entity = {
      ...statement,
      registrationDate: convertDateTimeToServer(moment().format(APP_LOCAL_DATETIME_FORMAT)),
      statementSources: [...statementSources]
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    props.analyzeStatement({
      ...entity,
      statementSources: null
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    props.updateStatement({
      ...entity
    });
    setModalOpen(false);
  };

  return sLoading || ssLoading || kLoading ? (
    <div>
      <Spinner style={{ width: '5rem', height: '5rem', margin: '10% 0 10% 45%' }} color="dark" />
    </div>
  ) : (
    <>
      <Container>
        <Row className="text-center my-5 text-primary">
          <Col>
            <h1>{translate('fact-checking.analyze.title')}</h1>
          </Col>
        </Row>
        <Row className="text-center my-3 text-info">
          <Col>
            <h3>{translate("check4FactsApp.statement.text")}</h3>
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
          <Col><h5>{statement.subTopics.join(', ')}</h5></Col>
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
            statement.registrationDate !== null && featureStatementCount > 0 ? (
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
              ) : analyzeStatus.taskInfo && (
                progressBar('Διαδικασία ανάλυσης δήλωσης...', analyzeStatus)
              )
            )
          }
        </Row>
        {
          statement.registrationDate !== null && featureStatementCount >= 1 && !reAnalyze ? (
            <Row className="my-3 p-3 border-top border-left border-right border-bottom border-danger">
              <Col className="d-flex justify-content-center align-self-center">
                <h5 className="mb-0">Συνολικές Αναλύσεις : <span className="text-info">{featureStatementCount}</span></h5>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <h5 className="text-center mb-0">Τελευταία {translate("check4FactsApp.statement.registrationDate")}</h5>
                  </Col>
                </Row>
                <Row>
                  <Col className="text-center text-info">
                    {moment.locale(currentLocale) && moment(statement.registrationDate).format("DD/MM/YY-HH:mm")}
                  </Col>
                </Row>
              </Col>
              <Col className="d-flex justify-content-center align-self-center">
                <Button
                  color="danger"
                  onClick={() => openModal({
                    header: 'Νέα Ανάλυση',
                    body: 'Είστε σίγουροι ότι θέλετε να κάνετε μία νέα ανάλυση;',
                    action: analyze
                  })}
                  disabled={reAnalyze}
                >
                  Νέα Ανάλυση
                </Button>
              </Col>
            </Row>
          ) : featureStatementCount !== 0 && reAnalyze && analyzeStatus.taskInfo && (
            <Row className="my-3 p-3 border-top border-left border-right border-bottom border-danger">
              {progressBar("Διαδικασία για νέα ανάλυση δήλωσης...", analyzeStatus)}
            </Row>
          )
        }
        <Modal size="md" isOpen={modalOpen} toggle={() => setModalOpen(false)}>
          <ModalHeader className="text-primary">{modalContent.header}</ModalHeader>
          <ModalBody>{modalContent.body}</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={() => setModalOpen(false)}>Όχι</Button>
            <Button color="primary" onClick={() => modalContent.action()}>Ναι</Button>
          </ModalFooter>
        </Modal>
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
  analyzeLoading: storeState.factChecking.analyzeLoading,
  taskStatuses: storeState.factChecking.taskStatuses,
  kLoading: storeState.kombuMessage.loading,
  activeStatuses: storeState.kombuMessage.activeStatuses
});

const mapDispatchToProps = {
  setFact,
  getStatement,
  updateStatement,
  getStatementSourcesByStatement,
  countFeatureStatementsByStatement,
  analyzeStatement,
  getActiveCeleryTasks,
  getTaskStatus,
  removeTaskStatus
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FactCheckingAnalyze);
