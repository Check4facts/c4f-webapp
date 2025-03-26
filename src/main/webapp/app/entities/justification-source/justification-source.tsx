import { IRootState } from 'app/shared/reducers';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from 'reactstrap';
import { getEntities, reset } from './justification-source.reducer';
import { IJustificationSource } from 'app/shared/model/justification-source.model';
import './justification-source.scss';

interface IJustificationSourceProps extends StateProps, DispatchProps {
  isOpen: boolean;
  toggle: () => void;
}

const JustificationSource = (props: IJustificationSourceProps) => {
  const { isOpen, justificationSources, loading } = props;
  const [lists, setLists] = useState({ black: [], white: [] } as { black: IJustificationSource[]; white: IJustificationSource[] });

  useEffect(() => {
    if (isOpen) {
      props.getEntities();
    } else {
      props.reset();
    }
  }, [isOpen]);

  useEffect(() => {
    if (justificationSources.length > 0) {
      setLists(
        justificationSources.reduce(
          (acc, curr) => {
            curr.blackListed ? acc.black.push(curr) : acc.white.push(curr);
            return acc;
          },
          { black: [], white: [] }
        )
      );
    } else {
      setLists({ black: [], white: [] });
    }
  }, [justificationSources]);

  // eslint-disable-next-line no-console
  // console.log(lists);

  return (
    <Modal isOpen={isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Justification Sources</ModalHeader>
      <ModalBody>
        {loading ? (
          <Spinner style={{ width: '5rem', height: '5rem', margin: '10% 0 10% 45%' }} color="dark" />
        ) : (
          <div className="justification-sources">
            <h3>Black and White lists</h3>
            <div className="black-list">{lists.black.map(blackItem => blackItem.url)}</div>
            <div className="white-list">{lists.white.map(whiteItem => whiteItem.url)}</div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={props.toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  currentLocale: storeState.locale.currentLocale,
  loading: storeState.justificationSource.loading,
  justificationSources: storeState.justificationSource.entities,
});

const mapDispatchToProps = {
  getEntities,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JustificationSource);
