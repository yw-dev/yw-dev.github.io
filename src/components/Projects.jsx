import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { CardHeader } from 'components';
import config from '../../config/site';
import theme from '../../config/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { strLength } from '../util/util'

const Container = styled.div`
  width: 100%;
  margin: 0;
  font-size: 14px;
  margin: 0 0 0 1rem;
  @media (max-width: ${props => props.theme.breakpoints.vl}) {
    margin: 0 0 0 0;
  }
`;
const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width:  ${props => props.theme.breakpoints.l}) {
    margin: 0;
  }
`;


const Wrapper = styled.article`
  margin: 6px 0 0 0;
  position: relative;
  z-index: 100;
  border-radius: ${props => props.theme.borderRadius.little};
  //border: ${props => props.theme.border.lowlight};
  //box-shadow: ${props => props.theme.shadow.feature.small.l_little};
  transition: ${props => props.theme.transitions.boom.transition};
  width:100%;
  height: 135px;
  flex-basis: calc(99.9% * 1 / 2 - 3px);
  max-width: calc(99.9% * 1 / 2 - 3px);
  width: calc(99.9% * 1 / 2 - 3px);

  &:hover {
    box-shadow: ${props => props.theme.shadow.feature.small.little};
    transform: scale(1.04);
  }

  @media (max-width:  ${props => props.theme.breakpoints.vl}) {
    margin: 14px 0 0 0;
    flex-basis: calc(99.9% * 1 / 2 - 7px);
    max-width: calc(99.9% * 1 / 2 - 7px);
    width: calc(99.9% * 1 / 2 - 7px);
    height: 14rem;
  }

  @media (max-width:  ${props => props.theme.breakpoints.l}) {
    flex-basis: calc(99.9% * 1 / 2 - 7px);
    max-width: calc(99.9% * 1 / 2 - 7px);
    width: calc(99.9% * 1 / 2 - 7px);
    height: 17rem;
    margin: 10px 0 0 0;
  }

  @media (max-width:  ${props => props.theme.breakpoints.m}) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
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
      <CardHeader title="资源" other="" icons={`${'fas', "th-large"}`} path="/resource"></CardHeader>
      <Content>
      {edges.map(({ node }) => {
        return (
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
        )}
      )}
      </Content>
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
