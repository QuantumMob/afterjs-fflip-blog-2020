# After.Js + fflip

An example repo for feature flags (fflip) & React-SSR Razzle.Js (After.Js).

[Setup the Repo](#Setup) and view the URL [localhost:3000/store](http://localhost:3000/store).  Then visit [localhost:3000/referral/offer/9f427...e74359](http://localhost:3000/referral/offer/9f427f50-45f9-11ea-a85e-a34337e74359) to activate the feature flag.

# Setup

Run `npm install`.  Copy `.env.sample` and follow [Razzle environment variable file setup](https://github.com/jaredpalmer/razzle#what-other-env-files-are-can-be-used).  Locally you can use the following as a `.env` file

```
SESSION_SECRET=k]eyBoardkat123*
RAZZLE_PUBLIC_URL=http://localhost:3000
RAZZLE_PUBLIC_API_URL=http://localhost:3000/api
PRIVATE_API_URL=http://localhost:3000/api
```

# Contributing

After cloning use

```bash
git config core.hooksPath .githooks
```

## Environment Variables

Using `dotenv` as setup [within Razzle/After.js](https://github.com/jaredpalmer/razzle)

* `NODE_ENV`: Node Standard. *Options:* `development`, `production` or the custom `local`
* `PORT`: Which port the Razzle App will be accessible. Defaults to `3000`
* `DEBUG`: Targetted debugging using the [npm library](https://www.npmjs.com/package/debug) `debug`.  Use `DEBUG=MYAPP:* npm run start` to get debugging messages specific to this repo
* `RAZZLE_PUBLIC_URL`: Public URL for website
* `RAZZLE_PUBLIC_API_URL`: Public API URL
* `PRIVATE_API_URL`: Private API URL (for server-side api requests)
* `GA_UA_ID`: Google Analytics ID
* `GA_UA_DOMAIN`: Google Analytics Domain (needed for localhost)
