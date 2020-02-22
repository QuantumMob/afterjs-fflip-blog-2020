import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import './css.scss';
import routes from '../routes';
import { fflipUtils } from '../shared/utils';

const debug = require('debug')('MYAPP:Hydrate');
debug('GO: /src/client/hydrate.js');
export default () => ensureReady(routes)
  .then((data) => {
    fflipUtils.initConfig();
    return hydrate(
      <BrowserRouter>
        <After { ...{ data, routes } } />
      </BrowserRouter>,
      document.getElementById('root')
    );
  })
  .catch((error) => {
    debug('Could not start After.Js', error.message);
    console.error(error);
  });
