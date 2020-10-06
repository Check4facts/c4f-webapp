import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Translate, translate } from 'react-jhipster';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Input, Button, Container } from 'reactstrap';
import {THIRD_PARTY_LINK} from "app/config/constants";
import { setFact } from "app/modules/fact-checking/fact-checking.reducer";

export interface IFactCheckResultProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FactCheckingResult = (props: IFactCheckResultProps) => {

  useEffect(() => {
    props.setFact(props.match.params.id.split('_').join(' '));
  }, [])

  const randStatus = Math.floor(Math.random() * Math.floor(2));

  const { isAuthenticated, statement } = props;

  return (
    <Container>
      <Row className="text-center my-5">
        <Col>
          <h1>{translate("fact-checking.result.title")}</h1>
        </Col>
      </Row>
      <Row className="text-center mt-5">
        <Col>
          <h3>{translate("fact-checking.result.statement")}</h3>
        </Col>
        <Col>
          <h3>{translate("fact-checking.result.status.main")}</h3>
        </Col>
      </Row>
      <Row className="text-center pb-5 border-bottom">
        <Col>
          <h4>{statement}</h4>
        </Col>
        <Col>
          <h4 className={randStatus ? 'text-success' : 'text-danger'}>{translate(`fact-checking.result.status.${randStatus ? 'true' : 'false'}`)}</h4>
        </Col>
      </Row>
      <Row className="text-center mt-5">
        <Col>
          <h3>{translate("fact-checking.result.urls")}</h3>
        </Col>
      </Row>
      <Row className="my-5">
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <ul style={{ listStyleType: 'none', fontWeight: 'bold' }}>
            {
              THIRD_PARTY_LINK.map((item, index) => (
                <li key={index} className="border-bottom py-1">
                  <a href={item.link} target="_blank"  rel="noopener noreferrer">{item.link}</a>
                </li>
              ))
            }
          </ul>
        </Col>
      </Row>
      {
        isAuthenticated &&
        <Row className="py-3 text-center" style={{ backgroundColor: 'lightGray' }}>
          <Col className="my-auto text-info">
            <span style={{ fontSize: "1.421875rem" }}>{translate("fact-checking.result.action.main")}:</span>
          </Col>
          <Col className="my-auto">
            <Link to="/article/new">{translate("fact-checking.result.action.createArticle")}</Link>
          </Col>
          <Col className="my-auto">
            <span>{translate("fact-checking.result.action.saveFact")}</span>
          </Col>
        </Row>
      }
    </Container>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  isAuthenticated: storeState.authentication.isAuthenticated,
  statement: storeState.factChecking.statement
});

const mapDispatchToProps = {
  setFact
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FactCheckingResult);
