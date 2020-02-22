import offerApi from './modules/offer';
import fflipApi from './modules/fflip';
import productApi from './modules/product';
import productsApi from './modules/products';
import appApi from './app';

const debug = require('debug')('MYAPP:Server:ApiHandler');

const factory = (
  deps = { app: {}, router: {}, errorHandler: appApi.errorHandler, debug: debug },
  opts = { apiBaseUri: '/api', productOpts: {} }
) => {
  const { app, errorHandler = appApi.errorHandler } = deps;
  const {
    apiBaseUri,
    sessionOpts,
    cookieOpts
  } = opts;

  debug('App Factory -> App Middlewares');
  // application level middlewares
  const bodyParsers = appApi.setupRequestParsers(deps);
  const appMiddlewares = [
    ...bodyParsers,
    appApi.setupCookiesMiddleware(deps, cookieOpts),
    appApi.setupSessionMiddleware(deps, sessionOpts),
    ...(process.NODE_ENV !== 'production' ? appApi.setupCorsAllHeaders(deps) : []),
    ...appApi.setupLocals(deps),
    ...(process.NODE_ENV !== 'production' ? appApi.localRequestLogging(deps) : [])
  ];

  // additional app-level-middleware
  debug('App Factory -> Offer Middlewares');
  const offerAppMiddleware = offerApi.factory(deps, { apiBaseUri: '/referral' });

  debug('App Factory -> Custom fflip Middleware');
  const fflipAppMiddleware = fflipApi.factory(deps, { apiBaseUri, ...opts.productOpts });

  debug('App Factory -> Product(s) Middlewares');
  const productAppMiddleware = productApi.factory(deps, { apiBaseUri, ...opts.productOpts });
  const productsAppMiddleware = productsApi.factory(deps, { apiBaseUri, ...opts.productOpts });

  // very last! (last middleware with 4 args is express error handler)
  debug('☠️ App Factory -> Last Middleware (Error Handling) 💣');
  const errorMiddleware = typeof errorHandler === 'function' ? errorHandler({ ...deps, notify: debug }) : null;
  if (typeof errorMiddleware === 'function' && errorMiddleware.length === 4) {
    debug('✅ App Factory -> With correct function signature (4 arguments)');

    app.use(errorMiddleware);
    appMiddlewares.push(errorMiddleware);
  } else {
    debug('⚠️ App Factory -> No Error Handling');
  }

  // routes!
  debug('App Factory -> Offer Routes');
  const offerRouteObj = offerApi.setupRouteHandlers(deps, {
    routePath: offerAppMiddleware.routePath
  });

  debug('App Factory -> Product Routes');
  const productRouteObj = productApi.setupRouteHandlers(deps, {
    ...opts.productOpts,
    routePath: productAppMiddleware.routePath
  });
  const productsRouteObj = productsApi.setupRouteHandlers(deps, {
    ...opts.productOpts,
    routePath: productsAppMiddleware.routePath
  });
  debug('✅ App Factory -> Done');

  return {
    offers: {
      middlewareData: offerAppMiddleware,
      routeData: offerRouteObj
    },
    fflip: {
      middlewareData: fflipAppMiddleware,
      routeData: null
    },
    product: {
      middlewareData: productAppMiddleware,
      routeData: productRouteObj
    },
    productList: {
      middlewareData: productsAppMiddleware,
      routeData: productsRouteObj
    },
    app: {
      middlewareData: {
        routePath: apiBaseUri,
        binded: appMiddlewares
      },
      routeData: '/'
    }
  };
};

export default factory;
export { offerApi, fflipApi, productApi, productsApi, appApi };
