import React from 'react';
import AtomCanvas from '../../components/AtomCanvas';
import { ConnectedComponent as SiteMain } from '../../components/SiteMain';

import './css.scss';

const Home = () => (
  <SiteMain className="main--home" headerVersion="hero">
    <AtomCanvas resize={true} dragRotate={true} pauseOnDrag={true} zoom={0.25} doDrawElectrons={true} className="home--canvas" />
  </SiteMain>
);

export default Home;
