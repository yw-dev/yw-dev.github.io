import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Layout, Container } from 'layouts';
import config from '../../config/site';
import { 
  Header, 
  Archive, 
  GuessLike, 
  Card,
  ProjectsList, 
  BlogList, 
  ContentNav,
} from 'components';

const ContentWrapper = styled.div`
  margin: 2rem 8rem 2rem 8rem;
  width: auto;
  @media (max-width: ${props => props.theme.breakpoints.l}) {
    margin: 1rem 6rem 1rem 6rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.hd}) {
    margin: 1rem 4rem 1rem 4rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    margin: 1rem 2rem 1rem 2rem;
  }
  @media (max-width:  ${props => props.theme.breakpoints.s}) {
    margin:  1rem;
  }
`;

const ContentContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    flex-wrap: wrap;
  }
`; 

const ContentPost = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    padding-right: 0rem;
  }
  .list{
    margin:0;
    padding:0;
    @media (max-width: ${props => props.theme.breakpoints.m}) {
      margin: 0 0 1rem 0;
    }
  }
`;

const AsideWrapper = styled.div`
  width: calc(99.9% * 1 / 3 - 1rem);
  display: flex;
  flex-direction: column;
  @media (max-width: ${props => props.theme.breakpoints.vl}) {
    width: calc(99.9% * 1 / 2 - 1rem);
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    width: 100%;
  }
`;


const Wrapper = styled.article`
  width:100%;
  margin: 0;
  padding: 1rem 3rem;
  font-size: 14px;
  box-shadow: ${props => props.theme.shadow.feature.title.bottom};
`;

const Image = styled.div`
  margin: auto;
  position: relative;
  box-shadow: ${props => props.theme.shadow.feature.small.default};
  transition: ${props => props.theme.transitions.boom.transition};
  border-radius: ${props => props.theme.borderRadius.default};
  min-height: 400px;
  img {
    border-radius: ${props => props.theme.borderRadius.default};
  }
  &:hover {
    box-shadow: ${props => props.theme.shadow.feature.small.hover};
    transform: scale(1.04);
  }
  a {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: ${props => props.theme.borderRadius.default};
    > div {
      position: static !important;
    }
    > div > div {
      position: static !important;
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 5px ${props => props.theme.colors.primary.dark};
    }
  }
  flex-basis: 100%;
  max-width: 100%;
  width: 100%;
  @media (max-width: 800px) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 500px) {
    min-height: 200px;
  }
  div{
    style:none;
  }
`;

const StyledLink = styled(Link)`
    color: ${props => props.theme.colors.white.light};
    padding: 5px 10px;
    border: solid 1px #fff;
    border-radius: 20px;
    &:hover {
      color: ${props => props.theme.colors.white.grey};
      background: ${props => props.theme.colors.white.light};
    }
`;

const Information = styled.div`
    h1 {
      display: inline-block;
      transition: all ${props => props.theme.transitions.default.duration};
      &:hover {
        color: ${props => props.theme.colors.white.light};
      }
    }
    text-align: center;
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    border-bottom: ${props => props.theme.border.posts};
    @media (max-width: 800px) {
      flex-basis: 100%;
      max-width: 100%;
      width: 100%;
    }
`;

const HeadTitle = styled.div`
    padding: 1rem 0rem;
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.colors.white.light};
`;

const Resource = ({ pageContext, data }) => {
  const { spath, tagName } = pageContext;
  const postsByType = {};
  const postsByCategory = {};
  const postsByTag = {};
  var title = [];
  var categories = [];
  var posts = [];
  var keyword = [];
  data.allMarkdownRemark.edges.map(({ node }) => {  
    if (node.frontmatter.type) {
      if (!postsByType[node.frontmatter.type]) {
        postsByType[node.frontmatter.type] = [];
      }
      if (!postsByType[node.frontmatter.type][node.frontmatter.typeTitle]) {
        postsByType[node.frontmatter.type][node.frontmatter.typeTitle] = [];
      }
      postsByType[node.frontmatter.type][node.frontmatter.typeTitle].push(node);
    }
  });
  const typeList = Object.keys(postsByType);
  typeList.map(type => {
    postsByType[type][Object.keys(postsByType[type])].map(node => {
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
        if (!postsByTag[type]) {
          postsByTag[type] = [];
        }
        if (node.frontmatter.tags) {
          node.frontmatter.tags.forEach(tag => {
            if (!postsByTag[type][tag]) {
              postsByTag[type][tag] = [];
            }
            postsByTag[type][tag].push(node);
          });
        }
      }
    })
  });
  var uri = [];
  if(spath){
    uri = spath.split("/");
    switch (uri.length) {
      case 2:
        if(postsByType[uri[0]]){
          keyword.push(Object.keys(postsByType[uri[0]]));
          keyword.push(tagName);
          title = [(uri[0]), Object.keys(postsByType[uri[0]])+" · 标签"];
          posts = postsByCategory[uri[0]][uri[1]]?postsByCategory[uri[0]][uri[1]]:postsByTag[uri[0]][uri[1]];
          categories = Object.keys(postsByTag[uri[0]]);
        }
        break;
      case 3:
        //title = [uri[0], Object.keys(postsByType[uri[0]])];
        //categories = Object.keys(postsByCategory[uri[0]][uri[1]][uri[2]]);
        break;
      default:
        if(postsByType[uri[0]]){
          keyword.push(Object.keys(postsByType[uri[0]]));
          title = [uri[0], Object.keys(postsByType[uri[0]])+" · 分类"];
          posts = postsByType[uri[0]][Object.keys(postsByType[uri[0]])];
          categories = Object.keys(postsByCategory[uri[0]]);
        }
        break;
    } 
  }
  //const upperTag = tagName.charAt(0).toUpperCase() + tagName.slice(1);
  return (
    <Layout>
      <Helmet title={`${keyword[keyword.length-1]} | ${config.siteTitle}`} />
      <Header title={keyword[keyword.length-1]}>
        <StyledLink to="/resource">资源</StyledLink>
      </Header>
      <ContentWrapper>
        <ContentContainer>
          <ContentPost>            
              <ProjectsList 
                list={posts}
              />
          </ContentPost>
          <AsideWrapper>
            <Card 
              title={title[1]} 
              other="" 
              path={title[0]}
              list={categories}/>
            <Archive />
            <GuessLike />
          </AsideWrapper>
        </ContentContainer>      
      </ContentWrapper>
    </Layout>
  )};

export default Resource;

Resource.propTypes = {
  pageContext: PropTypes.shape({
    spath: PropTypes.string.isRequired,
    tagname: PropTypes.string,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            excerpt: PropTypes.string,
            frontmatter: PropTypes.shape({
              cover: PropTypes.object.isRequired,
              path: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
              date: PropTypes.string.isRequired,
              tags: PropTypes.array,
              categores: PropTypes.string.isRequired,
              type: PropTypes.string.isRequired,
              typeID: PropTypes.string.isRequired,
              typeTitle: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 50)
          frontmatter {
            title
            path
            tags
            type
            typeID
            typeTitle
            categores
            date(formatString: "MM.DD.YYYY")
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
`;
