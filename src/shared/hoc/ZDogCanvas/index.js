import React, { Fragment, useState, useRef, useEffect } from 'react';
import StylePropType from 'react-style-proptype';
import PropTypes from 'prop-types';

const magicDims = ['window'];

const endsWithPercentage = (props, propName) => {
  const asNum = parseFloat(props[propName]);
  try {
    if (Number.isNaN(asNum) || asNum <= 0 || !props[propName].toString().endsWith('%')) {
      return new Error(`Could not parse as number '${propName}' got ${props[propName]} as a positive number.`);
    }
  } catch (error) {
    return error;
  }
};

const zDogAdapterOpts = (props, excludeKeys, defaultProps) => {
  return Object.keys(props).reduce((acc, prop) => {
    if (excludeKeys.includes(prop)) {
      return acc;
    }

    acc[prop] = prop in props ? props[prop] : defaultProps[prop];

    return acc;
  }, {});
};

const canvasDims = ({ heightProp, widthProp }) => {
  let width = '100%';
  let height = '100%';

  if (widthProp && !magicDims.includes(widthProp)) {
    width = widthProp;
  } else if (typeof window !== 'undefined' && window.innerWidth && widthProp === 'window') {
    width = window.innerWidth;
  }

  if (heightProp && !magicDims.includes(heightProp)) {
    height = heightProp;
  } else if (typeof window !== 'undefined' && window.innerHeight && heightProp === 'window') {
    height = window.innerHeight;
  }

  return { height, width };
};

const withZDogCanvas = (WrappedComponent, initData) => (props) => {
  const { zDogAdapter } = initData;
  if (zDogAdapter.constructor !== Function) {
    throw new Error('withZDogCanvas HOC: \'zDogAdapter\' is expected to be a class '
      + `(constructor Function). Got 'constructor' ${zDogAdapter.constructor.name}`);
  } else if (!zDogAdapter.prototype
    || typeof zDogAdapter.prototype !== 'object'
    || typeof zDogAdapter.prototype.setup !== 'function'
    || typeof zDogAdapter.prototype.start !== 'function'
  ) {
    throw new Error('withZDogCanvas HOC: \'zDogAdapter\' is expected to be have function '
      + 'of \'setup\' & \'start\'. For \'zDogAdapter.prototype\' methods \'setup\' & \'start\' '
      + `respectively ${typeof zDogAdapter.prototype.setup} and `
      + `${typeof zDogAdapter.prototype.start} `);
  }

  const canvasRef = useRef(null);
  const {
    style = {},
    className = ''
  } = props;
  const { width, height } = canvasDims({ width: props.width, height: props.height });
  const canvasProps = { width, height, style, className };

  /* eslint-disable no-useless-call */
  const zInstance = Object.create(zDogAdapter.prototype);
  // using || to resolve 'zInstance' as constructor returns nothing ^_^
  const illo = zInstance.constructor.apply(zInstance, [zDogAdapterOpts(props, Object.keys(canvasProps), withZDogCanvas.defaultProps)]) || zInstance;
  /* eslint-enable no-useless-call */
  const [status, setStatus] = useState('unmounted');

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // componentDidMount -> no dependancy
    if (canvasRef.current && status !== 'mounted') {
      setStatus('mounted');
      illo
        .setup(canvasRef.current)
        .start();
      window.dispatchEvent(new Event('resize'));
    }
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return <Fragment>
    <WrappedComponent { ...props } canvasProps={canvasProps} />
    <canvas
      ref={canvasRef}
      { ...canvasProps }
    />
  </Fragment>;
};

withZDogCanvas.propTypes = {
  style: PropTypes.shape(StylePropType),
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, endsWithPercentage]),
  height: PropTypes.oneOfType([PropTypes.number, endsWithPercentage]),
  scale: PropTypes.number,
  resize: PropTypes.oneOf([true, false, 'fullscreen']),
  zoom: PropTypes.number
};

withZDogCanvas.defaultProps = {
  style: null,
  className: '',
  width: null,
  height: null,
  scale: null,
  resize: null,
  zoom: null
};

export default withZDogCanvas;
export { canvasDims, endsWithPercentage, zDogAdapterOpts };
