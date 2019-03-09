import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Layout, Container } from 'layouts';
import { Header, TagsBlock, ContentNav } from 'components';
import config from '../../config/site';

const Categories = ({ pageContext }) => {
  const { spath, tags, categores } = pageContext;
  var tag = [..."全部标签"];
  var category = [..."全部分类"];
  return (
    <Layout>
      <Helmet title={`分类 | ${config.siteTitle}`} />
      <Header title={`${config.siteTitle}`}></Header>
      <Container>
        <ContentNav path={spath} title="分类" keyword={category}></ContentNav>
        <TagsBlock spath={spath} list={categores} />
        <ContentNav path={spath} title="标签" keyword={tag}></ContentNav>
        <TagsBlock spath={spath} list={tags} />
      </Container>
    </Layout>
  )};

export default Categories;

Categories.propTypes = {
  pageContext: PropTypes.shape({
    spath: PropTypes.string,
    tags: PropTypes.array,
    categores: PropTypes.array,
  }),
};