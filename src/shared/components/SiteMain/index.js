import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import Footer from '../Footer';
import Header from '../Header';
import RibbonSplitTest from '../RibbonSplitTest';

const SiteMain = ({ className, sectionClassName, children, headerVersion, location }) => {
  const headerProps = {
    ...(headerVersion ? { version: headerVersion } : {})
  };

  return (<>
    <Helmet
      defaultTitle={`Welcome to ${process.APP_SETTINGS.titleSuffix}`}
      titleTemplate={`%s ${process.APP_SETTINGS.titleSuffixSep} ${process.APP_SETTINGS.titleSuffix}`}
    />
    { !(['/store'].find(item => location.pathname.toLowerCase().startsWith(item.toLowerCase())))
      ? <RibbonSplitTest />
      : null }
    <Header { ...headerProps } />
    <main className={`main--content ${className || ''}`}>
      <section className={`main--content-wrap ${sectionClassName || ''}`}>
        { children }
      </section>
    </main>
    <Footer />
  </>);
};

SiteMain.propTypes = {
  location: PropTypes.shape(),
  headerVersion: PropTypes.string,
  className: PropTypes.string,
  sectionClassName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
SiteMain.defaultTypes = {
  location: {},
  headerVersion: '',
  className: '',
  sectionClassName: '',
  children: null
};
const ConnectedComponent = withRouter(SiteMain);

export default SiteMain;
export { ConnectedComponent };
