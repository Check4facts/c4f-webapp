import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './article.reducer';
import { IArticle } from 'app/shared/model/article.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IArticleDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ArticleDetail = (props: IArticleDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { articleEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="check4FactsApp.article.detail.title">Article</Translate> [<b>{articleEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="previewTitle">
              <Translate contentKey="check4FactsApp.article.previewTitle">Preview Title</Translate>
            </span>
          </dt>
          <dd>{articleEntity.previewTitle}</dd>
          <dt>
            <span id="previewImage">
              <Translate contentKey="check4FactsApp.article.previewImage">Preview Image</Translate>
            </span>
          </dt>
          <dd>
            {articleEntity.previewImage ? (
              <div>
                {articleEntity.previewImageContentType ? (
                  <a onClick={openFile(articleEntity.previewImageContentType, articleEntity.previewImage)}>
                    <img
                      src={`data:${articleEntity.previewImageContentType};base64,${articleEntity.previewImage}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {articleEntity.previewImageContentType}, {byteSize(articleEntity.previewImage)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="articleDate">
              <Translate contentKey="check4FactsApp.article.articleDate">Article Date</Translate>
            </span>
          </dt>
          <dd>
            {articleEntity.articleDate ? <TextFormat value={articleEntity.articleDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="factCreator">
              <Translate contentKey="check4FactsApp.article.factCreator">Fact Creator</Translate>
            </span>
          </dt>
          <dd>{articleEntity.factCreator}</dd>
          <dt>
            <span id="author">
              <Translate contentKey="check4FactsApp.article.author">Author</Translate>
            </span>
          </dt>
          <dd>{articleEntity.author}</dd>
          <dt>
            <span id="published">
              <Translate contentKey="check4FactsApp.article.published">Published</Translate>
            </span>
          </dt>
          <dd>{articleEntity.published ? 'true' : 'false'}</dd>
          <dt>
            <span id="content">
              <Translate contentKey="check4FactsApp.article.content">Content</Translate>
            </span>
          </dt>
          <dd>{articleEntity.content}</dd>
          <dt>
            <span id="previewText">
              <Translate contentKey="check4FactsApp.article.previewText">Preview Text</Translate>
            </span>
          </dt>
          <dd>{articleEntity.previewText}</dd>
          <dt>
            <Translate contentKey="check4FactsApp.article.category">Category</Translate>
          </dt>
          <dd>{articleEntity.category ? articleEntity.category.name : ''}</dd>
          <dt>
            <Translate contentKey="check4FactsApp.article.statement">Statement</Translate>
          </dt>
          <dd>{articleEntity.statement ? articleEntity.statement.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/article" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/article/${articleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ article }: IRootState) => ({
  articleEntity: article.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);
