import React, { Element, useRef } from 'react';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import PropTypes from 'prop-types';

const ButtonWidget = ({ footertRef, onButtonClick }) => {
  const footerWidgetRef = useRef(null);

  return <ul ref={ footerWidgetRef } className="clean-list footer--widgets">
    {
      [
        {
          ident: 'top',
          label: 'Scroll to Top',
          extraClassName: null,
          icon: <ArrowUpwardIcon />
        },
        {
          ident: 'open-footer',
          status: 'closed',
          extraClassName: 'footer-widgets--open',
          icon: <AddIcon />,
          label: 'Toggle Footer'
        },
        {
          ident: 'close-footer',
          status: 'open',
          extraClassName: 'footer-widgets--close',
          icon: <CloseIcon />,
          label: 'Toggle Footer'
        }
      ].map(({ ident, label, onClick, icon, extraClassName }, index) => <li className={extraClassName} key={`${index + 1}-${ident}`}>
        <button
          className="clean-button footer-widgets--button"
          aria-label={`Footer UI Controls Tap or Click to ${label}`}
          onClick={(ev) => onButtonClick({ footerWidgetRef, ident, label, onClick, icon, extraClassName, index }, ev)}>
          { icon || null }
          <label htmlFor={`${index + 1}-${ident}`} className="visually-hidden footer-widgets--label">{ label }</label>
        </button>
      </li>)}
  </ul>;
};

ButtonWidget.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  footertRef: PropTypes.oneOfType([
    PropTypes.any,
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

export default ButtonWidget;
