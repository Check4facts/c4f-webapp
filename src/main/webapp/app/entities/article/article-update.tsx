import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { TabContent, TabPane, Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, setFileData, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './article.reducer';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { reset as factReset } from 'app/modules/fact-checking/fact-checking.reducer';
import ArticleContentEditor from "app/entities/article/article-content-editor";

import CKEditor from '@ckeditor/ckeditor5-react';

export interface IArticleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ArticleUpdate = (props: IArticleUpdateProps) => {
  const editorRef = useRef(CKEditor);
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { articleEntity, categories, loading, updating, statement, urls } = props;

  const { previewImage, previewImageContentType } = articleEntity;

  const handleClose = () => {
    props.factReset();
    props.history.push('/article' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCategories();
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
    values.articleDate = convertDateTimeToServer(values.articleDate);
    values.content = editorRef.current.editor.getData();
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
        <Col className="text-center" md="8">
          <h2 id="check4FactsApp.article.home.createOrEditLabel">
            <Translate contentKey="check4FactsApp.article.home.createOrEditLabel">Create or edit a Article</Translate>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? { previewTitle: statement } : articleEntity} onSubmit={saveEntity}>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Col md={{ size: 8, offset: 2 }} className="mt-3">
                    {!isNew ? (
                      <AvGroup>
                        <Label for="article-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        <AvInput id="article-id" type="text" className="form-control" name="id" required readOnly />
                      </AvGroup>
                    ) : null}
                    <AvGroup>
                      <Label id="previewTitleLabel" for="article-previewTitle">
                        <Translate contentKey="check4FactsApp.article.previewTitle">Preview Title</Translate>
                      </Label>
                      <AvField
                        id="article-previewTitle"
                        type="textarea"
                        name="previewTitle"
                        validate={{
                          required: { value: true, errorMessage: translate('entity.validation.required') },
                        }}
                      />
                    </AvGroup>
                    <AvGroup>
                      <Label id="previewTextLabel" for="article-previewText">
                        <Translate contentKey="check4FactsApp.article.previewText">Preview Text</Translate>
                      </Label>
                      <AvField
                        id="article-previewText"
                        type="textarea"
                        name="previewText"
                        validate={{
                          required: { value: true, errorMessage: translate('entity.validation.required') },
                        }}
                      />
                    </AvGroup>
                    <AvGroup>
                      <Label for="article-category">
                        <Translate contentKey="check4FactsApp.article.category">Category</Translate>
                      </Label>
                      <AvInput
                        id="article-category"
                        type="select"
                        className="form-control"
                        name="category.id"
                        value={isNew ? categories[0] && categories[0].id : articleEntity.category?.id}
                        required
                      >
                        {categories
                          ? categories.map(otherEntity => (
                            <option value={otherEntity.id} key={otherEntity.id}>
                              {translate(`check4FactsApp.category.${otherEntity.name}`)}
                            </option>
                          ))
                          : null}
                      </AvInput>
                      <AvFeedback>
                        <Translate contentKey="entity.validation.required">This field is required.</Translate>
                      </AvFeedback>
                    </AvGroup>
                    <AvGroup>
                      <Label id="factCreatorLabel" for="article-factCreator">
                        <Translate contentKey="check4FactsApp.article.factCreator">Fact Creator</Translate>
                      </Label>
                      <AvField
                        id="article-factCreator"
                        type="text"
                        name="factCreator"
                      />
                    </AvGroup>
                    <AvGroup>
                      <Label id="authorLabel" for="article-author">
                        <Translate contentKey="check4FactsApp.article.author">Author</Translate>
                      </Label>
                      <AvField
                        id="article-author"
                        type="text"
                        name="author"
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
                                <img src={`data:${previewImageContentType};base64,${previewImage}`} style={{ maxHeight: '100px' }} alt="previewImage" />
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
                      <Label id="articleDateLabel" for="article-articleDate">
                        <Translate contentKey="check4FactsApp.article.articleDate">Article Date</Translate>
                      </Label>
                      <AvInput
                        id="article-articleDate"
                        type="datetime-local"
                        className="form-control"
                        name="articleDate"
                        placeholder={'YYYY-MM-DD HH:mm'}
                        value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.articleEntity.articleDate)}
                      />
                    </AvGroup>
                    <AvGroup check>
                      <Label id="publishedLabel">
                        <AvInput id="article-published" type="checkbox" className="form-check-input" name="published" />
                        <Translate contentKey="check4FactsApp.article.published">Published</Translate>
                      </Label>
                    </AvGroup>
                    <Button tag={Link} id="cancel-save" to="/article" replace color="danger">
                      <FontAwesomeIcon icon="arrow-left" />
                      &nbsp;
                      <Translate contentKey="entity.action.back">Back</Translate>
                    </Button>
                    &nbsp;
                    <Button className="float-right" color="primary" type="button" onClick={() => toggle('2')}>
                      <FontAwesomeIcon icon="arrow-right" />
                      &nbsp;
                      <Translate contentKey="entity.action.next" />
                    </Button>
                  </Col>
                </TabPane>
                <TabPane tabId="2">
                  <ArticleContentEditor isNew={isNew} content={articleEntity.content} urls={urls} editorRef={editorRef} />
                  <Row>
                    <Col md={{ size: 8, offset: 2 }}>
                      <Button tag={Link} id="cancel-save" to="/article" replace color="danger">
                        <FontAwesomeIcon icon="arrow-left" />
                        &nbsp;
                        <Translate contentKey="entity.action.back">Back</Translate>
                      </Button>
                      &nbsp;
                      <div className="float-right">
                        <Button color="info" type="button" onClick={() => toggle('1')}>
                          <FontAwesomeIcon icon="arrow-left" />
                          &nbsp;
                          <Translate contentKey="entity.action.previous" />
                        </Button>
                        &nbsp;
                        <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                          <FontAwesomeIcon icon="save" />
                          &nbsp;
                          <Translate contentKey="entity.action.save">Save</Translate>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  categories: storeState.category.entities,
  articleEntity: storeState.article.entity,
  loading: storeState.article.loading,
  updating: storeState.article.updating,
  updateSuccess: storeState.article.updateSuccess,
  statement: storeState.factChecking.statement,
  urls: storeState.factChecking.urls
});

const mapDispatchToProps = {
  getCategories,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
  factReset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ArticleUpdate);
