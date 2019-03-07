import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import config from '../../config/site';

const Wrapper = styled.footer`
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
  padding: 3px;
  display: flex;
  flex-direction: row;
  line-height:14px;
  justify-content: center;
  text-align: center;
  color: ${props => props.theme.colors.white.blackgrey};
  a {
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

const Footer = () => (
  <Wrapper>
    <Copyright>
      <span><Link to="/">{`${config.siteTitle}`}&nbsp;&nbsp;</Link>版权所有</span>
      <div className="line"></div>
      <span>基于<a href="https://www.gatsbyjs.org/">&nbsp;&nbsp;Gatsby&nbsp;&nbsp;</a>构建&nbsp;&nbsp;©&nbsp;2019</span>
      <div className="line"></div>
      <span>托管于<a href="https://www.netlify.com/">&nbsp;&nbsp;Netlify&nbsp;</a></span>
      <div className="line"></div>
      <span>&nbsp;备案[待定] &nbsp;&nbsp;</span>
    </Copyright>
    <Copyright>
      <span>站长统计</span>
      <div className="line"></div>
      <span>今日IP[{`123 `}]</span>
      <div className="line"></div>
      <span>今日PV[{` 123`}]</span>
      <div className="line"></div>
      <span>今日UV[{` 222`}]</span>
      <div className="line"></div>
      <span>昨日IP[{`232 `}]</span>
      <div className="line"></div>
      <span>昨日PV[{`456 `}]</span>
      <div className="line"></div>
      <span>昨日UV[{` 233`}]</span>
    </Copyright>
  </Wrapper>
);
export default Footer;
