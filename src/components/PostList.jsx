import React, { Component } from 'react'
import { StaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { CardHeader, ContentMeta } from 'components';

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
  //background: ${props => props.theme.colors.background.light};
  transition: ${props => props.theme.transitions.boom.transition};
  //box-shadow: ${props => props.theme.shadow.feature.small.l_little};
  &:hover{
      transform: scale(1.02);
      box-shadow: ${props => props.theme.shadow.feature.small.l_little};
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
  color: ${props => props.theme.colors.black.base};
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

  const getScrollTop = ()=>{
  　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
  　　if(document.body){
  　　　　bodyScrollTop = document.body.scrollTop;
  　　}
  　　if(document.documentElement){
  　　　　documentScrollTop = document.documentElement.scrollTop;
  　　}
  　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
  　　return scrollTop;
  }
  //文档的总高度
  const getScrollHeight = ()=>{
  　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
  　　if(document.body){
  　　　　bodyScrollHeight = document.body.scrollHeight;
  　　}
  　　if(document.documentElement){
  　　　　documentScrollHeight = document.documentElement.scrollHeight;
  　　}
  　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
  　　return scrollHeight;
  }
  const getWindowHeight = ()=>{
  　　var windowHeight = 0;
  　　if(document.compatMode == "CSS1Compat"){
  　　　　windowHeight = document.documentElement.clientHeight;
  　　}else{
  　　　　windowHeight = document.body.clientHeight;
  　　}
  　　return windowHeight;
  }

class PostList extends Component {
  state = {
    data: [],
    totalCount: 0,
    cursor: 0,
    pageSize: 5,
    isLoading: true,
  }
  
  async componentDidMount() {
    this.rebuild();
    this.loadData();
  }
  
  rebuild = () => {
    const { edges, totalCount } = this.props.data;
    this.setState({ data: this.state.data.concat(edges), totalCount: totalCount, isLoading: false })
  }
  
  loadData = e => {
    window.addEventListener('scroll', () => {
      if(getScrollTop() + getWindowHeight() == getScrollHeight()){

  　　　　//console.log("已经到最底部了！!");
  　　}
    })
  }

  render() {
  
    return (
    <Container>
      <Wrapper>
        <CardHeader title="文章" other="" icons={`${'fas', "angle-double-right"}`} path="/blog"></CardHeader>
        <List>
        {this.props.data&&this.props.data.allMarkdownRemark.edges.map(({ node }) => (
          <StyledLink key={node.id} to={node.frontmatter.path}>
            <Item>
                <Image>
                  <Img fluid={node.frontmatter.cover.childImageSharp.fluid || {} || [] || ''} />
                </Image>
                <InfoDessc>
                  <InfoHeader>
                    <h5>{node.frontmatter.title}</h5>
                  </InfoHeader>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;{node.excerpt}</span>
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

}

export default props => (
  <StaticQuery
    query={graphql`
      query ($cursor: Int!=0, $pageSize: Int!=5) {
        allMarkdownRemark(
          skip: $cursor
          limit: $pageSize
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          totalCount
          edges {
            node {
              id
              excerpt(pruneLength: 100)
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
