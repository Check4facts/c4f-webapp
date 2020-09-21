import React from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Translate, translate } from 'react-jhipster';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Input, Button, Container } from 'reactstrap';
import {THIRD_PARTY_LINK} from "app/config/constants";

export interface IFactCheckingProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const FactChecking = (props: IFactCheckingProps) => {

  return (
    <Container fluid className="my-5">
      <Row className="my-5">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h1 className="text-center">
            <Translate contentKey="fact-checking.title" />
          </h1><br/>
          <p className="text-info">
            <Translate contentKey="fact-checking.page-guidelines.main" /><br/>
            <ul style={{ listStyleType: 'none', fontWeight: 'bold' }}>
              <li><Translate contentKey="fact-checking.page-guidelines.guide-1" /></li>
              <li><Translate contentKey="fact-checking.page-guidelines.guide-2" /></li>
              <li><Translate contentKey="fact-checking.page-guidelines.guide-3" /></li>
              <li><Translate contentKey="fact-checking.page-guidelines.guide-4" /></li>
            </ul>
          </p>
        </Col>
      </Row>
      <Row  className="my-5">
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <Input placeholder={translate("fact-checking.check.placeholder")} /><br/>
          <Button color="primary">
            <Translate contentKey="fact-checking.check.button"/>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <h2><Translate contentKey="fact-checking.sub-menus.main" /></h2>
        </Col>
      </Row>
      <Row className="my-5">
        <Col className="text-center" md={{ size: 4, offset: 2 }}>
          <h3>
            <Link className="text-primary" to={`${props.match.url}/sub-menu/immigration`}>
              <Translate contentKey="fact-checking.sub-menus.immigration" />
            </Link>
          </h3>
        </Col>
        <Col className="text-center" md="4">
          <h3>
            <Link className="text-primary" to={`${props.match.url}/sub-menu/crime`}>
              <Translate contentKey="fact-checking.sub-menus.crime" />
            </Link>
          </h3>
        </Col>
      </Row>
      <Row className="my-5 pt-5">
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <h2><Translate contentKey="fact-checking.third-party" /></h2><br/><br/>
          <ul style={{ listStyleType: 'none', fontWeight: 'bold' }}>
            {
              THIRD_PARTY_LINK.map((item, index) => (
                <li key={index}>
                  <a href={item.link} target="_blank"  rel="noopener noreferrer">{item.name}</a>
                </li>
              ))
            }
          </ul>
        </Col>
      </Row>
      <Row className="my-5 pt-5">
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <h2>
            <Link className="text-primary" to={`${props.match.url}/ethics`}>
              <Translate contentKey="fact-checking.ethics.main" />
            </Link>
          </h2>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FactChecking);
