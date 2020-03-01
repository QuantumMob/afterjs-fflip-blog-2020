// LINT-OFF REASON: Webpack isn't babel-safe but we want some help with rules
/* eslint-disable import/no-commonjs, import/no-extraneous-dependencies */

const settingsConfig = require('./src/shared/staticData/settings.json');
module.exports = {
  plugins: ['scss'],
  modify: (config, opts, webpack) => { // config, opts, webpack
    const { target } = opts;

    config.plugins.push(new webpack.DefinePlugin({
      'process.isBrowser': target === 'web' ? "!!(typeof window !== 'undefined')" : JSON.stringify(false)
    }));
    config.plugins.push(new webpack.DefinePlugin({
      'process.APP_SETTINGS': JSON.stringify(settingsConfig)
    }));

    const buildEnvVars = {
      'process.env.SESSION_SECRET': JSON.stringify(process.env.SESSION_SECRET)
    };
    if (process.env.PRIVATE_API_URL) {
      buildEnvVars['process.env.PRIVATE_API_URL'] = JSON.stringify(process.env.PRIVATE_API_URL);
    }
    if (process.env.GA_UA_ID) {
      buildEnvVars['process.env.GA_UA_ID'] = JSON.stringify(process.env.GA_UA_ID);
    }
    if (process.env.GA_UA_DOMAIN) {
      buildEnvVars['process.env.GA_UA_DOMAIN'] = JSON.stringify(process.env.GA_UA_DOMAIN);
    }
    config.plugins.push(new webpack.DefinePlugin(buildEnvVars));

    return config;
  }
};
