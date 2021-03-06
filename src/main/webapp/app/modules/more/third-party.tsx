import React from 'react';
import { Row, Container, Col } from 'reactstrap';
import {Translate} from "react-jhipster";
import {THIRD_PARTY_LINK} from "app/config/constants";

export const ThirdParty = () => (
  <Container>
    <Row className="my-5">
      <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
        <h2><Translate contentKey="global.menu.more.third-party" /></h2><br/><br/>
        <ul style={{ listStyleType: 'none', fontWeight: 'bold' }}>
          {
            THIRD_PARTY_LINK.map((item, index) => (
              <li key={index}>
                <a href={item.link} target="_blank"  rel="noopener noreferrer">{item.name}</a>
              </li>
            ))
          }
        </ul>
      </Col>
    </Row>
  </Container>
);
