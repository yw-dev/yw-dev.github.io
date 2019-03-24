import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { CardHeader } from 'components';
import config from '../../config/site';
import theme from '../../config/theme';


const Container = styled.div`
  width: 100%;
  font-size: 14px;
  margin: 0rem 0rem 1rem 0rem;
`;

const Wrapper = styled.div`
  position: relative;
  max-width: 100%;
  width: 100%;
`;

const List = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  width: 50%;
  display: flex;
  flex-direction: row;
  padding: 0 1rem 0 1rem;
  //background: ${props => props.theme.colors.background.light};
  transition: ${props => props.theme.transitions.boom.transition};
  //box-shadow: ${props => props.theme.shadow.feature.small.l_little};
  &:hover{
    transform: scale(1.02);
    box-shadow: ${props => props.theme.shadow.feature.small.l_little};
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    width: 20%;
  }
`;

const Item = styled.div`
  width: 100%;
  padding: 1rem 0;
  position: relative;
  .title{
    width: auto;
    text-align: left;
    @media (max-width: ${props => props.theme.breakpoints.m}) {
      width: auto;
      text-align: center;
    }
  }
`;

const TagCloud = ({ data }) => {
  const { edges } = data.allMarkdownRemark;

  const postsByTag = [];
  const category = {};

  {edges.forEach(({ node }) => {    
    if (node.frontmatter.categores) {
        if (!category[node.frontmatter.categores]) {
          category[node.frontmatter.categores] = [];
        }
        category[node.frontmatter.categores].push(node.frontmatter.categores);
    }
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsByTag[tag]) {
          postsByTag[tag] = [];
        }
        postsByTag[tag].push(tag);
      });
    }
  })};
  
  const tags = Object.keys(postsByTag).sort((m, n) => {  
      return m.localeCompare(n);
  });
  const categores = Object.keys(category);
  tags.concat(categores);

  return (
    <Container>
      <Wrapper>
        <CardHeader title="标签云" icons="" other="" path=""></CardHeader>
        <List>
            {tags && tags.map((tag, index) => (
            <StyledLink key={index} to={`/${tag}`}>
              <Item>
                <div className="title">{tag}</div>
              </Item>
            </StyledLink>
            ))}
        </List>
      </Wrapper>
   </Container>
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
                title
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
    `}
    render={data => <TagCloud data={data} {...props} />}
  />
)

TagCloud.propTypes = {
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
              categores: PropTypes.string.isRequired,
              tags: PropTypes.array,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};
