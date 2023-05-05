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
        <Col className='' lg="5">
          <p className='mb-2'>Με τη συνεργασία των</p>
            <div style={{display: "flex", flexDirection:"row", flexWrap: "wrap"}}>
            <a href='https://www.ekke.gr/' className="text-dark d-flex align-items-center" style={{marginRight: 3, marginBottom: 3}}>
              <img src="../../../content/images/ekke-logo.png" alt="EKKE logo" height="50"/>
            </a>
            <a href='https://www.media.uoa.gr/' className="text-dark d-flex align-items-center" style={{marginRight: 3, marginBottom: 3}}>
              <img src="../../../content/images/media-uoa-logo.jpg" alt="media uoa logo" height="50"/>
            </a>
            <a href='https://www.athenarc.gr/' className="text-dark d-flex align-items-center" style={{marginRight: 3, marginBottom: 3}}>
              <img src="../../../content/images/athena-logo.png" alt="athena logo" height="50"/>
            </a>
            <a href='https://www.hcmr.gr/' className="text-dark d-flex align-items-center" style={{marginRight: 3, marginBottom: 3}}>
              <img src="../../../content/images/hcmr-logo.jpg" alt="hcmr logo" height="50"/>
            </a>
            <a href='https://www.iccs.gr/' className="text-dark d-flex align-items-center" style={{marginRight: 3, marginBottom: 3}}>
              <img src="../../../content/images/iccs-logo.jpg" alt="iccs logo" height="50"/>
            </a>
            <a href='https://www.astro.noa.gr/' className="text-dark d-flex align-items-center" style={{marginRight: 3, marginBottom: 3}}>
              <img src="../../../content/images/logo-noa.jpg" alt="noa logo" height="50"/>
            </a>
            <a href='http://www.bioacademy.gr/' className="text-dark d-flex align-items-center" style={{marginRight: 3, marginBottom: 3}}>
              <img src="../../../content/images/iibea-logo.jpg" alt="iibea logo" height="50"/>
            </a>
            <a href='https://smslab.edu.uowm.gr/' className="text-dark d-flex align-items-center" style={{marginRight: 3, marginBottom: 3}}>
              <img src="../../../content/images/smslab-logo.webp" alt="smslab logo" height="50"/>
            </a>
          </div>
        </Col>
        <Col className='mt-4 mt-md-0' lg="5">
          <p className="mb-2">Το έργο χρηματοδοτήθηκε από το <a href="http://www.elidek.gr/en/homepage/">Ελληνικό Ίδρυμα Έρευνας και Καινοτομίας</a> (grant agreement HFRI-FM17-2283).</p>
          <a href='http://www.elidek.gr/' className="text-dark d-flex align-items-center">
            <img src="../../../content/images/ELIDEK.png" alt="ELIDEK logo" height="50"/>
          </a>
        </Col>
        <Col className='mt-4 mt-md-0' lg="2">
          <p className="font-weight-medium">© Copyright 2020 <a href="https://www.check4facts.gr/" className="text-dark">check4facts.gr</a></p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
