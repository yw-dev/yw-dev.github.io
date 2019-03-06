import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Layout, Container } from 'layouts';
import { Header, TagsBlock, ContentNav } from 'components';
import config from '../../config/site';

const Tags = ({ pageContext }) => {
  const { tags, categores } = pageContext;
  return (
    <Layout>
      <Helmet title={`分类 | ${config.siteTitle}`} />
      <Header title={`${config.siteTitle}`}>Tags Page</Header>
      <Container>
        <ContentNav path="/category" title="分类" blog="全部分类"></ContentNav>
        <TagsBlock list={categores} />
        <ContentNav path="/category" title="分类" blog="全部分类"></ContentNav>
        <TagsBlock list={tags} />
      </Container>
    </Layout>
  )};

export default Tags;

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tags: PropTypes.array,
    categores: PropTypes.array,
  }),
};