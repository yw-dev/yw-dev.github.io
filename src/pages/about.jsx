import React from 'react';
import { graphql } from 'gatsby'
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Header } from 'components';
import { Layout, Container } from 'layouts';
import { ContentNav } from 'components';
import config from '../../config/site';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Wrapper = styled.div`
  width:100%;
  margin: 0;
  padding: 1rem 3rem;
  item-align:center;
  text-align:center;
  box-shadow: ${props => props.theme.shadow.feature.title.bottom};
`;

const About = ({center, data})=> {
  var keyword = ["关于"];
  return(
  <Layout data={data}>
    <Helmet title={`关于 | ${config.siteTitle}`} />
    <Header title={`${config.siteTitle}`}></Header>
    <Container center={center}>
      <ContentNav path="about" title="关于" keyword={keyword}></ContentNav>
      <Wrapper>
        <p>
          等待施工中&nbsp;<FontAwesomeIcon  icon={['fas', 'spinner']} size="1x" spin />          
        </p>
      </Wrapper>
    </Container>
  </Layout>
)};

export default About;

Container.propTypes = {
  center: PropTypes.object,
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              path: PropTypes.string.isRequired,
              tags: PropTypes.array,
              categores: PropTypes.array,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
};

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            path
            tags
            categores
          }
        }
      }
    }
  }
`;
