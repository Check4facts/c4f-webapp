import './templates.scss';
import React from 'react';
import { Row, Col, Container } from 'reactstrap';
import { NavHashLink } from 'react-router-hash-link';

type sideMenuTemplateItem = {
  id: string,
  title: string,
  content: any
};

export interface ISideMenuTemplateProps {
  items: sideMenuTemplateItem[];
  className?: string;
}

export const SideMenuTemplate = (props: ISideMenuTemplateProps) => {

  const { items, className } = props;

  // only consider an event active if its event id is an odd number
  const isActive = hash => (match, location) => location.hash === hash;

  return (
    <div>
      <Row>
        <Col md={3}>
          <div className={`d-none d-sm-block side-menu ${className}`}>
            {items.map((linkItem, index) => (
              <NavHashLink key={`link_${index}`} className="menu-link" isActive={isActive(`#${linkItem.id}`)} to={`#${linkItem.id}`} smooth replace={false}>
                {linkItem.title}
              </NavHashLink>
            ))}
          </div>
        </Col>
        <Col md={9}>
          <Container>
            {items.map((rowItem, index) => (
              <Row key={`row_${index}`} className="my-5" id={rowItem.id}>
                <Col>
                  <h1 className="text-center side-menu-template-header">{rowItem.title}</h1>
                  {rowItem.content}
                </Col>
              </Row>
            ))}
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default SideMenuTemplate;
