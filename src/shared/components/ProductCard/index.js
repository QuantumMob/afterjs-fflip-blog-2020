import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = (props) => {
  const { product: { title, description } } = props;
  return <article className="product-card">
    <div className="product-card--container">
      <h5 className="heading heading--sub-content product-card--title-text">{ title }</h5>
      { props.children || null }
      <p className="body-text product-card--description-text">{ description }</p>
      <button className="body-text form--button form--button-alt product-card--buy-button">Buy</button>
    </div>
  </article>;
};

ProductCard.propTypes = {
  product: PropTypes.shape().isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
ProductCard.defaultProps = {
  children: null
};
export default ProductCard;
