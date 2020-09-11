import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './article.reducer';
import { IArticle } from 'app/shared/model/article.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IArticleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ArticleUpdate = (props: IArticleUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { articleEntity, loading, updating } = props;

  const { previewImage, previewImageContentType } = articleEntity;

  const handleClose = () => {
    props.history.push('/article' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
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
    values.lastModified = convertDateTimeToServer(values.lastModified);

    if (errors.length === 0) {
      const entity = {
        ...articleEntity,
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
          <h2 id="check4FactsApp.article.home.createOrEditLabel">
            <Translate contentKey="check4FactsApp.article.home.createOrEditLabel">Create or edit a Article</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : articleEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="article-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="article-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="categoryLabel" for="article-category">
                  <Translate contentKey="check4FactsApp.article.category">Category</Translate>
                </Label>
                <AvField
                  id="article-category"
                  type="text"
                  name="category"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="contentLabel" for="article-content">
                  <Translate contentKey="check4FactsApp.article.content">Content</Translate>
                </Label>
                <AvField
                  id="article-content"
                  type="text"
                  name="content"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedLabel" for="article-lastModified">
                  <Translate contentKey="check4FactsApp.article.lastModified">Last Modified</Translate>
                </Label>
                <AvInput
                  id="article-lastModified"
                  type="datetime-local"
                  className="form-control"
                  name="lastModified"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.articleEntity.lastModified)}
                />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="previewImageLabel" for="previewImage">
                    <Translate contentKey="check4FactsApp.article.previewImage">Preview Image</Translate>
                  </Label>
                  <br />
                  {previewImage ? (
                    <div>
                      {previewImageContentType ? (
                        <a onClick={openFile(previewImageContentType, previewImage)}>
                          <img src={`data:${previewImageContentType};base64,${previewImage}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {previewImageContentType}, {byteSize(previewImage)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('previewImage')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_previewImage" type="file" onChange={onBlobChange(true, 'previewImage')} accept="image/*" />
                  <AvInput type="hidden" name="previewImage" value={previewImage} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="previewTitleLabel" for="article-previewTitle">
                  <Translate contentKey="check4FactsApp.article.previewTitle">Preview Title</Translate>
                </Label>
                <AvField
                  id="article-previewTitle"
                  type="text"
                  name="previewTitle"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup check>
                <Label id="publishedLabel">
                  <AvInput id="article-published" type="checkbox" className="form-check-input" name="published" />
                  <Translate contentKey="check4FactsApp.article.published">Published</Translate>
                </Label>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/article" replace color="info">
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
  articleEntity: storeState.article.entity,
  loading: storeState.article.loading,
  updating: storeState.article.updating,
  updateSuccess: storeState.article.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ArticleUpdate);
