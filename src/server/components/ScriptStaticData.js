import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';

const ScriptStaticData = ({ data }) => {
  const jsStr = `
Object.defineProperty(window, 'env', {
  writeable: false,
  value: Object.freeze({
    userFlags: Object.freeze(${serialize(data.userFlags)}),
    NOW_STAMP: ${serialize(data.NOW_STAMP)}
  })
});`;
  return <script type="text/javascript" dangerouslySetInnerHTML={{ __html: jsStr }} />;
};

ScriptStaticData.propTypes = {
  data: PropTypes.shape()
};

ScriptStaticData.defaultProps = {
  data: {}
};

export default ScriptStaticData;
