import './summarization.scss';
import { IRootState } from 'app/shared/reducers';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Col, Row } from 'reactstrap';
import { generateSummary } from './summarization.reducer';
import { getActiveCeleryTasks } from 'app/entities/kombu-message/kombu-message.reducer';
import { IModalContent } from 'app/shared/model/util.model';

interface ISummarization extends StateProps, DispatchProps {
  open: boolean;
  toggle: any;
  textArea: any;
}

const Summarization = (props: ISummarization) => {
  const { open, toggle, textArea, summaryTaskId } = props;
  const [modalContent, setModalContent] = useState({} as IModalContent);

  const handleConfirmModal = (content: IModalContent) => () => {
    setModalContent(content);
  };

  const toggleConfirmModal = () => setModalContent(state => ({ ...state, open: false }));

  const initiateGenerateSummary = () => {
    alert('Gonna replace this with actual call to the Python API');
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
      <ModalHeader toggle={toggle} className="summarization-modal-title">
        Δημιουργία Περίληψης Δήλωσης
      </ModalHeader>
      <ModalBody className="summarization-modal-body">
        <div style={{ display: 'flex', justifyContent: 'center', padding: '1rem', borderBottom: '1px solid rgba(0,0,0,0.2)' }}>
          <Row style={{ display: 'flex', flexDirection: 'column', width: '80%', rowGap: 1 }} size={{ size: 3, offset: 3 }}>
            <Row>
              <Col>
                <h1>Λεπτομέρειες Περίληψης Δήλωσης</h1>
              </Col>
            </Row>
            {textArea ? (
              <Col>
                <div>Current Summary: {textArea}</div>
              </Col>
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
                    header: 'Νέα Περίληψη',
                    body: 'Είστε σίγουροι ότι θέλετε να κάνετε μία νέα περίληψη;',
                    action: initiateGenerateSummary,
                    open: true,
                  })}
                >
                  Δημιουργία Περίληψης Δήλωσης
                </Button>
              </Col>
            </Row>
          </Row>
        </div>
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
  loading: storeState.summarization.loading,
  summaryTaskId: storeState.summarization.summaryTaskId,
});

const mapDispatchToProps = {
  generateSummary,
  getActiveCeleryTasks,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Summarization);
