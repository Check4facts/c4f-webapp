import '../../../../content/scss/templates.scss';
import React, {useEffect, useRef, useState} from 'react';
import {Badge, Button, ButtonGroup, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from 'reactstrap';
import {Translate, translate} from "react-jhipster";
import {IRootState} from 'app/shared/reducers';
import {connect} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import moment from 'moment';
import {deleteEntity as deleteArticle} from 'app/entities/article/article.reducer';
import {IModalContent} from "app/shared/model/util.model";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

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

  const {articles, loading, isAuthenticated, currentLocale, showButtons} = props;

  return (
    <Row className="mt-5">
      {articles.length > 0 ? articles.map((article, idx) => (
        <Col sm="6" lg="3" className="mb-5 mb-sm-2 grid-margin" key={article.id}>
          <div className="position-relative image-hover">
            <Link to={`/article/${article.id}/display`}>
              {article.previewImage ?
                <img src={`data:${article.previewImageContentType};base64,${article.previewImage}`}
                     className="" style={{height: 200, width: "100%", objectFit: 'cover'}}
                     alt="previewImage"
                /> : <img src={`/content/images/carousel4.jpg`}
                          className="" style={{height: 200, width: "100%", objectFit: 'cover', filter: 'blur(2px)'}}
                          alt="previewImage"
                />}
            </Link>
            <Link to={`/fact-checking/sub-menu/${article.category.name}`} >
            <span className="thumb-title">
              {translate(`check4FactsApp.category.${article.category.name}`)}
            </span>
            </Link>
          </div>
          <Link to={`/article/${article.id}/display`}>
            <p title={article.previewTitle}>
            <h5 className="font-weight-600 mt-3 text-truncate text-truncate-4">
              {article.previewTitle}
            </h5>
            </p>
          </Link>
          {article.statement && article.statement.factCheckerAccuracy != null &&
          <Badge className={`mr-1 accuracy-color-${article.statement.factCheckerAccuracy}`}>
            <span className="text-uppercase">{translate(`fact-checking.results.model.accuracy.${article.statement.factCheckerAccuracy}`)}</span>
          </Badge>}
          {isAuthenticated && !article.published &&
          <Badge color="danger">
            <span className="text-uppercase">{translate('check4FactsApp.article.unpublished')}</span>
          </Badge>
          }
          <h5
            className="text-muted font-weight-bold pt-2">{moment.locale(currentLocale) && moment(article.articleDate).format("LL")}</h5>
          <p className="fs-15 font-weight-normal text-truncate text-truncate-4">
            {article.previewText}
          </p>
          <div className="d-flex justify-content-between mb-3 align-items-center">
            <div><span
              className="fs-12 mr-1 text-muted">{(article.statement && article.statement.author) || 'N/A'}</span>
            </div>
            <div><a className="fs-12 mr-1 text-muted d-flex" href={article.statement && article.statement.mainArticleUrl}
                    target="_blank" rel="noopener noreferrer"> Πηγή <FontAwesomeIcon icon="link"/>
            </a></div>
          </div>
          {showButtons && isAuthenticated && <ButtonGroup size="xs">
            <Button
              color="info"
              tag={Link}
              to={`/article/${article.id}/edit`}
            > <FontAwesomeIcon icon="pencil-alt"/>
            </Button>
            <Button
              color="danger"
              onClick={() => openModal({
                header: 'Διαγραφή Περιεχομένου',
                body: <p>Είστε σίγουροι ότι θέλετε να διαγράψετε το περιεχόμενο με τίτλο
                  : <br/><strong>{article.previewTitle}</strong></p>,
                action: confirmDelete(article.id)
              })}>
              <FontAwesomeIcon icon="trash"/>
            </Button>
          </ButtonGroup>}
        </Col>
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
    </Row>
  )
};

const mapStateToProps = (storeState: IRootState) => ({
  currentLocale: storeState.locale.currentLocale,
  isAuthenticated: storeState.authentication.isAuthenticated,
  articles: storeState.article.entities,
  loading: storeState.article.loading,
});

const mapDispatchToProps = {
  deleteArticle
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesFeed);
