import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { TagsBlock, ContentHeader } from 'components';
import { Container } from 'layouts';

const Wrapper = styled.article`
  width:100%;
  margin: 0;
  padding: 1rem 3rem;
  font-size:16px;
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

const Information = styled.div`
h1,h2,h3,h4,h5,h6 {
  font-size: 2rem;
  display: inline-block;
  transition: all ${props => props.theme.transitions.default.duration};
  &:hover {
    color: ${props => props.theme.colors.hot.red};
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
    display: flex;
    padding: 1.5rem;
    flex-direction: column;
    border-bottom: ${props => props.theme.border.posts};
`;

const BlogList = ({ stype, path, cover, title, date, excerpt, tags }) => (
    <Wrapper>
      <Image>
        <Link to={path} title={title}>
          <Img fluid={cover} />
        </Link>
      </Image>
      <Information>
        <HeadTitle>
          <Link className="title" to={path}>
            <h3>{title}</h3>
          </Link>
        </HeadTitle>
        <ContentHeader tags={tags} date={date} path={path} stype={stype}></ContentHeader>
        {excerpt}
        <TagsBlock spath={stype} list={tags} />
      </Information>
    </Wrapper>
);

export default BlogList;

BlogList.propTypes = {
  cover: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired,
  excerpt: PropTypes.string,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  stype: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
};
