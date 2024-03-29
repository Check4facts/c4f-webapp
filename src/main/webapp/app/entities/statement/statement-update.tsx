import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Container, Label, Row, Table} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {setFileData, translate, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';

import {getEntities as getTopics} from 'app/entities/topic/topic.reducer';
import {createEntity, getEntity, reset, setBlob, updateEntity} from './statement.reducer';
import {convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime} from 'app/shared/util/date-utils';
import {getStatementSourcesByStatement} from "app/entities/statement-source/statement-source.reducer";
import {IStatementSource} from "app/shared/model/statement-source.model";

export interface IStatementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const StatementUpdate = (props: IStatementUpdateProps) => {
  const subTopicsFormRef = useRef(AvForm);
  const statementSourceFormRef = useRef(AvForm);
  const [subTopics, setSubTopics] = useState([] as string[]);
  const [statementSources, setStatementSources] = useState([] as IStatementSource[]);
  const [topicId, setTopicId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const {statementEntity, topics, loading, ssLoading, updating} = props;

  const {text, mainArticleText, mainArticleUrl} = statementEntity;

  const handleClose = () => {
    props.history.push('/statement' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
      props.getStatementSourcesByStatement(props.match.params.id);
    }

    props.getTopics();
  }, []);

  useEffect(() => {
    setSubTopics(statementEntity.subTopics);
  }, [statementEntity]);

  useEffect(() => {
    setStatementSources([...props.statementSources]);
  }, [props.statementSources]);

  const beforeAdd = event => {
    event.stopPropagation();
  };

  const addSubTopic = (event, errors, values) => {
    if (errors.length === 0) {
      setSubTopics(subTopics.concat([values.text]));
      subTopicsFormRef.current.reset();
    }
  };

  const removeSubTopic = index => {
    setSubTopics(subTopics.filter(st => st !== subTopics[index]));
  };

  const addStatementSource = (event, errors, values) => {
    if (errors.length === 0) {
      setStatementSources(statementSources.concat([{...values}]));
      statementSourceFormRef.current.reset();
    }
  };

  const removeStatementSource = index => {
    setStatementSources(statementSources.filter(ss => ss !== statementSources[index]));
  }

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.statementDate = convertDateTimeToServer(values.statementDate);
    values.registrationDate = convertDateTimeToServer(values.registrationDate);
    values.publicationDate = convertDateTimeToServer(values.publicationDate);

    if (errors.length === 0) {
      const entity = {
        ...statementEntity,
        ...values
      };

      if (isNew) {
        props.createEntity({
          ...entity,
          subTopics
        });
      } else {
        props.updateEntity({
          ...entity,
          subTopics,
          statementSources
        });
      }
    }
  };

  return (
    <Container fluid className="my-5">
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="check4FactsApp.statement.home.createOrEditLabel">
            <Translate contentKey="check4FactsApp.statement.home.createOrEditLabel">Create or edit a
              Statement</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading || ssLoading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : statementEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="statement-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="statement-id" type="text" className="form-control" name="id" required readOnly/>
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="textLabel" for="statement-text">
                  <Translate contentKey="check4FactsApp.statement.text">Text</Translate>
                </Label>
                <AvInput
                  id="statement-text"
                  type="textarea"
                  name="text"
                  validate={{
                    required: {value: true, errorMessage: translate('entity.validation.required')},
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="authorLabel" for="statement-author">
                  <Translate contentKey="check4FactsApp.statement.author">Author</Translate>
                </Label>
                <AvField id="statement-author" type="text" name="author"/>
              </AvGroup>
              <AvGroup>
                <Label id="statementDateLabel" for="statement-statementDate">
                  <Translate contentKey="check4FactsApp.statement.statementDate">Statement Date</Translate>
                </Label>
                <AvInput
                  id="statement-statementDate"
                  type="datetime-local"
                  className="form-control"
                  name="statementDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.statementEntity.statementDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="publicationDateLabel" for="statement-publicationDate">
                  <Translate contentKey="check4FactsApp.statement.publicationDate">Publication Date</Translate>
                </Label>
                <AvInput
                  id="statement-publicationDate"
                  type="datetime-local"
                  className="form-control"
                  name="publicationDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.statementEntity.publicationDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="registrationDateLabel" for="statement-registrationDate">
                  <Translate contentKey="check4FactsApp.statement.registrationDate">Registration Date</Translate>
                </Label>
                <AvInput
                  id="statement-registrationDate"
                  type="datetime-local"
                  className="form-control"
                  name="registrationDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.statementEntity.registrationDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="mainArticleTitleLabel" for="statement-mainArticleTitle">
                  <Translate contentKey="check4FactsApp.statement.mainArticleTitle">Main Article Title</Translate>
                </Label>
                <AvInput id="statement-mainArticleTitle" type="textarea" name="mainArticleTitle"/>
              </AvGroup>
              <AvGroup>
                <Label id="mainArticleTextLabel" for="statement-mainArticleText">
                  <Translate contentKey="check4FactsApp.statement.mainArticleText">Main Article Text</Translate>
                </Label>
                <AvInput id="statement-mainArticleText" type="textarea" name="mainArticleText"/>
              </AvGroup>
              <AvGroup>
                <Label id="mainArticleUrlLabel" for="statement-mainArticleUrl">
                  <Translate contentKey="check4FactsApp.statement.mainArticleUrl">Main Article Url</Translate>
                </Label>
                <AvInput id="statement-mainArticleUrl" type="textarea" name="mainArticleUrl"/>
              </AvGroup>
              <AvGroup>
                <Label for="statement-topic">
                  <Translate contentKey="check4FactsApp.statement.topic">Topic</Translate>
                </Label>
                <AvInput id="statement-topic" type="select" className="form-control" name="topic.id">
                  <option value="" key="0"/>
                  {topics
                    ? topics.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {translate(`fact-checking.sub-menus.${otherEntity.name}`)}
                      </option>
                    ))
                    : null}
                </AvInput>
              </AvGroup>
              <Col lg={{size: 10, offset: 1}} className="text-center mt-5">
                <h4 className="p-3">
                  <Translate contentKey="check4FactsApp.statement.statementSources">Πηγές Δήλωσης</Translate>
                </h4>
                {statementSources.length > 0 ? (
                  <Col>
                    <Table responsive>
                      <thead>
                      <tr>
                        <th>#</th>
                        <th>
                          <Translate contentKey="check4FactsApp.statementSource.url">Url</Translate>
                        </th>
                        <th>
                          <Translate contentKey="check4FactsApp.statementSource.title">Title</Translate>
                        </th>
                        <th>
                          <Translate contentKey="check4FactsApp.statementSource.snippet">Snippet</Translate>
                        </th>
                        <th/>
                      </tr>
                      </thead>
                      <tbody>
                      {statementSources.map((statementSource, i) => (
                        <tr key={`entity-${i}`}>
                          <td>{i + 1}</td>
                          <td>{statementSource.url}</td>
                          <td>{statementSource.title}</td>
                          <td>{statementSource.snippet}</td>
                          <td className="text-right">
                            <Button color="danger" onClick={() => removeStatementSource(i)}>
                              <FontAwesomeIcon icon="trash"/>
                            </Button>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </Table>
                  </Col>
                ) : (
                  <Col md={{size: 4, offset: 4}} className="alert alert-warning text-center">
                    <Translate contentKey="fact-checking.check.statementSources.notAdded"/>
                  </Col>
                )}
                <Col md={{size: 10, offset: 1}}>
                  <AvForm
                    model={{}}
                    beforeSubmitValidation={beforeAdd}
                    onSubmit={addStatementSource}
                    ref={statementSourceFormRef}>
                    <AvGroup>
                      <Label id="urlLabel" for="statement-source-url">
                        <Translate contentKey="check4FactsApp.statementSource.url">Url</Translate>
                      </Label>
                      <AvInput
                        id="statement-source-url"
                        type="textarea"
                        name="url"
                        validate={{
                          required: {value: true, errorMessage: translate('entity.validation.required')},
                        }}
                      />
                    </AvGroup>
                    <AvGroup>
                      <Label id="titleLabel" for="statement-source-title">
                        <Translate contentKey="check4FactsApp.statementSource.title">Title</Translate>
                      </Label>
                      <AvField id="statement-source-title" type="text" name="title"/>
                    </AvGroup>
                    <AvGroup>
                      <Label id="snippetLabel" for="statement-source-snippet">
                        <Translate contentKey="check4FactsApp.statementSource.snippet">Snippet</Translate>
                      </Label>
                      <AvInput id="statement-source-snippet" type="textarea" name="snippet"/>
                    </AvGroup>
                    <Col md={{size: 4, offset: 4}} className="text-center">
                      <Button color="primary" id="add-entity" type="submit">
                        <FontAwesomeIcon icon="plus"/>
                        &nbsp;
                        <Translate contentKey="fact-checking.check.statementSources.add"/>
                      </Button>
                    </Col>
                  </AvForm>
                </Col>
              </Col>
              <Col md={{size: 4, offset: 4}} className="text-center mt-5">
                <h4 className="p-3">
                  <Translate contentKey="check4FactsApp.statement.subTopics">Sub Topics</Translate>
                </h4>
                {subTopics && subTopics.length > 0 && (
                  <Table responsive>
                    <thead>
                    <tr>
                      <th>#</th>
                      <th>
                        <Translate contentKey="check4FactsApp.statement.subTopic">Sub Topic</Translate>
                      </th>
                      <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {subTopics.map((subTopic, i) => (
                      <tr key={`st-${i}`}>
                        <td>{i + 1}</td>
                        <td>{subTopic}</td>
                        <td className="text-right">
                          <Button color="danger" onClick={() => removeSubTopic(i)}>
                            <FontAwesomeIcon icon="trash"/>
                          </Button>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </Table>
                )}
                <AvForm
                  model={{}}
                  beforeSubmitValidation={beforeAdd}
                  onSubmit={addSubTopic}
                  ref={subTopicsFormRef}
                >
                  <AvGroup>
                    <AvInput
                      id="sub-topic-text"
                      type="text"
                      name="text"
                    />
                  </AvGroup>
                  <Col className="text-center">
                    <Button color="primary" id="add-sub-topic" type="submit">
                      <FontAwesomeIcon icon="plus"/>
                      &nbsp;
                      Προσθήκη
                    </Button>
                  </Col>
                </AvForm>
              </Col>
              <div className="float-right mt-5">
                <Button tag={Link} id="cancel-save" to="/statement" replace color="info">
                  <FontAwesomeIcon icon="arrow-left"/>
                  &nbsp;
                  <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save"/>
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </div>
            </AvForm>
          )}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  topics: storeState.topic.entities,
  statementSources: storeState.statementSource.entities,
  statementEntity: storeState.statement.entity,
  loading: storeState.statement.loading,
  ssLoading: storeState.statementSource.loading,
  updating: storeState.statement.updating,
  updateSuccess: storeState.statement.updateSuccess,
});

const mapDispatchToProps = {
  getTopics,
  getStatementSourcesByStatement,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(StatementUpdate);
