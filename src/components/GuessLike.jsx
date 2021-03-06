import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { CardHeader, GuessLikeMeta } from 'components';
import { strLength } from '../util/util'

const Wrapper = styled.div`
  max-width: 100%;
  width: 100%;
  font-size: 14px;
  margin: 0rem 0rem 0.5rem 0rem;
  align-item: center;
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 1px;
  padding: 0.5rem;
  //background: ${props => props.theme.colors.background.light};
  transition: ${props => props.theme.transitions.boom.transition};
  //box-shadow: ${props => props.theme.shadow.feature.small.l_little};
  &:hover{
      transform: scale(1.02);
      box-shadow: ${props => props.theme.shadow.feature.small.l_little};
  }
  h1,h2,h3,h4,h5,h6{
    line-height: 20px;
  }
`;

const InfoDessc = styled.div`
  width: 100%;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: ${props => props.theme.colors.black.base};
`;

const Image = styled.div`
  width: 280px;
  height: 140px;
  img {
    border-radius: ${props => props.theme.borderRadius.default};
  }
  &:hover {
    box-shadow: ${props => props.theme.shadow.feature.small.default};
    transform: scale(1.04);
  }
  .gatsby-image-wrapper {
    height: 100%;
  }
`;

const GuessLike = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  
  return (
      <Wrapper>
        <CardHeader title="猜你喜欢" other="" icons={`${'fas', "redo"}`} path="/blog"></CardHeader>
        {edges.map(({ node }) => (
          <StyledLink key={node.id} to={`/${node.frontmatter.path}`} title={node.frontmatter.title}>
                <Image>
                  <Img fluid={node.frontmatter.cover.childImageSharp.fluid || {} || [] || ''} />
                </Image>
                <InfoDessc>
                  <h6>{strLength(node.frontmatter.title, 16)}</h6>
                  <span>{node.excerpt}</span>
                  <GuessLikeMeta 
                    date={node.frontmatter.date} 
                    path={node.frontmatter.path}>
                  </GuessLikeMeta>
                </InfoDessc>
          </StyledLink>
      ))}
      </Wrapper>
)};


export default props => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          limit: 5
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          edges {
            node {
              id
              excerpt(pruneLength: 30)
              frontmatter {
                title
                path
                tags
                type
                categores
                date(formatString: "YY-MM-DD")
                cover {
                  childImageSharp {
                    fluid(
                      maxWidth: 240
                      quality: 20
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
    render={data => <GuessLike data={data} {...props} />}
  />
)

GuessLike.propTypes = {
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
