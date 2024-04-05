import '../../../../content/scss/templates.scss';
import React, { useEffect, useRef, useState } from 'react';
import { Badge, Button, ButtonGroup, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'reactstrap';
import { Translate, translate } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { deleteEntity as deleteArticle } from 'app/entities/article/article.reducer';
import { IModalContent } from 'app/shared/model/util.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IArticlesFeedProps extends StateProps, DispatchProps {
  showButtons?: boolean;
}

export const FrontPageFeed = (props: IArticlesFeedProps) => {
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

  const { articles, loading, isAuthenticated, currentLocale, showButtons, frontPageArticles } = props;

  return (
    <>
      {frontPageArticles.length > 0
        ? frontPageArticles.map((category, index) => {
            if (category.categoryArticles.length > 0) {
              return (
                <Row style={{marginLeft: 0, marginRight: 0}} key={`${category.categoryName}-${index}`}>
                  <div className={`${category.categoryName}-section mt-5`} style={{width: "100%"}}>
                    <Row className={`${category.categoryName}-title`} style={{marginLeft: 0, marginRight: 0}}>
                      <div className="d-flex position-relative float-left">
                      {/* <Link to={`/fact-checking/sub-menu/${category.categoryName}`} style={{textDecoration: "none"}}> */}
                        <h1 className="section-title">{translate(`check4FactsApp.category.${category.categoryName}`)}</h1>
                        {/* </Link> */}
                      </div>
                    </Row>
                    <Row className="immigration-articles" style={{width: "100%", marginLeft: 0, marginRight: 0}}>
                      <Row tag="div" className="mt-3" style={{width: "100%", marginLeft: 0, marginRight: 0}}>
                        {category.categoryArticles.map((article, idx) => (
                          <Col sm="6" lg="3" className="mb-5 mb-sm-2 grid-margin" key={`${article.id}-${idx}`}>
                            <div className="position-relative image-hover">
                              <Link to={`/article/${article.id}/display`}>
                                {article.imageThumbPreview ? (
                                  <img
                                    src={`data:${article.previewImageContentType};base64,${article.imageThumbPreview}`}
                                    className=""
                                    style={{ height: 200, width: '100%', objectFit: 'cover', border: '1px solid #eeeeee' }}
                                    alt="previewImage"
                                  />
                                ) : (
                                  <img
                                    src={`/content/images/carousel4.webp`}
                                    className=""
                                    style={{ height: 200, width: '100%', objectFit: 'cover', filter: 'blur(2px)' }}
                                    alt="previewImage"
                                  />
                                )}
                              </Link>
                              <Link to={`/fact-checking/sub-menu/${article.category.name}`}>
                                <span className="thumb-title">{translate(`check4FactsApp.category.${article.category.name}`)}</span>
                              </Link>
                              {/* {article.articleDateUpdated && <span style={{position: "absolute", top: -33, right: -32, backgroundColor: "#f5a623", width: "140px",
                              height: "20px", transform: "rotate(45deg)"}}/>} */}
                            </div>
                            <Link to={`/article/${article.id}/display`}>
                                <h5 title={article.previewTitle} className="font-weight-600 mt-3 text-truncate text-truncate-4">{article.previewTitle}</h5>
                            </Link>
                            {article.statement && article.statement.factCheckerAccuracy != null && (
                              <Badge className={`mr-1 accuracy-color-${article.statement.factCheckerAccuracy}`}>
                                <span className="text-uppercase">
                                  {translate(`fact-checking.results.model.accuracy.${article.statement.factCheckerAccuracy}`)}
                                </span>
                              </Badge>
                            )}
                            {isAuthenticated && !article.published && (
                              <Badge color="danger">
                                <span className="text-uppercase">{translate('check4FactsApp.article.unpublished')}</span>
                              </Badge>
                            )}
                            <div className='d-flex align-items-center pt-2' style={{columnGap: 5, flexFlow: "wrap"}}>
                            <h5 className="text-muted font-weight-bold" >{article.articleDateUpdated > article.articleDate && "Ενημερώθηκε - "}</h5>
                            <h5 className="text-muted font-weight-bold">
                              {moment.locale(currentLocale) && moment(article.articleDateUpdated || article.articleDate).format('LL')}  
                            </h5>
                            </div>
                            <p className="fs-15 font-weight-normal text-truncate text-truncate-4">{article.previewText}</p>
                            <div className="d-flex justify-content-between mb-3 align-items-center">
                              <div>
                                <span className="fs-12 mr-1 text-muted">{(article.statement && article.statement.author) || 'N/A'}</span>
                              </div>
                              <div>
                                <a
                                  className="fs-12 mr-1 text-muted d-flex"
                                  href={article.statement && article.statement.mainArticleUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {' '}
                                  Πηγή <FontAwesomeIcon icon="link" />
                                </a>
                              </div>
                            </div>
                            {showButtons && isAuthenticated && (
                              <ButtonGroup size="xs">
                                <Button color="info" tag={Link} to={`/article/${article.id}/edit`}>
                                  {' '}
                                  <FontAwesomeIcon icon="pencil-alt" />
                                </Button>
                                <Button
                                  color="danger"
                                  onClick={() =>
                                    openModal({
                                      header: 'Διαγραφή Περιεχομένου',
                                      body: (
                                        <p>
                                          Είστε σίγουροι ότι θέλετε να διαγράψετε το περιεχόμενο με τίτλο : <br />
                                          <strong>{article.previewTitle}</strong>
                                        </p>
                                      ),
                                      action: confirmDelete(article.id),
                                    })
                                  }
                                >
                                  <FontAwesomeIcon icon="trash" />
                                </Button>
                              </ButtonGroup>
                            )}
                          </Col>
                        ))}
                      </Row>
                    </Row>
                    <Row tag="div" className={`${category.categoryName}-see-more`} style={{display: "flex", justifyContent: "end", marginLeft: 0, marginRight: 0}}>
                    <Link to={`/fact-checking/sub-menu/${category.categoryName}`} style={{textDecoration: "none"}}>
                      <h6 style={{fontSize: 15, paddingTop: 20}}><Translate contentKey="global.menu.more.category-more" /></h6>
                    </Link>
                    </Row>
                  </div>
                </Row>
              );
            } else {
              return null;
            }
          })
        : !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="check4FactsApp.article.home.notFound">No Articles found</Translate>
            </div>
          )}
      <Modal size="lg" isOpen={deleteModal} toggle={() => setDeleteModal(false)}>
        <ModalHeader className="text-primary">{modalContent.header}</ModalHeader>
        <ModalBody>{modalContent.body}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => setDeleteModal(false)}>
            Όχι
          </Button>
          <Button color="primary" onClick={() => modalContent.action()}>
            Ναι
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  currentLocale: storeState.locale.currentLocale,
  isAuthenticated: storeState.authentication.isAuthenticated,
  articles: storeState.article.entities,
  loading: storeState.article.loading,
  frontPageArticles: storeState.article.frontPageArticles,
});

const mapDispatchToProps = {
  deleteArticle,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FrontPageFeed);
