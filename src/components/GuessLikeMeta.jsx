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

const GuessLikeMeta = ({ name, tags, date, path, stype, title, blog }) => {
    var tas = [name];
    return(  
    <ContentHead>
        <HeadMeta>
            <span className="item">
                <FontAwesomeIcon icon={['far', 'clock']} size="1x" />
                <span className="label">&nbsp;{date}</span>
            </span>
            <span className="item">
                <FontAwesomeIcon icon={['far', 'comment-dots']} size="1x" />
                <span className="label">&nbsp;0评论</span>
            </span>
        </HeadMeta>
    </ContentHead>
    )
};

export default GuessLikeMeta;

GuessLikeMeta.propTypes = {
    name: PropTypes.string,
    tags: PropTypes.array,
    title: PropTypes.string,
    blog: PropTypes.string,
    date: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    stype: PropTypes.string,
  };