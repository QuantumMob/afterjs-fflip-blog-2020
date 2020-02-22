
const fflipUtils = {
  publicizeUserData: (userFlags, customExcludeList = []) => {
    const excludeList = [];
    const keysList = Array.from(
      new Set([...excludeList, ...customExcludeList, ...Object.keys(userFlags)])
    );

    return keysList.reduce((acc, key) => {
      if (key in userFlags && !excludeList.includes(key)) {
        acc[key] = userFlags[key];
      }
      return acc;
    }, {});
  }
};

export default fflipUtils;
