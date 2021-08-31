import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Social = () => (
  <ul className="social-media">
    <li>
      <a href="https://www.twitter.com">
        <FontAwesomeIcon icon={['fab', 'twitter']}/>
      </a>
    </li>
    <li>
      <a href="https://www.facebook.com">
        <FontAwesomeIcon icon={['fab', 'facebook']} />
      </a>
    </li>
    <li>
      <a href="https://www.instagram.com">
        <FontAwesomeIcon icon={['fab', 'instagram']} />
      </a>
    </li>
  </ul>);


