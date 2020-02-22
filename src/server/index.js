import express from 'express';
import { render } from '@jaredpalmer/after';
import routes from '../routes';
import Document from './Document';
import apiMiddleware from './api';
import { fflipUtils as fflipServerUtils } from './utils';
import { fflipUtils } from '../shared/utils';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);
const debug = require('debug')('MYAPP:Server');

fflipUtils.initConfig();
const server = express();
server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR));

apiMiddleware({ app: server }, { apiBaseUri: '/api' });
server.get('*', async (req, res) => {
  try {
    const preJS = {
      NOW_STAMP: new Date().getTime(),
      userFlags: fflipServerUtils.publicizeUserData(res.locals.userFlags)
    };
    // Populates getInitialProps
    const context = { req, res, preJS, routes, assets, document: Document };
    const html = await render(context);
    res.send(html);
  } catch (error) {
    debug('Could not serve static renderer', error.message || error);
    if (process.env.NODE_ENV !== 'production' && typeof error === 'object') {
      console.log('☠️\t=-=\t☠️\t=-=\t☠️\t=-=\t☠️\t=-=\t☠️');
      console.log('=-=-=-=-=-=-=-=-=-\t=-=-=-=-=-=-=-=-=-\t=-=-=-=-=-=-=-=-=-');
      console.log(error);
      console.log('=-=-=-=-=-=-=-=-=-\t=-=-=-=-=-=-=-=-=-\t=-=-=-=-=-=-=-=-=-');
      console.log('☠️\t=-=\t☠️\t=-=\t☠️\t=-=\t☠️\t=-=\t☠️');
    }
    res.json(error);
  }
});

export default server;
