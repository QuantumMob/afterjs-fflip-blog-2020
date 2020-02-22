import React from 'react';
import Helmet from 'react-helmet';
import { ConnectedComponent as SiteMain } from '../../components/SiteMain';
import { reactUtils } from '../../utils';
import './css.scss';

const { useBodyClass } = reactUtils;

const About = (props) => {
  useBodyClass('page--about');

  return <>
    <Helmet>
      <title>About Us &amp; Our History</title>
    </Helmet>
    <SiteMain className="main--about">
      <h1 className="heading heading--content">About</h1>
      <p className="body-text">Norman's Neutrons have been generating entangled pairs
        for over 25 years. Started in my early years at Harv-Tech generating nothing
        but purely electrified and not electrified particles; we're able to corner
        the market with our patented electro-chemical quantum entangled field waves
        [Brown, Lowell S. (1994). Quantum Field Theory. Cambridge University Press.]
        with no verified inverse validity [Greiner, W.; Reinhardt, J. (1996). Field Quantization.]
        no warranties or guarantees provided under the terms of service.
      </p>

      <h4 className="heading heading--sub-content">Public Supply</h4>
      <p className="body-text">In recent years we've expanded from education to
        industrial and now public sphere of neutrons logistics &amp; supply.
        Memorandum on generating entangled pairs being allowed to be supplied into
        the public supply is now lifted our operation has been expanded to reach
        global markets.
      </p>

      <h4 className="heading heading--sub-content">Innovations</h4>
      <p className="body-text">Recent innovations have gone viral on ebay allowing
        for new electron free versions to supply the independent consumer demand.
        Makers everywhere love our flexibility in carbon-stable Neutrons.
      </p>

      <h4 className="heading heading--sub-content">Guarantee</h4>
      <p className="body-text">Neutron customization can be guaranteed within limited
        ranges which excludes radioactive elements. All samples are provided in
        arbon but can be arranged in my atomic numbers but only within the metallic
        range [ref. Patent #5971829].</p>
    </SiteMain>
  </>;
};

export default About;
