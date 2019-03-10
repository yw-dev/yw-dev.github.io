import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import config from '../../config/site';

const Wrapper = styled.footer`
  margin:0;
  padding:0;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  font-family: ${props => props.theme.fontFamily.body};
  font-weight: 500;
  font-size: 14px;
  box-shadow: ${props => props.theme.shadow.footer};
  background: ${props => props.theme.colors.linearColor.navbarbg};

`;

const Copyright = styled.div`
  margin: 0;
  display: flex;
  flex-direction: row;
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
  }
  justify-content: center;
  color: ${props => props.theme.colors.white.blackgrey};
  a {
    cursor: pointer;
    color: ${props => props.theme.colors.white.blackgrey};
    &:hover{
      color: ${props => props.theme.colors.white.grey};
    }
  }  
  .line:after{
    content:"";
    display:block;
    clear: both;
    width: 1px;
    height: 14px;
    margin: 0 8px;
    border-left:1px solid #575f6a;
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 4px;

`;

const Footer = () => (
  <Wrapper>
    <Copyright>
      <Item>
        <span><a href={`${config.siteUrl}`} >{`${config.siteTitle}`}&nbsp;&nbsp;</a>版权所有</span>
        <div className="line"></div>
        <span>基于<a href="https://www.gatsbyjs.org/">&nbsp;&nbsp;Gatsby&nbsp;&nbsp;</a>构建&nbsp;&nbsp;©&nbsp;2019</span>
      </Item>      
      <Item>
        <span>托管于<a href="https://www.netlify.com/">&nbsp;&nbsp;Netlify&nbsp;</a></span>      
        <div className="line"></div>
        <span>&nbsp;备案[待定] &nbsp;&nbsp;</span>
      </Item>
    </Copyright>
    <Copyright>
      <Item>
        <span>站长统计</span>
        <div className="line"></div>
        <span>今日IP[{`123 `}]</span>
        <div className="line"></div>
        <span>今日PV[{` 123`}]</span>
        <div className="line"></div>
        <span>今日UV[{` 222`}]</span>
      </Item>
      <Item>
        <span>昨日IP[{`232 `}]</span>
        <div className="line"></div>
        <span>昨日PV[{`456 `}]</span>
        <div className="line"></div>
        <span>昨日UV[{` 233`}]</span>
      </Item>
    </Copyright>
  </Wrapper>
);
export default Footer;
