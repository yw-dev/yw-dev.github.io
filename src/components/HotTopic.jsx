import React, { Component } from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import { strLength } from '../util/util';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { CardHeader } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  width: calc(99.9% * 1 / 2 - 0.5rem);
  font-size: 14px;
  margin: 0 0 0.5rem 0;
  @media (max-width: ${props => props.theme.breakpoints.vl}) {
    width: 100%;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0 0.5rem;
  transition: ${props => props.theme.transitions.boom.transition};
  &:hover{
    transform: scale(1.02);
    box-shadow: ${props => props.theme.shadow.feature.small.l_little};
  }
`;

const Item = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .label{
    padding: 5px 10px;
    color: ${props => props.theme.colors.white.light};
  }
  .l-1{
    background-color: ${props => props.theme.colors.hot.hotred};
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
  .l-6{
    background-color: ${props => props.theme.colors.hot.l_blue};
  }
  .title{
    text-align: left;
    width: calc(75% - 1rem);
  }
  svg, .like{
    color: ${props => props.theme.colors.hot.light};
  }
`;

class HotTopic extends Component{
    
    state = {
      data: [],
      totalCount: 0,
      commentNum: 0,
      labels: ['Gitalk'],
      isLoading: true,
      isError: false,
    }
 
    /**
     * React lifecycle method to fetch the data
     */
    async componentDidMount() {
      this.rebuild();
    }
  
    rebuild = () => {
      const { edges, totalCount } = this.props.data.allMarkdownRemark;
      this.setState({ data: this.state.data.concat(edges), totalCount: totalCount, isLoading: false })
    }
    
    render() {  
      return (
        <Container>
          <CardHeader title="热门排行" other="" icons={`${'fas', "angle-double-right"}`} path="/blog"></CardHeader>
            {this.state.data.map(({ node }, index) => (
              <StyledLink key={node.id} to={`/${node.frontmatter.path}`}  title={node.frontmatter.title}>
                <Item>
                  <span className={`label l-${++index}`}>{index}</span>
                  <span className="title">{strLength(node.frontmatter.title, 25)}</span>
                  <span className="like"><FontAwesomeIcon icon={['far', 'heart']} size="1x"/>&nbsp;22233</span>
                </Item>
              </StyledLink>
            ))}
        </Container>
      )
    }
}


export default props => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          limit: 6
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
