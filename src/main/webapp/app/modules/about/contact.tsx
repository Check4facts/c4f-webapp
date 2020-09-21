import React from 'react';
import { Row, Col, Container, Input } from 'reactstrap';
import { translate } from 'react-jhipster';

export const Contact = () => (
  <Container>
    <Row className="my-5">
      <Col>
        <h1 className="text-center">
          {translate("about.contact.contact")}
        </h1>
      </Col>
    </Row>
    <Row>
      <Col className="text-center"><span className="font-weight-bold">{translate("about.contact.phone")}</span><br/><br/>
        <span className="text-info">210 7491613-614</span></Col>
      <Col className="text-center"><span className="font-weight-bold">{translate("about.contact.email")}</span><br/><br/>
        <span className="text-info">something@ekke.gr</span></Col>
      <Col className="text-center"><span className="font-weight-bold">{translate("about.contact.address")}</span><br/><br/>
        <span className="text-info">Κρατίνου 9 και Αθηνάς, Πλατεία Κοτζιά, 105 52 Αθήνα</span></Col>
    </Row>
    <Row className="my-5">
      <Col  className="text-center">
        <h1>
          {translate("about.contact.feedback.title")}
        </h1>
        <br/>
        <p>
          {translate("about.contact.feedback.subtitle")}
        </p>
      </Col>
    </Row>
    <Row className="my-3">
      <Col className="text-center" sm="12" md={{ size: 4, offset: 4 }}>
        <span>{translate("about.contact.feedback.fields.fullName")}</span>
        <br/>
        <Input/>
      </Col>
    </Row>
    <Row className="my-3">
      <Col className="text-center" sm="12" md={{ size: 4, offset: 4 }}>
        <span>{translate("about.contact.feedback.fields.email")}</span>
        <br/>
        <Input/>
      </Col>
    </Row>
    <Row className="my-3">
      <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
        <span>{translate("about.contact.feedback.fields.comment")}</span>
        <br/>
        <Input type="textarea" />
      </Col>
    </Row>
  </Container>
);

export default Contact;
