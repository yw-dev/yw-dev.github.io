import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import { Layout, Container, Content } from 'layouts';
import { Header, TagsBlock, SpecialsList, ContentNav, ContentHeader } from 'components';
import config from '../../config/site';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin: 0;
  font-size: 16px;
  @media (max-width: ${props => props.theme.breakpoints.vl}) {
    flex-wrap: wrap;
  }
`;

const Nav =  styled.nav`
  width: 25%;
  padding:0 1rem;
  box-shadow: ${props => props.theme.shadow.feature.title.right};
  font-family: ${props => props.theme.fontFamily.body};
  font-weight: 500;
  font-size: 15px;
  *{
    margin: 0;
    padding: 0;
  }
  .tree {
    overflow: hidden;
  }  
  /*隐藏input*/
  .tree li input{
    position: absolute;
    opacity: 0;
    z-index: 2;
    cursor: pointer;
    height: 1rem;
    width: 1rem;
  }  
  /*所有菜单项设置统一样式*/
  .tree li {
    position: relative;
    list-style: none;
  }   
  /*一级菜单加下边线*/
  .tree>li{
    //border-bottom: 1px solid #d9d9d9;
  }
  /*给有子菜单的菜单项添加背景图标*/
  .tree li label {
    padding: 1rem;
    max-width: 100%;
    display: block;
    cursor: pointer;
    &:hover,&:focus, &:checked{
      color: ${props => props.theme.colors.label.blue};
    }
  }  
  /*清除所有展开的子菜单的display*/
  .tree li input + ul{
    display: none;
  }  
  /*当input被选中时，给所有展开的子菜单设置样式*/
  .tree input:checked + ul {
    padding:0;
    width: auto;
    height: auto;
    display: block;
  }  
  .tree input:checked + ul > li { 
    height: auto;
  }  
  /*末层菜单为A标签，设置样式*/
  .tree li.file a{
    padding: 0.5rem 2rem;
    text-decoration:none;
    display: block;
    white-space:nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
    &:hover, &:focus, &:checked{
      color: ${props => props.theme.colors.label.blue};
      border-left: 10px solid #3ca5f6;
    }
  } 
`;

const Excerpt = styled.div`
  width: 75%;
  max-width: 90%;
  padding: 0 3rem 1rem 3rem;

`;

const PostWrapper = styled.div`
  display: block;
  width: 100%;
`;

const StyledLink = styled(Link)`
    color: ${props => props.theme.colors.white.light};
    padding: 5px 10px;
    border: solid 1px #fff;
    border-radius: 20px;
    &:hover {
      color: ${props => props.theme.colors.white.grey};
      background: ${props => props.theme.colors.white.light};
    }
`;

const Information = styled.div`
    h1 {
      font-size: 2rem;
      display: inline-block;
      transition: all ${props => props.theme.transitions.default.duration};
      &:hover {
        color: ${props => props.theme.colors.white.light};
      }
    }
    max-width: 100%;
    width: 100%;
    border-bottom: ${props => props.theme.border.posts};
    @media (max-width: 800px) {
      flex-basis: 100%;
      max-width: 100%;
      width: 100%;
    }
`;

const SubTitle = styled.div`
    padding: 1rem 0;
    display: flex;
    text-align: left;
    flex-direction: column;
    color: ${props => props.theme.colors.white.light};
`;

const ContentTitle = styled.div`
    padding: 1rem 0;
    display: flex;
    text-align: center;
    flex-direction: column;
    color: ${props => props.theme.colors.white.light};
`;

const SubDirect = styled.div`
  padding: 0 0 0 1rem;
  display: flex;
  text-align: left;
  flex-direction: column;
`;

const Special = ({data, pageContext }) => {
  //const { edges } = data.allMarkdownRemark;
  const { specialName } = pageContext;
  const upperSpecial = specialName.charAt(0).toUpperCase() + specialName.slice(1);
  const postsBySpecial = {};
  const specialPosts = {};
  const posts = {};
  var keyword=  [...upperSpecial];
  // create tags page
  data.allMarkdownRemark.edges.map(({ node }) => {
    if (node.frontmatter.special) {
        if (!postsBySpecial[node.frontmatter.special]) {
          postsBySpecial[node.frontmatter.special] = [];
        }
        postsBySpecial[node.frontmatter.special].push(node);
    }
  });

  postsBySpecial[specialName].forEach(element => {
    if(element.frontmatter.subtitle){
      if (!specialPosts[element.frontmatter.subtitle]) {
        specialPosts[element.frontmatter.subtitle] = [];
      }
      specialPosts[element.frontmatter.subtitle].push(element);
    }
  });
  const subtitles = Object.keys(specialPosts);
  
  return (
    <Layout>
      <Helmet title={`${specialName} | ${config.siteTitle}`} />
      <Header title={upperSpecial}>
        <StyledLink to="/specials">专题</StyledLink>
      </Header>
      <Container>
        <ContentNav path="specials" title="专题" keyword={keyword}/>
        <Wrapper>
          <Nav>
            <ul className="tree">
              {subtitles.map((subtitle, index) => {
                posts = specialPosts[subtitle];
                return(
                  <li key={index}><label htmlFor={`item-${index}`}>{subtitle}</label><input type="checkbox" defaultChecked id={`item-${index}`}/>
                    <ul>
                    {posts.map(element =>{
                    return (
                        <li key={element.id} className="file"><Link className="title" to={element.frontmatter.path} title={element.frontmatter.title}>{element.frontmatter.title}</Link></li>
                    )} 
                    )}
                    </ul>
                  </li>
                )}
              )}
            </ul>
          </Nav>
          <Excerpt>
            <Information key={posts.id}>
              <ContentTitle>
                <Link className="title" to={posts.frontmatter.path}>
                  <h4>{posts.frontmatter.title}</h4>
                </Link>
              </ContentTitle>
              <ContentHeader name={specialName} tags={posts.frontmatter.tags} stype={posts.frontmatter.type} date={posts.frontmatter.date} path={posts.frontmatter.path}></ContentHeader>
              <Content input={posts.html} />
              <TagsBlock spath={posts.frontmatter.type}  list={posts.frontmatter.tags || []} />
            </Information>
          </Excerpt>
        </Wrapper>
      </Container>
    </Layout>
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
              excerpt(pruneLength: 200)
              html
              frontmatter {
                title
                subtitle
                type
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
    render={data => <Special data={data} {...props} />}
  />
)

Special.propTypes = {
  pageContext: PropTypes.shape({
    specialName: PropTypes.string,
  }),
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
              subtitle: PropTypes.string,
              type: PropTypes.string,
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
