import _ from 'lodash';
import './summarization.scss';
import { IRootState } from 'app/shared/reducers';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row } from 'reactstrap';
import { getGenerationSummaryStatus, reset as summarizationReset, generateAndTrackSummary } from './summarization.reducer';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from 'ckeditor5-build-decoupled-document-base64-imageresize';
import { getActiveCeleryTasks } from 'app/entities/kombu-message/kombu-message.reducer';
import { IModalContent } from 'app/shared/model/util.model';
import { IArticle } from 'app/shared/model/article.model';
import { getEntity as getStatement } from 'app/entities/statement/statement.reducer';
import { updateEntity as updateArticle } from 'app/entities/article/article.reducer';
import { ProgressBar } from 'app/shared/util/progress-bar';
import { Translate } from 'react-jhipster';

interface ISummarization extends StateProps, DispatchProps {
  open: boolean;
  toggle: any;
  article: IArticle;
  statementId: number;
  editorRef: any;
}

const Summarization = (props: ISummarization) => {
  const statusInterval = useRef(null);
  const { open, toggle, article, summaryTaskStatus, editorRef, statementId } = props;
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

  const handleSaveSummary = () => {
    const entity = {
      ...article,
      statement: { id: statementId },
      summary: editorRef.current.editor.getData(),
    };
    props.updateArticle(entity);
    toggle();
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
        <Translate contentKey="check4FactsApp.summarization.modal.header.title" />
      </ModalHeader>
      <ModalBody className="summarization-modal-body">
        <Row className="summarization-modal-body-row" size={{ size: 3, offset: 3 }}>
          <Row>
            <Col>
              <h1>
                <Translate contentKey="check4FactsApp.summarization.modal.body.title" />
              </h1>
            </Col>
          </Row>
          {tracking ? (
            <ProgressBar message={'Διαδικασία δημιουργίας Περίληψης '} task={summaryTaskStatus} />
          ) : article?.summary ? (
            <>
              <Row>
                <Col>
                  <h3>
                    <Translate contentKey="check4FactsApp.summarization.modal.body.subTitle.existing" />
                  </h3>
                </Col>
              </Row>
              <Row className="summary">
                <Col>
                  <CKEditor
                    editor={DecoupledEditor}
                    data={article?.summary}
                    onInit={editor => {
                      // Inserts the toolbar before the editable area.
                      editor.ui.view.editable.element.parentElement.insertBefore(
                        editor.ui.view.toolbar.element,
                        editor.ui.view.editable.element
                      );
                    }}
                    ref={editorRef}
                  />
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row>
                <Col>
                  <h3>
                    <Translate contentKey="check4FactsApp.summarization.modal.body.subTitle.new.one" />
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h4>
                    <Translate contentKey="check4FactsApp.summarization.modal.body.subTitle.new.two" />
                  </h4>
                </Col>
              </Row>
            </>
          )}
          {!tracking && (
            <Row>
              <Col>
                {article?.summary && (
                  <Button color="primary" onClick={handleSaveSummary} style={{ margin: '10px' }}>
                    <Translate contentKey="check4FactsApp.summarization.modal.saveButton" />
                  </Button>
                )}
                <Button
                  color={article?.summary != null ? 'warning' : 'primary'}
                  onClick={handleConfirmModal({
                    header: (
                      <Translate
                        contentKey={`check4FactsApp.summarization.confirmModal.header.${article?.summary != null ? 'existing' : 'new'}`}
                      />
                    ),
                    body: <Translate contentKey="check4FactsApp.summarization.confirmModal.body" />,
                    action: initiateGenerateSummary,
                    open: true,
                  })}
                  style={{ margin: '10px' }}
                >
                  <Translate contentKey={`check4FactsApp.summarization.modal.button.${article?.summary != null ? 'existing' : 'new'}`} />
                </Button>
              </Col>
            </Row>
          )}
        </Row>
      </ModalBody>
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
  updateArticle,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Summarization);
