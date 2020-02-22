import fflip from 'fflip';
import featureFlagsCriteria from '../staticData/featureFlags/criteria';
import featureFlagsFeatures from '../staticData/featureFlags/features';

const fflipUtils = {
  initConfig: () => fflip.config({
    criteria: featureFlagsCriteria,
    features: featureFlagsFeatures
  }),
  isNewsletterPromoActiveForUser: user => fflip.isFeatureEnabledForUser('newsletterReferral', user || {}),
  isPromoVisibleForUser: ({ record, user }) => {
    if (record.isSpecialPromo() && !fflip.isFeatureEnabledForUser('promoInventoryVisible', user || {})) {
      return false;
    }
    return true;
  },
  isPromoRibbonSplitA: user => fflip.isFeatureEnabledForUser('promoRibbonSplitA', user || {}),
  isPromoRibbonSplitB: user => fflip.isFeatureEnabledForUser('promoRibbonSplitB', user || {})
};

export default fflipUtils;
