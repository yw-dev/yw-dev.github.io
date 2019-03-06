import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import config from '../../config/site';

const ContentHead = styled.div`
    display: block;
    align-items: center;
    margin: 0.5rem 0;
    box-shadow: ${props => props.theme.shadow.feature.title.bottom};
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

const ContentHeader = ({ name, tags, date, path, stype, title, blog }) => {
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
                <span key={index}>
                    <Link className="label" to={`${stype}/${tag}`}>{tag}&nbsp;&nbsp;</Link>
                </span>
            ))}
            <span className="item">
                <i className="far fa-user" aria-hidden="true"></i>
                <Link className="label" to={path}>&nbsp;{`${config.author}`}</Link>
            </span>
            <span className="item">
                <i className="far fa-clock" aria-hidden="true"></i>
                <Link className="label" to={path}>&nbsp;{date}</Link>
            </span>
            <span className="item">
                <i className="far fa-eye" aria-hidden="true"></i>
                <Link className="label" to={path}>&nbsp;0浏览</Link>
            </span>
            <span className="item">
                <i className="far fa-eye" aria-hidden="true"></i>
                <Link className="label" to={path}>&nbsp;0评论</Link>
            </span>
        </HeadMeta>
    </ContentHead>
    )
};

export default ContentHeader;

ContentHeader.propTypes = {
    name: PropTypes.string,
    tags: PropTypes.array,
    title: PropTypes.string,
    blog: PropTypes.string,
    date: PropTypes.string,
    path: PropTypes.string.isRequired,
    stype: PropTypes.string.isRequired,
  };