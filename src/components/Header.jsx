import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import logo from '../../static/logo/header.png';

const Wrapper = styled.header`
  -webkit-clip-path: polygon(100% 0, 0 0, 0 70%, 50% 100%, 100% 70%);
  clip-path: polygon(100% 0, 0 0, 0 95%, 50% 100%, 100% 95%);
  @media (max-width: ${props => props.theme.breakpoints.s}) {
    -webkit-clip-path: polygon(100% 0, 0 0, 0 95%, 50% 100%, 100% 95%);
    clip-path: polygon(100% 0, 0 0, 0 95%, 50% 100%, 100% 95%);
  }
  background-image: url(${logo});
  background-size: cover;
  background-position: center;
  height: 33rem;
  @media (max-width: ${props => props.theme.breakpoints.l}) {
    height: 28rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    height: 24rem;
  }
  position: relative;
  overflow: hidden;
`;

const Carousel = styled.div`
  width:100%;
  *{
    margin:0;
    padding:0;
  }
  .csslider {
    width:100%;
    display: inline-block;
    text-align: left;
    position: relative;
    margin-bottom: 22px;
  }
  .csslider > input {
    display: none;
  }
  .csslider > input:nth-of-type(10):checked ~ ul li:first-of-type {
    margin-left: -900%;
  }
  .csslider > input:nth-of-type(9):checked ~ ul li:first-of-type {
    margin-left: -800%;
  }
  .csslider > input:nth-of-type(8):checked ~ ul li:first-of-type {
    margin-left: -700%;
  }
  .csslider > input:nth-of-type(7):checked ~ ul li:first-of-type {
    margin-left: -600%;
  }
  .csslider > input:nth-of-type(6):checked ~ ul li:first-of-type {
    margin-left: -500%;
  }
  .csslider > input:nth-of-type(5):checked ~ ul li:first-of-type {
    margin-left: -400%;
  }
  .csslider > input:nth-of-type(4):checked ~ ul li:first-of-type {
    margin-left: -300%;
  }
  .csslider > input:nth-of-type(3):checked ~ ul li:first-of-type {
    margin-left: -200%;
  }
  .csslider > input:nth-of-type(2):checked ~ ul li:first-of-type {
    margin-left: -100%;
  }
  .csslider > input:nth-of-type(1):checked ~ ul li:first-of-type {
    margin-left: 0%;
  }
  .csslider > ul {
    position: relative;
    width: 100%;
    height: 33rem;
    @media (max-width: ${props => props.theme.breakpoints.l}) {
      height: 28rem;
    }
    @media (max-width: ${props => props.theme.breakpoints.m}) {
      height: 24rem;
    }
    z-index: 1;
    margin:0;
    padding:0;
    background-color: #3a3a3a;
    border-bottom: 1px solid #3a3a3a;
    overflow: hidden;
    white-space: nowrap;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .csslider > ul > li {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    overflow: hidden;
    -moz-transition: all 0.5s cubic-bezier(0.4, 1.3, 0.65, 1);
    -o-transition: all 0.5s ease-out;
    -webkit-transition: all 0.5s cubic-bezier(0.4, 1.3, 0.65, 1);
    transition: all 0.5s cubic-bezier(0.4, 1.3, 0.65, 1);
    -moz-background-size: cover;
    -o-background-size: cover;
    -webkit-background-size: cover;
    background-size: cover;
    vertical-align: top;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: normal;
  }
  
  .csslider > ul .gatsby-image-wrapper {
    height: 100%;
  }

  .csslider > ul > li.scrollable {
    overflow-y: scroll;
  }

  .csslider > .navigation {
    position: absolute;
    left: 50%;
    z-index: 10;
    font-size: 0;
    line-height: 0;
    text-align: center;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .csslider > .navigation > div {
    margin-left: -100%;
  }

  .csslider > .navigation label {
    position: relative;
    display: inline-block;
    cursor: pointer;
    border-radius: 50%;
    margin: 0 4px;
    padding: 4px;
    background: #3a3a3a;
  }

  .csslider > .navigation label:hover:after {
    opacity: 1;
  }

  .csslider > .navigation label:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -6px;
    margin-top: -6px;
    background: ${props => props.theme.colors.white.base};
    border-radius: 50%;
    padding: 6px;
    opacity: 0;
  }

  .csslider > .arrows {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .csslider.inside .navigation {
    bottom: 10px;
    margin-bottom: 10px;
  }

  .csslider > input:nth-of-type(1):checked ~ .navigation label:nth-of-type(1):after,
  .csslider > input:nth-of-type(2):checked ~ .navigation label:nth-of-type(2):after,
  .csslider > input:nth-of-type(3):checked ~ .navigation label:nth-of-type(3):after,
  .csslider > input:nth-of-type(4):checked ~ .navigation label:nth-of-type(4):after,
  .csslider > input:nth-of-type(5):checked ~ .navigation label:nth-of-type(5):after,
  .csslider > input:nth-of-type(6):checked ~ .navigation label:nth-of-type(6):after,
  .csslider > input:nth-of-type(7):checked ~ .navigation label:nth-of-type(7):after,
  .csslider > input:nth-of-type(8):checked ~ .navigation label:nth-of-type(8):after,
  .csslider > input:nth-of-type(9):checked ~ .navigation label:nth-of-type(9):after,
  .csslider > input:nth-of-type(10):checked ~ .navigation label:nth-of-type(10):after,
  .csslider > input:nth-of-type(11):checked ~ .navigation label:nth-of-type(11):after {
    opacity: 1;
  }

  .csslider > .arrows {
    position: absolute;
    top: 50%;
    width: 100%;
    height: 2rem;
    padding: 0;
    z-index: 9;
    -moz-box-sizing: content-box;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
  }

  .csslider > .arrows label {
    display: none;
    position: absolute;
    top: -50%;
    padding: 1rem;
    cursor: pointer;
    -moz-transition: .15s;
    -o-transition: .15s;
    -webkit-transition: .15s;
    transition: .15s;
  }

  .csslider > .arrows label:hover {
    box-shadow: inset 3px -3px 0 2px ${props => props.theme.colors.white.base};
    margin: 0 0px;
  }

  .csslider > .arrows label:before {
    content: '';
    position: absolute;
    top: -100%;
    left: -100%;
    height: 300%;
    width: 300%;
  }

  .csslider.infinity > input:first-of-type:checked ~ .arrows label:last-of-type,
  .csslider > input:nth-of-type(1):checked ~ .arrows label:nth-of-type(0),
  .csslider > input:nth-of-type(2):checked ~ .arrows label:nth-of-type(1),
  .csslider > input:nth-of-type(3):checked ~ .arrows label:nth-of-type(2),
  .csslider > input:nth-of-type(4):checked ~ .arrows label:nth-of-type(3),
  .csslider > input:nth-of-type(5):checked ~ .arrows label:nth-of-type(4),
  .csslider > input:nth-of-type(6):checked ~ .arrows label:nth-of-type(5),
  .csslider > input:nth-of-type(7):checked ~ .arrows label:nth-of-type(6),
  .csslider > input:nth-of-type(8):checked ~ .arrows label:nth-of-type(7),
  .csslider > input:nth-of-type(9):checked ~ .arrows label:nth-of-type(8),
  .csslider > input:nth-of-type(10):checked ~ .arrows label:nth-of-type(9),
  .csslider > input:nth-of-type(11):checked ~ .arrows label:nth-of-type(10) {
    display: block;
    left: 5rem;
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .csslider.infinity > input:last-of-type:checked ~ .arrows label:first-of-type,
  .csslider > input:nth-of-type(1):checked ~ .arrows label:nth-of-type(2),
  .csslider > input:nth-of-type(2):checked ~ .arrows label:nth-of-type(3),
  .csslider > input:nth-of-type(3):checked ~ .arrows label:nth-of-type(4),
  .csslider > input:nth-of-type(4):checked ~ .arrows label:nth-of-type(5),
  .csslider > input:nth-of-type(5):checked ~ .arrows label:nth-of-type(6),
  .csslider > input:nth-of-type(6):checked ~ .arrows label:nth-of-type(7),
  .csslider > input:nth-of-type(7):checked ~ .arrows label:nth-of-type(8),
  .csslider > input:nth-of-type(8):checked ~ .arrows label:nth-of-type(9),
  .csslider > input:nth-of-type(9):checked ~ .arrows label:nth-of-type(10),
  .csslider > input:nth-of-type(10):checked ~ .arrows label:nth-of-type(11),
  .csslider > input:nth-of-type(11):checked ~ .arrows label:nth-of-type(12) {
    display: block;
    right: 5rem;
    -moz-transform: rotate(225deg);
    -ms-transform: rotate(225deg);
    -o-transform: rotate(225deg);
    -webkit-transform: rotate(225deg);
    transform: rotate(225deg);
  }
  
  @keyframes slide {
    0%, 25% {
      margin-left:0px;
    }
    30%,50% {
      margin-left:-100%;
    }
    55%,75% {
      margin-left:-200%;
    }
    80%,100% {
      margin-left:-300%;
    }
  }
`;

