import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Topic = styled.div`
  width: 100%;
  font-size: 14px;
  background: ${props => props.theme.colors.background.light};
  box-shadow: ${props => props.theme.shadow.feature.small.little};
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  align-items: center;
  text-align: center;
  h1,h2,h3,h4,h5{
    margin: 1rem;
    padding: 0 0 0 10px;
    font-weight: 500;
    border-left: 5px solid #3ca5f6;
  }
  div{
    
  padding: 1rem;
  }
`;

const CardHeader = ( {title, icons, other, path} ) => (
  <Topic>
    <Wrapper>
        <h5>{title}</h5>
        {(other||icons)?(<Link className="nav-ul-li-a" to={path}>{other===""?(<div><FontAwesomeIcon icon={icons} size="2x" /></div>):other}</Link>):""}        
    </Wrapper>
  </Topic>
);

export default CardHeader;

CardHeader.propTypes = {
    title: PropTypes.string.isRequired,
    icons: PropTypes.string.isRequired,
    other: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  };