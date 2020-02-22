import expressBodyParser from 'body-parser';
import expressSessionMiddleware from 'express-session';
import expressCookieParser from 'cookie-parser';
import { jsUtils } from '../../shared/utils';

const debug = require('debug')('MYAPP:Server:AppHandler');

const appApi = {
  errorHandler: (deps = {}) => (error, req, res, next) => {
    const { notify = debug } = deps;
    notify('Could not serve API', error.message);
    try {
      const errors = [{ type: error.constructor.name, message: error.message }];
      res.status(500).json({ error: errors[0], errors });
    } catch (newError) {
      const errorType = (typeof error === 'object' && error.constructor && error.constructor.name)
        || 'UNHANDLEABLE';
      const origError = {
        type: errorType,
        message: typeof error === 'object' && typeof error.message === 'string'
          ? error.message
          : 'Something went Wrong'
      };
      notify(
        'Could not handle error API', `[${origError.type}, ${origError.message}]`,
        typeof newError === 'object' && 'message' in newError && newError.message
      );
      const errors = [
        { type: newError.constructor.name, message: newError.message },
        origError
      ];
      res.status(500).json({ error: errors[0], errors });
    }
  },
  setupCookiesMiddleware: ({ app, cookieParser = expressCookieParser }) => {
    const cookieMiddleware = cookieParser();
    app.use(cookieMiddleware);
    return cookieMiddleware;
  },
  setupRequestParsers: ({ app, bodyParser = expressBodyParser }) => {
    const jsonParser = bodyParser.json();
    const postBodyParser = bodyParser.urlencoded({ extended: true });

    app.use(jsonParser);
    app.use(postBodyParser);

    return [jsonParser, postBodyParser];
  },
  corsAllHeaders: (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    if (req.method && req.method.toUpperCase() === 'OPTIONS') {
      res.sendStatus(200);
      return;
    }
    next();
  },
  setupCorsAllHeaders: ({ app }) => {
    app.use(appApi.corsAllHeaders);

    return [appApi.corsAllHeaders];
  },
  setupBaselineLocals: (req, res, next) => {
    // aliasing req.locals - avoid headaches when you confuse req/res
    res.locals = res.locals || {};
    req.locals = req.locals || res.locals;

    next();
  },
  setupLocals: ({ app }) => {
    app.use(appApi.setupBaselineLocals);
    return [appApi.setupBaselineLocals];
  },
  setupSessionMiddleware: (deps, opts = {}) => {
    const {
      app,
      session = expressSessionMiddleware
    } = deps;
    const sessionOpts = {
      ...(deps.name ? { name: deps.name } : {}),
      ...(deps.store ? { store: deps.store } : {}),
      secret: opts.secret || process.env.SESSION_SECRET,
      resave: 'resave' in opts ? opts.resave : true,
      saveUninitialized: 'saveUninitialized' in opts ? opts.saveUninitialized : true
    };

    if ('cookie' in opts) {
      sessionOpts.cookie = opts.cookie;
    } else {
      sessionOpts.cookie = {
        ...(process.env.NODE_ENV !== 'local' && typeof opts.cookieSecure === 'string'
          ? { secure: opts.cookieSecure }
          : {}
        ),
        httpOnly: opts.cookieHttpOnly || false
      };
    }
    const sessionMiddleware = session(sessionOpts);
    app.use(sessionMiddleware);

    return sessionMiddleware;
  },
  requestLogging: ({ notify }) => (req, res, next) => {
    notify('Request:',
      '\n - URL ', req.url,
      '\n - METHOD ', req.method,
      ...(typeof req.params === 'object' && Object.keys(req.params).length > 0
        ? ['\n - PARAMS ', jsUtils.objectKeyType(req.body)]
        : []
      ),
      ...(typeof req.body === 'object' && Object.keys(req.body).length > 0
        ? ['\n - BODY ', jsUtils.objectKeyType(req.body)]
        : []
      )
    );
    next();
  },
  localRequestLogging: ({ app }) => {
    const handler = appApi.requestLogging({ notify: debug });
    app.use(handler);
    return [handler];
  }
};

export default appApi;
