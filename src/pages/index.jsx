import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { Layout, NavBar } from 'layouts';
import { locale } from 'core-js';
import config from '../../config/site';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, fab, far)

import { 
  Header, 
  PostList, 
  SearchBar,
  HotTopic, 
  SlideBar, 
  Specials, 
  Archive, 
  Projects, 
  GuessLike, 
  TagCloud,
  CardHeader, 
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
`;

const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: ${props => props.theme.breakpoints.vl}) {
    flex-wrap: wrap;
  }
`; 

const TopWrapper = styled.div`
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-direction: row;
  margin: 0 0 1rem 0;
  @media (max-width: ${props => props.theme.breakpoints.vl}) {
    flex-wrap: wrap;
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

const PostWrapper = styled.div`
  width: 100%;
  float: left;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Index = ({ data }) => {
  const posts = data;
  /*
  const posts = data.allMarkdownRemark.edges;

  const postsByTag = {};
  const postsBySpecial = {};
  const postsByCategory = {};
  const postsByType = {};
  // create tags page
  posts.forEach(({ node }) => {
    if (node.frontmatter.type) {
      if (!postsByType[node.frontmatter.type]) {
        postsByType[node.frontmatter.type] = [];
      }
      postsByType[node.frontmatter.type].push(node);
    }
    if (node.frontmatter.special) {
        if (!postsBySpecial[node.frontmatter.special]) {
          postsBySpecial[node.frontmatter.special] = [];
        }
        postsBySpecial[node.frontmatter.special].push(node);
    }
    if (node.frontmatter.categores) {
      if (!postsByCategory[node.frontmatter.categores]) {
        postsByCategory[node.frontmatter.categores] = [];
      }
      postsByCategory[node.frontmatter.categores].push(node);
    }
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsByTag[tag]) {
          postsByTag[tag] = [];
        }
        postsByTag[tag].push(node);
      });
    }
  });

  const allTags = Object.keys(postsByTag).sort((m, n) => {  
    return m.localeCompare(n);
  });
  const allCategores = Object.keys(postsByCategory).sort((m, n) => {  
    return m.localeCompare(n);
  });
  const allTypes = Object.keys(postsByType).sort((m, n) => {  
    return m.localeCompare(n);
  });
  const allSpecials = Object.keys(postsBySpecial).sort((m, n) => {  
    return m.localeCompare(n);
  });

  allTypes.forEach(stype => {
    postsByType[stype].map(node => {
      
      allTags.forEach(tagName => {
        const list = postsByTag[tagName];

      })
    })
  })*/
  return (  
    <Layout>
      <Helmet title={`首页 | ${config.siteTitle}`} />
      <Header title={`${config.siteTitle}`}></Header>
      <ContentWrapper>
        <ContentContainer>
          <ContentPost>
            <ContentHeader>
              <TopWrapper>
                <HotTopic/>
                <Projects/>
              </TopWrapper>
            </ContentHeader>       
            <PostWrapper>
              <Specials />  
            </PostWrapper>
            <PostList />
          </ContentPost>
          <AsideWrapper>
            <SlideBar />
            <Archive />
            <GuessLike />
            <TagCloud />
          </AsideWrapper>
        </ContentContainer>        
      </ContentWrapper>
    </Layout>
  );
};

export default Index;
//$repo: repo = "yw-dev.github.io"

/*
export const query = graphql`

  query (
    $owner: String = "yw-dev",
    $repo: String = "yw-dev.github.io",
    $issue_id: ID = "MDU6SXNzdWU0MjMwNzI2Mzk="
    ) {
    github {
      node(id:$issue_id) {
        ... on GitHub_Issue {
          __typename
          id
          title
          number
          comments(first: 1) {
            totalCount
          }
        }
      }
      repository(owner:$owner, name:$repo) {
        __typename
        id
        name
        createdAt 
        issues(first: 1) {
          __typename
          totalCount
          edges {
            issue:node {
              __typename
              id
              number 
              title
              url 
              comments(first: 1) {
                totalCount
                edges {
                  comment:node {
                    bodyHTML
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
*/

/*
export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 100)
          frontmatter {
            title
            type
            typeID
            typeTitle
            path
            tags
            categores
            date(formatString: "YYYY-MM-DD")
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
*/