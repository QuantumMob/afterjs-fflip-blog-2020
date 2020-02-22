import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import normanPng from '../../assets/norman.png';
import Nav from '../Nav';

import './css.scss';

const Header = (props) => {
  const { version, className } = props;
  const headerProps = {
    className: `header ${className || ''}`
  };
  if (version === 'hero') {
    headerProps.className = `${headerProps.className} header--ver-hero`;
  }

  return <header { ...headerProps }>
    <Link to="/">
      <div className="header--logo-wrap">
        <img src={normanPng} className="header--logo" alt="Portrait of Norman" />
      </div>
      <h1 className="header--heading-text">Norman&apos;s Neutrons</h1>
    </Link>
    <Nav />
  </header>;
};

Header.propTypes = {
  version: PropTypes.oneOf([null, 'hero']),
  className: PropTypes.string
};
Header.defaultProps = {
  version: null,
  className: ''
};

export default Header;
