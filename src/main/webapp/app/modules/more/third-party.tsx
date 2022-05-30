import React from 'react';
import { Row, Container, Col } from 'reactstrap';
import {Translate} from "react-jhipster";
import {THIRD_PARTY_LINK} from "app/config/constants";

export const ThirdParty = () => (
  <Container>
    <Row className="my-5">
      <Col className="text-center" sm="12">
        <h1><Translate contentKey="global.menu.more.third-party" /></h1><br/><br/>
          {
            THIRD_PARTY_LINK.map((item, index) => (
              <Row className='my-5' key={`third-party-${index}`}>
                <Col className="text-center m-auto" sm="2">
                  <a href={item.link} target="_blank"  rel="noopener noreferrer">
                    <img src={item.logo} alt="Site Logo" className='img-fluid' width="400" height="400" />
                  </a>
                </Col>
                <Col className="text-center" sm="10">
                  <a href={item.link} className="text-align-end"><h3>{item.name}</h3></a>
                  <p className='text-justify'><Translate contentKey={`third-party-text.${item.name}`} /></p>
                </Col>          
              </Row>
            ))
          }
      </Col>
    </Row>
  </Container>
);
