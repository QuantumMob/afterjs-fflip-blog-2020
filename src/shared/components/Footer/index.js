import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import ThanksFooter from './ThanksFooter';
import ButtonWidget from './ButtonWidget';
import buttonFactory from './helpers';

import './css.scss';

const Footer = ({ dateStamp }) => {
  const footertRef = useRef(null);
  const onButtonClick = buttonFactory(footertRef);
  const staticDate = dateStamp
    || (typeof window === 'object' && window.env && window.env.NOW_STAMP)
    || new Date('2020-06-01').getTime();
  const dateFullYear = new Date(staticDate).getFullYear();

  return <footer className="footer" ref={footertRef}>
    <div className="footer--fixed-wrapper">
      <ButtonWidget { ...{ onButtonClick }} />
      <div className="footer--content">
        <h6>&copy; { dateFullYear }</h6>
        <ThanksFooter />
      </div>
    </div>
  </footer>;
};

Footer.propTypes = {
  dateStamp: PropTypes.number
};

Footer.defaultProps = {
  dateStamp: null
};

export default Footer;
