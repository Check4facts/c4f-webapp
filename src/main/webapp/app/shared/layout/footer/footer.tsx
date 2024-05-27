import React from 'react';
import {Translate, translate} from "react-jhipster";
import { Link } from 'react-router-dom';
import {Col, Container, Row} from 'reactstrap';

export interface IFooterProps {
  isAuthenticated: boolean;
  currentLocale: string;
}

const Footer = (props: IFooterProps) => (
  <footer>
    {/*
            <p className="fs-6">Ένα έργο από το <a href="https://www.ekke.gr">Εθνικό Κέντρο Κοινωνικών Ερευνών</a>, το <a href="https://www.uoa.gr">Εργαστήριο Κοινωνικής Έρευνας στα ΜΜΕ- Τμήμα Επικοινωνίας και ΜΜΕ- Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών</a> και το <a href="https://www.athenarc.gr/">Ερευνητικό Κέντρο Αθηνά</a>.</p>
*/}
    <Container>
      <Row className='footer-bottom border-top'>
        <Col className='' lg="5">
          <p className='mb-2'>Με τη συνεργασία των</p>
            <div style={{display: "flex", flexDirection:"row", flexWrap: "wrap", columnGap: 5}}>
            <a href='https://www.ekke.gr/' target="_blank" rel="noopener noreferrer" className="text-dark d-flex align-items-center" style={{marginRight: 3, marginBottom: 3}}>
              <img src="../../../content/images/ekke-logo.png" alt="EKKE logo" height="50"/>
            </a>
            <a href='https://www.media.uoa.gr/' target="_blank" rel="noopener noreferrer" className="text-dark d-flex align-items-center" style={{marginRight: 3, marginBottom: 3}}>
              <img src="../../../content/images/media-uoa-logo.jpg" alt="media uoa logo" height="50"/>
            </a>
            <a href='https://www.athenarc.gr/' target="_blank" rel="noopener noreferrer" className="text-dark d-flex align-items-center" style={{marginRight: 3, marginBottom: 3}}>
              <img src="../../../content/images/athena-logo.png" alt="athena logo" height="50"/>
            </a>
            <a href='https://www.hcmr.gr/' target="_blank" rel="noopener noreferrer" className="text-dark d-flex align-items-center" style={{marginRight: 3, marginBottom: 3}}>
              <img src="../../../content/images/hcmr-logo.jpg" alt="hcmr logo" height="50"/>
            </a>
            <a href='https://www.iccs.gr/' target="_blank" rel="noopener noreferrer" className="text-dark d-flex align-items-center" style={{marginRight: 3, marginBottom: 3}}>
              <img src="../../../content/images/iccs-logo.jpg" alt="iccs logo" height="50"/>
            </a>
            <a href='https://www.astro.noa.gr/' target="_blank" rel="noopener noreferrer" className="text-dark d-flex align-items-center" style={{marginRight: 3, marginBottom: 3}}>
              <img src="../../../content/images/logo-noa.jpg" alt="noa logo" height="50"/>
            </a>
            <a href='http://www.bioacademy.gr/' target="_blank" rel="noopener noreferrer" className="text-dark d-flex align-items-center" style={{marginRight: 3, marginBottom: 3}}>
              <img src="../../../content/images/iibea-logo.jpg" alt="iibea logo" height="50"/>
            </a>
            <a href='https://smslab.edu.uowm.gr/' target="_blank" rel="noopener noreferrer" className="text-dark d-flex align-items-center" style={{marginRight: 3, marginBottom: 3}}>
              <img src="../../../content/images/smslab-logo.webp" alt="smslab logo" height="50"/>
            </a>
            <a href='https://www.certh.gr/' target="_blank" rel="noopener noreferrer" className="text-dark d-flex align-items-center" style={{marginRight: 3, marginBottom: 3}}>
              <img src="../../../content/images/eketa-logo-small.png" alt="eketa logo" height="50"/>
            </a>
          </div>
        </Col>
        <Col className='mt-4 mt-md-0' lg="5">
          <p className="mb-2">Το έργο χρηματοδοτήθηκε από το <a href="http://www.elidek.gr/en/homepage/">ΕΛΙΔΕΚ</a> (grant agreement HFRI-FM17-2283) και από το Εθνικό Σχεδίο Ανάκαμψης και Ανθεκτικότητας Ελλάδα 2.0 με τη χρηματοδότηση της Ευρωπαϊκής Ένωσης – NextGenerationEU</p>
          <Row className="justify-content-md-center justify-content-lg-start d-sm-flex" style={{display: "flex", justifyContent: "center", columnGap: 10}}>
          <a href='http://www.elidek.gr/' target="_blank" rel="noopener noreferrer" className="text-dark d-flex align-items-center">
            <img src="../../../content/images/ELIDEK.png" alt="ELIDEK logo" height="40"/>
          </a>
          <a href='https://greece20.gov.gr/' target="_blank" rel="noopener noreferrer" className="text-dark d-flex align-items-center">
            <img src="../../../content/images/Greece-2.0_NextGeneration_gr_1.jpg" alt="Greece 2.0 logo" height="40"/>
          </a>
          </Row>
        </Col>
        <Col className='mt-4 mt-md-0' lg="2" style={{display: "flex", flexDirection: "column"}}>
          <Row className="d-flex justify-content-center">
            {!props.isAuthenticated && <p className="font-weight-medium"><Link to="/login" className="text-dark" style={{fontSize: "0.8rem"}}>{translate('global.menu.account.login')}</Link></p>}
          </Row>
          <Row className="d-flex justify-content-center mt-4">
            <a href='https://edmo.eu/' target="_blank" rel="noopener noreferrer" className="text-dark d-flex align-items-center">
              <img src="../../../content/images/edmo-logo.jpg" alt="ELIDEK logo" height="50"/>
            </a>
          </Row>
          <Row className="d-flex justify-content-center"> 
            <p style={{textAlign: "center"}}>Mέλος του Ευρωπαϊκού Παρατηρητηρίου Ψηφιακών Μέσων (EDMO)</p>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <p className="font-weight-medium d-flex flex-wrap" style={{fontSize: 12, columnGap: 8}}>© Copyright 2020 <a href="https://www.check4facts.gr/" className="text-dark">check4facts.gr</a>
            <a href={props.currentLocale === "el" ? 'https://check4facts.gr/files/c4f-privacy-policy-gr.pdf' : 
              'https://check4facts.gr/files/c4f-privacy-policy-eng.pdf'} target="_blank" rel="noopener noreferrer" className="text-dark d-flex align-items-center w-auto">
              {translate('global.privacy-policy')}
            </a></p>
      </Row>
    </Container>
  </footer>
);

export default Footer;
