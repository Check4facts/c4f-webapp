import './home.scss';

import React, { useEffect } from 'react';
import _ from 'lodash';
import { TextFormat, Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Row, Col, Input, Button, ButtonGroup, Container } from 'reactstrap';
import { getEntities } from 'app/entities/article/article.reducer';
import { APP_DATE_FORMAT } from 'app/config/constants';
import {Link} from "react-router-dom";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


export interface IHomeProp extends StateProps, DispatchProps {}

export const Home = (props: IHomeProp) => {
  const { account, articleList, isAuthenticated } = props;

  useEffect(() => {
    props.getEntities()
  }, [])

  return (
    <Container fluid className="my-5">
      {account && account.login && (
        <Row className="my-5">
          <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
            <h2 className="text-center">
              <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}/>
            </h2>
          </Col>
        </Row>
      )}
      <Row className="my-5">
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <h2 className="text-center">
            <Translate contentKey="home.title" />
          </h2>
          <p className="lead">
            <Translate contentKey="home.subtitle" />
          </p>
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <Input placeholder={translate("home.check.placeholder")} />
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <Button color="primary">
            <Translate contentKey="home.check.button"/>
          </Button>
        </Col>
      </Row>
      <Row className="my-5">
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <h1 className="text-center">
            <Translate contentKey="home.article.title" />
          </h1>
          {isAuthenticated &&
            <div className="my-4">
              <Link to={`/article/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="check4FactsApp.article.home.createLabel">Create new Article</Translate>
              </Link><br/><br/>
              <span className="text-info">
                <Translate contentKey={"home.article.info"} />
              </span>
            </div>
          }
        </Col>
      </Row>
      <Container>
        {_.orderBy(articleList, art => moment(art.articleDate), ['desc']).map(
          article => (isAuthenticated || article.published) && (
            <Row className={`my-5 ${!article.published && 'bg-info'}`} noGutters key={article.id} >
              <Col className="align-content-center" md="4">
                {article.previewImage ? (
                  <img
                    src={`data:${article.previewImageContentType};base64,${article.previewImage}`} alt="previewImage"
                    style={{
                      display: 'block',
                      margin: 'auto',
                      maxWidth: '10vw'
                    }}
                  />
                ) : null}
              </Col>
              <Col md="8">
                <div className="card-body">
                  <h2 className="card-title">{article.previewTitle}</h2>
                  <p>{article.previewText}</p>
                  <p className="text-right"><small className="text-muted">{article.articleDate ? <TextFormat type="date" value={article.articleDate} format={APP_DATE_FORMAT} /> : null}</small></p>
                  <ButtonGroup className="float-right">
                    {isAuthenticated &&
                      <Button tag={Link} to={`/article/${article.id}/edit`}>
                        <Translate contentKey="entity.action.edit" />
                      </Button>
                    }
                    <Button tag={Link} to={`/article/${article.id}/display`} color="primary">
                      <Translate contentKey="home.article.more" />
                    </Button>
                  </ButtonGroup>
                </div>
              </Col>
            </Row>
          )
        )}
      </Container>
    </Container>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  articleList: storeState.article.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Home);
