import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import config from '../../config/site';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
            <FontAwesomeIcon icon={['far', 'file-code']} size="1x" />
            {tags && tags.map((tag, index) => (
                <span key={index} className="label">&nbsp;{tag}&nbsp;</span>
            ))}
            <span className="item">
                <FontAwesomeIcon icon={['far', 'user']} size="1x" />
                <span className="label">&nbsp;{`${config.author}`}</span>
            </span>
            <span className="item">
                <FontAwesomeIcon icon={['far', 'clock']} size="1x" />
                <span className="label">&nbsp;{date}</span>
            </span>
            <span className="item">
                <FontAwesomeIcon icon={['far', 'eye']} size="1x" />
                <span className="label">&nbsp;0浏览</span>
            </span>
            <span className="item">
                <FontAwesomeIcon icon={['far', 'comment-dots']} size="1x" />
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
    stype: PropTypes.string,
  };