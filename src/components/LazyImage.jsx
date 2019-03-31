import React from "react";
import PropTypes from 'prop-types';
import logo from '../../static/logo/jijian.png';

const LazyImage = ({ placeholder, imgs }) => {
    const src = placeholder?placeholder:'https://res.cloudinary.com/drp9iwjqz/image/upload/e_blur:2000,f_auto,q_auto:eco/v1508291830/jeremywagner.me/using-webp-images/tacos-1x.jpg';
    
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
 