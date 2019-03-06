import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Headroom from 'react-headroom';
import { NavMenu } from 'components';
import logo from '../../static/logo/jijian.png';

const StyledLink = styled(Link)`
  display: flex;
  font-weight: 500;
  align-items: center;
  color: ${props => props.theme.colors.white.light};
  img{
    max-width: 100%;
    margin: 0;
    padding: 0;
  }
`;


const NavBar = () => (
    <Headroom calcHeightOnResize disableInlineStyles>
      <StyledLink to="/">
        <img src={logo} alt="Logo" />
      </StyledLink>
      <NavMenu />
    </Headroom>
  );

export default NavBar;
