import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { translate } from 'react-jhipster';

export const Contact = () => (
  <Container>
    <Row>
      <Col>
        <h1 className="text-center">
          {translate("contact.contact")}
        </h1>
      </Col>
    </Row>
    <Row>
      <Col className="text-center">{translate("contact.phone")}</Col>
      <Col className="text-center">{translate("contact.email")}</Col>
      <Col className="text-center">{translate("contact.address")}</Col>
    </Row>
    <Row>
      <Col>
        <h1 className="text-center">
          {translate("contact.feedback")}
        </h1>
      </Col>
    </Row>
    <Row>
      <Col>
        <input/>
      </Col>
    </Row>
    <Row>
      <Col>
        <input/>
      </Col>
    </Row>
    <Row>
      <Col>
        <input/>
      </Col>
    </Row>
  </Container>
);

export default Contact;
