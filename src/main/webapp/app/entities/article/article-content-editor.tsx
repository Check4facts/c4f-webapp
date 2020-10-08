import React from 'react';
import { Row, Col } from 'reactstrap';
import CKEditor from '@ckeditor/ckeditor5-react';
import DecoupledEditor from 'ckeditor5-build-decoupled-document-base64-imageresize';
import {Translate} from "react-jhipster";

export type IArticleContentEditorProps = {
  isNew: boolean;
  content: any;
  urls: string[];
  editorRef: any;
}

export const ArticleContentEditor = (props: IArticleContentEditorProps) => {

  const { isNew, content, urls, editorRef } = props;

  const quoteLink = index =>
    editorRef.current.editor.setData(
      `${editorRef.current.editor.getData()}<blockquote>${urls[index]}</blockquote>`
    );

  return (
    <Row className="pt-3">
      <Col md={urls.length === 0 && { size: 10, offset: 1 }}>
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
        urls.length > 0 &&
          <Col md="3">
            <h3 className="text-center">
              <Translate contentKey="check4FactsApp.article.urls" />
            </h3>
            <ul>
              {urls.map((url, index) => (
                <li key={index} className="pt-2 border-bottom">
                  <a onClick={() => quoteLink(index)}>{url}</a>
                </li>
              ))}
            </ul>
          </Col>
      }
    </Row>
  );
}

export default ArticleContentEditor;
