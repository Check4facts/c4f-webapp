import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Spinner, Container, Alert } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, getNewsByGreeklish, reset } from './news.reducer';
import { INews } from 'app/shared/model/news.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import moment from 'moment';

export interface INewsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const NewsDetail = (props: INewsDetailProps) => {
  const { newsEntity, errorMessage, loading, currentLocale } = props;

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

  useEffect(() => {
    const param = props.match.params.id;
    if (!isNaN(Number(param))) {
      props.getEntity(param);
    } else {
      props.getNewsByGreeklish(param);
    }

    return () => {
      props.reset();
    };
  }, []);

  return loading ? (
    <div>
      <Spinner style={{ width: '5rem', height: '5rem', margin: '10% 0 10% 45%' }} color="dark" />
    </div>
  ) : errorMessage === null ? (
    <Container>
      {/* <HelComp title={article.previewTitle} description={article.previewText}
      author={article.author} publishedDate={article.articleDate} image={article.previewImage}
      imageType={article.previewImageContentType} /> */}
      <Row>
        <Col sm="12">
          <div className="article-wrapper">
            <div className="article-wrapper-sm ">
              <div className="text-center" style={{ wordWrap: 'break-word' }}>
                <h1>{newsEntity.title}</h1>
              </div>
              <p className="fs-15 d-flex justify-content-center align-items-center m-0 text-muted">
                {moment.locale(currentLocale) && moment(newsEntity.date).format('LL')}
              </p>
              {
                newsEntity.content && (
                  // <Alert color={'secondary'} >
                  <div className="ck-content mt-5" dangerouslySetInnerHTML={{ __html: handleEmbedTags(newsEntity.content) }} />
                )
                // </Alert>
              }
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

const mapStateToProps = ({ news, locale }: IRootState) => ({
  newsEntity: news.entity,
  errorMessage: news.errorMessage,
  loading: news.loading,
  currentLocale: locale.currentLocale,
});

const mapDispatchToProps = { getEntity, getNewsByGreeklish, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NewsDetail);
