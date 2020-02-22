import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AfterRoot, AfterData } from '@jaredpalmer/after';
import GoogleAnalyticsEmbed from './components/GoogleAnalyticsEmbed';
import ScriptStaticData from './components/ScriptStaticData';

class Document extends Component {
  static async getInitialProps(ctx) {
    const { assets, preJS, data, renderPage } = ctx;
    const { html, helmet } = await renderPage();

    return {
      assets,
      preJS,
      data,
      // these props must be present
      helmet,
      html
    };
  }

  render() {
    const { helmet, preJS, assets, data } = this.props;
    // get attributes from React Helmet
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
      <html lang="en-us" { ...htmlAttrs }>
        <head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          { helmet.meta.toComponent() }
          { helmet.title.toComponent() }
          <ScriptStaticData data={preJS} />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&display=swap" rel="stylesheet" />
          { assets.client.css && <link rel="stylesheet" href={assets.client.css} /> }
          { helmet.link.toComponent() }
        </head>
        <body {...bodyAttrs}>
          <AfterRoot />
          <AfterData data={data}/>
          <script type="text/javascript" src={assets.client.js} defer crossOrigin="anonymous" />
          <GoogleAnalyticsEmbed />
        </body>
      </html>
    );
  }
}

Document.propTypes = {
  preJS: PropTypes.shape().isRequired,
  helmet: PropTypes.shape(),
  assets: PropTypes.shape(),
  data: PropTypes.shape()
};
Document.defaultProps = {
  helmet: null,
  assets: null,
  data: null
};

export default Document;
