import _ from 'lodash';
import './summarization.scss';
import { IRootState } from 'app/shared/reducers';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row } from 'reactstrap';
import { getGenerationSummaryStatus, reset as summarizationReset, generateAndTrackSummary } from './summarization.reducer';
import { getActiveCeleryTasks } from 'app/entities/kombu-message/kombu-message.reducer';
import { IModalContent } from 'app/shared/model/util.model';
import { IArticle } from 'app/shared/model/article.model';
import { getEntity as getStatement } from 'app/entities/statement/statement.reducer';
import { ProgressBar } from 'app/shared/util/progress-bar';

interface ISummarization extends StateProps, DispatchProps {
  open: boolean;
  toggle: any;
  article: IArticle;
  statementId: number;
}

const Summarization = (props: ISummarization) => {
  const statusInterval = useRef(null);
  const { open, toggle, article, summaryTaskStatus } = props;
  const [modalContent, setModalContent] = useState({} as IModalContent);
  const [tracking, setTracking] = useState(false);

  const handleConfirmModal = (content: IModalContent) => () => {
    setModalContent(content);
  };

  const toggleConfirmModal = () => setModalContent(state => ({ ...state, open: false }));

  const initiateGenerateSummary = () => {
    // Begin the summarization process of the artcle's content.
    setTracking(true);
    props.generateAndTrackSummary(article.id);
    toggleConfirmModal();
  };

  useEffect(() => {
    if (!_.isEmpty(summaryTaskStatus) && summaryTaskStatus.status !== 'SUCCESS' && statusInterval.current === null) {
      // Check the status of the task every 5
      statusInterval.current = setInterval(() => {
        props.getGenerationSummaryStatus(summaryTaskStatus.taskId);
      }, 5000);
    }
    if (!_.isEmpty(summaryTaskStatus) && summaryTaskStatus.status === 'SUCCESS') {
      // Summary has been generated successfully
      setTracking(false);
      clearInterval(statusInterval.current);
      props.summarizationReset();
      props.getStatement(props.statementId);
    }
  }, [summaryTaskStatus]);

  return (
    <Modal
      isOpen={open}
      fade={false}
      toggle={toggle}
      backdrop={true}
      className="summarization-modal-dialog"
      contentClassName="summarization-modal-content"
    >
      <ModalHeader toggle={toggle} className="summarization-modal-title">
        Δημιουργία Περίληψης Έκθεσης
      </ModalHeader>
      <ModalBody className="summarization-modal-body">
        <Row className="summarization-modal-body-row" size={{ size: 3, offset: 3 }}>
          <Row>
            <Col>
              <h1>Λεπτομέρειες Περίληψης Έκθεσης</h1>
            </Col>
          </Row>
          {tracking ? (
            <ProgressBar message={'Διαδικασία δημιουργίας Περίληψης '} task={summaryTaskStatus} />
          ) : article?.summary ? (
            <>
              <Row>
                <Col>
                  <h3>Υπάρχουσα Περίληψη</h3>
                </Col>
              </Row>
              <Row className="summary">
                <Col>
                  <div dangerouslySetInnerHTML={{ __html: article.summary }} />
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row>
                <Col>
                  <h3>Δεν βρέθηκε κάποια περίληψη για την συγκεκριμένη έκθεση επαλήθευση δήλωσης.</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4>Μπορείτε να χρησιμοποιήσετε το εργαλείο μας πατώντας στο κουμπί για την δημιουργία μίας νέας περίληψης</h4>
                </Col>
              </Row>
            </>
          )}
          <Row>
            <Col>
              <Button
                color="primary"
                onClick={handleConfirmModal({
                  header: article?.summary != null ? 'Νέα Περίληψη Έκθεσης' : 'Δημιουργία Περίληψης Έκθεσης',
                  body: 'Είστε σίγουροι ότι θέλετε να κάνετε μία νέα περίληψη;',
                  action: initiateGenerateSummary,
                  open: true,
                })}
                style={{ margin: '10px' }}
                disabled={tracking}
              >
                {article?.summary != null ? 'Νέα Περίληψη Έκθεσης' : 'Δημιουργία Περίληψης Έκθεσης'}
              </Button>
            </Col>
          </Row>
        </Row>
      </ModalBody>
      <Modal fade={false} size="md" isOpen={modalContent.open} toggle={toggleConfirmModal} className="summarization-confirm-modal-dialog">
        <ModalHeader className="text-primary">{modalContent.header}</ModalHeader>
        <ModalBody>{modalContent.body}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleConfirmModal}>
            Όχι
          </Button>
          <Button color="primary" onClick={() => modalContent.action()}>
            Ναι
          </Button>
        </ModalFooter>
      </Modal>
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  summaryTaskStatus: storeState.summarization.summaryTaskStatus,
});

const mapDispatchToProps = {
  getActiveCeleryTasks,
  getStatement,
  getGenerationSummaryStatus,
  summarizationReset,
  generateAndTrackSummary,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Summarization);
