import _ from 'lodash';
import './summarization.scss';
import { IRootState } from 'app/shared/reducers';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Progress, Tooltip } from 'reactstrap';
import { getGenerationSummaryStatus, reset as summarizationReset, generateAndTrackSummary } from './summarization.reducer';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from 'ckeditor5-build-decoupled-document-base64-imageresize';
import { IModalContent } from 'app/shared/model/util.model';
import { getEntity as getStatement } from 'app/entities/statement/statement.reducer';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ISummarization extends StateProps, DispatchProps {
  summary: any;
  articleId: number;
  statementId: number;
  editorRef: React.RefObject<CKEditor>;
  formOnChange: (e: any) => void;
}

const Summarization = (props: ISummarization) => {
  const statusInterval = useRef(null);
  const { editorRef, summaryTaskStatus, articleId, summary, statementId, formOnChange } = props;
  const [modalContent, setModalContent] = useState({} as IModalContent);
  const [tracking, setTracking] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleConfirmModal = (content: IModalContent) => () => {
    setModalContent(content);
  };

  const toggleConfirmModal = () => setModalContent(state => ({ ...state, open: false }));

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const initiateGenerateSummary = () => {
    // Begin the summarization process of the artcle's content.
    setTracking(true);
    props.generateAndTrackSummary(articleId);
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
      props.getStatement(statementId);
    }
  }, [summaryTaskStatus]);

  return (
    <div className="summarization-modal-dialog">
      <Row className="summarization-modal-body-row" size={{ size: 3, offset: 3 }}>
        {tracking ? (
          <Row style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Col md={{ size: 6, offset: 0 }}>
              <p style={{ textAlign: 'center' }}>Διαδικασία Δημιουργίας Περίληψης</p>
              <Progress animated color="info" value={100} />
            </Col>
          </Row>
        ) : (
          <>
            <Row>
              {summary && (
                <Col className="summary" md={{ size: 9, offset: 1 }}>
                  <div id="toolbar-container" />
                  <CKEditor
                    editor={DecoupledEditor}
                    onChange={formOnChange}
                    data={summary}
                    config={{ toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'] }}
                    onInit={editor => {
                      // Add the toolbar to the container
                      const toolbarContainer = document.querySelector('#toolbar-container');
                      toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                    }}
                    ref={editorRef}
                  />
                </Col>
              )}
              <Col style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Button
                  id="generate-summary"
                  color="primary"
                  onClick={handleConfirmModal({
                    header: (
                      <Translate contentKey={`check4FactsApp.summarization.confirmModal.header.${summary != null ? 'existing' : 'new'}`} />
                    ),
                    body: <Translate contentKey="check4FactsApp.summarization.confirmModal.body" />,
                    action: initiateGenerateSummary,
                    open: true,
                  })}
                >
                  <FontAwesomeIcon icon="cloud" />
                </Button>
                <Tooltip target="generate-summary" placement={summary ? 'right' : 'top'} toggle={toggleTooltip} isOpen={tooltipOpen}>
                  Περίληψη με ΑΙ
                </Tooltip>
              </Col>
            </Row>
          </>
        )}
      </Row>
      <Modal fade={false} size="md" isOpen={modalContent.open} toggle={toggleConfirmModal} className="summarization-confirm-modal-dialog">
        <ModalHeader className="text-primary">{modalContent.header}</ModalHeader>
        <ModalBody>{modalContent.body}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleConfirmModal}>
            <Translate contentKey="check4FactsApp.summarization.confirmModal.button.no" />
          </Button>
          <Button color="primary" onClick={() => modalContent.action()}>
            <Translate contentKey="check4FactsApp.summarization.confirmModal.button.yes" />
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  summaryTaskStatus: storeState.summarization.summaryTaskStatus,
});

const mapDispatchToProps = {
  getStatement,
  getGenerationSummaryStatus,
  summarizationReset,
  generateAndTrackSummary,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Summarization);
