import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Button, Col, Label, Row, Spinner, Table, Input, Tooltip, FormGroup, FormFeedback } from 'reactstrap';
import { AvFeedback, AvField, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { byteSize, openFile, setFileData, translate, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { createEntity, getEntity, reset, updateEntity, setBlob } from 'app/entities/article/article.reducer';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { reset as factReset } from 'app/modules/fact-checking/fact-checking.reducer';
import { getEntity as getStatement, reset as StatementReset } from 'app/entities/statement/statement.reducer';
import { getLatestResourcesByStatement, reset as resourcesReset } from 'app/entities/resource/resource.reducer';
import { getStatementSourcesByStatement, reset as statementSourcesReset } from 'app/entities/statement-source/statement-source.reducer';
import FactCheckingReportEditor from './fact-checking-report-editor';
import '../fact-checking.scss';

import CKEditor from '@ckeditor/ckeditor5-react';
import FactCheckingReportAnalyzer from './fact-checking-report-analyzer';
import {
  countFeatureStatementsByStatement,
  reset as featureStatementReset,
} from 'app/entities/feature-statement/feature-statement.reducer';
import FactCheckingReportPreview from './fact-checking-report-preview';
import FactCheckingIlspTool from './fact-checking-ilsp-tool';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { APP_LOCAL_DATETIME_FORMAT, AUTHORITIES } from 'app/config/constants';
import moment from 'moment';
import Summarization from 'app/modules/summarization/summarization';

const addNewRowDefault = {
  open: false,
  url: '',
  title: '',
};

const editRowDefault = {
  index: null,
  url: '',
  title: '',
}

export interface IFactCheckingReportProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FactCheckingReport = (props: IFactCheckingReportProps) => {
  const editorRef = useRef(CKEditor);
  const sumEditorRef = useRef(CKEditor);
  const [publishArticle, setPublishArticle] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [open, setOpen] = useState(false);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [updateNew, setUpdateNew] = useState(true);
  const [saveTimeout, setSaveTimeout] = useState(null);
  const [previewArticle, setPreviewArticle] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [addNewRow, setAddNewRow] = useState(addNewRowDefault);
  const [editRow, setEditRow] = useState(editRowDefault);
  const [allSources, setAllSources] = useState([]);
  const [ilspToolOpen, setIlspToolOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [statementAccuracy, setStatementAccuracy] = useState(0);
  const [statementText, setStatementText] = useState(
    'Το 2009, τα αναπτυγμένα έθνη του κόσμου συμφώνησαν να δώσουν 100 δισεκατομμύρια δολάρια το χρόνο σε φτωχότερα έθνη μέχρι το 2020 για να τα βοηθήσουν να αντιμετωπίσουν και να προετοιμαστούν για την κλιματική αλλαγή'
  );
  const formRef = useRef(null);
  const [ilspTooltip, setIlspTooltip] = useState(false);
  const toggleIlspTooltip = () => setIlspTooltip(!ilspTooltip);
  const formError = useRef({ error: false, timeout: null });

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen);

  const {
    currentLocale,
    articleEntity,
    categories,
    loading,
    updating,
    statementId,
    statement,
    statementSources,
    resources,
    statementLoading,
    featureStatement,
    floading,
    rloading,
    featureStatementCount,
  } = props;

  const { previewImage, previewImageContentType } = articleEntity;

  const handleSourceAction = (
    action: 'open' | 'edit' | 'commit' | 'filter' | 'cancel',
    editBox: 'url' | 'title' | null,
    index: number | null
  ) => e => {
    if (action === 'open') {
      if (index !== null) {
        setEditRow({ index, url: allSources[index].url, title: allSources[index].title });
      } else {
        setAddNewRow(prev =>
          (prev.title.length > 0 || prev.url.length > 0) && prev.open ? addNewRowDefault : { ...prev, open: !prev.open }
        );
      }
    }
    if (action === 'edit') {
      if (e.target.value.length > 255) {
        formError.current.error && clearTimeout(formError.current.timeout);
        formError.current.error = true;
        formError.current.timeout = setTimeout(() => (formError.current.error = false), 1500);
        return;
      }
      if (index !== null) {
        setEditRow(prev => ({ ...prev, [editBox]: e.target.value }));
      } else {
        setAddNewRow(prev => ({ ...prev, [editBox]: e.target.value }));
      }
    }
    if (action === 'commit') {
      if (index !== null) {
        setAllSources(prev => prev.map((source, idx) => idx === index ? { ...source, url: editRow.url, title: editRow.title } : source));
        setEditRow(editRowDefault);
      } else {
        setAllSources(prev => [...prev, { url: addNewRow.url, title: addNewRow.title, snippet: '' }]);
        setAddNewRow(addNewRowDefault);
      }
    }
    if (action === 'filter') {
      setAllSources(prev => [...prev.filter((source, idx) => idx !== index)]);
    }
    if (action === 'cancel') {
      setEditRow(editRowDefault);
    }
  };

  const handleIlspTool = () => {
    setIlspToolOpen(!ilspToolOpen);
  };

  const shortenStatementText = text => (text.length > 20 ? `${text.substring(0, 20)}...` : text);

  const handleClose = () => {
    props.statementSourcesReset();
    props.resourcesReset();
    if (statementId !== '' || articleEntity.statement) {
      props.history.push(
        `/fact-checking/sub-menu/${categories.find(cat => cat.id === parseInt(categoryId, 10)).name}?page=1&sort=articleDate,desc`
      );
    } else {
      props.history.push('/article' + props.location.search);
    }
    props.factReset();
  };

  const toggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isNew && categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [categories]);

  useEffect(() => {
    props.getStatement(props.match.params.id);
    props.getStatementSourcesByStatement(props.match.params.id);
    props.countFeatureStatementsByStatement(props.match.params.id);
    props.getCategories();
    // if (props.match.params.id) {
    //   props.getStatement(props.match.params.id);
    //   props.getLatestResourcesByStatement(props.match.params.id);
    // }

    // Reset Statement and Article on unmount
    return () => {
      props.reset();
      props.StatementReset();
      props.featureStatementReset();
      clearTimeout(saveTimeout);
    };
  }, []);

  useEffect(() => {
    setAllSources([...statementSources]);
  }, [statementSources]);

  useEffect(() => {
    if (featureStatementCount > 0) {
      props.getLatestResourcesByStatement(props.match.params.id);
    }
  }, [featureStatementCount]);

  useEffect(() => {
    if (statement && statement.article) {
      setIsNew(false);
      setStatementText(statement.text);
      setStatementAccuracy(statement.factCheckerAccuracy);
      !articleEntity.id && props.getEntity(statement.article.id);
    } else {
      setIsNew(true);
      props.reset();
    }
  }, [statement]);

  useEffect(() => {
    if (articleEntity.category) {
      setCategoryId(`${articleEntity.category.id}`);
    }
  }, [articleEntity]);

  // useEffect(() => {
  //   if (articleEntity && articleEntity.statement) {
  //     props.getStatementSourcesByStatement(articleEntity.statement.id);
  //     props.getLatestResourcesByStatement(articleEntity.statement.id);
  //   }
  // }, [articleEntity.statement])

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, null, null);
  };

  useEffect(() => {
    if (props.updateSuccess && publishArticle) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.articleDate = convertDateTimeToServer(values.articleDate);

    // automatically save the articleUdpateDate upon request to save/publish report from a NON inscpector
    if (props.isNotInspector) {
      values.articleDateUpdated = convertDateTimeToServer(moment().format(APP_LOCAL_DATETIME_FORMAT));
    }
    values.content = editorRef.current.editor.getData();
    // TODO: Remove comments when summarization goes live
    // values.summary =
    //   sumEditorRef.current.editor?.getData() !==
    //   '<p style="text-align:center;"><span style="color:hsl(0,0%,60%);"><i>Δημιουργήστε αυτόματα την περίληψη</i></span></p>'
    //     ? sumEditorRef.current.editor?.getData()
    //     : null;
    if (errors.length === 0) {
      const entity = {
        ...articleEntity,
        ...values,
        published: publishArticle,
        statement: { ...statement, statementSources: allSources, factCheckerAccuracy: statementAccuracy }, // Set the statement in the article entity as the article is the managing entity in this relationship
        category: { id: categoryId },
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
  };

  const resetTimeout = (id, newID) => {
    clearTimeout(id);
    return newID;
  };

  const formOnchange = e => {
    setSaveTimeout(resetTimeout(saveTimeout, setTimeout(saveForm, 30000)));
  };

  const handlePreview = () => {
    if (previewOpen) {
      setPreviewOpen(false);
      setPreviewArticle(null);
    } else {
      setPreviewArticle({
        ...formRef.current.props.model,
        // TODO: Remove comments when summarization goes live
        // summary: sumEditorRef.current.editor?.getData(),
        statement: { factCheckerAccuracy: statement.factCheckerAccuracy, statementSources },
      });
      setPreviewOpen(true);
    }
  };

  const changeFactCheckerAccuracy = event => {
    setStatementAccuracy(event.target.value);
    // TODO: Add corresponding call for FeatureStatement when column is added to table.
  };

  // console.log(props.authentication);

  return loading || statementLoading ? (
    <div>
      <Spinner style={{ width: '5rem', height: '5rem', margin: '10% 0 10% 45%' }} color="dark" />
    </div>
  ) : (
    <div>
      <Row className="justify-content-center pt-5">
        <Col className="text-center" md="8">
          <h2 id="check4FactsApp.article.home.createOrEditLabel">
            <Translate contentKey="check4FactsApp.article.detail.titleAlt">Create or edit</Translate>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <AvForm
                name="okForm"
                model={isNew ? { previewTitle: statement.text } : articleEntity}
                onSubmit={saveEntity}
                onChange={formOnchange}
                ref={formRef}
              >
                <Col md={{ size: 12 }} className="mt-3">
                  {!isNew ? (
                    <AvGroup>
                      <Row className="fact-checking-report-row">
                        <Col md={{ size: 2 }}>
                          <Label for="article-id">
                            <Translate contentKey="global.field.id">ID</Translate>
                          </Label>
                        </Col>
                        <Col md={{ size: 9 }}>
                          <AvInput id="article-id" type="text" className="form-control" name="id" required readOnly />
                        </Col>
                      </Row>
                    </AvGroup>
                  ) : null}
                  <AvGroup>
                    <Row className="fact-checking-report-row">
                      <Col md={{ size: 2 }}>
                        <Label id="previewTitleLabel" for="article-previewTitle">
                          <Translate contentKey="check4FactsApp.article.previewTitle">Preview Title</Translate>
                        </Label>
                      </Col>
                      <Col md={{ size: 9 }}>
                        <AvField
                          id="article-previewTitle"
                          type="textarea"
                          name="previewTitle"
                          validate={{
                            required: { value: true, errorMessage: translate('entity.validation.required') },
                          }}
                        />
                      </Col>
                    </Row>
                  </AvGroup>
                  <AvGroup>
                    <Row className="fact-checking-report-row">
                      <Col md={{ size: 2 }}>
                        <Label id="previewTextLabel" for="article-previewText">
                          <Translate contentKey="check4FactsApp.article.previewText">Preview Text</Translate>
                        </Label>
                      </Col>
                      <Col md={{ size: 9 }}>
                        <AvField
                          id="article-previewText"
                          type="textarea"
                          name="previewText"
                          validate={{
                            required: { value: true, errorMessage: translate('entity.validation.required') },
                          }}
                        />
                      </Col>
                    </Row>
                  </AvGroup>
                  <AvGroup>
                    <Row className="fact-checking-report-row">
                      <Col md={{ size: 2 }}>
                        <Label for="article-category">
                          <Translate contentKey="check4FactsApp.article.category">Category</Translate>
                        </Label>
                      </Col>
                      <Col md={{ size: 9 }}>
                        <AvInput
                          id="article-category"
                          type="select"
                          className="form-control"
                          name="category.id"
                          value={isNew ? categories[0] && categories[0].id : articleEntity.category?.id}
                          onChange={event => setCategoryId(parseInt(event.target.value, 10))}
                          required
                        >
                          {/* <option value="" key="0" /> */}
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
                      </Col>
                    </Row>
                  </AvGroup>
                  <AvGroup>
                    <Row className="fact-checking-report-row">
                      <Col md={{ size: 2 }}>
                        <Label id="authorLabel" for="article-author">
                          <Translate contentKey="check4FactsApp.article.author">Author</Translate>
                        </Label>
                      </Col>
                      <Col md={{ size: 9 }}>
                        <AvField id="article-author" type="text" name="author" />
                      </Col>
                    </Row>
                  </AvGroup>
                  <AvGroup>
                    <AvGroup>
                      <Row className="fact-checking-report-row">
                        <Col md={{ size: 2 }}>
                          <Label id="previewImageLabel" for="previewImage">
                            <Translate contentKey="check4FactsApp.article.previewImage">Preview Image</Translate>
                          </Label>
                        </Col>
                        <Col>
                          {previewImage ? (
                            <div>
                              {previewImageContentType ? (
                                <a onClick={openFile(previewImageContentType, previewImage)}>
                                  <img
                                    src={`data:${previewImageContentType};base64,${previewImage}`}
                                    style={{ maxHeight: '100px' }}
                                    alt="previewImage"
                                  />
                                </a>
                              ) : null}
                              <br />
                              <div className="d-flex justify-content-between align-items-center w-100">
                                <div>
                                  <span>
                                    {previewImageContentType}, {byteSize(previewImage)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : null}
                          <div className="d-flex justify-content-start align-items-center w-100">
                            <input
                              className="py-1"
                              id="file_previewImage"
                              type="file"
                              onChange={onBlobChange(true, 'previewImage')}
                              accept="image/*"
                              style={{ width: '91.4%' }}
                            />
                            {previewImage && (
                              <div>
                                <Button color="danger" onClick={clearBlob('previewImage')}>
                                  <FontAwesomeIcon icon="times-circle" />
                                </Button>
                              </div>
                            )}
                          </div>
                          <AvInput type="hidden" name="previewImage" value={previewImage} />
                        </Col>
                      </Row>
                    </AvGroup>
                  </AvGroup>
                  <AvGroup>
                    <Row className="fact-checking-report-row">
                      <Col md={{ size: 2 }}>
                        <Label id="articleDateLabel" for="article-articleDate">
                          <Translate contentKey="check4FactsApp.article.articleDate">Article Date</Translate>
                        </Label>
                      </Col>
                      <Col md={{ size: 9 }}>
                        <AvInput
                          id="article-articleDate"
                          type="datetime-local"
                          className="form-control"
                          name="articleDate"
                          placeholder={'YYYY-MM-DD HH:mm'}
                          value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.articleEntity.articleDate)}
                        />
                      </Col>
                    </Row>
                  </AvGroup>
                  <AvGroup>
                    <Row className="fact-checking-report-row">
                      <Col md={{ size: 2 }}>
                        <Label for="statement-accuracy">Ακρίβεια Δήλωσης</Label>
                      </Col>
                      <Col md={{ size: 9 }}>
                        <AvInput
                          id="article-category"
                          type="select"
                          className="form-control"
                          name="category.id"
                          value={isNew ? 0 : `${statement.factCheckerAccuracy}`}
                          onChange={changeFactCheckerAccuracy}
                          // required
                        >
                          {[0, 1, 2, 3, 4].map(index => (
                            <option value={index} key={`accuracy-choice-${index}`}>
                              {translate(`fact-checking.results.model.accuracy.${index}`)}
                            </option>
                          ))}
                        </AvInput>
                        {/* <option value="" key="0"/>
                    {categories
                      ? categories.filter(cat => (statementId !== '' || articleEntity.statement) ?
                        ['immigration', 'crime', 'climate_change', 'pandemic'].includes(cat.name) : true).map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {translate(`check4FactsApp.category.${otherEntity.name}`)}
                          </option>
                          ))
                          : null} */}
                        <AvFeedback>
                          <Translate contentKey="entity.validation.required">This field is required.</Translate>
                        </AvFeedback>
                      </Col>
                      <Col style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flexStart', padding: '0' }}>
                        <Button id="analyze-btn" color="warning" onClick={toggle} disabled={updating}>
                          <FontAwesomeIcon icon="chart-pie" />
                        </Button>
                        <Tooltip target="analyze-btn" placement="top" toggle={toggleTooltip} isOpen={tooltipOpen}>
                          <Translate contentKey="entity.action.analyzer">Analyzer</Translate>
                        </Tooltip>
                      </Col>
                    </Row>
                  </AvGroup>
                  {/* TODO: Remove comments when summarization goes live */}
                  {/* <Row className="fact-checking-report-row">
                    <Col md={{ size: 2 }}>
                      <Label id="summaryLabel" for="article-summary">
                        <Translate contentKey="check4FactsApp.article.summary">Summary</Translate>
                      </Label>
                    </Col>
                    <Col>
                      <Summarization
                        summary={statement?.article?.summary}
                        articleId={articleEntity.id}
                        statementId={statement.id}
                        editorRef={sumEditorRef}
                        formOnChange={formOnchange}
                      />
                    </Col>
                  </Row> */}
                  <Row className="fact-checking-report-row" style={{ textAlign: 'center', marginTop: '15px' }}>
                    <Col>
                      <Label for="article-content">
                        <Translate contentKey="check4FactsApp.article.content">Content</Translate>
                      </Label>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FactCheckingReportEditor
                        isNew={isNew}
                        formOnChange={formOnchange}
                        content={articleEntity.content}
                        currentLocale={currentLocale}
                        editorRef={editorRef}
                        statement={statementId !== '' ? statement : articleEntity.statement}
                        statementSources={statementSources && statementSources.length > 0 ? [...statementSources] : []}
                        resources={resources && resources.length > 0 ? [...resources] : []}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ size: 8, offset: 2 }} style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
                      <h4 className="text-center">{translate('fact-checking.check.titles.second')}</h4>
                      <p className="text-center text-muted">Δεν είναι υποχρεωτικό να εισάγετε κάποια πηγή</p>
                      <Table responsive bordered>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>
                              <Translate contentKey="check4FactsApp.statementSource.url">Url</Translate>
                            </th>
                            <th>
                              <Translate contentKey="check4FactsApp.statementSource.title">Title</Translate>
                            </th>
                            <th style={{ verticalAlign: 'middle', textAlign: 'center', whiteSpace: 'nowrap' }}>
                              <Button color="primary" style={{ marginRight: '5px' }} onClick={handleSourceAction('open', null, null)}>
                                <FontAwesomeIcon icon="plus" />
                              </Button>
                              <Button id="ilspTooltip" color="primary" onClick={handleIlspTool}>
                                <img src="/content/images/inobo-logo-white.svg" height="12px" alt="inobo-logo" />
                              </Button>
                              <Tooltip isOpen={ilspTooltip} target="ilspTooltip" toggle={toggleIlspTooltip}>
                                Βιβλιογραφικες Προτάσεις
                              </Tooltip>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {allSources.map((statementSource, i) => {
                            return (editRow.index === i) ? (
                              <tr key={`entity-${i}`}>
                                <td>{i + 1}</td>
                                <td>
                                  <Input value={editRow.url} onChange={handleSourceAction('edit', "url", i)} />
                                </td>
                                <td>
                                  <FormGroup>
                                    <Input
                                      invalid={formError.current.error}
                                      value={editRow.title}
                                      onChange={handleSourceAction('edit', "title", i)}
                                    />
                                    <FormFeedback tooltip>Ο τίτλος δεν μπορεί να ξεπερνάει τους 255 χαρακτήρες.</FormFeedback>
                                  </FormGroup>
                                  {/* <Input value={addNewRow.title} onChange={handleSourcesComponent('edit', 'title', null)} /> */}
                                </td>
                                <td style={{ verticalAlign: 'middle', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                  <Button
                                    color="success"
                                    style={{ marginRight: '5px' }}
                                    onClick={handleSourceAction('commit', null, i)}
                                  >
                                    <FontAwesomeIcon icon="check" />
                                  </Button>
                                  <Button color="danger" onClick={handleSourceAction('cancel', null, null)}>
                                    <FontAwesomeIcon icon="ban" />
                                  </Button>
                                </td>
                              </tr>
                            ) : (
                              <tr key={`entity-${i}`}>
                                <td>{i + 1}</td>
                                <td>
                                  <p title={statementSource.url}>{shortenStatementText(statementSource.url)}</p>
                                </td>
                                <td>
                                  <p title={statementSource.title}>{shortenStatementText(statementSource.title)}</p>
                                </td>
                                <td style={{ textAlign: 'center', verticalAlign: 'center', whiteSpace: 'nowrap' }}>
                                  <Button
                                    color="warning"
                                    style={{ marginRight: '5px' }}
                                    onClick={handleSourceAction('open', null, i)}
                                  >
                                    <FontAwesomeIcon icon="pencil-alt" />
                                  </Button>
                                  <Button color="danger" onClick={handleSourceAction('filter', null, i)}>
                                    <FontAwesomeIcon icon="trash" />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                        {addNewRow.open && (
                          <tfoot>
                            <tr>
                              <td />
                              <td>
                                <Input value={addNewRow.url} onChange={handleSourceAction('edit', 'url', null)} />
                              </td>
                              <td>
                                <FormGroup>
                                  <Input
                                    invalid={formError.current.error}
                                    value={addNewRow.title}
                                    onChange={handleSourceAction('edit', 'title', null)}
                                  />
                                  <FormFeedback tooltip>Ο τίτλος δεν μπορεί να ξεπερνάει τους 255 χαρακτήρες.</FormFeedback>
                                </FormGroup>
                                {/* <Input value={addNewRow.title} onChange={handleSourcesComponent('edit', 'title', null)} /> */}
                              </td>
                              <td style={{ verticalAlign: 'middle', textAlign: 'center', whiteSpace: 'nowrap' }}>
                                <Button
                                  color="success"
                                  style={{ marginRight: '5px' }}
                                  onClick={handleSourceAction('commit', null, null)}
                                >
                                  <FontAwesomeIcon icon="check" />
                                </Button>
                                <Button color="danger" onClick={handleSourceAction('open', null, null)}>
                                  <FontAwesomeIcon icon="ban" />
                                </Button>
                              </td>
                            </tr>
                          </tfoot>
                        )}
                      </Table>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={{ size: 10, offset: 1 }}>
                      <div className="float-left">
                        <Button color="info" onClick={handlePreview} disabled={updating}>
                          <FontAwesomeIcon icon="eye" />
                          &nbsp;
                          <Translate contentKey="entity.action.preview">Preview</Translate>
                        </Button>
                      </div>
                      <div className="float-right">
                        <Button color="primary" id="save-entity" type="submit" onClick={() => setPublishArticle(false)} disabled={updating}>
                          <FontAwesomeIcon icon="save" />
                          &nbsp;
                          <Translate contentKey="entity.action.save">Save</Translate>
                        </Button>
                        &nbsp;
                        <Button color="success" id="save-entity" type="submit" onClick={() => setPublishArticle(true)} disabled={updating}>
                          <FontAwesomeIcon icon="save" />
                          &nbsp;
                          <Translate contentKey="check4FactsApp.article.publish">Publish</Translate>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </AvForm>
              <FactCheckingReportAnalyzer open={open} toggle={toggle} />
              {previewArticle && (
                <FactCheckingReportPreview previewOpen={previewOpen} handlePreview={handlePreview} previewArticle={previewArticle} />
              )}
              {ilspToolOpen && (
                <FactCheckingIlspTool
                  ilspToolOpen={ilspToolOpen}
                  handleIlspTool={handleIlspTool}
                  statementText={statementText}
                  setStatementText={setStatementText}
                  statementSources={allSources}
                  setStatementSources={setAllSources}
                />
              )}
            </>
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
  statementLoading: storeState.statement.loading,
  statementSources: storeState.statementSource.entities,
  resources: storeState.resource.entities,
  featureStatement: storeState.featureStatement.entity,
  floading: storeState.featureStatement.loading,
  rloading: storeState.resource.loading,
  featureStatementCount: storeState.featureStatement.count,
  account: storeState.authentication.account,
  isNotInspector: !hasAnyAuthority(storeState.authentication.account.authorities, [AUTHORITIES.INSPECTOR]),
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
  factReset,
  StatementReset,
  countFeatureStatementsByStatement,
  featureStatementReset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FactCheckingReport);
