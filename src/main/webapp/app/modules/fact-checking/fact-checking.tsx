import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Translate, translate } from 'react-jhipster';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Input, Button, Container } from 'reactstrap';
import {THIRD_PARTY_LINK} from "app/config/constants";
import { reset } from "app/modules/fact-checking/fact-checking.reducer";

export interface IFactCheckingProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const FactChecking = (props: IFactCheckingProps) => {
  const [statement, setStatement] = useState('');

  const handleStatementChange = event => setStatement(event.target.value);

  useEffect(() => {
    props.reset();
  }, [])

  return (
    <Container fluid className="my-5">
      <Row className="my-5">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h1 className="text-center">
            FactChecker
          </h1><br/>
          <p className="text-info">
            <Translate contentKey="fact-checking.page-guidelines.main" /><br/>
            <ul style={{ listStyleType: 'none', fontWeight: 'bold' }}>
              <li><Translate contentKey="fact-checking.page-guidelines.guide-1" /></li>
              <li><Translate contentKey="fact-checking.page-guidelines.guide-2" /></li>
              <li><Translate contentKey="fact-checking.page-guidelines.guide-3" /></li>
            </ul>
          </p>
        </Col>
      </Row>
      <Row  className="my-5">
        <Col className="text-center border-bottom pb-5" sm="12" md={{ size: 6, offset: 3 }}>
          <Input
            value={statement}
            onChange={handleStatementChange}
            placeholder={translate("fact-checking.check.placeholder")}
          />
          <br/>
          <Button color="primary" disabled={statement === ''} tag={Link} to={`${props.match.url}/result/${statement.split(' ').join('_')}`}>
            <Translate contentKey="fact-checking.check.button"/>
          </Button>
        </Col>
      </Row>
      <Row className="my-5">
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <h2>
            <Link className="text-primary" to={`${props.match.url}/ethics`}>
              <Translate contentKey="fact-checking.ethics.main" />
            </Link>
          </h2>
        </Col>
      </Row>
      <Row className="my-5">
        <Col className="text-center pt-5 border-top" sm="12" md={{ size: 6, offset: 3 }}>
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
    </Container>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = {
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FactChecking);
