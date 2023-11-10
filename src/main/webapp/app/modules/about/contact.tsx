import React from 'react';
import {Col, Container, Row} from 'reactstrap';
import {translate} from 'react-jhipster';

export const Contact = () => (
  <Container>
    <Row>
      <Col sm="12">
        <div className="text-center">
          <h1 className="text-center mt-5">
            {translate("about.contact.contact")}
          </h1>
        </div>
      </Col>
    </Row>
    <div className="contact-wrap">
      <div className="row">
        <div className="col-lg-6  mb-5 mb-sm-2">
          <h2>{translate("about.contact.feedback.title")}</h2>
          <p className="mb-4 fs-15">
            {translate("about.contact.feedback.subtitle")}
          </p>
          <form>
            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    aria-describedby="name"
                    placeholder={translate("about.contact.feedback.fields.fullName") + ' *'}
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="email"
                    placeholder={translate("about.contact.feedback.fields.email") + ' *'}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                      <textarea
                        className="form-control textarea"
                        placeholder={translate("about.contact.feedback.fields.comment") + ' *'}
                        id="comment"
                      ></textarea>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="form-group">
                  <a href="#"
                     className="btn btn-lg btn-dark font-weight-bold">{translate("about.contact.feedback.submit")}</a>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-6 mb-2 mb-lg-2">
          <div className="contact-right-padding">
            <div className="row">
              <div className="col-sm-12  mb-2 mb-lg-2">
                <p className="mb-0 font-weight-bold fs-14">
                  {translate("about.contact.address")}
                </p>
                <p className="mb-4 font-weight-normal fs-14">
                  Κρατίνου 9 και Αθηνάς, Πλατεία Κοτζιά, 105 52 Αθήνα
                </p>
                <p className="mb-0 font-weight-bold fs-14">
                  {translate("about.contact.phone")}
                </p>
                <p className="mb-4 font-weight-normal fs-14">
                  210 7491613-614
                </p>
                <p className="mb-0 font-weight-bold fs-14">
                  {translate("about.contact.email")}
                </p>
                <p className="mb-1 font-weight-normal fs-14">
                  check4facts@ekke.gr
                </p>
                <p className="mb-4 font-weight-normal fs-14">
                check4facts.science@gmail.com 
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Container>
);

export default Contact;