const Header = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  return (
    <Wrapper>
      <Carousel >
        <div id="container" className="csslider infinity inside">
          <input type="radio" name="slides" id="slides_1" defaultChecked />
          <input type="radio" name="slides" id="slides_2" />
          <input type="radio" name="slides" id="slides_3" />
          <input type="radio" name="slides" id="slides_4" />
          <input type="radio" name="slides" id="slides_N" />
          <ul>
            {edges.map(({ node }) => (
              <li key={node.id}><Link to={node.frontmatter.path}><Img fluid={node.frontmatter.cover.childImageSharp.fluid || {} || [] || ''} /></Link></li>
            ))}
          </ul>
          <div className="arrows">
            <label htmlFor="slides_1"></label>
            <label htmlFor="slides_2"></label>
            <label htmlFor="slides_3"></label>
            <label htmlFor="slides_4"></label>
            <label htmlFor="slides_N"></label>
          </div>
          <div className="navigation">
            <div>
              <label htmlFor="slides_1"></label>
              <label htmlFor="slides_2"></label>
              <label htmlFor="slides_3"></label>
              <label htmlFor="slides_4"></label>
              <label htmlFor="slides_N"></label>
            </div>
          </div>
        </div>
      </Carousel>
    </Wrapper>
)};

export default props => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          edges {
            node {
              id
              frontmatter {
                path
                cover {
                  childImageSharp {
                    fluid(
                      maxWidth: 1000
                      quality: 90
                      traceSVG: { color: "#2B2B2F" }
                    ) {
                      ...GatsbyImageSharpFluid_withWebp_tracedSVG
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <Header data={data} {...props} />}
  />
)


Header.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            excerpt: PropTypes.string,
            frontmatter: PropTypes.shape({
              cover: PropTypes.object.isRequired,
              path: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};
