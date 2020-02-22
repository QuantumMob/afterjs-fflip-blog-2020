import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import AtomCanvas from '../../components/AtomCanvas';
import { ConnectedComponent as SiteMain } from '../../components/SiteMain';
import ProductCard from '../../components/ProductCard';
import { reactUtils, axiosUtils } from '../../utils';
import './css.scss';

const { useBodyClass } = reactUtils;

const Store = (props) => {
  const { productList } = props;
  useBodyClass('page--store');

  return <>
    <Helmet>
      <title>Products, Store &amp; Shop</title>
    </Helmet>
    <SiteMain className="main--store" sectionClassName="store">
      <h1 className="heading heading--content">Shop</h1>
      <div className="store--listing">
        {
          productList.map((product) => {
            const { productId, uuid, palette, isElectronOrbited } = product;
            const canvasProps = {
              className: 'store--item-canvas',
              nucleiPalette: palette && palette.length === 3 ? palette : null,
              width: 250,
              height: 250,
              doAnimate: false,
              dragRotate: true
            };

            return (<ProductCard product={product} key={`product-listing--item-${productId}-${uuid}`}>
              { isElectronOrbited
                ? <AtomCanvas { ...canvasProps } zoom={0.75} />
                : <AtomCanvas { ...canvasProps } dimScale={0.5} scale={0.35} zoom={0.5} doDrawElectrons={true} />
              }
            </ProductCard>);
          })
        }
      </div>
    </SiteMain>
  </>;
};

Store.getInitialProps = async ({ req, res, match, history, location, ...ctx }) => {
  const productList = await axiosUtils.productListing(
    process.isBrowser ? {} : { headers: { cookie: req.headers.cookie } }
  );

  return { productList, ...ctx };
};

Store.propTypes = {
  productList: PropTypes.array
};

Store.defaultProps = {
  productList: []
};

export default Store;
