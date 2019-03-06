import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import config from '../../config/site';

const ContentHead = styled.div`
    display: block;
    align-items: center;
    .label{
      color:  ${props => props.theme.colors.label.green};
      &:hover {
        color: ${props => props.theme.colors.hot.red};
      }
    }
`;

const HeadMeta = styled.div`
    display: flex;
    align-items: center;
    font-size: 15px;
    padding: 0.25rem 0rem;
    color: ${props => props.theme.colors.black.base};
    .item{
      padding: 0rem 0rem 0rem 1rem;
    }
`;

const ContentMeta = ({ name, tags, date, path, stype, title, blog }) => {
    var tas = [name];
    {tags.forEach((element) => {
        if (!name&&name!=element) {
            tas.push(element);
        }
    })};
    return(  
    <ContentHead>
        <HeadMeta>
            <i className="far fa-file-code fa-fw" aria-hidden="true">&nbsp;</i>
            {tags && tags.map((tag, index) => (
                <span key={index} className="label">{tag}&nbsp;&nbsp;</span>
            ))}
            <span className="item">
                <i className="far fa-user" aria-hidden="true"></i>
                <span className="label">&nbsp;{`${config.author}`}</span>
            </span>
            <span className="item">
                <i className="far fa-clock" aria-hidden="true"></i>
                <span className="label">&nbsp;{date}</span>
            </span>
            <span className="item">
                <i className="far fa-eye" aria-hidden="true"></i>
                <span className="label">&nbsp;0浏览</span>
            </span>
            <span className="item">
                <i className="far fa-eye" aria-hidden="true"></i>
                <span className="label">&nbsp;0评论</span>
            </span>
        </HeadMeta>
    </ContentHead>
    )
};

export default ContentMeta;

ContentMeta.propTypes = {
    name: PropTypes.string,
    tags: PropTypes.array,
    title: PropTypes.string,
    blog: PropTypes.string,
    date: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    stype: PropTypes.string.isRequired,
  };