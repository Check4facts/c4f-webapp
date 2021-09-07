import '../../../../content/scss/templates.scss';
import React, {useState} from 'react';
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
    <Row className="mb-5">
      {articles && articles.length > 0 ? articles.map(article => (
        <Col sm="6" lg="4" className="mb-5 mb-sm-2 grid-margin" key={article.id}>
          {isAuthenticated && !article.published &&
          <Badge color="danger">
            <span className="text-uppercase">{translate('check4FactsApp.article.unpublished')}</span>
          </Badge>
          }
          {article.statement && <Badge color={`${article.statement.factCheckerLabel ? 'success' : 'danger'}`}>
            <span className="text-uppercase">{article.statement.factCheckerLabel ? 'Ακριβής' : 'Ανακριβής'}</span>
          </Badge>}
          <div className="position-relative image-hover">
            {article.previewImage
              ? <Link to={`/article/${article.id}/display`}><img
                src={`data:${article.previewImageContentType};base64,${article.previewImage}`}
                className="img-fluid"
                alt="previewImage"
              /></Link> : null}
            <span className="thumb-title">
              {translate(`check4FactsApp.category.${article.category.name}`)}
            </span>
          </div>
          <Link to={`/article/${article.id}/display`}>
            <h5 className="font-weight-600 mt-3">
              {article.previewTitle}
            </h5>
          </Link>
          <h5
            className="text-muted font-weight-bold pt-2">{moment.locale(currentLocale) && moment(article.articleDate).format("LL")}</h5>
          <p className="fs-15 font-weight-normal">
            {article.previewText}
          </p>
          <div className="d-flex justify-content-between mb-3">
            <div><span
              className="fs-12 mr-1 text-muted">{translate('check4FactsApp.statement.author')}: {(article.statement && article.statement.author) || 'N/A'}</span>
            </div>
            <div><a className="fs-12 mr-1 text-muted" href={article.statement && article.statement.mainArticleUrl}
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
  loading: storeState.article.loading
});

const mapDispatchToProps = {
  deleteArticle
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesFeed);
