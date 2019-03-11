import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { locale } from 'core-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, fab, far)

const Menu = styled.div`
  margin: 0px;
  width: auto;
  display: flex;
  justify-content: flex-end;
  font-family: ${props => props.theme.fontFamily.body};
  font-weight: 500;
  align-items: center;
  .menus{
    padding: 1rem;
    text-align: center;
  }
  input{
    display: none;
  }
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
    color: ${props => props.theme.colors.white.grey};
  }
  ul ul{
    margin: 0;
    padding: 0;
    display: none;
    width: 10rem;
  }
  ul li a{
    display: block;
    padding: 1rem 2rem;
    text-align: left;
    text-decoration: none;
  }
  ul li a span{
    padding-left: 1rem;
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
    width: 100%;
    position:absolute;
    left: 100%;
    top: auto;
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

const Menus = styled.div`
  display: block;
`;

const AppNav = ({ data}) => {
  const postsByType = {};
  data.allMarkdownRemark.edges.map(({ node }) => {  
    if (node.frontmatter.typeID) {
      if (!postsByType[node.frontmatter.typeID]) {
        postsByType[node.frontmatter.typeID] = [];
      }
      if (!postsByType[node.frontmatter.typeID][node.frontmatter.type]) {
        postsByType[node.frontmatter.typeID][node.frontmatter.type] = [];
      }
      if (!postsByType[node.frontmatter.typeID][node.frontmatter.type][node.frontmatter.typeTitle]) {
        postsByType[node.frontmatter.typeID][node.frontmatter.type][node.frontmatter.typeTitle] = [];
      }
      postsByType[node.frontmatter.typeID][node.frontmatter.type][node.frontmatter.typeTitle].push(node);
    }  
  });
  const typeList = Object.keys(postsByType).sort();
  const postsByCategory = {};
  typeList.map(type => {
    postsByType[type][Object.keys(postsByType[type])][Object.keys(postsByType[type][Object.keys(postsByType[type])])].map(node => {
      if(type){
        if (!postsByCategory[type]) {
          postsByCategory[type] = [];
        }
        if (node.frontmatter.categores) {
          if (!postsByCategory[type][node.frontmatter.categores]) {
            postsByCategory[type][node.frontmatter.categores] = [];
          }
          postsByCategory[type][node.frontmatter.categores].push(node);
        }
      }
    })
  });
  return (
  <Menu>
      <ul>
        <li><div className="menus"><FontAwesomeIcon icon={['fas', 'bars']} size="2x" /></div>
          <ul className="tree">
            <li><Link className="nav-ul-li-a" to="/"><FontAwesomeIcon icon={['fas', 'home']} size="1x" /><span>首页</span></Link></li>
              {typeList && typeList.map((stype, index)=>{              
                var icon = "edit";
                icon = index>1?"code":"edit";
                  return (
                    <li key={stype}><label htmlFor={`item-${index}`}>
                        <Link to={`/${Object.keys(postsByType[stype])}`}>
                        <FontAwesomeIcon icon={['fas', `${icon}`]} size="1x" ></FontAwesomeIcon>                      
                        <span>
                          {Object.keys(postsByType[stype][Object.keys(postsByType[stype])])}&nbsp;&nbsp;
                          <FontAwesomeIcon icon={['fas', 'angle-down']} size="1x" />
                        </span>
                        </Link>
                      </label>
                      <input type="checkbox" id={`item-${index}`}/>
                      <ul>
                        {postsByCategory && (Object.keys(postsByCategory[stype])).map((category, index)=> {
                            return (
                              <li key={index*1000+1} className="file">
                                <Link className="title" to={`/${Object.keys(postsByType[stype])}/${category}`}>{category}</Link>
                              </li>
                            );
                        })}
                      </ul>
                    </li>
                  )
              })}
            <li>
              <Link to="/about">
                <FontAwesomeIcon icon={['fas', 'address-card']} size="1x" />
                <span>关于</span>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
  </Menu>
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
                typeID
                typeTitle
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
    render={data => <AppNav data={data} {...props} />}
  />
)


AppNav.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
          edges: PropTypes.arrayOf(
            PropTypes.shape({
              node: PropTypes.shape({
                frontmatter: PropTypes.shape({
                  cover: PropTypes.object.isRequired,
                  type: PropTypes.string.isRequired,
                  typeID: PropTypes.string.isRequired,
                  typeTitle: PropTypes.string.isRequired,
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
  