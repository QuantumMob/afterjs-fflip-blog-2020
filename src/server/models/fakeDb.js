import { loremIpsum } from 'lorem-ipsum';
import uuidv1 from 'uuid/v1';
import { jsUtils } from '../../shared/utils';
const util = require('util');

class FakeProductModel {
  #data = {};
  constructor(initData = {}) {
    const {
      uuid = uuidv1(),
      palette = null,
      title = null,
      shortDescription: description = null,
      longDescription = null,
      keywords = null,
      productId = null,
      basePrice = Number.MAX_SAFE_INTEGER,
      isElectronOrbited = false,
      isPublic = false,
      isSpecialPromo = false
    } = initData;
    this.#data = {
      uuid,
      palette,
      title,
      description,
      longDescription,
      keywords,
      productId,
      basePrice,
      isElectronOrbited,
      isPublic,
      isSpecialPromo
    };
  }

  get title() {
    return this.#data.title;
  }

  fullSerializer() {
    const excludeKeys = ['isPublic', 'isSpecialPromo', 'basePrice'];
    return {
      ...(Object.keys(this.#data)).reduce((acc, key) => {
        if (excludeKeys.includes(key)) {
          return acc;
        }
        if (this.#data instanceof Array) {
          acc[key] = this.#data[key].join(', ');
        } else {
          acc[key] = this.#data[key];
        }

        return acc;
      }, {})
    };
  }

  publicSerializer() {
    const { palette, keywords, title, description, isElectronOrbited, productId, uuid } = this.#data;

    return { palette, keywords, title, description, isElectronOrbited, productId, uuid };
  }

  // console log 'looks nice'
  [util.inspect.custom]() {
    const publicObj = this.publicSerializer();

    return Object.keys(publicObj)
      .reduce((acc, key, index, arr) => `${
        index === 0 ? `<${this.constructor.name}> {\n` : ''
      }${
        acc
      }${
        index > 0 ? ',\n' : ''
      }${'\t'}${key}: ${publicObj[key]}${
        index === arr.length - 1 ? '\n}' : ''
      }`, '');
  }

  toJSON() {
    return this.publicSerializer();
  }

  isPublic() {
    return this.#data.isPublic;
  }

  isSpecialPromo() {
    return this.#data.isSpecialPromo;
  }
}

const basePrice = Number.parseFloat(Number.parseFloat(Number.MAX_SAFE_INTEGER / 1000000000).toFixed(2));
const specialOfferPrice = Number.parseFloat(Number.parseFloat(basePrice * 6).toFixed(2));

const list = [
  {
    productId: 1,
    title: 'Carbon Neutron',
    isSpecialPromo: false,
    isPublic: true,
    basePrice
  },
  {
    productId: 2,
    title: 'Carbon Neutron - Electron +',
    isSpecialPromo: false,
    isPublic: true,
    isElectronOrbited: true,
    basePrice: basePrice / 2
  },
  {
    productId: 3,
    title: 'Camo Neutron',
    palette: ['#909C90', '#79F17F', '#AB9A76'],
    isSpecialPromo: false,
    isPublic: true,
    basePrice: basePrice * 1.1
  },
  {
    productId: 4,
    title: 'Camo Neutron - Electron +',
    palette: ['#909C90', '#79F17F', '#AB9A76'],
    isSpecialPromo: false,
    isPublic: true,
    isElectronOrbited: true,
    basePrice: basePrice * 1.1 / 2
  },
  {
    productId: 5,
    title: 'One of the Original 6',
    palette: ['#A6192E', '#001E62', '#FFFFFF'],
    isSpecialPromo: true,
    isPublic: true,
    basePrice: specialOfferPrice * 0.9
  },
  {
    productId: 6,
    title: 'One of the Original 6 - Electron +',
    palette: ['#A6192E', '#001E62', '#FFFFFF'],
    isSpecialPromo: true,
    isPublic: true,
    isElectronOrbited: true,
    basePrice: specialOfferPrice * 0.9 / 2
  },
  {
    productId: 7,
    title: 'O\'Brien\'19 Neutron',
    palette: ['#CE1141', '#000000', '#A1A1A4'],
    isSpecialPromo: true,
    isPublic: true,
    basePrice: specialOfferPrice * 1.9
  },
  {
    productId: 8,
    title: 'O\'Brien\'19 Neutron - Electron +',
    palette: ['#CE1141', '#000000', '#A1A1A4'],
    isSpecialPromo: true,
    isPublic: true,
    isElectronOrbited: true,
    basePrice: specialOfferPrice * 1.9 / 2
  }
];
const fakeProductList = new Map(list.map(rec => {
  const basePrice = Number.parseFloat(Number.parseFloat(rec.basePrice).toFixed(2));
  const shortDescription = loremIpsum({
    count: 1,
    paragraphLowerBound: 1,
    paragraphUpperBound: 1,
    sentenceLowerBound: 5,
    sentenceUpperBound: 25,
    format: 'plain', // "plain" or "html"
    units: 'sentences'
  });
  const longDescription = loremIpsum({
    count: jsUtils.getRandomNumber(4, 14),
    format: 'plain',
    paragraphLowerBound: 3,
    paragraphUpperBound: 7,
    sentenceLowerBound: 5,
    sentenceUpperBound: 15
  });

  return [rec.productId, new FakeProductModel({ shortDescription, longDescription, ...rec, basePrice })];
}));

export default fakeProductList;
export { FakeProductModel };
