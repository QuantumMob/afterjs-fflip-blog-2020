import React from 'react';
import { Link } from 'react-router-dom';
import Ribbon from '../Ribbon';
import { fflipUtils } from '../../utils';

const onClickHandler = () => {
  if (process.isBrowser && typeof gtag === 'function') {
    const { userFlags } = window.env;
    if (fflipUtils.isPromoRibbonSplitA(userFlags)) {
      gtag('event', 'page_view', { promoA: 'CLICKED' });
      return;
    }
    gtag('event', 'page_view', { promoB: 'CLICKED' });
  }
};
const RibbonSplitTest = () => {
  if (!process.isBrowser || !process.env.GA_UA_ID) {
    return null;
  }
  const { userFlags = {} } = window.env;
  const isRibbonA = fflipUtils.isPromoRibbonSplitA(userFlags);
  const isRibbonB = fflipUtils.isPromoRibbonSplitB(userFlags);

  // safely handle an unexpected event
  if (!isRibbonA && !isRibbonB) {
    return null;
  } else if (isRibbonA) {
    gtag('event', 'page_view', { promoA: 'VIEWED' });
  } else if (isRibbonB) {
    gtag('event', 'page_view', { promoB: 'VIEWED' });
  }
  const ribbonClassName = fflipUtils.isPromoRibbonSplitA(userFlags) ? 'corner-ribbon--bright-highlight' : 'corner-ribbon--muted';
  const ribbonText = fflipUtils.isPromoRibbonSplitA(userFlags) ? 'New Inventory' : 'Limited Time Offer';

  return (<Ribbon className={ribbonClassName}>
    <Link to="/store" onClick={onClickHandler}>
      <h2>{ribbonText}</h2>
    </Link>
  </Ribbon>);
};

export default RibbonSplitTest;
