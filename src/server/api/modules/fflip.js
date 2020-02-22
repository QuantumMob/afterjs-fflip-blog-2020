import { jsUtils } from '../../../shared/utils';

const fflipApi = {
  appUseHandler: (req, res, next) => {
    const userFlags = {
      isOfferCookie: !!req.session.isOfferCookie
    };

    if (userFlags.isOfferCookie) {
      req.session.ribbonVersion = typeof req.session.ribbonVersion !== 'number'
        ? jsUtils.getRandomNumber(1, 2)
        : req.session.ribbonVersion;
    }
    if (req.session.ribbonVersion) {
      userFlags.ribbonVersion = req.session.ribbonVersion;
    }

    res.locals.userFlags = userFlags;
    next();
  },
  factory: (deps = {}, opts = { apiBaseUri: '/api' }) => {
    const { app } = deps;
    const appBinded = [fflipApi.appUseHandler];

    app.use(...[appBinded]);

    return { routePath: null, binded: [], appBinded };
  }
};
export default fflipApi;
