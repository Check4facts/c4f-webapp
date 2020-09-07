import './home.scss';

import React from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import {
  Row, Col, Input, Button, Container, CardHeader, Card, CardBody, CardTitle, CardText
} from 'reactstrap';


export type IHomeProp = StateProps;

const Article = () => (
  <Card>
    <CardHeader>Article Header</CardHeader>
    <CardBody>
      <CardTitle>Article Title</CardTitle>
      <CardText>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Pulvinar etiam non quam lacus. Sapien nec sagittis aliquam malesuada bibendum arcu. At erat
        pellentesque adipiscing commodo elit. Purus non enim praesent elementum facilisis leo vel fringilla est. Dictum
        varius duis at consectetur lorem. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras
        tincidunt. Netus et malesuada fames ac turpis. Vitae suscipit tellus mauris a diam maecenas sed enim. Fermentum
        dui faucibus in ornare quam viverra orci sagittis. A diam sollicitudin tempor id eu nisl nunc mi ipsum.
        Ultricies mi eget mauris pharetra.
      </CardText>
      <Button color="secondary" className="float-right">More</Button>
      <CardText>
        <small className="text-muted">Release Date</small>
      </CardText>
    </CardBody>
  </Card>
);

export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <Container fluid className="my-5">
      {account && account.login && (
        <Row className="my-5">
          <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
            <h2 className="text-center">
              <Translate contentKey="home.logged.message" interpolate={{ username: account.login }}/>
            </h2>
          </Col>
        </Row>
      )}
      <Row className="my-5">
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <h2 className="text-center">
            <Translate contentKey="home.title" />
          </h2>
          <p className="lead">
            <Translate contentKey="home.subtitle" />
          </p>
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <Input placeholder={translate("home.check.placeholder")} />
        </Col>
      </Row>
      <Row className="my-3">
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <Button color="primary">
            <Translate contentKey="home.check.button"/>
          </Button>
        </Col>
      </Row>
      <Row className="my-5">
        <Col className="text-center" sm="12" md={{ size: 6, offset: 3 }}>
          <h2 className="text-center">
            <Translate contentKey="home.article.title" />
          </h2>
        </Col>
      </Row>
      <Row className="my-3" xs="1" sm="2" md="4">
        <Col>
          <Article/>
        </Col>
        <Col>
          <Article/>
        </Col>
        <Col>
          <Article/>
        </Col>
        <Col>
          <Article/>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
