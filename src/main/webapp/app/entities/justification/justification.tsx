import _ from 'lodash';
import './justification.scss';
import React, { useEffect, useRef, useState } from 'react';
import { IRootState } from 'app/shared/reducers';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Tooltip } from 'reactstrap';
import { reset as justificationReset, generateStatementJustify, getJustificationsByStatement } from './justification.reducer';
import { connect } from 'react-redux';
import { Translate } from 'react-jhipster';
import moment from 'moment';
import { IModalContent } from 'app/shared/model/util.model';
import { defaultValue, IJustification } from 'app/shared/model/justification.model';
import TaskProgress from 'app/modules/task-progress/task-progress';

interface IJustificationProps extends StateProps, DispatchProps {
  statementId: number;
}

const Justification = (props: IJustificationProps) => {
  const [modalContent, setModalContent] = useState({} as IModalContent);
  const [tracking, setTracking] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [justificationSelect, setJustificationSelect] = useState({ selected: defaultValue, timestamps: [] } as {
    selected: IJustification;
    timestamps: string[];
  });

  const { inProduction, statementId, loading, justifyTaskStatus, justifications } = props;

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const handleConfirmModal = (content: IModalContent) => () => {
    setModalContent(content);
  };

  const toggleConfirmModal = () => setModalContent(state => ({ ...state, open: !state.open }));

  useEffect(() => {
    if (statementId) {
      props.getJustificationsByStatement(statementId);
    }
  }, [statementId]);

  useEffect(() => {
    if (!_.isEmpty(justifications)) {
      setJustificationSelect(
        justifications.reduce(
          (acc, curr) => {
            acc.selected = acc.selected || curr;
            acc.timestamps.push(curr.timestamp);
            return acc;
          },
          { selected: undefined, timestamps: [] }
        )
      );
    }
  }, [justifications]);

  const handleChangeSelect = event => {
    setJustificationSelect({ ...justificationSelect, selected: justifications.find(jf => jf.timestamp === event.target.value) });
  };

  const initiateGenerateJustify = () => {
    // Begin the justification process of the statement's text
    setTracking(true);
    props.generateStatementJustify(statementId, 3);
    toggleConfirmModal();
  };

  const onJustificationSuccess = () => {
    // Handle the success of the justification process
    setTracking(false);
    props.justificationReset();
    props.getJustificationsByStatement(statementId);
  };

  return loading ? (
    <></>
  ) : (
    <div className={`justification justify-accuracy-${justificationSelect.selected?.label}`}>
      <h3>
        <Translate contentKey="check4FactsApp.justification.home.title" />
      </h3>
      {tracking ? (
        <TaskProgress
          inProduction={inProduction}
          taskId={justifyTaskStatus.taskId}
          progressMessage="check4FactsApp.justification.progressMessage"
          onSuccess={onJustificationSuccess}
        />
      ) : !_.isEmpty(justificationSelect.selected) ? (
        <div key={justificationSelect.selected.id} className="entry">
          <p className="text">{justificationSelect.selected.text}</p>
          <h4>
            <Translate contentKey="check4FactsApp.justification.sources" />
          </h4>
          <ul>
            {justificationSelect.selected.sources?.map((source, index) => (
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
                <Translate contentKey="check4FactsApp.justification.label" />:{' '}
                <span>
                  <Translate contentKey={`check4FactsApp.justification.accuracy.${justificationSelect.selected.label}`} />
                </span>
              </li>
              <li>
                <Translate contentKey="check4FactsApp.justification.timestamp" />:{' '}
                <select value={justificationSelect.selected.timestamp} onChange={handleChangeSelect}>
                  {justificationSelect.timestamps.map((d, i) => (
                    <option value={d} key={i}>
                      {moment(d).format('LLL')}
                    </option>
                  ))}
                </select>
              </li>
              {/* <li>
                <Translate contentKey="check4FactsApp.justification.elapsedTime" />: <span>{justification.elapsedTime}</span>
              </li> */}
              <li>
                <Translate contentKey="check4FactsApp.justification.totalExecutions" />: <span>{justifications.length}</span>
              </li>
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
          <Tooltip target="generate-justify" placement="top" toggle={toggleTooltip} isOpen={tooltipOpen}>
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
  inProduction: storeState.applicationProfile.inProduction,
  justifications: storeState.justification.entities,
  loading: storeState.justification.loading,
  justifyTaskStatus: storeState.justification.justifyTaskStatus,
});

const mapDispatchToProps = {
  justificationReset,
  generateStatementJustify,
  getJustificationsByStatement,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Justification);
