import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Topic = styled.div`
  padding: 1rem;
  font-size: 14px;
  background: ${props => props.theme.colors.white.light};
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1,h2,h3,h4,h5{
    margin: 0;
    padding: 0 0 0 7px;
    font-weight: 500;
    border-left: 5px solid #3ca5f6;
  }
`;

const CardHeader = ( {title, other, path} ) => (
  <Topic>
    <Wrapper>
        <h5>{title}</h5>
        <Link className="nav-ul-li-a" to={path}>{other}&nbsp;</Link>
    </Wrapper>
  </Topic>
);

export default CardHeader;

CardHeader.propTypes = {
    title: PropTypes.string.isRequired,
    other: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  };