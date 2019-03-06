import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Layout, Container } from 'layouts';
import { Header, SpecialsList, ContentNav } from 'components';
import config from '../../config/site';

const Specials = ({ pageContext }) => {
  const { specials, data } = pageContext;

  return (
    <Layout data={data}>
      <Helmet title={`专题 | ${config.siteTitle}`} />
      <Header title={`${config.siteTitle}`}></Header>
      <Container>
        <ContentNav path="specials" title="专题" blog="全部专题"></ContentNav>
        <SpecialsList list={specials} />
      </Container>
    </Layout>
  );
};

export default Specials;

Specials.propTypes = {
  pageContext: PropTypes.shape({
    specials: PropTypes.array,
    data: PropTypes.shape({
      allMarkdownRemark: PropTypes.shape({
        edges: PropTypes.arrayOf(
          PropTypes.shape({
            node: PropTypes.shape({
              excerpt: PropTypes.string,
              frontmatter: PropTypes.shape({
                path: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
                categores: PropTypes.string.isRequired,
                tags: PropTypes.array,
              }),
            }),
          }).isRequired
        ),
      }),
    }),
  }),
};
