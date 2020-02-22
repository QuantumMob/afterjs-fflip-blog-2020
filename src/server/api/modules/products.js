import FakeDbMap from '../../models/fakeDb';
import { fflipUtils } from '../../../shared/utils';

const debug = require('debug')('MYAPP:Server:ProductsListHandler');

const productsApi = {
  recordsHandler: (req, res, next) => {
    const { userFlags: user } = res.locals;
    try {
      res.locals.products = Array.from(FakeDbMap.values())
        .filter(record => fflipUtils.isPromoVisibleForUser({ record, user }));
    } catch (error) {
      res.locals.products = null;
      next(error);
      return;
    }

    next();
  },
  allHandler: (deps = {}) => (req, res, next) => {
    try {
      debug('productsApi - allHandler() -> res.locals.product: ', res.locals.products);
      const { products: payload } = res.locals;
      const data = { payload };
      res.status(200).json(data);
    } catch (error) {
      debug('productsApi - allHandler() -> Error: ', error);
      res.status(400).json({
        message: error instanceof Error ? error.message : 'Something went wrong',
        type: error instanceof Error ? error.constructor.name : 'Error'
      });
    }
  },
  setupRouteHandlers: (deps = {}, opts = {}) => {
    const { app, router } = deps;
    const { routePath } = opts;
    const route = (router && router.route
      ? router.route(routePath)
      : app.route(routePath)
    );
    const allHandler = productsApi.allHandler(deps);

    if (route) {
      route.all(allHandler);
    } else {
      app.all(routePath, allHandler);
    }
    return { all: [allHandler] };
  },
  factory: (deps = {}, opts = { apiBaseUri: '/api' }) => {
    const productUri = `${opts.apiBaseUri || ''}/products`;
    const { app } = deps;
    const { routePath = productUri } = opts;
    const binded = [productsApi.recordsHandler];

    app.use(routePath, ...binded);

    return { routePath, binded };
  }
};

export default productsApi;
