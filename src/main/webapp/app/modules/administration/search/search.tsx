import React from "react";
import axios from 'axios';
import { Button, Row, Col, Container } from 'reactstrap';

export const Search = () => {

  const reIndex = () => {
    axios.post('/api/elasticsearch/index');
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Click to re-index ElasticSearch</h1>
        </Col>
        <Col>
          <Button onClick={reIndex} color="primary">ReIndex</Button>
        </Col>
      </Row>
    </Container>
  )
};

export default Search;
