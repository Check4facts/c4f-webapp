import React from 'react';
import {Translate} from "react-jhipster";
import {Container, Row, Col} from 'reactstrap';

const Footer = () => (
  <footer>
    <Container>
      <Row>
        <Col sm="12">
          <div className="d-lg-flex justify-content-between align-items-center border-top mt-5 footer-bottom">
            {/* <ul className="footer-horizontal-menu">
              <li><a href="#">Terms of Use.</a></li>
              <li><a href="#">Privacy Policy.</a></li>
              <li><a href="#">Accessibility & CC.</a></li>
              <li><a href="#">AdChoices.</a></li>
              <li><a href="#">Advertise with us Transcripts.</a></li>
              <li><a href="#">License.</a></li>
              <li><a href="#">Sitemap</a></li>
            </ul> */}
            <div className='d-flex'>
            <a href='https://www.ekke.gr/' className="text-dark d-flex align-items-center">
            <img src="../../../content/images/ekke-logo.png" alt="EKKE logo" width="50" height="50"/>
            </a>
            <a href='https://www.athenarc.gr/' className="text-dark d-flex align-items-center">
            <img src="../../../content/images/athena-logo.png" alt="athena logo" width="50" height="50"/>
            </a>
            </div>
            <p className="fs-6"><Translate contentKey="footer.project"/></p>
            <p className="font-weight-medium">
              © Copyright 2020 <a href="https://www.check4facts.gr/" className="text-dark">check4facts.gr</a> ®
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
