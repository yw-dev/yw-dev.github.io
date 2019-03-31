import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { CardHeader } from 'components';
import config from '../../config/site';
import theme from '../../config/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Project = styled.div`
  width: 100%;
  margin: 0;
  font-size: 14px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width:  ${props => props.theme.breakpoints.m}) {
    margin: 0 0 1rem 0;
  }
`;


const Wrapper = styled.article`
  margin: 14px 0 0 0;
  position: relative;
  z-index: 100;
  border-radius: ${props => props.theme.borderRadius.little};
  border: ${props => props.theme.border.lowlight};
  box-shadow: ${props => props.theme.shadow.feature.small.l_little};
  transition: ${props => props.theme.transitions.boom.transition};
  width:100%;
  height: 16rem;
  flex-basis: calc(99.9% * 1 / 4 - 10px);
  max-width: calc(99.9% * 1 / 4 - 10px);
  width: calc(99.9% * 1 / 4 - 10px);

  &:hover {
    box-shadow: ${props => props.theme.shadow.feature.small.little};
    transform: scale(1.04);
  }

  @media (max-width:  ${props => props.theme.breakpoints.vl}) {
    margin: 15px 0 0 0;
    flex-basis: calc(99.9% * 1 / 3 - 7px);
    max-width: calc(99.9% * 1 / 3 - 7px);
    width: calc(99.9% * 1 / 3 - 7px);
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

const StyledLink = styled.div`
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
  box-shadow: ${props => props.theme.shadow.feature.small.default};
  img {
    box-shadow: ${props => props.theme.shadow.feature.small.hover};
  }
  > div {
    position: static !important;
  }
  > div > div {
    position: static !important;
  }
`;

const Info = styled.div`
  font-size: 14px;
  width:100%;
  padding: 0;
  position: absolute;
  display: block;
  bottom: 0;
  left: 0;
  color: ${props => props.theme.colors.white.grey};
  h1,h2,h3,h4,h5,h6{
    color: ${props => props.theme.colors.white.grey};
  }
`;
const Descrip = styled.div`
  padding: 5px 10px;
`;

const Footer = styled.div`
  width:100%;
  margin: 0;
  padding: 0;
  &:before{
    content:"";
    display:block;
    clear: both;
    height: 1px;
    margin: 0;
    border-top: 1px solid ${props => props.theme.colors.opcity.linebg};
  }
  span {
    float: right;
    display: block;
    text-align: center;
    padding: 10px;
  }
  a{
    &:hover {
      color: ${props => props.theme.colors.white.light};
    }
  }
`;

const Title = styled.h4`
  line-height:1.5rem;
`;

const ProjectsList = ({ list, data }) => {
  const { edges } = data.allMarkdownRemark;
  
  return (
    <Project>
      <CardHeader title="资源" other="" icons={`${['fas', "th-large"]}`} path="/resource"></CardHeader>
      <Content>
      {list && list.map((node, index) => {
        return (
        <Wrapper key={index}>
          <Image>
            <Img fluid={node.frontmatter.cover.childImageSharp.fluid} />
          </Image>
          <StyledLink key={node.id} to={`/${node.frontmatter.path}`}>
          <Info>
            <Descrip>
              <Title>{node.frontmatter.title}</Title>
              <span>{node.excerpt}</span>
            </Descrip>
            <Footer>
              <span><a href="https://codesandbox.io/embed/489lrmv7o4?fontsize=14"><FontAwesomeIcon icon={['fab', 'github']} size="2x" /></a></span>
              <span><a href="https://codesandbox.io/embed/489lrmv7o4?fontsize=14"><FontAwesomeIcon icon={['fab', 'codepen']} size="2x" /></a></span>
              <span><a href="https://codesandbox.io/embed/489lrmv7o4?fontsize=14"><FontAwesomeIcon icon={['fas', 'code']} size="2x" /></a></span>
            </Footer>
          </Info>
          </StyledLink>
        </Wrapper>
        )}
      )}
      </Content>
    </Project>
)};


export default props => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          limit: 8
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          edges {
            node {
              id
              excerpt(pruneLength: 50)
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
    render={data => <ProjectsList data={data} {...props} />}
  />
)

ProjectsList.propTypes = {
  list: PropTypes.array,
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
