/* tslint:disable:jsx-no-lambda */
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {getEntity, reset} from 'app/entities/article/article.reducer';
import {defaultValue} from 'app/shared/model/article.model';
import {Col, Container, Row, Spinner, Badge, Alert} from 'reactstrap';
import {IRootState} from 'app/shared/reducers';
import {translate} from "react-jhipster";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export interface IArticleDisplayProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const ArticleDisplay = (props: IArticleDisplayProps) => {

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

  const {article, loading, errorMessage, currentLocale} = props;

  return loading || article === defaultValue ? (
    <div>
      <Spinner style={{width: '5rem', height: '5rem', margin: '10% 0 10% 45%'}} color="dark"/>
    </div>
  ) : errorMessage === null ? (
    <Container>
      <Row>
        <Col sm="12">
          <div className="article-wrapper">
            <div className="article-wrapper-sm ">
              <h1 className="text-center">
                {article.previewTitle}
              </h1>
              <div className="text-center">
                <a href={`/fact-checking/sub-menu/${article.category.name}`}
                   className="btn btn-dark font-weight-bold mb-4">{translate(`check4FactsApp.category.${article.category.name}`)}</a>
              </div>
              <p
                className="fs-15 d-flex justify-content-center align-items-center m-0 text-muted"
              >
                {(article.statement && article.statement.author) || 'N/A '} | {moment.locale(currentLocale) && moment(article.articleDate).format("LL")}
              </p>
              {article.previewImage
                ? <div className="text-center mt-3">
                  <img
                    src={`data:${article.previewImageContentType};base64,${article.previewImage}`}
                    className="img-fluid mb-4"
                    alt="previewImage"
                  /></div> : null}
              <p className="pt-4 pb-4">
                {article.statement.mainArticleText}
                <p className="text-right"><a className="fs-12 mr-1 text-muted"
                                             href={article.statement && article.statement.mainArticleUrl}
                                             target="_blank" rel="noopener noreferrer"> Πηγή <FontAwesomeIcon
                  icon="link"/>
                </a></p>
              </p>
              {article.content && <Alert color={'secondary'} className={`px-4 py-3 mt-4 article-content ${article.statement && article.statement.factCheckerAccuracy != null && 'accuracy-color-' + article.statement.factCheckerAccuracy}`}>
                <div className="ck-content"
                     dangerouslySetInnerHTML={{__html: handleEmbedTags(article.content)}}/>
              </Alert>}
            </div>
          </div>
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
});

const mapDispatchToProps = {
  getEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleDisplay);
