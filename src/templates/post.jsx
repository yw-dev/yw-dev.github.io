import React from 'react';
import { graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Layout, Container, Content } from 'layouts';
import { TagsBlock, Header, SEO,Archive, Comments, GuessLike, ContentHeader, ContentNav } from 'components';
import config from '../../config/site';
import '../styles/prism';

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
  .list{
    margin:0;
    padding:0;
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
  width: 75%;
  @media (max-width: ${props => props.theme.breakpoints.vl}) {
    width: 65%;
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    width: 100%;
    padding-right: 0rem;
    margin-bottom: 1rem;
  }
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  box-shadow: ${props => props.theme.shadow.feature.small.l_little};
  #gitalk-container{
    padding:1rem;
    background: ${props => props.theme.colors.white.light};
    box-shadow: ${props => props.theme.shadow.feature.small.l_little};
  }
`;

const AsideWrapper = styled.div`
  width: calc(99.9% * 1 / 4 - 1rem);
  display: flex;
  flex-direction: column;
  @media (max-width: ${props => props.theme.breakpoints.vl}) {
    width: calc(99.9% * 1 / 3 - 1rem);
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    width: 100%;
  }
`;

const SuggestionBar = styled.div`
  display: flex;
  font-size: 14px;
  flex-wrap: nowrap;
  margin: 0;
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
  text-align: center;
  margin: 1rem;
  .Suggestion-up{
      width: 200px;
      padding: 0.3rem 1rem;
      -webkit-clip-path: polygon(100% 0, 5% 0, 0 50%, 5% 100%, 100% 100%);
      clip-path: polygon(100% 0, 5% 0, 0 50%, 5% 100%, 100% 100%);
      @media (max-width: ${props => props.theme.breakpoints.s}) {
        -webkit-clip-path: polygon(100% 0, 5% 0, 0 50%, 5% 100%, 100% 100%);
        clip-path: polygon(100% 0, 5% 0, 0 50%, 5% 100%, 100% 100%);
      }
      background: ${props => props.theme.colors.card.light};
      box-shadow: ${props => props.theme.shadow.feature.small.default};
  }
  .Suggestion-next{
      width: 200px;
      padding: 0.3rem 1rem;
      //-webkit-clip-path: polygon(95% 100%, 100% 50%, 95% 0, 0 0, 0 100%);
      clip-path: polygon(95% 100%, 100% 50%, 95% 0, 0 0, 0 100%);
      @media (max-width: ${props => props.theme.breakpoints.s}) {
        -webkit-clip-path: polygon(95% 100%, 100% 50%, 95% 0, 0 0, 0 100%);
        clip-path: polygon(95% 100%, 100% 50%, 95% 0, 0 0, 0 100%);
      }
      background: ${props => props.theme.colors.card.light};
      box-shadow: ${props => props.theme.shadow.feature.small.default};
  }
  a {
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
      line-height: 40px;
      padding: 1rem 0rem;
    }
`;

const Post = ({ data, pageContext }) => {
  const { next, prev, spath } = pageContext;
  const post = data.markdownRemark;
  const image = post.frontmatter.cover.childImageSharp.fluid;
  const title = post.frontmatter.title;
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
                  <h3>{title}</h3>
                </HeadTitle>
                <ContentHeader tags={post.frontmatter.tags} path={post.frontmatter.path} stype={post.frontmatter.type}></ContentHeader>
                <Content input={html}/>
              </Excerpt>
              <TagsBlock spath={spath} list={post.frontmatter.tags} />
            </Container>
            <SuggestionBar>
              <PostSuggestion>
                {prev && (
                  <Link className="Suggestion-up" to={prev.frontmatter.path}>
                      <span>{prev.frontmatter.title}</span>
                  </Link>
                )}
              </PostSuggestion>
              <PostSuggestion>
                {next && (
                  <Link className="Suggestion-next" to={next.frontmatter.path}>
                      <span>{next.frontmatter.title}</span>
                  </Link>
                )}
              </PostSuggestion>
            </SuggestionBar>
            <Comments path={post.frontmatter.path}/>
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
        title
        path
        tags
        type
        typeID
        typeTitle
        categores
        discussionId
        date(formatString: "MMMM DD, YYYY")
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
