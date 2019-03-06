import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';


const Wrapper = styled.searchBar`
    color: ${props => props.theme.colors.white.light};
    margin: 0 1rem 1.25rem 1.25rem;
    position: absolute;
    bottom: 0;
    left: 0;
`;

const SearchBar = ({path, title})=>{
    <Wrapper>
        <h2>{title}Search</h2>
    </Wrapper>
}

export default SearchBar;

SearchBar.PropTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};