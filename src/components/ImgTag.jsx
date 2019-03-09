import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const ViewTag =  styled.div`
  -webkit-clip-path: polygon(100% 100%, 85% 50%, 100% 0, 0 0, 0 200%);
  clip-path: polygon(100% 100%, 85% 50%, 100% 0, 0 0, 0 200%);
  min-width: 6.5rem;
  width: auto;
  height: 35px;
  font-family: ${props => props.theme.fontFamily.body};
  font-weight: 600;
  font-size: 14px;
  color: ${props => props.theme.colors.white.grey};
  background: ${props => props.theme.colors.opcity.navbarbg};
  line-height: 35px;
  text-align: center;
  position: absolute;
  top: 1.5rem;
  left: -10px;
  cursor: pointer;
  &:before{
    content:'';
    width: 5px;
    border: 11px solid;
    border-color: transparent ${props => props.theme.colors.opcity.navbarbg}; transparent transparent;
    border-top: 25px;
    left: -11px;
    position: absolute;
    top: 35px;
  }
  &:hover{
    box-shadow: ${props => props.theme.shadow.feature.small.hover};
    transform: scale(1.03);
  }
`;

const ImgTag = ({category}) => (
    
    <ViewTag>{category}</ViewTag>
);

export default ImgTag;

ImgTag.propTypes = {
  category: PropTypes.string.isRequired,
};
