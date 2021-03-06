import React from 'react';
import { jsUtils } from '../../shared/utils';
import serialize from 'serialize-javascript';

const GoogleAnalyticsEmbed = () => {
  const GA_UA_ID = process.env.GA_UA_ID ? `UA-${jsUtils.checkLTrim(process.env.GA_UA_ID, 'UA-')}` : null;

  if (!GA_UA_ID) {
    return null;
  }
  const customGaMap = {
    dimension3: 'promoA',
    dimension4: 'promoB'
  };
  const dangerousHtml = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){
    window.dataLayer.push(arguments);
  };
  gtag('js', new Date(window.env.NOW_STAMP));

  gtag('config', '${GA_UA_ID}', {
    'custom_map': ${serialize(customGaMap)}
  });
  ${process.env.GA_UA_DOMAIN
    && `gtag('_setDomainName', '${process.env.GA_UA_DOMAIN}');`
  }`;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_UA_ID}`}></script>
      <script dangerouslySetInnerHTML={{ __html: dangerousHtml }}>
      </script>
    </>
  );
};

export default GoogleAnalyticsEmbed;
