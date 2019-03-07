import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import config from '../../config/site';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            <FontAwesomeIcon icon={['far', 'file-code']}/>
            {tags && tags.map((tag, index) => (
                <span key={index}>
                    <Link className="label" to={`${stype}/${tag}`}>&nbsp;{tag}&nbsp;</Link>
                </span>
            ))}
            <span className="item">
            <FontAwesomeIcon icon={['far', 'user']}/>
                <Link className="label" to={path}>&nbsp;{`${config.author}`}</Link>
            </span>
            <span className="item">
                <FontAwesomeIcon icon={['far', 'clock']}/>
                <Link className="label" to={path}>&nbsp;{date}</Link>
            </span>
            <span className="item">
                <FontAwesomeIcon icon={['far', 'eye']}/>
                <Link className="label" to={path}>&nbsp;0浏览</Link>
            </span>
            <span className="item">
                <FontAwesomeIcon icon={['far', 'comment-dots']}/>
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