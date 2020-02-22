import { fflipUtils } from '../../../shared/utils';

const debug = require('debug')('MYAPP:Server:OfferHandler');

const LIMITED_OFFER_UUID = '9f427f50-45f9-11ea-a85e-a34337e74359';

const offerApi = {
  refreshOfferCookie: (req, res, uuid) => {
    if (!fflipUtils.isNewsletterPromoActiveForUser(res.locals.userFlags)) {
      req.session.isOfferCookie = false;
      return;
    }

    res.cookie('offer', uuid, { maxAge: 30 * 24 * 60 * 60 });
    if (uuid === LIMITED_OFFER_UUID) {
      req.session.isOfferCookie = true;
    }
  },
  recordsHandler: (req, res, next) => {
    if (res.locals.offer.uuid && res.locals.offer.uuid === LIMITED_OFFER_UUID) {
      offerApi.refreshOfferCookie(req, res, LIMITED_OFFER_UUID);
    }

    next();
  },
  localsHandler: (req, res, next) => {
    const { offerUuid } = req.params;

    debug('offerApi - localsHandler -> offerUuid: ', offerUuid);

    if (typeof offerUuid !== 'string' || offerUuid.trim().length === 0) {
      next(new TypeError('Offer Route: The unique identifier \'offerUuid\' was not parseable'));
      return;
    }
    res.locals.offer = {
      ...(res.locals.offer || {}),
      uuid: offerUuid
    };

    next();
  },
  getHandler: (deps = {}) => (req, res, next) => {
    // 301 get's cached by google chrome :/
    res.redirect(307, `${process.env.RAZZLE_PUBLIC_URL}/store`);
  },
  appUseHandler: (req, res, next) => {
    debug('offerApi - appUseHandler -> req.cookies: ', req.cookies,
      '\n - req.cookies.offer: ', req.cookies.offer
    );
    if (req.cookies && req.cookies.offer && req.cookies.offer === LIMITED_OFFER_UUID) {
      offerApi.refreshOfferCookie(req, res, req.cookies.offer);
    }
    next();
  },
  setupRouteHandlers: (deps = {}, opts = {}) => {
    const { app, router } = deps;
    const { routePath } = opts;
    const route = (router && router.route
      ? router.route(routePath)
      : app.route(routePath)
    );
    const getHandler = offerApi.getHandler(deps);

    if (route) {
      route.get(getHandler);
    } else {
      app.get(routePath, getHandler);
    }
    return { get: [getHandler] };
  },
  factory: (deps = {}, opts = { apiBaseUri: '/api' }) => {
    const offerUri = `${opts.apiBaseUri || ''}/offer/:offerUuid`;
    const { app } = deps;
    const { routePath = offerUri } = opts;

    const appBinded = [offerApi.appUseHandler];
    const binded = [offerApi.localsHandler, offerApi.recordsHandler];

    app.use(...[appBinded]);
    app.use(routePath, ...binded);

    return { routePath, binded, appBinded };
  }
};
export default offerApi;
