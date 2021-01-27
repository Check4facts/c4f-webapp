import React, { useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import {Translate} from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { IModalContent } from 'app/shared/model/util.model';
import { trainModel} from 'app/modules/fact-checking/fact-checking.reducer';
import { Button, Row, Col, Container, Spinner, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export interface IToolsProps extends StateProps, DispatchProps {}

export const Tools = (props: IToolsProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({} as IModalContent);

  const openModal = (content: IModalContent) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const reIndex = () => {
    axios.post('/api/elasticsearch/index');
    setModalOpen(false);
  };

  const train = () => {
    props.trainModel();
    setModalOpen(false);
  };

  const { training, trainingLoading } = props;

  return (
    <Container>
      <Row className="my-5">
        <Col>
          <h1 className="text-center">
            <Translate contentKey="global.menu.admin.tools">Tools</Translate>
          </h1>
        </Col>
      </Row>
      <Row className="mb-1 p-3 border border-info">
        <Col>
          <h4 className="text-center">Re-index ElasticSearch.</h4>
        </Col>
        <Col className="d-flex justify-content-center">
          <Button onClick={() =>
            openModal({
              header: 'Re-index ElasticSearch',
              body: 'Are you sure you want to re-index ElasticSearch?',
              action: reIndex
            })
          } color="primary">ReIndex</Button>
        </Col>
        <Col>
          <h4 className="text-center">Train the ML model.</h4>
        </Col>
        {
          trainingLoading ? (
            <Col className="d-flex justify-content-center">
              <Button color="primary">
                <Spinner size="sm" color="dark" />
              </Button>
            </Col>
          ) : (
            training ? (
              <Col className="d-flex justify-content-center alert alert-info py-3" style={{ borderRadius: '30px' }}>
                Model is being trained at the moment.
              </Col>
            ) : (
              <Col className="d-flex justify-content-center">
                <Button onClick={() =>
                  openModal({
                    header: 'Train Model',
                    body: 'Are you sure you want to train the model?',
                    action: train
                  })
                } color="primary">Train</Button>
              </Col>
            )
          )
        }
      </Row>
      <Modal size="md" isOpen={modalOpen} toggle={() => setModalOpen(false)}>
        <ModalHeader className="text-primary">{modalContent.header}</ModalHeader>
        <ModalBody>{modalContent.body}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setModalOpen(false)}>No</Button>
          <Button color="primary" onClick={() => modalContent.action()}>Yes</Button>
        </ModalFooter>
      </Modal>
    </Container>
  )
};

const mapStateToProps = (storeState: IRootState) => ({
  trainingLoading: storeState.factChecking.trainingLoading,
  training: storeState.factChecking.training
});

const mapDispatchToProps = {
  trainModel
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
