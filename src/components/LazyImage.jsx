import React from "react";
import PropTypes from 'prop-types';
import logo from '../../static/logo/jijian.webp';

const LazyImage = ({ placeholder, imgs }) => {
    const src = placeholder?placeholder:logo;
    
  return (
      <img
        className="lazy"
        src={src}
        data-src={imgs[0]}
        data-srcset={imgs[0]}
        onError={(e)=>{e.target.onerror = null; e.target.src=logo}}
      />
  );
};
 
export default LazyImage;

LazyImage.propTypes = {
    placeholder: PropTypes.string,
    imgs: PropTypes.array.isRequired,
};
 