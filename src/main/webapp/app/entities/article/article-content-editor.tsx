import React, {useState} from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from 'ckeditor5-build-decoupled-document-base64-imageresize';
import {Translate} from "react-jhipster";
import {IStatementSource} from "app/shared/model/statement-source.model";
import {IResource} from "app/shared/model/resource.model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export type IArticleContentEditorProps = {
  isNew: boolean;
  content: any;
  statementSources: IStatementSource[];
  resources: IResource[];
  editorRef: any;
}

export const ArticleContentEditor = (props: IArticleContentEditorProps) => {
  const [viewResource, setViewResource] = useState({} as IResource);
  const [resourceModalOpen, setResourceModalOpen] = useState(false);
  const [viewStatementSource, setViewStatementSource] = useState({} as IStatementSource);
  const [statementSourceModalOpen, setStatementSourceModalOpen] = useState(false);

  const { isNew, content, statementSources, resources, editorRef } = props;

  const quoteLink = url =>
    editorRef.current.editor.setData(
      `${editorRef.current.editor.getData()}<blockquote>${url}</blockquote>`
    );

  const openStatementSourceInfoModal = (statementSource: IStatementSource) => {
    setViewStatementSource(statementSource);
    setStatementSourceModalOpen(true);
  }

  const openResourceInfoModal = (resource: IResource) => {
    setViewResource(resource);
    setResourceModalOpen(true);
  }

  const displayUrls = () => (
    <Col md="3">
      {
        statementSources.length > 0 &&
          <>
            <h3 className="text-center">
              <span className="py-2 px-3" style={{
                backgroundColor: 'rgba(244, 193, 188, 0.3)',
                borderRadius: '30px'
              }}>Πηγές Δήλωσης</span>
            </h3>
            <p className="text-center text-muted" >εισηγμένες από τον ειδικό ελεγκτή δήλωσης</p>
            {statementSources.map((statementSource, index) => (
              <div key={index} className="py-2">
                <Row>
                  <Col className="text-center">{statementSource.title}</Col>
                </Row>
                <Row className="my-1">
                  <Col>
                    <a
                      onClick={() => quoteLink(statementSource.url)}
                      style={{
                        display: 'inline-block',
                        width: '15vw',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >{statementSource.url}</a>
                  </Col>
                  <Col className="d-flex justify-content-center">
                    <Button className="float-right" color="info" size="sm" onClick={() => openStatementSourceInfoModal(statementSource)}>
                      <FontAwesomeIcon icon="eye" />
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
          </>
      }
      {
        resources.length > 0 &&
          <>
            <h3 className="text-center mt-2">
              <span className="py-2 px-3" style={{
                backgroundColor: 'rgba(244, 193, 188, 0.3)',
                borderRadius: '30px'
              }}>Αποτλέσματα Συγκομιδής</span>
            </h3>
            {resources.filter(r => r.title !== null).map((resource, index) => (
              <div key={index} className="py-2">
                <Row>
                  <Col className="text-center">{resource.title}</Col>
                </Row>
                <Row className="my-1">
                  <Col>
                    <a
                      onClick={() => quoteLink(resource.url)}
                      style={{
                        display: 'inline-block',
                        width: '15vw',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >{resource.url}</a>
                  </Col>
                  <Col className="d-flex justify-content-center">
                    <Button className="float-right" color="info" size="sm" onClick={() => openResourceInfoModal(resource)}>
                      <FontAwesomeIcon icon="eye" />
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
          </>
      }
    </Col>
  );

  return (
    <Row className="pt-3">
      <Col md={(statementSources.length === 0 && resources.length === 0) && { size: 10, offset: 1 }}>
        <CKEditor
          editor={DecoupledEditor}
          data={
            !isNew
              ?
              content
              : "<h1 style=\"text-align: center\">Remove this heading and start writing your article</h1>"
          }
          onInit={editor => {
            // Inserts the toolbar before the editable area.
            editor.ui.view.editable.element.parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.view.editable.element);
          }}
          ref={editorRef}
        />
      </Col>
      {
        statementSources.length > 0 || resources.length > 0 ? displayUrls() : null
      }
      <Modal size="xl" isOpen={statementSourceModalOpen} toggle={() => setStatementSourceModalOpen(false)}>
        <ModalHeader className="text-primary">Πηγή δήλωσης</ModalHeader>
        <ModalBody className="text-center">
          <h5 className="text-info"><Translate contentKey="check4FactsApp.statementSource.url"/></h5>
          <p><a href={viewStatementSource.url} target="_blank" rel="noopener noreferrer">{viewStatementSource.url}</a></p>
          <h5 className="text-info"><Translate contentKey="check4FactsApp.statementSource.title"/></h5>
          <p>{viewStatementSource.title}</p>
          <h5 className="text-info"><Translate contentKey="check4FactsApp.statementSource.snippet"/></h5>
          <p>{viewStatementSource.snippet}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setStatementSourceModalOpen(false)}>
            <FontAwesomeIcon icon="cross" />
            &nbsp;
            Κλείσιμο
          </Button>
        </ModalFooter>
      </Modal>
      <Modal size="xl" isOpen={resourceModalOpen} toggle={() => setResourceModalOpen(false)}>
        <ModalHeader className="text-primary">Αποτέλεσμα συγκομιδής</ModalHeader>
        <ModalBody className="text-center">
          <h5 className="text-info"><Translate contentKey="check4FactsApp.resource.url"/></h5>
          <p><a href={viewResource.url} target="_blank" rel="noopener noreferrer">{viewResource.url}</a></p>
          <h5 className="text-info"><Translate contentKey="check4FactsApp.resource.title"/></h5>
          <p>{viewResource.title}</p>
          <h5 className="text-info"><Translate contentKey="check4FactsApp.resource.simParagraph"/></h5>
          <p>{viewResource.simParagraph}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setResourceModalOpen(false)}>
            <FontAwesomeIcon icon="cross" />
            &nbsp;
            Κλείσιμο
          </Button>
        </ModalFooter>
      </Modal>
    </Row>
  );
}

export default ArticleContentEditor;
