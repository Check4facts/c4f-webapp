import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Social = () => (
  <ul className="social-media">
    <li>
      <a href="https://twitter.com/Check4F">
        <FontAwesomeIcon icon={['fab', 'twitter']}/>
      </a>
    </li>
    <li>
      <a href="https://www.facebook.com/Check4Facts">
        <FontAwesomeIcon icon={['fab', 'facebook']} />
      </a>
    </li>
    <li>
      <a href="https://www.instagram.com/check4facts/">
        <FontAwesomeIcon icon={['fab', 'instagram']} />
      </a>
    </li>
  </ul>);


