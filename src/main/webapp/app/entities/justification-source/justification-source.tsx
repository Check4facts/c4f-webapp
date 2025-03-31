import { IRootState } from 'app/shared/reducers';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner, Form, FormGroup, Input, Label, Col, FormFeedback } from 'reactstrap';
import { getEntities, deleteEntity, updateEntity, saveBatch, reset } from './justification-source.reducer';
import { IJustificationSource } from 'app/shared/model/justification-source.model';
import './justification-source.scss';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IJustificationSourceProps extends StateProps, DispatchProps {
  isOpen: boolean;
  toggle: () => void;
}

const JustificationSource = (props: IJustificationSourceProps) => {
  const { isOpen, justificationSources, loading } = props;
  const [addOpen, setAddOpen] = useState(false);
  const [addNewSource, setAddNewSource] = useState({ url: '', blackListed: false } as IJustificationSource);
  const [lists, setLists] = useState({ black: [], white: [] } as { black: IJustificationSource[]; white: IJustificationSource[] });
  // Local state to track edit mode and the edited URL value per row.
  const [editingRows, setEditingRows] = useState<{ [id: string]: string }>({});

  const addToLists = (source: IJustificationSource) => {
    setLists(prevState => ({
      ...prevState,
      black: source.blackListed ? [...prevState.black, source] : prevState.black,
      white: !source.blackListed ? [...prevState.white, source] : prevState.white,
    }));
  };

  const saveLists = () => props.saveBatch([...lists.black, ...lists.white]);

  const hasSameUrls =
    [...lists.black, ...lists.white].length === justificationSources.length &&
    [...lists.black, ...lists.white].every(source =>
      justificationSources.some(justificationSource => justificationSource.url === source.url)
    );

  const isValidUrl = (url: string | undefined): boolean => {
    if (!url || !url.trim()) {
      return false;
    }
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-./?%&=]*)?$/i;
    return urlRegex.test(url);
  };

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

  const renderList = (list: IJustificationSource[], listType: 'black' | 'white') => (
    <table className="table">
      <thead>
        <tr>
          <th>
            <Translate contentKey="check4FactsApp.justification_source.url" />
          </th>
          <th>
            <Translate contentKey="check4FactsApp.justification_source.action" />
          </th>
        </tr>
      </thead>
      <tbody>
        {list.map(item => (
          <tr key={`${listType}-${item.id}`}>
            <td>
              {editingRows[item.id] !== undefined && editingRows[item.id] !== null ? (
                <Input
                  type="text"
                  value={editingRows[item.id] ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newValue = e.target.value;
                    setEditingRows(prev => ({
                      ...prev,
                      [item.id]: newValue,
                    }));
                  }}
                />
              ) : (
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.url}
                </a>
              )}
            </td>
            <td>
              {editingRows[item.id] !== undefined ? (
                <Button
                  color="success"
                  size="sm"
                  className="ms-2"
                  onClick={() => {
                    const updatedUrl = editingRows[item.id].trim();
                    if (updatedUrl) {
                      const updatedItem = { ...item, url: updatedUrl };
                      if (justificationSources.some(justificationSource => justificationSource.id === item.id)) {
                        props.updateEntity(updatedItem);
                      } else {
                        setLists(prevState => ({
                          ...prevState,
                          [listType]: prevState[listType].map(source => (source.id === item.id ? updatedItem : source)),
                        }));
                      }
                      setEditingRows(prev => {
                        const newState = { ...prev };
                        delete newState[item.id];
                        return newState;
                      });
                    }
                  }}
                >
                  <FontAwesomeIcon icon="save" />
                </Button>
              ) : (
                <Button
                  color="primary"
                  size="sm"
                  className="ms-2"
                  onClick={() => {
                    setEditingRows(prev => ({ ...prev, [item.id]: item.url }));
                  }}
                >
                  <FontAwesomeIcon icon="pencil-alt" />
                </Button>
              )}
              <Button
                color="danger"
                size="sm"
                onClick={() => {
                  if (justificationSources.some(justificationSource => justificationSource.url === item.url)) {
                    props.deleteEntity(item.id);
                  } else {
                    setLists(prevState => ({
                      ...prevState,
                      [listType]: prevState[listType].filter(source => source.url !== item.url),
                    }));
                  }
                }}
              >
                <FontAwesomeIcon icon="trash" />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <Modal isOpen={isOpen} toggle={props.toggle} size="xl" centered={true}>
        <ModalHeader toggle={props.toggle}>
          <Translate contentKey="check4FactsApp.justification_source.home.title" />
        </ModalHeader>
        <ModalBody>
          {loading ? (
            <Spinner style={{ width: '5rem', height: '5rem', margin: '10% 0 10% 45%' }} color="dark" />
          ) : (
            <>
              <div className="justification-sources">
                <div className="list">
                  <h4>
                    <Translate contentKey="check4FactsApp.justification_source.blackList" />
                  </h4>
                  {renderList(lists.black, 'black')}
                </div>
                <div className="list">
                  <h4>
                    <Translate contentKey="check4FactsApp.justification_source.whiteList" />
                  </h4>
                  {renderList(lists.white, 'white')}
                </div>
              </div>
              <div className="justification-sources-footer">
                <Button color="info" onClick={() => setAddOpen(!addOpen)}>
                  <Translate contentKey="check4FactsApp.justification_source.add" />
                </Button>
                {!hasSameUrls && (
                  <Button color="success" onClick={() => saveLists()}>
                    <Translate contentKey="check4FactsApp.justification_source.save" />
                  </Button>
                )}
              </div>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.toggle}>
            <Translate contentKey="check4FactsApp.justification_source.close" />
          </Button>
        </ModalFooter>
      </Modal>
      <Modal fade={false} isOpen={addOpen} toggle={() => setAddOpen(!addOpen)}>
        <ModalHeader toggle={() => setAddOpen(!addOpen)}>
          <Translate contentKey="check4FactsApp.justification_source.add" />
        </ModalHeader>
        <ModalBody>
          <Form className="form-group">
            <FormGroup row>
              <Label for="urlInput" sm={3}>
                <Translate contentKey="check4FactsApp.justification_source.url" />
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  id="urlInput"
                  className="form-control"
                  placeholder="Enter URL"
                  value={addNewSource.url}
                  invalid={!isValidUrl(addNewSource.url)}
                  onChange={e => setAddNewSource({ ...addNewSource, url: e.target.value })}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="blackListedInput" sm={3}>
                <Translate contentKey="check4FactsApp.justification_source.blackListed" />
              </Label>
              <Col sm={9} style={{ paddingTop: '9px' }}>
                <FormGroup check>
                  <Input
                    type="checkbox"
                    id="blackListedInput"
                    checked={addNewSource.blackListed}
                    onChange={e => setAddNewSource({ ...addNewSource, blackListed: e.target.checked })}
                    style={{ width: '20px', height: '20px' }}
                  />
                </FormGroup>
              </Col>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setAddOpen(!addOpen)}>
            <Translate contentKey="check4FactsApp.justification_source.modal.button.cancel" />
          </Button>
          <Button
            color="primary"
            onClick={() => {
              addToLists(addNewSource);
              setAddOpen(!addOpen);
              setAddNewSource({ url: '', blackListed: false });
            }}
          >
            <Translate contentKey="check4FactsApp.justification_source.modal.button.add" />
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  currentLocale: storeState.locale.currentLocale,
  loading: storeState.justificationSource.loading,
  justificationSources: storeState.justificationSource.entities,
});

const mapDispatchToProps = {
  getEntities,
  deleteEntity,
  updateEntity,
  saveBatch,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JustificationSource);
