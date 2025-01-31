import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IArticle } from 'app/shared/model/article.model';
import { Col, Container, Row, Alert, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { translate } from 'react-jhipster';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HelComp from 'app/shared/util/helmet-component';
import SummarizationDisplay from 'app/modules/summarization/summarization-display';

interface IArticleDisplayProps extends StateProps {
  previewArticle: IArticle | null;
  previewOpen: boolean;
  handlePreview: () => void;
}

export const FactCheckingReportPreview = (props: IArticleDisplayProps) => {
  const { previewArticle, currentLocale, previewOpen, handlePreview } = props;

  const handleEmbedTags = htmlContent => {
    const oembed = htmlContent.split('</oembed>');
    let body = '';
    oembed.forEach((item, index) => {
      body += oembed[index] + '</oembed>';
      const oembed1 = item.split('url="')[1];
      if (oembed1) {
        const oembed2 = oembed1.split('">')[0];
        if (oembed2) {
          const youtube = oembed2.split('https://www.youtube.com/watch?v=')[1];
          if (youtube) {
            body +=
              '<div class="iframe-container">' +
              '<iframe' +
              ` width="100%" height="${window.outerHeight * 0.5}px"` +
              ' src="https://youtube.com/embed/' +
              youtube +
              '" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"' +
              ' allowfullscreen></iframe></div>';
          }
        }
      }
    });
    return body;
  };

  return (
    <Modal
      isOpen={previewOpen}
      fade={false}
      toggle={handlePreview}
      backdrop={true}
      className="report-modal-dialog"
      contentClassName="report-modal-content"
    >
      <ModalHeader toggle={handlePreview} className="report-modal-title">
        Προεπισκόπηση Άρθρου
      </ModalHeader>
      <ModalBody className="report-modal-body">
        <Container>
          <HelComp
            title={previewArticle.previewTitle}
            description={previewArticle.previewText}
            author={previewArticle.author}
            publishedDate={previewArticle.articleDate}
            image={previewArticle.previewImage}
            imageType={previewArticle.previewImageContentType}
          />
          <Row>
            <Col sm="12">
              <div className="article-wrapper">
                <div className="article-wrapper-sm ">
                  <h1 className="text-center">{previewArticle.previewTitle}</h1>
                  <div className="text-center">
                    <a href={`/fact-checking/sub-menu/${previewArticle.category.name}`} className="btn btn-dark font-weight-bold mb-4">
                      {translate(`check4FactsApp.category.${previewArticle.category.name}`)}
                    </a>
                  </div>
                  <p className="fs-15 d-flex justify-content-center align-items-center m-0 text-muted">
                    {(previewArticle.statement && previewArticle.statement.author) || 'N/A '} |{' '}
                    {moment.locale(currentLocale) && moment(previewArticle.articleDate).format('LL')}
                  </p>
                  {previewArticle.previewImage ? (
                    <div className="text-center mt-3">
                      <img
                        src={`data:${previewArticle.previewImageContentType};base64,${previewArticle.previewImage}`}
                        className="img-fluid mb-4"
                        alt="previewImage"
                      />
                    </div>
                  ) : null}
                  <div className="pt-4 pb-4">
                    <p>{previewArticle.statement.mainArticleText}</p>
                    <p className="text-right">
                      <a
                        className="fs-12 mr-1 text-muted"
                        href={previewArticle.statement && previewArticle.statement.mainArticleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {' '}
                        Πηγή <FontAwesomeIcon icon="link" />
                      </a>
                    </p>
                  </div>
                  {previewArticle.summary && <SummarizationDisplay summary={previewArticle.summary} sourceUrl="#sources" />}
                  {previewArticle.content && (
                    <Alert
                      color={'secondary'}
                      className={`px-4 py-3 mt-4 ${
                        previewArticle.statement &&
                        previewArticle.statement.factCheckerAccuracy != null &&
                        'article-content-new-' + previewArticle.statement.factCheckerAccuracy
                      }`}
                    >
                      <div className="ck-content" dangerouslySetInnerHTML={{ __html: handleEmbedTags(previewArticle.content) }} />
                    </Alert>
                  )}
                </div>
              </div>
            </Col>
          </Row>
          <Row id="sources">
            <Col>
              {previewArticle.statement.statementSources.length > 0 && (
                <div
                  className="sources-section mt-5 p-5"
                  style={{
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                  }}
                >
                  <h4 className="px-lg-5 px-md-2">{translate('check4FactsApp.statement.statementSources')}:</h4>
                  <ul className="px-lg-5 px-md-2">
                    {previewArticle.statement.statementSources.map((source, index) => (
                      <li key={index} className="my-1">
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-muted">
                          <div className="source-card p-2">
                            <h5 className="source-title mb-1" style={{ fontWeight: 'bold' }}>
                              {source.title}
                            </h5>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </ModalBody>
    </Modal>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  currentLocale: storeState.locale.currentLocale,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(FactCheckingReportPreview);
