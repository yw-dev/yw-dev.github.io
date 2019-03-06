import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { locale } from 'core-js';

const Nav = styled.nav`
  margin: 0px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  font-family: ${props => props.theme.fontFamily.body};
  font-weight: 500;
  font-size: 15px;
  align-items: center;
  ul{
    margin: 0;
    padding:0;
    display:inline-table;
    position:relative;
  }
  ul:after{
    content:"";
    display:block;
    clear:both;
    border-left:1px solid #575f6a;
  }
  ul li{
    float: left;
    margin: 0;
    padding: 0;
    list-style: none;
    list-style-type: none;
  }
  ul ul{
    margin: 0;
    padding: 0;
    display: none;
    width: 10rem;
  }
  ul li a{
    display: block;
    padding: 1.3rem;
    text-align: center;
    text-decoration: none;
  }
  ul li:hover > ul{
    display: block;
    margin: 0;
  }
  ul li:hover{
    background: ${props => props.theme.colors.linearColor.navbarbg};
  }
  ul li:hover a{
    color: ${props => props.theme.colors.white.light};
  }
  ul li:hover{
     color: ${props => props.theme.colors.white.grey};
  }
  ul ul{
    background: ${props => props.theme.colors.linearColor.navbarbg};
    border-bottom-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    position:absolute;
    top:100%;
    padding:0;
  }
  ul ul li{
    float:none;
    border-top:1px solid ${props => props.theme.colors.black.light};
  }
  ul ul li a:hover{
    color: ${props => props.theme.colors.white.grey};
     background: #4b545f;
  }
  ul ul ul{
    width:100%;
    position:absolute;
    left:100%;
    top:50%;
  }
  a {
    color: ${props => props.theme.colors.white.grey};
    padding: 1rem;
    transition: all ${props => props.theme.transitions.default.duration};
    &:hover {
      color: ${props => props.theme.colors.white.light};
    }
  }
  .line:after{
    content:"";
    display:block;
    clear:both;
    width: 1px;
    height: 1rem;
    margin: 25px 0px;
    border-left:1px solid #575f6a;
  }
`;

const NavMenu = ({ data}) => {
  const { edges } = data.allMarkdownRemark;
  const postsByType = {};

  {edges.forEach(({ node }) => {    
    if (node.frontmatter.type) {
      if (!postsByType[node.frontmatter.type]) {
        postsByType[node.frontmatter.type] = [];
      }
      postsByType[node.frontmatter.type].push(node);
    }
  })};

  const devs = {};
  const selfs = {};
  const resources = {};
  postsByType['dev'].forEach(node => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!devs[tag]) {
          devs[tag] = [];
        }
        devs[tag].push(tag);
      });
    }
  });
  postsByType['self'].forEach(node => {
    if (node.frontmatter.categores) {
        if (!selfs[node.frontmatter.categores]) {
          selfs[node.frontmatter.categores] = [];
        }
        selfs[node.frontmatter.categores].push(node.frontmatter.categores);
    }
  });
  postsByType['resource'].forEach(node => {
    if (node.frontmatter.categores) {
        if (!resources[node.frontmatter.categores]) {
          resources[node.frontmatter.categores] = [];
        }
        resources[node.frontmatter.categores].push(node.frontmatter.categores);
    }
  });

  const devTags = Object.keys(devs).sort((m, n) => {
    return m.localeCompare(n);
  });
  const selfCategores = Object.keys(selfs).sort((m, n) => {
    return m.localeCompare(n);
  });
  const resourceCategores = Object.keys(resources).sort((m, n) => {
    return m.localeCompare(n);
  });

  return (
  <Nav>
    <ul>
        <li><Link className="nav-ul-li-a" to="/"><i className="fa fa-home fa-fw" aria-hidden="true"></i>&nbsp;首页</Link></li>
        <li><Link to="/self">个人随笔<i className="fa fa-angle-down fa-fw" aria-hidden="true"></i></Link>
        <ul>
            {selfCategores && selfCategores.map((cat, index) => {
                const upperCat = cat.charAt(0).toUpperCase() + cat.slice(1);
                return (
                  <li key={index*100000+1}><Link to={`/self/${cat}`}>{upperCat}</Link></li>
                );
            })}
        </ul>
        </li>
        <li><Link to="/dev">技术杂谈<i className="fas fa-angle-down fa-fw" aria-hidden="true"></i></Link>
        <ul>
            {devTags && devTags.map((tag, index) => {
                const upperTag = tag.charAt(0).toUpperCase() + tag.slice(1);
                return (
                  <li key={index*10000+1}><Link to={`/dev/${tag}`}>{upperTag}</Link></li>
                );
            })}
        </ul>
        </li>
        <li><Link to="/resource">资源<i className="fas fa-angle-down fa-fw" aria-hidden="true"></i></Link>
        <ul>
            {resourceCategores &&
            resourceCategores.map((cat, index) => {
                const upperCat = cat.charAt(0).toUpperCase() + cat.slice(1);
                return (
                    <li key={index*1000+1}><Link to={`/resource/${cat}`}>{upperCat}</Link></li>
                );
            })}
        </ul>
        </li>
        <li><Link to="/about">关于</Link></li>
        <li><div className="line"></div></li>
        <li><Link to="/about"><i className="fas fa-user" aria-hidden="true"></i></Link></li>
    </ul>
  </Nav>
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
                tags
                type
                categores
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
    render={data => <NavMenu data={data} {...props} />}
  />
)


NavMenu.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
          edges: PropTypes.arrayOf(
            PropTypes.shape({
              node: PropTypes.shape({
                frontmatter: PropTypes.shape({
                  cover: PropTypes.object.isRequired,
                  type: PropTypes.string.isRequired,
                  path: PropTypes.string.isRequired,
                  tags: PropTypes.array,
                  categores: PropTypes.string.isRequired,
                }),
              }),
            }).isRequired
          ),
        }),
      }),
};
  