const jsUtils = {
  getRandomNumber: (min, max) => Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min) + 1)
  ) + Math.ceil(min),
  checkLTrim: (stringIn, checkFor) => {
    let output = '';

    if (typeof stringIn === 'string' && (stringIn.indexOf(checkFor) !== -1)) { // found
      const tmp = stringIn.substr(0, checkFor.length);

      // eslint-disable-next-line eqeqeq
      if (tmp == checkFor) {
        output = stringIn.substr(checkFor.length, stringIn.length);
      } else {
        output = stringIn;
      }

      return output;
    }

    return stringIn;
  },
  checkRTrim: (stringIn, checkFor) => {
    let output = '';

    if (typeof stringIn === 'string' && (stringIn.indexOf(checkFor) !== -1)) { // found
      const startPoint = stringIn.length - checkFor.length;
      const tmp = stringIn.substr(startPoint, checkFor.length);

      // eslint-disable-next-line eqeqeq
      if (tmp == checkFor) {
        output = stringIn.substr(0, (stringIn.length - checkFor.length));
      } else {
        output = stringIn;
      }

      return output;
    }

    return stringIn;
  },
  parseSubtext: (str, objs, nullRep) => str.replace(/%\{([^"'].+?)\}/g, (m, key) => {
    let repFail = typeof nullRep === 'undefined' ? objs[key] : nullRep;

    if (typeof repFail === 'undefined') {
      repFail = `%{${key}}`;
    }

    return typeof objs[key] === 'undefined' ? repFail : objs[key];
  }),
  objectKeyType: (obj) => {
    if (typeof obj === 'boolean') {
      return '<Bool>';
    }
    if (typeof obj === 'string') {
      return `<String:${obj.length}>`;
    }
    if (!obj) {
      return `<${obj}>`;
    }
    if (obj instanceof Array) {
      return `<Array:${obj.length}>`;
    }
    if (!(obj instanceof Object)) {
      return `<${obj.constructor.name}>`;
    }

    return Object.keys(obj)
      .reduce((acc, key) => {
        acc[key] = jsUtils.objectKeyType(obj[key]);

        return acc;
      }, {});
  }
};

export default jsUtils;
