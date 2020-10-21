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
import { getEntity, updateEntity, createEntity, setBlob, reset } from './statement-source.reducer';
import { IStatementSource } from 'app/shared/model/statement-source.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStatementSourceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const StatementSourceUpdate = (props: IStatementSourceUpdateProps) => {
  const [statementId, setStatementId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { statementSourceEntity, statements, loading, updating } = props;

  const { url, snippet } = statementSourceEntity;

  const handleClose = () => {
    props.history.push('/statement-source');
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
    if (errors.length === 0) {
      const entity = {
        ...statementSourceEntity,
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
          <h2 id="check4FactsApp.statementSource.home.createOrEditLabel">
            <Translate contentKey="check4FactsApp.statementSource.home.createOrEditLabel">Create or edit a StatementSource</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : statementSourceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="statement-source-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="statement-source-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="urlLabel" for="statement-source-url">
                  <Translate contentKey="check4FactsApp.statementSource.url">Url</Translate>
                </Label>
                <AvInput
                  id="statement-source-url"
                  type="textarea"
                  name="url"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="titleLabel" for="statement-source-title">
                  <Translate contentKey="check4FactsApp.statementSource.title">Title</Translate>
                </Label>
                <AvField id="statement-source-title" type="text" name="title" />
              </AvGroup>
              <AvGroup>
                <Label id="snippetLabel" for="statement-source-snippet">
                  <Translate contentKey="check4FactsApp.statementSource.snippet">Snippet</Translate>
                </Label>
                <AvInput id="statement-source-snippet" type="textarea" name="snippet" />
              </AvGroup>
              <AvGroup>
                <Label for="statement-source-statement">
                  <Translate contentKey="check4FactsApp.statementSource.statement">Statement</Translate>
                </Label>
                <AvInput id="statement-source-statement" type="select" className="form-control" name="statement.id">
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
              <Button tag={Link} id="cancel-save" to="/statement-source" replace color="info">
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
  statementSourceEntity: storeState.statementSource.entity,
  loading: storeState.statementSource.loading,
  updating: storeState.statementSource.updating,
  updateSuccess: storeState.statementSource.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(StatementSourceUpdate);
