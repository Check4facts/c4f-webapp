import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row, Container } from 'reactstrap';

const Footer = () => (
  <div className="footer border-top">
    <Container>
    <Row>
      <Col className="py-2" md="12">
        <p className="text-center text-info my-0">
          <Translate contentKey="footer.project"/>
          <br/>
          © Copyright 2020 check4facts.gr ®
        </p>
      </Col>
    </Row>
    </Container>
  </div>
);

export default Footer;
