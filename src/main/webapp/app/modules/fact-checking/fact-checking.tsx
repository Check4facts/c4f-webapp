import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { Translate, translate } from 'react-jhipster';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Row, Col, Input, Button, Container } from 'reactstrap';
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
            </ul>
          </p>
        </Col>
      </Row>
      <Row  className="my-5">
        <Col className="text-center pb-5" sm="12" md={{ size: 6, offset: 3 }}>
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
