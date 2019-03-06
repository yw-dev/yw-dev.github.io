import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Layout, Container } from 'layouts';
import { Header, TagsBlock, ContentNav, ContentHeader } from 'components';
import config from '../../config/site';

const Wrapper = styled.article`
  width:100%;
  margin: 0;
  padding: 1rem 3rem;
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
      font-size: 2rem;
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
      <Container>
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
