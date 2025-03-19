import _ from 'lodash';
import './justification.scss';
import React, { useEffect, useRef, useState } from 'react';
import { IRootState } from 'app/shared/reducers';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Progress, Tooltip } from 'reactstrap';
import {
  getLatestJustification,
  reset as justificationReset,
  generateAndTrackJustify,
  getGenerationJustifyStatus,
} from './justification.reducer';
import { connect } from 'react-redux';
import { Translate } from 'react-jhipster';
import moment from 'moment';
import { IModalContent } from 'app/shared/model/util.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IJustificationProps extends StateProps, DispatchProps {
  statementId: number;
}

const Justification = (props: IJustificationProps) => {
  const statusInterval = useRef(null);
  const { statementId, loading, justification, justifyTaskStatus } = props;
  const [modalContent, setModalContent] = useState({} as IModalContent);
  const [tracking, setTracking] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const handleConfirmModal = (content: IModalContent) => () => {
    setModalContent(content);
  };

  const toggleConfirmModal = () => setModalContent(state => ({ ...state, open: !state.open }));

  useEffect(() => {
    if (statementId) {
      props.getLatestJustification(statementId);
    }
  }, [statementId]);

  const initiateGenerateJustify = () => {
    // Begin the justification process of the statement's text
    setTracking(true);
    props.generateAndTrackJustify(statementId, 3);
    toggleConfirmModal();
  };

  useEffect(() => {
    if (!_.isEmpty(justifyTaskStatus) && justifyTaskStatus.status !== 'SUCCESS' && statusInterval.current === null) {
      // Check the status of the task every 10 seconds
      statusInterval.current = setInterval(() => {
        props.getGenerationJustifyStatus(justifyTaskStatus.taskId);
      }, 10000);
    }
    if (!_.isEmpty(justifyTaskStatus) && justifyTaskStatus.status === 'SUCCESS') {
      // Summary has been generated successfully
      setTracking(false);
      clearInterval(statusInterval.current);
      props.justificationReset();
      props.getLatestJustification(statementId);
    }
  }, [justifyTaskStatus]);

  return loading ? (
    <></>
  ) : (
    // TODO: Adde background color accroding to justification.label
    <div className="justification">
      <h3>
        <Translate contentKey="check4FactsApp.justification.home.title" />
      </h3>
      {tracking ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Progress animated color="info" value={100} style={{ width: '60%' }} />
          </div>
          <p className="text-center font-italic">
            <Translate contentKey="check4FactsApp.justification.progressMessage" />
          </p>
        </>
      ) : justification !== null ? (
        <div key={justification.id} className="entry">
          <p className="text">{justification.text}</p>
          <h4>
            <Translate contentKey="check4FactsApp.justification.sources" />
          </h4>
          <ul>
            {justification.sources?.map((source, index) => (
              <li key={`source-${index}`}>
                <a className="source" href={source} target="_blank" rel="noopener noreferrer">
                  {source}
                </a>
              </li>
            ))}
          </ul>
          <div className="bottom-info">
            <ul className="inline-list">
              {/* <li>
                <Translate contentKey="check4FactsApp.justification.model" />: <span>{justification.model}</span>
              </li> */}
              <li>
                <Translate contentKey="check4FactsApp.justification.label" />: <span>{justification.label}</span>
              </li>
              <li>
                <Translate contentKey="check4FactsApp.justification.timestamp" />:{' '}
                <span>{moment(justification.timestamp).format('LL')}</span>
              </li>
              {/* <li>
                <Translate contentKey="check4FactsApp.justification.elapsedTime" />: <span>{justification.elapsedTime}</span>
              </li> */}
            </ul>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <Button
              id="generate-justify"
              color="warning"
              onClick={handleConfirmModal({
                header: <Translate contentKey="check4FactsApp.justification.modal.header" />,
                body: <Translate contentKey="check4FactsApp.justification.modal.body" />,
                action: initiateGenerateJustify,
                open: true,
              })}
            >
              <img src="../../content/images/reshot-icon-brain-2GQK794YNR.svg" alt="brain-svg" height={16} />
            </Button>
            <Tooltip target="generate-justify" placement="top" toggle={toggleTooltip} isOpen={tooltipOpen}>
              Τεκμηρίωση με ΑΙ
            </Tooltip>
          </div>
        </div>
      ) : (
        <div className="empty">
          <p className="prompt">
            <Translate contentKey="check4FactsApp.justification.home.createLabel" />
          </p>
          <Button
            id="generate-justify"
            color="warning"
            onClick={handleConfirmModal({
              header: <Translate contentKey="check4FactsApp.justification.modal.header" />,
              body: <Translate contentKey="check4FactsApp.justification.modal.body" />,
              action: initiateGenerateJustify,
              open: true,
            })}
          >
            <img src="../../content/images/reshot-icon-brain-2GQK794YNR.svg" alt="brain-svg" height={16} />
          </Button>
          <Tooltip target="generate-summary" placement="top" toggle={toggleTooltip} isOpen={tooltipOpen}>
            Τεκμηρίωση με ΑΙ
          </Tooltip>
        </div>
      )}
      <Modal fade={false} size="md" isOpen={modalContent.open} toggle={toggleConfirmModal} className="summarization-confirm-modal-dialog">
        <ModalHeader className="text-primary">{modalContent.header}</ModalHeader>
        <ModalBody>{modalContent.body}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleConfirmModal}>
            <Translate contentKey="check4FactsApp.justification.modal.button.no" />
          </Button>
          <Button color="primary" onClick={() => modalContent.action()}>
            <Translate contentKey="check4FactsApp.justification.modal.button.yes" />
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  justification: storeState.justification.entity,
  loading: storeState.justification.loading,
  justifyTaskStatus: storeState.justification.justifyTaskStatus,
});

const mapDispatchToProps = {
  getLatestJustification,
  justificationReset,
  generateAndTrackJustify,
  getGenerationJustifyStatus,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Justification);
