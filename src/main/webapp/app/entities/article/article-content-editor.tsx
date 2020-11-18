import React from 'react';
import { Row, Col } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from 'ckeditor5-build-decoupled-document-base64-imageresize';
import {Translate} from "react-jhipster";

export type IArticleContentEditorProps = {
  isNew: boolean;
  content: any;
  statementSourcesUrls: string[];
  resourcesUrls: string[];
  editorRef: any;
}

export const ArticleContentEditor = (props: IArticleContentEditorProps) => {

  const { isNew, content, statementSourcesUrls, resourcesUrls, editorRef } = props;

  const quoteLink = url =>
    editorRef.current.editor.setData(
      `${editorRef.current.editor.getData()}<blockquote>${url}</blockquote>`
    );

  const displayUrls = () => (
    <Col md="3">
      {
        statementSourcesUrls.length > 0 &&
          <>
            <h3 className="text-center">Πηγές Δήλωσης</h3>
            <p className="text-center text-muted">εισηγμένες από τον ειδικό ελεγκτή δήλωσης</p>
            <ul>
              {statementSourcesUrls.map((url, index) => (
                <li key={index} className="pt-2 border-bottom">
                  <a onClick={() => quoteLink(url)}>{url}</a>
                </li>
              ))}
            </ul>
          </>
      }
      {
        resourcesUrls.length > 0 &&
          <>
            <h3 className="text-center">Αποτλέσματα Συγκομιδής</h3>
            <ul>
              {resourcesUrls.map((url, index) => (
                <li key={index} className="pt-2 border-bottom">
                  <a onClick={() => quoteLink(url)}>{url}</a>
                </li>
              ))}
            </ul>
          </>
      }
    </Col>
  );

  return (
    <Row className="pt-3">
      <Col md={(statementSourcesUrls.length === 0 && resourcesUrls.length === 0) && { size: 10, offset: 1 }}>
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
        statementSourcesUrls.length > 0 || resourcesUrls.length > 0 ? displayUrls() : null
      }
    </Row>
  );
}

export default ArticleContentEditor;
