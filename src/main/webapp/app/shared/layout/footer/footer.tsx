import React from 'react';
import {Translate} from "react-jhipster";
import {Col, Container, Row} from 'reactstrap';

const Footer = () => (
  <footer>
    {/*
            <p className="fs-6">Ένα έργο από το <a href="https://www.ekke.gr">Εθνικό Κέντρο Κοινωνικών Ερευνών</a>, το <a href="https://www.uoa.gr">Εργαστήριο Κοινωνικής Έρευνας στα ΜΜΕ- Τμήμα Επικοινωνίας και ΜΜΕ- Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών</a> και το <a href="https://www.athenarc.gr/">Ερευνητικό Κέντρο Αθηνά</a>.</p>
*/}
    <Container>
      <Row className='footer-bottom border-top'>
        <Col className='' sm="4">
          <p className='mb-2'>Με τη συνεργασία των</p>
            <div className='d-flex'>
            <a href='https://www.ekke.gr/' className="text-dark d-flex align-items-center" style={{marginRight: 3}}>
              <img src="../../../content/images/ekke-logo.png" alt="EKKE logo" height="50"/>
            </a>
            <a href='https://www.media.uoa.gr/' className="text-dark d-flex align-items-center" style={{marginRight: 3}}>
              <img src="../../../content/images/media-uoa-logo.jpg" alt="media uoa logo" height="50"/>
            </a>
            <a href='https://www.athenarc.gr/' className="text-dark d-flex align-items-center" style={{marginRight: 3}}>
              <img src="../../../content/images/athena-logo.png" alt="athena logo" height="50"/>
            </a>
            <a href='https://www.hcmr.gr/' className="text-dark d-flex align-items-center" style={{marginRight: 3}}>
              <img src="../../../content/images/hcmr-logo.jpg" alt="hcmr logo" height="50"/>
            </a>
            <a href='https://www.iccs.gr/' className="text-dark d-flex align-items-center" style={{marginRight: 3}}>
              <img src="../../../content/images/iccs-logo.jpg" alt="iccs logo" height="50"/>
            </a>
          </div>
        </Col>
        <Col className='mt-4 mt-md-0' sm="5">
          <p className="mb-2">Το έργο χρηματοδοτήθηκε από το <a href="http://www.elidek.gr/en/homepage/">Ελληνικό Ίδρυμα Έρευνας και Καινοτομίας</a> (grant agreement HFRI-FM17-2283).</p>
          <a href='http://www.elidek.gr/' className="text-dark d-flex align-items-center">
            <img src="../../../content/images/ELIDEK.png" alt="ELIDEK logo" height="50"/>
          </a>
        </Col>
        <Col className='mt-4 mt-md-0' sm="3">
          <p className="font-weight-medium">© Copyright 2020 <a href="https://www.check4facts.gr/" className="text-dark">check4facts.gr</a></p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
