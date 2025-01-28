import './summarization.scss';
import { IRootState } from 'app/shared/reducers';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Spinner, Col, Row } from 'reactstrap';
import { generateArticleSummary } from './summarization.reducer';
import { getActiveCeleryTasks } from 'app/entities/kombu-message/kombu-message.reducer';
import { IModalContent, ITaskStatus } from 'app/shared/model/util.model';
import { IArticle } from 'app/shared/model/article.model';
import { updateEntity as updateArticle } from 'app/entities/article/article.reducer';

interface ISummarization extends StateProps, DispatchProps {
  open: boolean;
  toggle: any;
  article: IArticle;
}

const Summarization = (props: ISummarization) => {
  const { open, toggle, article, summaryTaskId, articleLoading, genSumLoading } = props;
  const [modalContent, setModalContent] = useState({} as IModalContent);
  const [summaryStatus, setSummaryStatus] = useState({} as ITaskStatus);

  const handleConfirmModal = (content: IModalContent) => () => {
    setModalContent(content);
  };

  const toggleConfirmModal = () => setModalContent(state => ({ ...state, open: false }));

  const initiateGenerateSummary = () => {
    props.generateArticleSummary(article.id);
    toggleConfirmModal();
  };

  return (
    <Modal
      isOpen={open}
      fade={false}
      toggle={toggle}
      backdrop={true}
      className="summarization-modal-dialog"
      contentClassName="summarization-modal-content"
    >
      {genSumLoading || articleLoading ? (
        <Spinner style={{ width: '5rem', height: '5rem', margin: '10% 0 10% 45%' }} color="dark" />
      ) : (
        <>
          <ModalHeader toggle={toggle} className="summarization-modal-title">
            Δημιουργία Περίληψης Δήλωσης
          </ModalHeader>
          <ModalBody className="summarization-modal-body">
            <Row className="summarization-modal-body-row" size={{ size: 3, offset: 3 }}>
              <Row>
                <Col>
                  <h1>Λεπτομέρειες Περίληψης Δήλωσης</h1>
                </Col>
              </Row>
              {article.summary ? (
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
                      <h3>Δεν βρέθηκε κάποια περίληψη για την συγκεκριμένη επαλήθευση δήλωσης.</h3>
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
                      header: article.summary != null ? 'Νέα Περίληψη Δήλωσης' : 'Δημιουργία Περίληψης Δήλωσης',
                      body: 'Είστε σίγουροι ότι θέλετε να κάνετε μία νέα περίληψη;',
                      action: initiateGenerateSummary,
                      open: true,
                    })}
                    style={{ margin: '10px' }}
                  >
                    {article.summary != null ? 'Νέα Περίληψη Δήλωσης' : 'Δημιουργία Περίληψης Δήλωσης'}
                  </Button>
                </Col>
              </Row>
            </Row>
          </ModalBody>
        </>
      )}
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
  genSumLoading: storeState.summarization.loading,
  summaryTaskId: storeState.summarization.summaryTaskId,
  articleLoading: storeState.article.loading,
});

const mapDispatchToProps = {
  generateArticleSummary,
  getActiveCeleryTasks,
  updateArticle,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Summarization);
