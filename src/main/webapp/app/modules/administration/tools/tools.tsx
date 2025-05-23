import React, { useState, useEffect, useRef } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { connect } from 'react-redux';
import { Translate } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { IModalContent, ITaskStatus } from 'app/shared/model/util.model';
import { importFromCSV } from 'app/entities/statement/statement.reducer';
import { getActiveCeleryTasks } from 'app/entities/kombu-message/kombu-message.reducer';
import { trainModel, getTaskStatus, removeTaskStatus } from 'app/modules/fact-checking/fact-checking.reducer';
import { Button, Row, Col, Container, Spinner, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { ProgressBar } from 'app/shared/util/progress-bar';
import {
  getEntities as getFeatureToggleList,
  updateEntity as updateFeatureToggle,
} from 'app/entities/feature-toggle/feature-toggle.reducer';

export interface IToolsProps extends StateProps, DispatchProps {}

export const Tools = (props: IToolsProps) => {
  const trainStatusInterval = useRef(null);
  const [csvFile, setCsvFile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({} as IModalContent);
  const [trainStatus, setTrainStatus] = useState({} as ITaskStatus);

  const { trainingLoading, activeStatuses, taskStatuses, kLoading, importing, featureToggleList, ftLoading, ftUpdating } = props;

  useEffect(() => {
    props.getActiveCeleryTasks();
    props.getFeatureToggleList();
  }, []);

  useEffect(() => {
    taskStatuses.forEach(task => {
      if (_.isEmpty(trainStatus) && task.taskInfo !== null && task.taskInfo.type === 'TRAIN') {
        setTrainStatus(task);
      } else if (task.taskId === trainStatus.taskId) {
        setTrainStatus(task);
      }
    });
  }, [taskStatuses]);

  useEffect(() => {
    // Hook to set training status from active statuses.
    activeStatuses.forEach(value => {
      if (value.taskInfo !== null && value.taskInfo.type === 'TRAIN') {
        setTrainStatus(value);
      }
    });
  }, [activeStatuses]);

  useEffect(() => {
    if (trainStatus) {
      if (!_.isEmpty(trainStatus) && trainStatusInterval.current === null) {
        trainStatusInterval.current = setInterval(() => {
          props.getTaskStatus(trainStatus.taskId);
        }, 10000);
      }
      if (trainStatus.status === 'SUCCESS') {
        props.removeTaskStatus(trainStatus.taskId);
        setTrainStatus({});
        clearInterval(trainStatusInterval.current);
      }
    }
  }, [trainStatus]);

  const openModal = (content: IModalContent) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const reIndex = () => {
    axios.post('/api/elasticsearch/index');
    setModalOpen(false);
  };

  const populateArticlesGreeklish = () => {
    axios.get('/api/articles/populate-greeklish');
    setModalOpen(false);
  };

  const populateNewsGreeklish = () => {
    axios.get('/api/news/populate-greeklish');
    setModalOpen(false);
  };

  const train = () => {
    props.trainModel();
    setModalOpen(false);
  };

  const onFileChange = event => setCsvFile(event.target.files[0]);

  return kLoading ? (
    <div>
      <Spinner style={{ width: '5rem', height: '5rem', margin: '10% 0 10% 45%' }} color="dark" />
    </div>
  ) : (
    <Container>
      <Row className="my-5">
        <Col>
          <h1 className="text-center">
            <Translate contentKey="global.menu.admin.tools">Tools</Translate>
          </h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="text-center">Re-index ElasticSearch.</h4>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Button
            onClick={() =>
              openModal({
                header: 'Re-index ElasticSearch',
                body: 'Are you sure you want to re-index ElasticSearch?',
                action: reIndex,
              })
            }
            color="primary"
          >
            ReIndex
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="text-center">Populate Articles Greeklish</h4>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Button
            onClick={() =>
              openModal({
                header: 'Populate Articles Greeklish',
                body: 'Are you sure you want populate articles greeklish?',
                action: populateArticlesGreeklish,
              })
            }
            color="primary"
          >
            Articles Greeklish
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="text-center">Populate News Greeklish</h4>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Button
            onClick={() =>
              openModal({
                header: 'Populate News Greeklish',
                body: 'Are you sure you want populate news greeklish?',
                action: populateNewsGreeklish,
              })
            }
            color="primary"
          >
            News Greeklish
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h4 className="text-center">Train the ML model.</h4>
        </Col>
      </Row>
      {trainingLoading ? (
        <Row>
          <Col className="d-flex justify-content-center">
            <Button color="primary">
              <Spinner size="sm" color="dark" />
            </Button>
          </Col>
        </Row>
      ) : trainStatus.taskInfo ? (
        <Row>{<ProgressBar message="Model is being trained at the moment..." task={trainStatus} />}</Row>
      ) : (
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              onClick={() =>
                openModal({
                  header: 'Train Model',
                  body: 'Are you sure you want to train the model?',
                  action: train,
                })
              }
              color="primary"
            >
              Train
            </Button>
          </Col>
        </Row>
      )}
      <Row className="my-3">
        <Col>
          <h4 className="text-center">Features of Check4Facts</h4>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex flex-wrap justify-content-center">
            {ftLoading || ftUpdating ? (
              <div>
                <Spinner style={{ width: '5rem', height: '5rem', margin: '10% 0 10% 45%' }} color="dark" />
              </div>
            ) : (
              featureToggleList.map(feature => (
                <div key={feature.key} className="m-2 p-3 border rounded text-center" style={{ width: '200px' }}>
                  <h5>{feature.key}</h5>
                  <Button
                    color={feature.enabled ? 'danger' : 'success'}
                    onClick={() => {
                      props.updateFeatureToggle({ ...feature, enabled: !feature.enabled });
                    }}
                  >
                    {feature.enabled ? 'Disable' : 'Enable'}
                  </Button>
                </div>
              ))
            )}
          </div>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <h4 className="text-center">Import Statements from CSV</h4>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          {importing ? (
            <div>
              <Spinner style={{ width: '5rem', height: '5rem', margin: '10% 0 10% 45%' }} color="dark" />
            </div>
          ) : (
            <AvForm onSubmit={() => props.importFromCSV(csvFile)}>
              <AvField type="file" accept=".csv" name="csvFile" label="Upload your CSV" onChange={onFileChange} />
              <Button>Submit</Button>
            </AvForm>
          )}
        </Col>
      </Row>
      <Modal size="md" isOpen={modalOpen} toggle={() => setModalOpen(false)}>
        <ModalHeader className="text-primary">{modalContent.header}</ModalHeader>
        <ModalBody>{modalContent.body}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModalOpen(false)}>
            No
          </Button>
          <Button color="primary" onClick={() => modalContent.action()}>
            Yes
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  trainingLoading: storeState.factChecking.trainingLoading,
  taskStatuses: storeState.factChecking.taskStatuses,
  kLoading: storeState.kombuMessage.loading,
  activeStatuses: storeState.kombuMessage.activeStatuses,
  importing: storeState.statement.loading,
  featureToggleList: storeState.featureToggle.entities,
  ftUpdating: storeState.featureToggle.updating,
  ftLoading: storeState.featureToggle.loading,
});

const mapDispatchToProps = {
  trainModel,
  getActiveCeleryTasks,
  getTaskStatus,
  removeTaskStatus,
  importFromCSV,
  getFeatureToggleList,
  updateFeatureToggle,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
