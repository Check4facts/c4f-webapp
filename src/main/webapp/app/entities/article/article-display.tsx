/* tslint:disable:jsx-no-lambda */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { getEntity, reset } from 'app/entities/article/article.reducer';
import { defaultValue } from 'app/shared/model/article.model';
import { Spinner } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';


export interface IArticleDisplayProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ArticleDisplay = (props: IArticleDisplayProps) => {

  useEffect(() =>{
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

  const { article, loading, errorMessage } = props;

  return loading || article === defaultValue ? (
    <div>
      <Spinner style={{ width: '5rem', height: '5rem', margin: '10% 0 10% 45%' }} color="dark" />
    </div>
  ) : errorMessage === null ? (
    <div className="ck-content" dangerouslySetInnerHTML={{ __html: this.handleEmbedTags(article.content) }} />
  ) : (
    <div>
      <h1 className="text-center">{errorMessage}</h1>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  article: storeState.article.entity,
  loading: storeState.article.loading,
  errorMessage: storeState.article.errorMessage
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
