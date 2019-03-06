import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 16px;
  margin: 1rem 0 0.5rem 0;
  a {
    margin: 0 0.5rem 0.5rem 0;
    color: ${props => props.theme.colors.white.grey};
    padding: 0.15rem 0.5rem;
    background: ${props => props.theme.colors.card.light};
    border-radius: 10px;
  }
  a:hover {
    color: ${props => props.theme.colors.white.light};
    background:  ${props => props.theme.colors.card.base};
    border: ${props => props.theme.colors.card.base};
  }
`;

const SpecialsList = ({ list }) => {
  return(
  <TagsContainer>
    {list &&
      list.map(special => {
        const upperTag = special.charAt(0).toUpperCase() + special.slice(1);
        return (
          <Link key={upperTag} to={`/specials/${special}`}>
            <span>{upperTag}</span>
          </Link>
        )}
      )}
  </TagsContainer>
)};

export default SpecialsList;

SpecialsList.propTypes = {
  list: PropTypes.array,
};
