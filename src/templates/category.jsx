import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Layout, Container } from 'layouts';
import { Header, TagsBlock, ContentNav, ContentHeader } from 'components';
import config from '../../config/site';
import { 
  SlideBar, 
  Archive, 
  GuessLike, 
  CardHeader, 
  TagCloud,
} from 'components';

const ContentWrapper = styled.div`
  margin: 1rem 9rem 1rem 9rem;
  width: auto;
  @media (max-width: ${props => props.theme.breakpoints.l}) {
    margin: 2rem 6rem 2rem 6rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.hd}) {
    margin: 1rem 4rem 1rem 4rem;
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    margin: 1rem 2rem 1rem 2rem;
  }
  @media (max-width:  ${props => props.theme.breakpoints.s}) {
    margin:  1rem;
  }
`;

const ContentContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    flex-wrap: wrap;
  }
`; 

const ContentPost = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-right: 1rem;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    padding-right: 0rem;
  }
  .list{
    margin:0;
    padding:0;
    @media (max-width: ${props => props.theme.breakpoints.m}) {
      margin: 0 0 1rem 0;
    }
  }
`;

const AsideWrapper = styled.div`
  width: calc(99.9% * 1 / 3 - 1rem);
  display: flex;
  flex-direction: column;
  @media (max-width: ${props => props.theme.breakpoints.vl}) {
    width: calc(99.9% * 1 / 2 - 1rem);
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    width: 100%;
  }
`;


const Wrapper = styled.article`
  width:100%;
  margin: 0;
  padding: 1rem 3rem;
  font-size: 14px;
  box-shadow: ${props => props.theme.shadow.feature.title.bottom};
`;

const Image = styled.div`
  margin: auto;
  position: relative;
  box-shadow: ${props => props.theme.shadow.feature.small.default};
  transition: ${props => props.theme.transitions.boom.transition};
  border-radius: ${props => props.theme.borderRadius.default};
  min-height: 400px;
  img {
    border-radius: ${props => props.theme.borderRadius.default};
  }
  &:hover {
    box-shadow: ${props => props.theme.shadow.feature.small.hover};
    transform: scale(1.04);
  }
  a {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: ${props => props.theme.borderRadius.default};
    > div {
      position: static !important;
    }
    > div > div {
      position: static !important;
    }
    &:focus {
      outline: none;
      box-shadow: 0 0 0 5px ${props => props.theme.colors.primary.dark};
    }
  }
  flex-basis: 100%;
  max-width: 100%;
  width: 100%;
  @media (max-width: 800px) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 500px) {
    min-height: 200px;
  }
  div{
    style:none;
  }
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
      display: inline-block;
      transition: all ${props => props.theme.transitions.default.duration};
      &:hover {
        color: ${props => props.theme.colors.white.light};
      }
    }
    text-align: center;
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;
    border-bottom: ${props => props.theme.border.posts};
    @media (max-width: 800px) {
      flex-basis: 100%;
      max-width: 100%;
      width: 100%;
    }
`;

const HeadTitle = styled.div`
    padding: 1rem 0rem;
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.colors.white.light};
`;

const Category = ({ pageContext }) => {
  const { list, spath, tagName } = pageContext;
  //const upperTag = tagName.charAt(0).toUpperCase() + tagName.slice(1);
  return (
    <Layout>
      <Helmet title={`${tagName} | ${config.siteTitle}`} />
      <Header title={tagName}>
        <StyledLink to="/category">分类</StyledLink>
      </Header>
      <ContentWrapper>
        <ContentContainer>
          <ContentPost>
            <Container className="list">
              <ContentNav path={spath} title="分类" keyword={tagName}></ContentNav>
              {list.map(post => (
                <Wrapper key={post.id}>
                  <Information>
                    <HeadTitle>
                      <Link className="title" to={post.frontmatter.path}>
                        <h3>{post.frontmatter.title}</h3>
                      </Link>
                    </HeadTitle>
                    <ContentHeader name={tagName} tags={post.frontmatter.tags} path={post.frontmatter.path} stype={post.frontmatter.type}></ContentHeader>
                    {post.excerpt}
                    <TagsBlock spath={post.frontmatter.type} list={post.frontmatter.tags} />
                  </Information>
                </Wrapper>
              ))}
            </Container>
          </ContentPost>
          <AsideWrapper>
            <TagCloud />
            <Archive />
            <GuessLike />
          </AsideWrapper>
        </ContentContainer>      
      </ContentWrapper>
    </Layout>
  )};

export default Category;

Category.propTypes = {
  pageContext: PropTypes.shape({
    list: PropTypes.array,
    spath: PropTypes.string,
    tagname: PropTypes.string,
  }),
};
