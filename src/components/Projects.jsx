import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { CardHeader } from 'components';
import theme from '../../config/theme';
import { strLength } from '../util/util'

const Container = styled.div`
  width: calc(99.9% * 1 / 2 - 0.5rem);
  margin: 0 0 0.5rem 0;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: ${props => props.theme.breakpoints.vl}) {
    width: 100%;
  }
`;

const Wrapper = styled.article`
  position: relative;
  z-index: 100;
  margin: 10px 0 0 0;
  border-radius: ${props => props.theme.borderRadius.little};
  transition: ${props => props.theme.transitions.boom.transition};
  width:100%;
  height: 136px;
  flex-basis: calc(99.9% * 1 / 2 - 4px);
  max-width: calc(99.9% * 1 / 2 - 4px);
  width: calc(99.9% * 1 / 2 - 4px);

  &:hover {
    box-shadow: ${props => props.theme.shadow.feature.small.little};
    transform: scale(1.04);
  }

  @media (max-width:  ${props => props.theme.breakpoints.vl}) {
    flex-basis: calc(99.9% * 1 / 2 - 5px);
    max-width: calc(99.9% * 1 / 2 - 5px);
    width: calc(99.9% * 1 / 2 - 5px);
    height: 14rem;
  }

  @media (max-width:  ${props => props.theme.breakpoints.m}) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    margin: 0.5rem 0 0 0;
    height: 15rem;
  }
`;

const InfoContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  z-index: 3;
  border-radius: ${props => props.theme.borderRadius.little};
  &:hover {
    box-shadow: ${props => props.theme.shadow.feature.small.hover};
  }
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.7) 80%,
      rgba(0, 0, 0, 0.8) 100%
    );
    z-index: -10;
    color: ${props => props.theme.colors.white.grey};
    border-radius: ${props => props.theme.borderRadius.little};
    transition: opacity ${theme.transitions.default.duration};
  }
`;

const Image = styled.div`
  position: absolute;
  top: 0;
  overflow: hidden;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  object-fit: cover;
  border-radius: ${props => props.theme.borderRadius.little};
  //box-shadow: ${props => props.theme.shadow.feature.small.default};
  > div {
    position: static !important;
  }
  > div > div {
    position: static !important;
  }
`;

const Info = styled.div`
  width:100%;
  font-size: 14px;
  padding: 1rem;
  position: absolute;
  display: block;
  bottom: 0;
  left: 0;
  color: ${props => props.theme.colors.white.grey};
  h1,h2,h3,h4,h5,h6{
    color: ${props => props.theme.colors.white.grey};
  }
`;

const Title = styled.h6`
  line-height:1rem;
`;

const Projects = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  
  return (
    <Container>
      <CardHeader title="案例" other="" icons={`${'fas', "th-large"}`} path="/resource"></CardHeader>
      {edges.map(({ node }) => (
        <Wrapper key={node.id}>
          <Link to={`/${node.frontmatter.path}`} title={node.frontmatter.title}>
          <Image>
            <Img fluid={node.frontmatter.cover.childImageSharp.fluid} />
          </Image>
          <InfoContainer>
            <Info>
              <Title>{strLength(node.frontmatter.title, 0)}</Title>
              <span>{node.excerpt}</span>
            </Info>
          </InfoContainer>
          </Link>
        </Wrapper>
        )
      )}
    </Container>
)};


export default props => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          limit: 4
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
                categores
                date(formatString: "YYYY-MM-DD")
                cover {
                  childImageSharp {
                    fluid(
                      maxWidth: 400
                      quality: 60
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
    render={data => <Projects data={data} {...props} />}
  />
)

Projects.propTypes = {
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
