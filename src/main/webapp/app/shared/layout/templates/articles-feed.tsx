import './templates.scss';
import React, { useState } from 'react';
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Translate, translate } from "react-jhipster";
import {IRootState} from 'app/shared/reducers';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { deleteEntity as deleteArticle } from 'app/entities/article/article.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IModalContent } from "app/shared/model/util.model";

export interface IArticlesFeedProps extends StateProps, DispatchProps {
  showButtons?: boolean
}

export const ArticlesFeed = (props: IArticlesFeedProps) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [modalContent, setModalContent] = useState({} as IModalContent);

  const history = useHistory();

  const openModal = (content: IModalContent) => {
    setDeleteModal(true);
    setModalContent(content);
  };

  const confirmDelete = id => () => {
    props.deleteArticle(id);
    setDeleteModal(false);
    history.go(0);
  };

  const { articles, loading, isAuthenticated, currentLocale, showButtons } = props;

  return (
    <>
      {articles && articles.length > 0 ? articles.map(article => (
        <div className="my-5 py-3 article-feed-entry" key={article.id} >
          {isAuthenticated && !article.published &&
          <Row>
            <Col md={{ size: 3, offset: 6 }}>
              <p className="text-danger text-uppercase">{translate('check4FactsApp.article.unpublished')}</p>
            </Col>
          </Row>
          }
          <Row>
            <Col md={{ size: 10, offset: 1 }}>
              <h2 className="text-center"><Link to={`/article/${article.id}/display`} className="text-primary">{article.previewTitle}</Link></h2>
              { article.statement &&
                <p className={`text-right mb-0 fact-checker-label ${article.statement.factCheckerLabel ? 'label-true' : 'label-false'}`}>{article.statement.factCheckerLabel ? 'Αληθής' : 'Ψευδής'}</p>
              }
            </Col>
          </Row>
          <Row className="py-2">
            <Col md={{ size: 3, offset: 1 }}>
              {article.previewImage
                ? <Link to={`/article/${article.id}/display`}><img className="img-fluid" src={`data:${article.previewImageContentType};base64,${article.previewImage}`} alt="previewImage" style={{ display: 'block', margin: 'auto' }} /></Link>
                : null
              }
            </Col>
            <Col md="7" className="border-left pt-2">
              <h5 className="text-muted">{moment.locale(currentLocale) && moment(article.articleDate).format("LL")}</h5>
              <p className="article-feed-entry-content">{article.previewText}</p>
            </Col>
            {showButtons && isAuthenticated && (
              <Col md="1">
                <Row className="mt-5 d-flex">
                  <Col className="d-flex justify-content-center">
                    <Button
                      color="info"
                      tag={Link}
                      to={`/article/${article.id}/edit`}
                    >
                      <FontAwesomeIcon icon="pencil-alt" />
                    </Button>
                  </Col>
                </Row>
                <Row className="mt-1 d-flex">
                  <Col className="d-flex justify-content-center">
                    <Button
                      color="danger"
                      onClick={() => openModal({
                        header: 'Διαγραφή Περιεχομένου',
                        body: <p>Είστε σίγουροι ότι θέλετε να διαγράψετε το περιεχόμενο με τίτλο : <br/><strong>{article.previewTitle}</strong></p>,
                        action: confirmDelete(article.id)
                      })}
                    >
                      <FontAwesomeIcon icon="trash" />
                    </Button>
                  </Col>
                </Row>
              </Col>
            )}
          </Row>
          <Row>
            <Col md={{ size: 10, offset: 1 }}>
              <p className="text-info text-right">
                {translate('check4FactsApp.statement.author')}: {article.statement && article.statement.author} <br/>
                <a
                  className="text-info"
                  href={article.statement && article.statement.mainArticleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Πηγή
                </a>
              </p>
            </Col>
          </Row>
        </div>
      )) : (
        !loading && (
          <div className="alert alert-warning">
            <Translate contentKey="check4FactsApp.article.home.notFound">No Articles found</Translate>
          </div>
        )
      )}
      <Modal size="lg" isOpen={deleteModal} toggle={() => setDeleteModal(false)}>
        <ModalHeader className="text-primary">{modalContent.header}</ModalHeader>
        <ModalBody>{modalContent.body}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setDeleteModal(false)}>Όχι</Button>
          <Button color="primary" onClick={() => modalContent.action()}>Ναι</Button>
        </ModalFooter>
      </Modal>
    </>
  )
};

const mapStateToProps = (storeState: IRootState) => ({
  currentLocale: storeState.locale.currentLocale,
  isAuthenticated: storeState.authentication.isAuthenticated,
  articles: storeState.article.entities,
  loading: storeState.article.loading
});

const mapDispatchToProps = {
  deleteArticle
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesFeed);
