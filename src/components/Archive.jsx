import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { CardHeader } from 'components';
import config from '../../config/site';


const Container = styled.div`
  width: 100%;
  font-size: 14px;
  margin: 0rem 0rem 1rem 0rem;
`;

const Wrapper = styled.div`
  position: relative;
  max-width: 100%;
  width: 100%;
`;

const List = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const StyledLink = styled(Link)`
  width: 50%;
  display: flex;
  flex-direction: row;
  padding: 0 1rem 0 1rem;
  //background: ${props => props.theme.colors.background.light};
  transition: ${props => props.theme.transitions.boom.transition};
  //box-shadow: ${props => props.theme.shadow.feature.small.l_little};
  &:hover{
    transform: scale(1.04);
    box-shadow: ${props => props.theme.shadow.feature.small.l_little};
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    width: 20%;
  }
`;

const Item = styled.div`
  width: 100%;
  padding: 1rem 0;
  position: relative;
  text-align:center;
`;



const Archive = ({ data }) => {
    const archives = [];
    data.allMarkdownRemark.edges.map(( {node}, index) => {
      var dates = node.frontmatter.date.split('-');
      if (dates[0]&&dates[1]) {
          if (!archives[dates[0]+'-'+dates[1]]) {
            archives[dates[0]+'-'+dates[1]] = [];
          }
          archives[dates[0]+'-'+dates[1]].push(dates[0]+'-'+dates[1]);
      }
    });
    
    const archivs = Object.keys(archives);
    return (
      <Container>
        <Wrapper>
          <CardHeader title="文章归档" other="" icons="" path=""></CardHeader>
          <List>
              {archivs && archivs.map((archive, index) => (
              <StyledLink key={index} to={`/${archive}`}>
                <Item>
                  <span>{archive}</span>
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
            sort: { order: DESC, fields: [frontmatter___date] }
          ) {
            edges {
              node {
                id
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
      render={data => <Archive data={data} {...props} />}
    />
  )
  
  Archive.propTypes = {
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
  