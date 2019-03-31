import React from 'react';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Headroom from 'react-headroom';
import { AppNav, NavMenu } from 'components';
import logo from '../../static/logo/jijian.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, fab, far)


const Desktop = styled.div`
  width: 100%;
  padding:0 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
  a{
    color: ${props => props.theme.colors.white.grey};
    &:hover{
      color: ${props => props.theme.colors.white.light};
    }
  }
`;

const AppMenu = styled.div`
  width: 100%;
  margin:0;
  padding:0;
  display: none;
  justify-content: space-between;
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
  }
  a{
    color: ${props => props.theme.colors.white.grey};
    &:hover{
      color: ${props => props.theme.colors.white.light};
    }
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  font-weight: 500;
  align-items: center;
  img{
    max-width: 100%;
    margin: 0;
    padding: 0;
  }
`;

const Nav = styled.div`
  padding: 1rem;
  text-align: center;
  text-decoration: none;

`;
const Login = styled.div`
  padding: 1rem;
  text-align: center;
`;


const NavBar = () => (
    <Headroom calcHeightOnResize disableInlineStyles>
      <Desktop>
        <StyledLink to="/">
          <img src={logo} alt="Logo" />
        </StyledLink>
        <NavMenu />
      </Desktop>
      <AppMenu>
        <AppNav></AppNav>
        <StyledLink to="/">
          <img src={logo} alt="Logo" />
        </StyledLink>
        <Login><Link to="/"><FontAwesomeIcon icon={['fas', 'user']} size="2x" /></Link></Login>
      </AppMenu>
    </Headroom>
  );

export default NavBar;
