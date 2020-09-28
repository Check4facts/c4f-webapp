import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Social = () => (
  <ButtonGroup className="align-items-center align-middle">
    <Button color="transparent" tag="a" href="https://www.twitter.com" target="_blank">
      <FontAwesomeIcon icon={['fab', 'twitter']} color="#ba1e0d" size="lg"/>
    </Button>
    <Button color="transparent" tag="a" href="https://www.facebook.com" target="_blank">
      <FontAwesomeIcon icon={['fab', 'facebook']} color="#ba1e0d" size="lg"/>
    </Button>
    <Button color="transparent" tag="a" href="https://www.instagram.com" target="_blank">
      <FontAwesomeIcon icon={['fab', 'instagram']} color="#ba1e0d" size="lg"/>
    </Button>
  </ButtonGroup>
)
