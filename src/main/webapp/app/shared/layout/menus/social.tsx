import React from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Social = () => (
  <div style={{ paddingTop: '7px' }}>
    <Button color="transparent" tag="a" href="https://www.twitter.com" target="_blank">
      <FontAwesomeIcon icon={['fab', 'twitter']} color="#ba1e0d" size="lg"/>
    </Button>
    <Button color="transparent" tag="a" href="https://www.facebook.com" target="_blank">
      <FontAwesomeIcon icon={['fab', 'facebook']} color="#ba1e0d" size="lg"/>
    </Button>
    <Button color="transparent" tag="a" href="https://www.instagram.com" target="_blank">
      <FontAwesomeIcon icon={['fab', 'instagram']} color="#ba1e0d" size="lg"/>
    </Button>
  </div>
)
