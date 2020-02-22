import React from 'react';
import PropTypes from 'prop-types';

import './css.scss';

const Ribbon = props => (
  <div className={`corner-ribbon corner-ribbon--top-right ${props.className ? ` ${props.className}` : ''}`}>
    { props.children }
  </div>
);

Ribbon.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
Ribbon.defaultTypes = {
  className: '',
  children: null
};

export default Ribbon;
