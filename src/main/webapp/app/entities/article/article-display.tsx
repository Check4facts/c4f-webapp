/* tslint:disable:jsx-no-lambda */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { getEntity, reset } from 'app/entities/article/article.reducer';
import { defaultValue } from 'app/shared/model/article.model';
import { Col, Container, Row, Spinner, Badge, Alert } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { translate } from 'react-jhipster';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HelComp from 'app/shared/util/helmet-component';
import SummarizationDisplay from 'app/modules/summarization/summarization-display';

export interface IArticleDisplayProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ArticleDisplay = (props: IArticleDisplayProps) => {
  const { article, loading, errorMessage, currentLocale } = props;

  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

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

  return loading || article === defaultValue ? (
    <div>
      <Spinner style={{ width: '5rem', height: '5rem', margin: '10% 0 10% 45%' }} color="dark" />
    </div>
  ) : errorMessage === null ? (
    <Container>
      <HelComp
        title={article.previewTitle}
        description={article.previewText}
        author={article.author}
        publishedDate={article.articleDate}
        image={article.previewImage}
        imageType={article.previewImageContentType}
      />
      <Row>
        <Col sm="12">
          <div className="article-wrapper" style={{ width: '100%' }}>
            <div className="article-wrapper-sm" style={{ padding: 0 }}>
              <h1 className="text-center">{article.previewTitle}</h1>
              <div className="text-center">
                {article.statement && article.statement.factCheckerAccuracy != null && (
                  <Badge className={`mb-4 accuracy-color-${article.statement.factCheckerAccuracy}`}>
                    <span className="text-uppercase" style={{ fontSize: 20, padding: 20 }}>
                      {translate(`fact-checking.results.model.accuracy.${article.statement.factCheckerAccuracy}`)}
                    </span>
                  </Badge>
                )}
              </div>
              <div className="text-center">
                <a href={`/fact-checking/sub-menu/${article.category.name}`} className="btn btn-dark font-weight-bold mb-4">
                  {translate(`check4FactsApp.category.${article.category.name}`)}
                </a>
              </div>
              <p className="fs-15 d-flex justify-content-center align-items-center m-0 text-muted">
                {(article.statement && article.statement.author) || 'N/A '} |{' '}
                {moment.locale(currentLocale) && moment(article.articleDate).format('LL')}
              </p>
              {article.previewImage ? (
                <div className="text-center mt-3" style={{ backgroundColor: '#f9f9f9' }}>
                  <img
                    src={`data:${article.previewImageContentType};base64,${article.previewImage}`}
                    className="img-fluid"
                    style={{ maxHeight: '600px' }}
                    alt="previewImage"
                  />
                </div>
              ) : null}
              <p className="px-5 py-4">
                {article.statement.mainArticleText}
                <p className="text-right">
                  <a
                    className="fs-12 mr-1 text-muted"
                    href={article.statement && article.statement.mainArticleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {' '}
                    Πηγή <FontAwesomeIcon icon="link" />
                  </a>
                </p>
              </p>
              {article.summary && <SummarizationDisplay summary={article.summary} sourceUrl="#sources" />}
              {article.content && (
                <Alert
                  color={'secondary'}
                  className={`px-4 py-3 mt-4 ${
                    article.statement &&
                    article.statement.factCheckerAccuracy != null &&
                    'article-content-new-' + article.statement.factCheckerAccuracy
                  }`}
                >
                  <div className="ck-content" dangerouslySetInnerHTML={{ __html: handleEmbedTags(article.content) }} />
                </Alert>
              )}
            </div>
          </div>
        </Col>
      </Row>
      <Row id="sources">
        <Col>
          {article.statement?.statementSources?.length > 0 && (
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
              <h4 className="px-lg-5 px-md-2">{translate('check4FactsApp.article.articleSources')}:</h4>
              <ul className="px-lg-5 px-md-2">
                {article.statement.statementSources.map((source, index) => (
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
  ) : (
    <div>
      <h1 className="text-center">{errorMessage}</h1>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  article: storeState.article.entity,
  loading: storeState.article.loading,
  errorMessage: storeState.article.errorMessage,
  currentLocale: storeState.locale.currentLocale,
  statement: storeState.statement.entity,
});

const mapDispatchToProps = {
  getEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDisplay);
