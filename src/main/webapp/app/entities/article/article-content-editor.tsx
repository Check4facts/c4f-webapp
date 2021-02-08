import './article-content-editor.scss'
import React, {useState} from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from 'ckeditor5-build-decoupled-document-base64-imageresize';
import {translate, Translate} from "react-jhipster";
import {IStatementSource} from "app/shared/model/statement-source.model";
import {IResource} from "app/shared/model/resource.model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IStatement} from "app/shared/model/statement.model";
import moment from "moment";

export type IArticleContentEditorProps = {
  isNew: boolean;
  content: any;
  currentLocale: any;
  statement: IStatement;
  statementSources: IStatementSource[];
  resources: IResource[];
  editorRef: any;
}

export const ArticleContentEditor = (props: IArticleContentEditorProps) => {
  const [viewResource, setViewResource] = useState({} as IResource);
  const [resourceModalOpen, setResourceModalOpen] = useState(false);
  const [viewStatementSource, setViewStatementSource] = useState({} as IStatementSource);
  const [statementSourceModalOpen, setStatementSourceModalOpen] = useState(false);

  const { isNew, content, currentLocale, statement, statementSources, resources, editorRef } = props;

  const quoteLink = (url, title) =>
    editorRef.current.editor.setData(
      `${editorRef.current.editor.getData()}<h4 style="text-align: center">${title}</h4><p style="text-align: center"><a href="${url}">${url}</a></p>`
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
    <Col md="3" style={{ height: '64vh', overflow: 'scroll' }}>
      <h3 className="text-center my-3">
              <span className="py-2 px-3" style={{
                backgroundColor: 'rgba(244, 193, 188, 0.3)',
                borderRadius: '30px'
              }}>Δεδομένα Δήλωσης</span>
      </h3>
      <Row className="my-1 py-1 border-top border-bottom">
        <Col md="3" className="font-weight-bold">{translate("check4FactsApp.statement.text")}</Col>
        <Col>{statement.text}</Col>
      </Row>
      <Row className="my-1 py-1 border-bottom">
        <Col md="3" className="font-weight-bold">{translate("check4FactsApp.statement.author")}</Col>
        <Col>{statement.author}</Col>
      </Row>
      <Row className="my-1 py-1 border-bottom">
        <Col md="3" className="font-weight-bold">{translate("check4FactsApp.statement.statementDate")}</Col>
        <Col>{moment.locale(currentLocale) && moment(statement.statementDate).format("LL")}</Col>
      </Row>
      <Row className="my-1 py-1 border-bottom">
        <Col md="3" className="font-weight-bold">{translate("check4FactsApp.statement.registrationDate")}</Col>
        <Col>{moment.locale(currentLocale) && moment(statement.registrationDate).format("LL")}</Col>
      </Row>
      <Row className="my-1 py-1 border-bottom">
        <Col md="3" className="font-weight-bold">{translate("check4FactsApp.statement.mainArticleText")}</Col>
        <Col>{statement.mainArticleText}</Col>
      </Row>
      <Row className="my-1 py-1 border-bottom">
        <Col md="3" className="font-weight-bold">{translate("check4FactsApp.statement.mainArticleUrl")}</Col>
        <Col><a href={statement.mainArticleText} target="_blank" rel="noopener noreferrer">{statement.mainArticleUrl}</a></Col>
      </Row>
      <Row className="my-1 py-1 border-bottom">
        <Col md="3" className="font-weight-bold">{translate("check4FactsApp.statement.topic")}</Col>
        <Col>{statement.topic && translate(`fact-checking.sub-menus.${statement.topic.name}`)}</Col>
      </Row>
      <Row className="my-1 py-1 border-bottom">
        <Col md="3" className="font-weight-bold">{translate("check4FactsApp.statement.subTopics")}</Col>
        <Col>{statement.subTopics && statement.subTopics.map(subTopic => subTopic.name).join(",")}</Col>
      </Row>
      {
        statementSources.length > 0 &&
          <>
            <h5 className="text-center mt-3">
              <span className="py-2 px-3" style={{
                backgroundColor: 'rgba(244, 193, 188, 0.3)',
                borderRadius: '30px'
              }}>Αρχικές Πηγές</span>
            </h5>
            {statementSources.map((statementSource, index) => (
              <div key={index} className="py-2">
                <Row>
                  <Col className="text-center">{statementSource.title}</Col>
                </Row>
                <Row className="my-1">
                  <Col>
                    <a
                      onClick={() => quoteLink(statementSource.url, statementSource.title)}
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
            <h5 className="text-center mt-2">
              <span className="py-2 px-3" style={{
                backgroundColor: 'rgba(244, 193, 188, 0.3)',
                borderRadius: '30px'
              }}>Ανακτημένες Πηγές</span>
            </h5>
            {resources.filter(r => r.title !== null && r.body !== null).map((resource, index) => (
              <div key={index} className="py-2">
                <Row>
                  <Col className="text-center">{resource.title}</Col>
                </Row>
                <Row className="my-1">
                  <Col>
                    <a
                      onClick={() => quoteLink(resource.url, resource.title)}
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
    <Row className="pt-3" style={{ height: '70vh' }}>
      <Col md={(statementSources.length === 0 && resources.length === 0) && { size: 10, offset: 1 }}>
        <CKEditor
          editor={DecoupledEditor}
          data={
            !isNew
              ?
              content
              : "<h1 style=\"text-align: center\">Remove this heading and start writing</h1>"
          }
          onInit={editor => {
            // Inserts the toolbar before the editable area.
            editor.ui.view.editable.element.parentElement.insertBefore(editor.ui.view.toolbar.element, editor.ui.view.editable.element);
          }}
          ref={editorRef}
        />
      </Col>
      {
        (statementSources.length > 0 || resources.length > 0) && statement ? displayUrls() : null
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
        <ModalHeader className="text-primary">Αποτέλεσμα ανάλυσης</ModalHeader>
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
