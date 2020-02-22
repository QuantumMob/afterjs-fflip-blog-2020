import FakeDbMap from '../../models/fakeDb';
import { fflipUtils } from '../../../shared/utils';

const debug = require('debug')('MYAPP:Server:ProductHandler');

const productApi = {
  recordsHandler: (req, res, next) => {
    const { userFlags: user, product: { productId } } = res.locals;
    try {
      const record = (res.locals.product && res.locals.product.record)
        || FakeDbMap.get(productId);
      res.locals.product = fflipUtils.isPromoVisibleForUser({ record, user })
        ? { productId, record }
        : { productId, record: null };
    } catch (error) {
      res.locals.product = { productId, record: null };
      next(error);

      return;
    }

    next();
  },
  localsHandler: (req, res, next) => {
    const productId = parseInt(req.params.productId
      || req.params.id
      || req.body.productId
      || req.body.id
      || req.query.productId
      || req.query.id);

    debug('productApi - localsHandler -> productId: ', productId);

    if (isNaN(productId) || productId <= 0) {
      next(new TypeError('Product Route: The unique identifier \'productId\' was not parseable'));
      return;
    }
    res.locals.product = {
      ...(res.locals.product || {}),
      productId
    };

    next();
  },
  allHandler: (deps = {}) => (req, res, next) => {
    try {
      debug('productApi - allHandler() -> res.locals.product: ', res.locals.product);
      const {
        product: { productId: uniqueId, record: payload }
      } = res.locals;
      const data = uniqueId && payload ? { uniqueId, payload } : { payload: null };
      res.status(200).json(data);
    } catch (error) {
      debug('productApi - allHandler() -> Error: ', error);
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
    const allHandler = productApi.allHandler(deps);

    if (route) {
      route.all(allHandler);
    } else {
      app.all(routePath, allHandler);
    }
    return { all: [allHandler] };
  },
  factory: (deps = {}, opts = { apiBaseUri: '/api' }) => {
    const productUri = `${opts.apiBaseUri || ''}/product/:productId`;
    const { app } = deps;
    const { routePath = productUri } = opts;
    const binded = [productApi.localsHandler, productApi.recordsHandler];

    app.use(routePath, ...binded);

    return { routePath, binded };
  }
};

export default productApi;
