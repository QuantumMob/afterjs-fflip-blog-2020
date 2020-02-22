const fflipCriteria = [{
  id: 'isSpecialProductPromo',
  check: ({ isOfferCookie }, isSpecialProductPromo) => isOfferCookie && isSpecialProductPromo
},
{
  id: 'ribbonVersion',
  check: ({ ribbonVersion: userRibbonVersion }, ribbonVersion) => userRibbonVersion === ribbonVersion
}];

export default fflipCriteria;
