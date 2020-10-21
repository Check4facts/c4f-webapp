import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IStatement } from 'app/shared/model/statement.model';
import { getEntities as getStatements } from 'app/entities/statement/statement.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './resource.reducer';
import { IResource } from 'app/shared/model/resource.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IResourceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ResourceUpdate = (props: IResourceUpdateProps) => {
  const [statementId, setStatementId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { resourceEntity, statements, loading, updating } = props;

  const { url, title, snippet, htmlSnippet, body } = resourceEntity;

  const handleClose = () => {
    props.history.push('/resource' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getStatements();
  }, []);

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
    values.harvestDate = convertDateTimeToServer(values.harvestDate);

    if (errors.length === 0) {
      const entity = {
        ...resourceEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="check4FactsApp.resource.home.createOrEditLabel">
            <Translate contentKey="check4FactsApp.resource.home.createOrEditLabel">Create or edit a Resource</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : resourceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="resource-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="resource-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="urlLabel" for="resource-url">
                  <Translate contentKey="check4FactsApp.resource.url">Url</Translate>
                </Label>
                <AvInput
                  id="resource-url"
                  type="textarea"
                  name="url"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="harvestIterationLabel" for="resource-harvestIteration">
                  <Translate contentKey="check4FactsApp.resource.harvestIteration">Harvest Iteration</Translate>
                </Label>
                <AvField
                  id="resource-harvestIteration"
                  type="string"
                  className="form-control"
                  name="harvestIteration"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="titleLabel" for="resource-title">
                  <Translate contentKey="check4FactsApp.resource.title">Title</Translate>
                </Label>
                <AvInput
                  id="resource-title"
                  type="textarea"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="snippetLabel" for="resource-snippet">
                  <Translate contentKey="check4FactsApp.resource.snippet">Snippet</Translate>
                </Label>
                <AvInput id="resource-snippet" type="textarea" name="snippet" />
              </AvGroup>
              <AvGroup>
                <Label id="htmlSnippetLabel" for="resource-htmlSnippet">
                  <Translate contentKey="check4FactsApp.resource.htmlSnippet">Html Snippet</Translate>
                </Label>
                <AvInput id="resource-htmlSnippet" type="textarea" name="htmlSnippet" />
              </AvGroup>
              <AvGroup>
                <Label id="fileFormatLabel" for="resource-fileFormat">
                  <Translate contentKey="check4FactsApp.resource.fileFormat">File Format</Translate>
                </Label>
                <AvInput
                  id="resource-fileFormat"
                  type="select"
                  className="form-control"
                  name="fileFormat"
                  value={(!isNew && resourceEntity.fileFormat) || 'PDF'}
                >
                  <option value="PDF">{translate('check4FactsApp.FileFormat.PDF')}</option>
                  <option value="DOC">{translate('check4FactsApp.FileFormat.DOC')}</option>
                  <option value="NONE">{translate('check4FactsApp.FileFormat.NONE')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="bodyLabel" for="resource-body">
                  <Translate contentKey="check4FactsApp.resource.body">Body</Translate>
                </Label>
                <AvInput id="resource-body" type="textarea" name="body" />
              </AvGroup>
              <AvGroup>
                <Label id="harvestDateLabel" for="resource-harvestDate">
                  <Translate contentKey="check4FactsApp.resource.harvestDate">Harvest Date</Translate>
                </Label>
                <AvInput
                  id="resource-harvestDate"
                  type="datetime-local"
                  className="form-control"
                  name="harvestDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.resourceEntity.harvestDate)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="resource-statement">
                  <Translate contentKey="check4FactsApp.resource.statement">Statement</Translate>
                </Label>
                <AvInput id="resource-statement" type="select" className="form-control" name="statement.id">
                  <option value="" key="0" />
                  {statements
                    ? statements.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/resource" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  statements: storeState.statement.entities,
  resourceEntity: storeState.resource.entity,
  loading: storeState.resource.loading,
  updating: storeState.resource.updating,
  updateSuccess: storeState.resource.updateSuccess,
});

const mapDispatchToProps = {
  getStatements,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResourceUpdate);
