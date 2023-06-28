import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row, TabContent, TabPane} from 'reactstrap';
import {AvFeedback, AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {byteSize, openFile, setFileData, translate, Translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';

import {createEntity, getEntity, reset, setBlob, updateEntity} from './article.reducer';
import {getEntities as getCategories} from 'app/entities/category/category.reducer';
import {convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime} from 'app/shared/util/date-utils';
import {reset as factReset} from 'app/modules/fact-checking/fact-checking.reducer';
import {getEntity as getStatement} from 'app/entities/statement/statement.reducer';
import {getLatestResourcesByStatement, reset as resourcesReset} from 'app/entities/resource/resource.reducer';
import {
  getStatementSourcesByStatement,
  reset as statementSourcesReset
} from 'app/entities/statement-source/statement-source.reducer';
import ArticleContentEditor from "app/entities/article/article-content-editor";

import CKEditor from '@ckeditor/ckeditor5-react';

export interface IArticleUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const ArticleUpdate = (props: IArticleUpdateProps) => {
  const editorRef = useRef(CKEditor);
  const [activeTab, setActiveTab] = useState('1');
  const [publishArticle, setPublishArticle] = useState(false);
  const [categoryId, setCategoryId] = useState('1');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [updateNew, setUpdateNew] = useState(true);
  const [saveTimeout, setSaveTimeout] = useState(null);
  const formRef = useRef(null);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const {
    currentLocale,
    articleEntity,
    categories,
    loading,
    updating,
    statementId,
    statement,
    statementSources,
    resources
  } = props;

  const {previewImage, previewImageContentType} = articleEntity;

  const handleClose = () => {
    props.statementSourcesReset();
    props.resourcesReset();
    if (statementId !== '' || articleEntity.statement) {
      props.history.push(`/fact-checking/sub-menu/${categories.find(cat => cat.id === parseInt(categoryId, 10)).name}?page=1&sort=articleDate,desc`)
    } else {
      props.history.push('/article' + props.location.search);
    }
    props.factReset();
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
    if (statementId !== '') {
      props.getStatement(statementId);
      props.getStatementSourcesByStatement(statementId);
      props.getLatestResourcesByStatement(statementId);
    }

    props.getCategories();
  }, []);

  useEffect(() => {
    if (articleEntity.category) {
      setCategoryId(`${articleEntity.category.id}`);
    }
  }, [articleEntity]);

  useEffect(() => {
    if (articleEntity && articleEntity.statement) {
      props.getStatementSourcesByStatement(articleEntity.statement.id);
      props.getLatestResourcesByStatement(articleEntity.statement.id);
    }
  }, [articleEntity.statement])

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess && publishArticle) {
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
        published: publishArticle,
        statement: statementId !== '' ? {id: statementId} : articleEntity.statement
      };

      if (isNew && updateNew) {
        props.createEntity(entity);
        setUpdateNew(false);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  const saveForm = () => {
    formRef.current.submit();
  }

  const resetTimeout = (id, newID) => {
    clearTimeout(id)
    return newID
  }

  const formOnchange = e => {
    setSaveTimeout(resetTimeout(saveTimeout, setTimeout(saveForm, 30000)));
  }

  return (
    <div>
      <Row className="justify-content-center">
        <Col className="text-center" md="8">
          <h2 id="check4FactsApp.article.home.createOrEditLabel">
            <Translate
              contentKey="check4FactsApp.article.home.createOrEditLabel"
              interpolate={{
                type: (statementId !== '' || articleEntity.statement) ? 'μία Έκθεση Επαλήθευσης' : 'ένα Άρθρο'
              }}
            >Create or edit</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col className="text-center" md="8">
          <h5 className="text-muted">
            Βήμα {activeTab} από 2
          </h5>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm name="okForm" model={isNew ? {previewTitle: statement.text} : articleEntity} onSubmit={saveEntity} onChange={formOnchange} ref={formRef}>
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Col md={{size: 8, offset: 2}} className="mt-3">
                    {!isNew ? (
                      <AvGroup>
                        <Label for="article-id">
                          <Translate contentKey="global.field.id">ID</Translate>
                        </Label>
                        <AvInput id="article-id" type="text" className="form-control" name="id" required readOnly/>
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
                          required: {value: true, errorMessage: translate('entity.validation.required')},
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
                          required: {value: true, errorMessage: translate('entity.validation.required')},
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
                        onChange={event => setCategoryId(event.target.value)}
                        required
                      >
                        <option value="" key="0"/>
                        {categories
                          ? categories.filter(cat => (statementId !== '' || articleEntity.statement) ?
                            ['immigration', 'crime', 'climate_change', 'pandemic'].includes(cat.name) : true).map(otherEntity => (
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
                        <br/>
                        {previewImage ? (
                          <div>
                            {previewImageContentType ? (
                              <a onClick={openFile(previewImageContentType, previewImage)}>
                                <img src={`data:${previewImageContentType};base64,${previewImage}`}
                                     style={{maxHeight: '100px'}} alt="previewImage"/>
                              </a>
                            ) : null}
                            <br/>
                            <Row>
                              <Col md="11">
                          <span>
                            {previewImageContentType}, {byteSize(previewImage)}
                          </span>
                              </Col>
                              <Col md="1">
                                <Button color="danger" onClick={clearBlob('previewImage')}>
                                  <FontAwesomeIcon icon="times-circle"/>
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        ) : null}
                        <input id="file_previewImage" type="file" onChange={onBlobChange(true, 'previewImage')}
                               accept="image/*"/>
                        <AvInput type="hidden" name="previewImage" value={previewImage}/>
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
                    {/* <Button tag={Link} id="cancel-save" to="/article" replace color="danger">*/}
                    {/*  <FontAwesomeIcon icon="arrow-left" />*/}
                    {/*  &nbsp;*/}
                    {/*  <Translate contentKey="entity.action.back">Back</Translate>*/}
                    {/* </Button>*/}
                    {/* &nbsp;*/}
                    <Button className="float-right" color="primary" type="button" onClick={() => toggle('2')}>
                      <FontAwesomeIcon icon="arrow-right"/>
                      &nbsp;
                      <Translate contentKey="entity.action.next"/>
                    </Button>
                  </Col>
                </TabPane>
                <TabPane tabId="2">
                  <ArticleContentEditor
                    isNew={isNew}
                    formOnChange={formOnchange}
                    content={articleEntity.content}
                    currentLocale={currentLocale}
                    editorRef={editorRef}
                    statement={statementId !== '' ? statement : articleEntity.statement}
                    statementSources={(statementSources && statementSources.length > 0) ? [...statementSources] : []}
                    resources={(resources && resources.length > 0) ? [...resources] : []}
                  />
                  <Row>
                    <Col md={{size: 8, offset: 2}}>
                      {/* <Button tag={Link} id="cancel-save" to="/article" replace color="danger">*/}
                      {/*  <FontAwesomeIcon icon="arrow-left" />*/}
                      {/*  &nbsp;*/}
                      {/*  <Translate contentKey="entity.action.back">Back</Translate>*/}
                      {/* </Button>*/}
                      {/* &nbsp;*/}
                      <div className="float-right">
                        <Button color="info" type="button" onClick={() => toggle('1')}>
                          <FontAwesomeIcon icon="arrow-left"/>
                          &nbsp;
                          <Translate contentKey="entity.action.previous"/>
                        </Button>
                        &nbsp;
                        <Button color="primary" id="save-entity" type="submit" onClick={() => setPublishArticle(false)}
                                disabled={updating}>
                          <FontAwesomeIcon icon="save"/>
                          &nbsp;
                          <Translate contentKey="entity.action.save">Save</Translate>
                        </Button>
                        &nbsp;
                        <Button color="success" id="save-entity" type="submit" onClick={() => setPublishArticle(true)}
                                disabled={updating}>
                          <FontAwesomeIcon icon="save"/>
                          &nbsp;
                          <Translate contentKey="check4FactsApp.article.publish">Publish</Translate>
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
  currentLocale: storeState.locale.currentLocale,
  categories: storeState.category.entities,
  articleEntity: storeState.article.entity,
  loading: storeState.article.loading,
  updating: storeState.article.updating,
  updateSuccess: storeState.article.updateSuccess,
  statementId: storeState.factChecking.statement,
  statement: storeState.statement.entity,
  statementSources: storeState.statementSource.entities,
  resources: storeState.resource.entities
});

const mapDispatchToProps = {
  getCategories,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  getStatement,
  getLatestResourcesByStatement,
  getStatementSourcesByStatement,
  reset,
  statementSourcesReset,
  resourcesReset,
  factReset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ArticleUpdate);
