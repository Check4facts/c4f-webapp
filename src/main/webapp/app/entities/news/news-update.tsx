import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from 'ckeditor5-build-decoupled-document-base64-imageresize';
import { getEntity, updateEntity, createEntity, reset } from './news.reducer';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';

export interface INewsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NewsUpdate = (props: INewsUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const editorRef = useRef(CKEditor);
  const [formContent, setFormContent] = useState({});

  const { newsEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/news' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    return () => {
      props.reset();
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  // const handleEditorChange = () => {
  //   console.log(editorRef.current.editor.getData())
  // }

  const saveEntity = (event, errors, values) => {
    values.date = convertDateTimeToServer(values.date);
    values.content = editorRef.current.editor.getData();
    if (errors.length === 0) {
      const entity = {
        ...newsEntity,
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
      <Row className="justify-content-center mt-5">
        <Col md="8">
          <h2 id="check4FactsApp.news.home.createOrEditLabel">
            <Translate contentKey="check4FactsApp.news.home.createOrEditLabel">Create or edit a News</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-5">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : newsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="news-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="news-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="titleLabel" for="news-title">
                  <Translate contentKey="check4FactsApp.news.title">Title</Translate>
                </Label>
                <AvField
                  id="news-title"
                  type="text"
                  name="title"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                    <Label id="previewTextLabel" for="news-previewText">
                      <Translate contentKey="check4FactsApp.news.previewText">Preview Text</Translate>
                    </Label>
                    <AvField
                      id="news-previewText"
                      type="textarea"
                      name="previewText"
                      validate={{
                        required: { value: true, errorMessage: translate('entity.validation.required') },
                      }}
                    />
              </AvGroup>
              <AvGroup>
                <Label id="dateLabel" for="news-date">
                  <Translate contentKey="check4FactsApp.news.date">Date</Translate>
                </Label>
                <AvInput
                  id="news-date"
                  type="datetime-local"
                  className="form-control"
                  name="date"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.newsEntity.date)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="contentLabel" for="news-content">
                  <Translate contentKey="check4FactsApp.news.content">Content</Translate>
                </Label>
                {/* <AvField
                  id="news-content"
                  type="text"
                  name="content"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                /> */}
                <Row>
                  <Col className="list-line-height" md={{ size: 12, offset: 0 }}>
                    <CKEditor
                      editor={DecoupledEditor}
                      // onChange={handleEditorChange}
                      data={!isNew ? newsEntity.content : '<h1 style="text-align: center">Remove this heading and start writing</h1>'}
                      onInit={editor => {
                        // Inserts the toolbar before the editable area.
                        editor.ui.view.editable.element.parentElement.insertBefore(
                          editor.ui.view.toolbar.element,
                          editor.ui.view.editable.element
                        );
                      }}
                      ref={editorRef}
                    />
                  </Col>
                </Row>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/news" replace color="info">
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
  newsEntity: storeState.news.entity,
  loading: storeState.news.loading,
  updating: storeState.news.updating,
  updateSuccess: storeState.news.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NewsUpdate);
