import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { CardHeader, ContentMeta } from 'components';
import config from '../../config/site';
import theme from '../../config/theme';

const Container = styled.div`
  width: 100%;
  margin: 0 0 1rem 0;
  font-size: 14px;
  @media (max-width: ${props => props.theme.breakpoints.vl}) {
    margin: 0rem 0rem 1rem 0rem;
  }
`;

const Wrapper = styled.div`
  position: relative;
  max-width: 100%;
  width: 100%;
`;

const List = styled.div`
  position: relative;
  width: 100%;
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  padding: 0 1rem;
  background: ${props => props.theme.colors.background.light};
  transition: ${props => props.theme.transitions.boom.transition};
  box-shadow: ${props => props.theme.shadow.feature.small.l_little};
  &:hover{
      transform: scale(1.02);
      box-shadow: ${props => props.theme.shadow.feature.small.little};
  }
`;

const Item = styled.div`
  position: relative;
  width: 100%;
  padding: 1rem 0;
  display: flex;
  flex-direction: row;
  p{
    margin:0;
    padding:0;
  }
`;

const InfoHeader = styled.div`
  width: auto;
  h1,h2,h3,h4,h5,h6{
    margin-bottom: 10px;
  }
`;

const InfoDessc = styled.div`
  width: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Image = styled.div`
  width: 40%;
  border-radius: ${props => props.theme.borderRadius.default};
  img {
    border-radius: ${props => props.theme.borderRadius.default};
  }
  &:hover {
    box-shadow: ${props => props.theme.shadow.feature.small.hover};
    transform: scale(1.02);
  }
  .gatsby-image-wrapper {
    height: 100%;
  }
`;


const PostList = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  
  return (
  <Container>
    <Wrapper>
      <CardHeader title="文章" other="更多" path="/blog"></CardHeader>
      <List>
      {edges.map(({ node }) => (
          <StyledLink key={node.id} to={node.frontmatter.path}>
            <Item>
                <Image>
                  <Img fluid={node.frontmatter.cover.childImageSharp.fluid || {} || [] || ''} />
                </Image>
                <InfoDessc>
                  <InfoHeader>
                    <h4>{node.frontmatter.title}</h4>
                  </InfoHeader>
                  <p>&nbsp;&nbsp;&nbsp;&nbsp;{node.excerpt}</p>
                  <ContentMeta 
                    tags={node.frontmatter.tags} 
                    date={node.frontmatter.date} 
                    path={node.frontmatter.path}>
                  </ContentMeta>
                </InfoDessc>
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
          limit: 5
          skip: 6
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          totalCount
          edges {
            node {
              id
              excerpt(pruneLength: 150)
              frontmatter {
                title
                path
                tags
                categores
                special
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
    render={data => <PostList data={data} {...props} />}
  />
)

PostList.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({      
      totalCount: PropTypes.number,
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
              special: PropTypes.string.isRequired,
              tags: PropTypes.array,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};
