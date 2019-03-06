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
  flex-direction: row;
  padding: 0 1rem 0 1rem;
  background: ${props => props.theme.colors.white.light};
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
  justify-content: space-between;
  .label{
    padding: 5px 10px;
    color: ${props => props.theme.colors.white.light};
  }
  .l-1{
    background-color: ${props => props.theme.colors.hot.red};
  }
  .l-2{
    background-color: ${props => props.theme.colors.hot.green};
  }
  .l-3{
    background-color: ${props => props.theme.colors.hot.blue};
  }
  .l-4{
    background-color: ${props => props.theme.colors.hot.yellow};
  }
  .l-5{
    background-color: ${props => props.theme.colors.hot.orange};
  }
  .title{
    text-align:left;
    width: calc(99.9% * 1 / 2 - 1rem);
  }
  i, .label-num{
    color: ${props => props.theme.colors.hot.light};
  }
`;

const HotTopic = ({ data }) => {
  const { edges } = data.allMarkdownRemark;
  
  return (
    <Container>
      <Wrapper>
        <CardHeader title="热门排行" other="更多" path="/blog"></CardHeader>
        <List>
            {edges.map(({ node }, index) => (
                <StyledLink key={node.id} to={`/${node.frontmatter.path}`}>
                  <Item>
                    <div><span className={`label l-${++index}`}>{++index}</span></div>
                    <div className="title">&nbsp;{node.frontmatter.title}</div>
                    <div><i className="fa fa-heart fa-fw" aria-hidden="true"></i>&nbsp;
                    <span className="label-num">22233</span></div>
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
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          edges {
            node {
              id
              excerpt(pruneLength: 100)
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
    render={data => <HotTopic data={data} {...props} />}
  />
)

HotTopic.propTypes = {
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
