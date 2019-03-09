import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Layout, Container, Content } from 'layouts';
import { TagsBlock, Header, SEO, ContentHeader, ContentNav } from 'components';
import config from '../../config/site';
import '../styles/prism';
import { 
  SlideBar, 
  Archive, 
  GuessLike, 
  CardHeader, 
} from 'components';

const ContentWrapper = styled.div`
  margin: 2rem 8rem 2rem 8rem;
  width: auto;
  @media (max-width: ${props => props.theme.breakpoints.l}) {
    margin: 1rem 6rem 1rem 6rem;
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

const SuggestionBar = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin: 0rem 2rem;
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
  var keyword = [...title];
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
      <ContentWrapper>
        <ContentContainer>
          <ContentPost>
            <Container className="list">
              <ContentNav path={spath} title="文章" keyword={keyword}></ContentNav>
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
          </ContentPost>
          <AsideWrapper>
            <Archive />
            <GuessLike />
          </AsideWrapper>
        </ContentContainer>      
      </ContentWrapper>
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
