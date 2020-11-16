import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Social = () => (
  <ButtonGroup className="align-items-center align-middle">
    <Button color="transparent" tag="a" href="https://www.twitter.com" target="_blank">
      <FontAwesomeIcon icon={['fab', 'twitter']} color="#325d88" size="lg"/>
    </Button>
    <Button color="transparent" tag="a" href="https://www.facebook.com" target="_blank">
      <FontAwesomeIcon icon={['fab', 'facebook']} color="#325d88" size="lg"/>
    </Button>
    <Button color="transparent" tag="a" href="https://www.instagram.com" target="_blank">
      <FontAwesomeIcon icon={['fab', 'instagram']} color="#325d88" size="lg"/>
    </Button>
  </ButtonGroup>
)
