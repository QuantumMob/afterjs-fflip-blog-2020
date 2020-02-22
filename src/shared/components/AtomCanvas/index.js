import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ZDogCanvas from '../../hoc/ZDogCanvas';
import ZDogAtomIllustration from './zdog';

const fragmentProps = props => ['key', 'children'].reduce((acc, prop) => {
  acc[prop] = props[prop];

  return acc;
}, {});
const AtomCanvas = props => <Fragment { ...fragmentProps(props) }/>;

AtomCanvas.propTypes = {
  ...ZDogCanvas.propTypes,
  dimScale: PropTypes.number,
  nucleiPalette: PropTypes.array,
  doDrawElectrons: PropTypes.bool
};

AtomCanvas.defaultProps = {
  ...ZDogCanvas.defaultProps,
  dimScale: null,
  nucleiPalette: null,
  doDrawElectrons: false
};

export default ZDogCanvas(AtomCanvas, { zDogAdapter: ZDogAtomIllustration });
