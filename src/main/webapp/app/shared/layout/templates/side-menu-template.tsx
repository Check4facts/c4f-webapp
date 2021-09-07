import '../../../../content/scss/templates.scss';
import React from 'react';
import {Col, Container, Nav, NavItem, Row} from 'reactstrap';
import {NavHashLink} from 'react-router-hash-link';

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

  const {items, className} = props;

  // only consider an event active if its event id is an odd number
  const isActive = hash => (match, location) => location.hash === hash;

  return (
    <Container>
      <Row>
        <Col lg={4} className="mb-5 mb-sm-2">
          <div className="author-box side-menu border p-5">
            <Nav vertical>
              {items.map((linkItem, index) => (
                <NavItem key={`link_${index}`}  className="pt-3">
                  <NavHashLink isActive={isActive(`#${linkItem.id}`)}
                               to={`#${linkItem.id}`} smooth replace={true}>
                    {linkItem.title}
                  </NavHashLink>
                </NavItem>
              ))}
            </Nav>
          </div>
        </Col>
        <Col lg={8}>
          <Container>
            {items.map((rowItem, index) => (
              <Row key={`row_${index}`} className="mb-4 mt-4" id={rowItem.id}>
                <Col>
                  <h2 className="mb-4">{rowItem.title}</h2>
                  {rowItem.content}
                </Col>
              </Row>
            ))}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default SideMenuTemplate;
