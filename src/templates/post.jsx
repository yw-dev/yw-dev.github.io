import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Layout, Container, Content } from 'layouts';
import { TagsBlock, Header, SEO, ContentHeader, ContentNav } from 'components';
import config from '../../config/site';
import '../styles/prism';

const SuggestionBar = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 0rem 6rem;
  justify-content: space-between;
  //background: ${props => props.theme.colors.white.light};
  //box-shadow: ${props => props.theme.shadow.suggestion};
`;
const Excerpt = styled.div`
  display: block;
  width: 100%;
  padding: 0 3rem;
`;

const PostSuggestion = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem;
  .Suggestion-up{
      padding:1rem;
      //-webkit-clip-path: polygon(100% 0, 10% 0, 0 50%, 10% 100%, 100% 100%);
      clip-path: polygon(100% 0, 10% 0, 0 50%, 10% 100%, 100% 100%);
      @media (max-width: ${props => props.theme.breakpoints.s}) {
        -webkit-clip-path: polygon(100% 0, 10% 0, 0 50%, 10% 100%, 100% 100%);
        clip-path: polygon(100% 0, 10% 0, 0 50%, 10% 100%, 100% 100%);
      }
      background: ${props => props.theme.colors.card.light};
      box-shadow: ${props => props.theme.shadow.feature.small.default};
  }
  .Suggestion-next{
      padding:1rem;
      //-webkit-clip-path: polygon(90% 100%, 100% 50%, 90% 0, 0 0, 0 100%);
      clip-path: polygon(90% 100%, 100% 50%, 90% 0, 0 0, 0 100%);
      @media (max-width: ${props => props.theme.breakpoints.s}) {
        -webkit-clip-path: polygon(90% 100%, 100% 50%, 90% 0, 0 0, 0 100%);
        clip-path: polygon(90% 100%, 100% 50%, 90% 0, 0 0, 0 100%);
      }
      background: ${props => props.theme.colors.card.light};
      box-shadow: ${props => props.theme.shadow.feature.small.default};
  }
  a,h1,h2,h3,h4,h5,h6{
    color: ${props => props.theme.colors.white.grey};
    &:hover {
      color: ${props => props.theme.colors.white.light};
      background: ${props => props.theme.colors.card.base};
    }
  }
`;

const HeadTitle = styled.div`
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.colors.black.base};
    h1,h2,h3,h4,h5,h6{
      padding: 1rem 0rem;
    }
`;

const Post = ({ data, pageContext }) => {
  const { next, prev, spath } = pageContext;
  const post = data.markdownRemark;
  const image = post.frontmatter.cover.childImageSharp.fluid;
  const title = post.frontmatter.title;
  const date = post.frontmatter.date;
  const html = post.html;
  return (
    <Layout>
      <SEO
        title={`${title} | ${config.siteTitle}`}
        description={post.frontmatter.description || post.excerpt || ' '}
        image={image}
        pathname={post.frontmatter.path}
        article
      />
      <Header title={`${config.siteTitle}`} ></Header>
      <Container>
        <ContentNav path={spath} title="文章" keyword={title}></ContentNav>
        <Excerpt>
          <HeadTitle>
            <h2>{title}</h2>
          </HeadTitle>
          <ContentHeader tags={post.frontmatter.tags} path={post.frontmatter.path} stype={post.frontmatter.type}></ContentHeader>
          <Content input={html} />
          <TagsBlock spath={post.frontmatter.type}  list={post.frontmatter.tags || []} />
        </Excerpt>
      </Container>
      <SuggestionBar>
        <PostSuggestion>
          {prev && (
            <Link className="Suggestion-up" to={prev.frontmatter.path}>
                <h4>{prev.frontmatter.title}</h4>
            </Link>
          )}
        </PostSuggestion>
        <PostSuggestion>
          {next && (
            <Link className="Suggestion-next" to={next.frontmatter.path}>
                <h4>{next.frontmatter.title}</h4>
            </Link>
          )}
        </PostSuggestion>
      </SuggestionBar>
    </Layout>
  );
};

export default Post;

Post.propTypes = {
  pageContext: PropTypes.shape({
    prev: PropTypes.object,
    next: PropTypes.object,
    spath: PropTypes.string,
  }).isRequired,
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  query($pathSlug: String!) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
        type
        categores
        cover {
          childImageSharp {
            fluid(
              maxWidth: 1920
              quality: 90
              duotone: { highlight: "#386eee", shadow: "#2323be", opacity: 60 }
            ) {
              ...GatsbyImageSharpFluid_withWebp
            }
            resize(width: 1200, quality: 90) {
              src
            }
          }
        }
      }
    }
  }
`;
