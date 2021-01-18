import './templates.scss';
import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { ITemplateItem } from 'app/shared/model/template-item';

export interface ISimpleTemplateProps {
  item: ITemplateItem;
  className?: string;
}

export const SimpleTemplate = (props: ISimpleTemplateProps) => {

  const { item, className } = props;

  return (
    <Container className={className}>
      <Row className="mt-5">
        <Col>
          <h1 className="text-center">{item.title}</h1>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col>
          {item.content}
        </Col>
      </Row>
    </Container>
  );
};

export default SimpleTemplate;
