import React, { useEffect, useState } from 'react';
import { Row, Col, Collapse, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import moment from 'moment';
import { IModalContent, ITaskStatus } from 'app/shared/model/util.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { convertDateTimeToServer } from 'app/shared/util/date-utils';
import { APP_LOCAL_DATETIME_FORMAT } from 'app/config/constants';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { analyzeStatement, changeStatusInterval, getTaskStatus, removeTaskStatus } from '../fact-checking.reducer';
import { updateEntity as updateStatement } from 'app/entities/statement/statement.reducer';
import {
  countFeatureStatementsByStatement,
  getLatestFeatureStatementByStatementId,
} from 'app/entities/feature-statement/feature-statement.reducer';
import _ from 'lodash';
import { getActiveCeleryTasks } from 'app/entities/kombu-message/kombu-message.reducer';
import TaskProgress from 'app/modules/task-progress/task-progress';

interface IFactCheckingReportAnalyzerResults extends StateProps, DispatchProps {}

const paragraphStyle = {
  border: '1px solid rgba(0,0,0,0.2)',
  borderRadius: 4,
  backgroundColor: '#f2f2f2',
  padding: 8,
} as React.CSSProperties;

const FactchekcingReportAnalyzerResults = (props: IFactCheckingReportAnalyzerResults) => {
  const {
    resources,
    statement,
    currentLocale,
    featureStatement,
    featureStatementCount,
    statementSources,
    taskStatuses,
    activeStatuses,
  } = props;
  const [emotionCollapse, setEmotionCollapse] = useState(false);
  const [restCollapse, setRestCollapse] = useState(false);
  const [modalContent, setModalContent] = useState({} as IModalContent);
  const [analyzeStatus, setAnalyzeStatus] = useState({} as ITaskStatus);
  const [analyzeTracking, setAnalyzeTracking] = useState(false);

  const handleReanalyzeModal = (content: IModalContent) => () => {
    setModalContent(content);
  };

  useEffect(() => {
    props.getActiveCeleryTasks();
    props.countFeatureStatementsByStatement(statement.id);
  }, []);

  useEffect(() => {
    if (featureStatementCount > 0) {
      props.getLatestFeatureStatementByStatementId(statement.id);
    }
  }, [featureStatementCount]);

  useEffect(() => {
    taskStatuses.forEach(task => {
      if (_.isEmpty(analyzeStatus) && task.taskInfo !== null && task.taskInfo.type === String(statement.id)) {
        setAnalyzeStatus(task);
      } else if (task.taskId === analyzeStatus.taskId) {
        setAnalyzeStatus(task);
      }
    });
  }, [taskStatuses]);

  useEffect(() => {
    // Hook to set analyze status from active statuses.
    activeStatuses.forEach(value => {
      if (value.taskInfo !== null && value.taskInfo.type === String(statement.id)) {
        setAnalyzeStatus(value);
      }
    });
  }, [activeStatuses]);

  const onAnalyzeSuccess = () => {
    props.removeTaskStatus(analyzeStatus.taskId);
    props.countFeatureStatementsByStatement(statement.id);
    setAnalyzeStatus({});
    setAnalyzeTracking(false);
  };

  const analyze = () => {
    // FIXME Remove those ugly ignores when got the time.
    setAnalyzeTracking(true);
    const entity = {
      ...statement,
      registrationDate: convertDateTimeToServer(moment().format(APP_LOCAL_DATETIME_FORMAT)),
      statementSources: [...statementSources],
    };
    props.analyzeStatement({
      // Only pass entity fields that we need.
      id: entity.id,
      text: entity.text,
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    props.updateStatement({
      ...entity,
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem' }}>
      <Modal fade={false} size="md" isOpen={modalContent.open} toggle={() => setModalContent(state => ({ ...state, open: false }))}>
        <ModalHeader className="text-primary">{modalContent.header}</ModalHeader>
        <ModalBody>{modalContent.body}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModalContent(state => ({ ...state, open: false }))}>
            Όχι
          </Button>
          <Button
            color="primary"
            onClick={() => {
              setModalContent(state => ({ ...state, open: false }));
              modalContent.action();
            }}
          >
            Ναι
          </Button>
        </ModalFooter>
      </Modal>
      <Row style={{ display: 'flex', flexDirection: 'column', width: '80%', rowGap: 1 }} size={{ size: 3, offset: 3 }}>
        <Row>
          <Col style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', paddingTop: '1rem', paddingBottom: '1rem' }}>
            <h1>{translate('fact-checking.results.title')}</h1>
            {!analyzeStatus.taskInfo && featureStatementCount > 0 && (
              <Button
                color="primary"
                onClick={handleReanalyzeModal({
                  header: 'Νέα Ανάλυση',
                  body: 'Είστε σίγουροι ότι θέλετε να κάνετε μία νέα ανάλυση;',
                  action: analyze,
                  open: true,
                })}
              >
                Νέα Ανάλυση
              </Button>
            )}
          </Col>
        </Row>
        {analyzeTracking ? (
          <TaskProgress taskId={analyzeStatus.taskId} progressMessage="fact-checking.analyze.progress" onSuccess={onAnalyzeSuccess} />
        ) : featureStatementCount === 0 ? (
          <Row>
            <Col className="alert alert-warning" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ margin: 0 }}>Δεν έχει γίνει κάποια ανάλυση για αυτή την δήλωση.</p>
              <Button color="primary" onClick={analyze}>
                {translate('fact-checking.analyze.button')}
              </Button>
            </Col>
          </Row>
        ) : (
          featureStatementCount > 0 &&
          Object.keys(featureStatement).length > 0 && (
            <>
              {/* <Row>
              <Col>
                <h4>{translate('fact-checking.analyze.statement')}</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={paragraphStyle}>{statement.text}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>{translate('check4FactsApp.statement.author')}</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={paragraphStyle}>{statement.author}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h4>{translate('check4FactsApp.statement.statementDate')}</h4>
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={paragraphStyle}>{moment.locale(currentLocale) && moment(statement.statementDate).format('LL')}</p>
              </Col>
            </Row> */}
              <Row>
                <Col>
                  <h4>{translate('check4FactsApp.statement.publicationDate')}</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p style={paragraphStyle}>{moment.locale(currentLocale) && moment(statement.publicationDate).format('LL')}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4>{translate('check4FactsApp.statement.registrationDate')}</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p style={paragraphStyle}>{moment.locale(currentLocale) && moment(statement.registrationDate).format('LL')}</p>
                </Col>
              </Row>
              {featureStatement.predictProba > 0 ? (
                <>
                  <Row>
                    <Col>
                      <h4>{translate('fact-checking.results.model.label')}</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {featureStatement.predictLabel ? (
                        <p style={paragraphStyle} className="text-success">
                          Ακριβής
                        </p>
                      ) : (
                        <p style={paragraphStyle} className="text-danger">
                          Ανακριβής
                        </p>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h4>{translate('fact-checking.results.model.probability')}</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p style={paragraphStyle} className={featureStatement.predictProba > 0.5 ? 'text-success' : 'text-danger'}>
                        {Math.round(featureStatement.predictProba * 100)}%
                      </p>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <Row>
                    <Col>
                      <h4>{translate('fact-checking.results.model.label')}</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p style={paragraphStyle} className="text-danger">
                        Ανεπαρκή δεδομένα για αυτόματη παραγωγή απόφασης
                      </p>
                    </Col>
                  </Row>
                </>
              )}
              <Row style={{ paddingTop: '1rem' }}>
                <Col style={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}>
                  <h4
                    style={{ margin: 0, textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => setEmotionCollapse(!emotionCollapse)}
                  >
                    {translate('fact-checking.results.model.emotions')}
                  </h4>
                  <FontAwesomeIcon icon="angle-down" size="1x" rotation={emotionCollapse ? null : 270} />
                </Col>
              </Row>
              <Collapse isOpen={emotionCollapse} style={{ paddingTop: '0.5rem' }}>
                {emotionCollapse && (
                  <Table responsive hover bordered>
                    <thead>
                      <tr>
                        <th>Πεδίο</th>
                        <th>Θυμός</th>
                        <th>Απέχθεια</th>
                        <th>Φόβος</th>
                        <th>Χαρά</th>
                        <th>Λύπη</th>
                        <th>Έκπληξη</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center">
                        <td>Δήλωση</td>
                        <td>{((featureStatement.sEmotionAnger[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</td>
                        <td>{((featureStatement.sEmotionDisgust[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</td>
                        <td>{((featureStatement.sEmotionFear[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</td>
                        <td>{((featureStatement.sEmotionHappiness[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</td>
                        <td>{((featureStatement.sEmotionSadness[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</td>
                        <td>{((featureStatement.sEmotionSurprise[3] / featureStatement.sFertileTerms) * 100).toFixed(2)}%</td>
                      </tr>
                      <tr className="text-center">
                        <td>Τίτλοι</td>
                        <td>{(featureStatement.rTitleEmotionAnger[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rTitleEmotionDisgust[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rTitleEmotionFear[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rTitleEmotionHappiness[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rTitleEmotionSadness[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rTitleEmotionSurprise[3] * 100).toFixed(2)}%</td>
                      </tr>
                      <tr className="text-center">
                        <td>Τίτλοι</td>
                        <td>{(featureStatement.rTitleEmotionAnger[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rTitleEmotionDisgust[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rTitleEmotionFear[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rTitleEmotionHappiness[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rTitleEmotionSadness[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rTitleEmotionSurprise[3] * 100).toFixed(2)}%</td>
                      </tr>
                      <tr className="text-center">
                        <td>Κείμενα</td>
                        <td>{(featureStatement.rBodyEmotionAnger[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rBodyEmotionDisgust[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rBodyEmotionFear[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rBodyEmotionHappiness[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rBodyEmotionSadness[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rBodyEmotionSurprise[3] * 100).toFixed(2)}%</td>
                      </tr>
                      <tr className="text-center">
                        <td>Αντιπροσωπ/τερες Παράγραφοι</td>
                        <td>{(featureStatement.rSimParEmotionAnger[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rSimParEmotionDisgust[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rSimParEmotionFear[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rSimParEmotionHappiness[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rSimParEmotionSadness[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rSimParEmotionSurprise[3] * 100).toFixed(2)}%</td>
                      </tr>
                      <tr className="text-center border-bottom">
                        <td>Αντιπροσωπ/τερες Προτάσεις</td>
                        <td>{(featureStatement.rSimSentEmotionAnger[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rSimSentEmotionDisgust[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rSimSentEmotionFear[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rSimSentEmotionHappiness[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rSimSentEmotionSadness[3] * 100).toFixed(2)}%</td>
                        <td>{(featureStatement.rSimSentEmotionSurprise[3] * 100).toFixed(2)}%</td>
                      </tr>
                    </tbody>
                  </Table>
                )}
              </Collapse>
              <Row style={{ paddingTop: '1rem' }}>
                <Col style={{ display: 'flex', alignItems: 'center', columnGap: '0.5rem' }}>
                  <h4 style={{ margin: 0, textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setRestCollapse(!restCollapse)}>
                    {translate('fact-checking.results.model.rest')}
                  </h4>
                  <FontAwesomeIcon icon="angle-down" size="1x" rotation={restCollapse ? null : 270} />
                </Col>
              </Row>
              <Collapse isOpen={restCollapse} style={{ paddingTop: '0.5rem' }}>
                {restCollapse && (
                  <>
                    <Table responsive hover bordered>
                      <thead>
                        <tr>
                          <th>Πεδίο</th>
                          <th>Αντικειμενικότητα</th>
                          <th>Συναισθηματική Ένταση</th>
                          <th>Ομοιότητα με Δήλωση</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-center">
                          <td>Δήλωση</td>
                          <td>{((1 - featureStatement.sSubjectivity) * 100).toFixed(2)}%</td>
                          <td>{((1 - featureStatement.sSentiment) * 100).toFixed(2)}%</td>
                          <td>-</td>
                        </tr>
                        <tr className="text-center">
                          <td>Τίτλοι</td>
                          <td>{((1 - featureStatement.rTitleSubjectivity) * 100).toFixed(2)}%</td>
                          <td>{((1 - featureStatement.rTitleSentiment) * 100).toFixed(2)}%</td>
                          <td>{((1 - featureStatement.rTitleSimilarity) * 100).toFixed(2)}%</td>
                        </tr>
                        <tr className="text-center">
                          <td>Κείμενα</td>
                          <td>{((1 - featureStatement.rBodySubjectivity) * 100).toFixed(2)}%</td>
                          <td>{((1 - featureStatement.rBodySentiment) * 100).toFixed(2)}%</td>
                          <td>{((1 - featureStatement.rBodySimilarity) * 100).toFixed(2)}%</td>
                        </tr>
                        <tr className="text-center">
                          <td>Αντιπροσωπ/τερες Παράγραφοι</td>
                          <td>{((1 - featureStatement.rSimParSubjectivity) * 100).toFixed(2)}%</td>
                          <td>{((1 - featureStatement.rSimParSentiment) * 100).toFixed(2)}%</td>
                          <td>{((1 - featureStatement.rSimParSimilarity) * 100).toFixed(2)}%</td>
                        </tr>
                        <tr className="text-center border-bottom">
                          <td>Αντιπροσωπ/τερες Προτάσεις</td>
                          <td>{((1 - featureStatement.rSimSentSubjectivity) * 100).toFixed(2)}%</td>
                          <td>{((1 - featureStatement.rSimSentSentiment) * 100).toFixed(2)}%</td>
                          <td>{((1 - featureStatement.rSimSentSimilarity) * 100).toFixed(2)}%</td>
                        </tr>
                      </tbody>
                    </Table>
                    <Row className="my-3">
                      <Col>
                        <ul className="text-muted">
                          <li>
                            Οι τιμές που αφορούν το πεδίο «Δήλωση» αναφέρονται στο ποσοστό των όρων που ταυτοποιήθηκαν με το εκάστοτε
                            χαρακτηριστικό.
                          </li>
                          <li>
                            Tα πεδία «Τίτλοι», «Κείμενα», «Αντιπροσωπ/τερες Παράγραφοι» και «Αντιπροσωπ/τερες Προτάσεις» αναφέρονται στο
                            σύνολο των αντίστοιχων πεδίων που προκύπτουν από τις πηγές που ανακτήθηκαν. Οι τιμές των πεδίων αυτών
                            αναφέρονται στο ποσοστό των προτάσεων που ταυτοποιήθηκαν με το εκάστοτε χαρακτηριστικό.
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </>
                )}
              </Collapse>
              <Row className="mt-5 mb-2">
                <Col>
                  <h4>{translate('fact-checking.results.model.retrieved')}</h4>
                </Col>
              </Row>
              <Row>
                <Col>
                  {resources.length > 0 ? (
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                      <Table responsive hover bordered size="sm">
                        <thead>
                          <tr>
                            <th>#</th>
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
                          </tr>
                        </thead>
                        <tbody>
                          {resources
                            .filter(filRes => filRes.title !== null && filRes.body !== null)
                            .map((response, i) => (
                              <tr key={`entity-${i}`}>
                                <td>{i + 1}</td>
                                <td
                                  style={{
                                    maxWidth: '8vw',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    verticalAlign: 'middle',
                                    textAlign: 'center',
                                  }}
                                >
                                  <a href={response.url} target="_blank" rel="noopener noreferrer">
                                    {response.url}
                                  </a>
                                </td>
                                <td style={{ maxWidth: '8vw', verticalAlign: 'middle', textAlign: 'center' }}>{response.title}</td>
                                <td style={{ maxWidth: '12vw', verticalAlign: 'middle', textAlign: 'center' }}>{response.simSentence}</td>
                                <td style={{ maxWidth: '15vw', verticalAlign: 'middle', textAlign: 'center' }}>
                                  <div className="ellipsis">{response.simParagraph}</div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </div>
                  ) : null}
                </Col>
              </Row>
            </>
          )
        )}
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  currentLocale: storeState.locale.currentLocale,
  statement: storeState.statement.entity,
  statementSources: storeState.statementSource.entities,
  resources: storeState.resource.entities,
  featureStatement: storeState.featureStatement.entity,
  featureStatementCount: storeState.featureStatement.count,
  taskStatuses: storeState.factChecking.taskStatuses,
  activeStatuses: storeState.kombuMessage.activeStatuses,
});

const mapDispatchToProps = {
  analyzeStatement,
  updateStatement,
  getTaskStatus,
  removeTaskStatus,
  countFeatureStatementsByStatement,
  getActiveCeleryTasks,
  changeStatusInterval,
  getLatestFeatureStatementByStatementId,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FactchekcingReportAnalyzerResults);
