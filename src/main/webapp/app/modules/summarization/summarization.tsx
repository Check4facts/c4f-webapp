import _ from 'lodash';
import './summarization.scss';
import { IRootState } from 'app/shared/reducers';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Tooltip } from 'reactstrap';
import { reset as summarizationReset, generateArticleSummary } from './summarization.reducer';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from 'ckeditor5-build-decoupled-document-base64-imageresize';
import { IModalContent } from 'app/shared/model/util.model';
import { getEntity as getStatement } from 'app/entities/statement/statement.reducer';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TaskProgress from '../task-progress/task-progress';

interface ISummarization extends StateProps, DispatchProps {
  summary: any;
  articleId: number;
  statementId: number;
  editorRef: React.RefObject<CKEditor>;
  formOnChange: (e: any) => void;
}

const Summarization = (props: ISummarization) => {
  const { inProduction, editorRef, summaryTaskStatus, articleId, summary, statementId, formOnChange } = props;
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
    props.generateArticleSummary(articleId);
    toggleConfirmModal();
  };

  const onSummarySuccess = () => {
    // Handle the success of the summarization process.
    setTracking(false);
    props.getStatement(statementId);
    props.summarizationReset();
  };

  return (
    <div className="summarization-modal-dialog">
      <Row className="summarization-modal-body-row" size={{ size: 3, offset: 3 }}>
        {tracking ? (
          <TaskProgress
            inProduction={inProduction}
            taskId={summaryTaskStatus.taskId}
            progressMessage="check4FactsApp.summarization.progress"
            onSuccess={onSummarySuccess}
          />
        ) : (
          <>
            <Row>
              <Col className="summary">
                <div id="toolbar-container" />
                <CKEditor
                  editor={DecoupledEditor}
                  onChange={formOnChange}
                  data={
                    summary
                      ? summary
                      : '<p style="text-align:center;"><span style="color:hsl(0,0%,60%);"><i>Δημιουργήστε αυτόματα την περίληψη</i></span></p>'
                  }
                  config={{ toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'] }}
                  onInit={editor => {
                    // Add the toolbar to the container
                    const toolbarContainer = document.querySelector('#toolbar-container');
                    toolbarContainer.appendChild(editor.ui.view.toolbar.element);
                  }}
                  ref={editorRef}
                />
              </Col>
              <Col>
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
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="16" height="16">
                    <path d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32l224 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-224 0c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32l288 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-288 0c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                  </svg>
                </Button>
                <Tooltip target="generate-summary" placement="top" toggle={toggleTooltip} isOpen={tooltipOpen}>
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
  inProduction: storeState.applicationProfile.inProduction,
  summaryTaskStatus: storeState.summarization.summaryTaskStatus,
});

const mapDispatchToProps = {
  getStatement,
  summarizationReset,
  generateArticleSummary,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Summarization);
