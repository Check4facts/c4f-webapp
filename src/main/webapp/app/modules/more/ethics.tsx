import React from 'react';
import { Row, Container, Col } from 'reactstrap';
import {Translate} from "react-jhipster";

export const Ethics = () => (
  <Container>
    <Row className="my-5">
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <h1 className="text-center">
          <Translate contentKey="fact-checking.ethics.meth" />
        </h1>
        <br/>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate posuere lorem eu sodales. Aliquam vel justo nulla. Ut finibus dolor ac placerat molestie. Praesent eget ipsum metus. Sed eget lectus convallis nisl sodales consequat. Aenean interdum urna dolor, ultricies fermentum dui iaculis sed. Morbi non lorem porttitor, ullamcorper nisi laoreet, pellentesque nibh. Pellentesque nec aliquet mauris. Phasellus eu tortor sagittis justo rutrum lobortis sed ut risus. Nullam ipsum libero, ultricies et ligula ac, placerat rutrum lorem. Sed urna urna, vestibulum eget purus eget, interdum suscipit nisl. Cras a sapien libero. Mauris magna risus, congue eu molestie in, luctus id lorem. Donec eget tempor lorem. Praesent varius vitae est non tempus. Donec condimentum purus ex, tempus hendrerit massa dictum et.</p>
      </Col>
    </Row>
    <Row className="my-5">
      <Col sm="12" md={{ size: 6, offset: 3 }}>
        <h1 className="text-center">
          <Translate contentKey="fact-checking.ethics.code" />
        </h1>
        <br/>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate posuere lorem eu sodales. Aliquam vel justo nulla. Ut finibus dolor ac placerat molestie. Praesent eget ipsum metus. Sed eget lectus convallis nisl sodales consequat. Aenean interdum urna dolor, ultricies fermentum dui iaculis sed. Morbi non lorem porttitor, ullamcorper nisi laoreet, pellentesque nibh. Pellentesque nec aliquet mauris. Phasellus eu tortor sagittis justo rutrum lobortis sed ut risus. Nullam ipsum libero, ultricies et ligula ac, placerat rutrum lorem. Sed urna urna, vestibulum eget purus eget, interdum suscipit nisl. Cras a sapien libero. Mauris magna risus, congue eu molestie in, luctus id lorem. Donec eget tempor lorem. Praesent varius vitae est non tempus. Donec condimentum purus ex, tempus hendrerit massa dictum et.</p>
      </Col>
    </Row>
  </Container>
);

export default Ethics;
