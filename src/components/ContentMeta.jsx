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
        padding: 3px;
        color:  ${props => props.theme.colors.label.green};
      &:hover {
        color: ${props => props.theme.colors.hot.red};
      }
    }
`;

const HeadMeta = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 14px;
    padding: 0.25rem 0rem;
    color: ${props => props.theme.colors.black.base};
    @media (max-width: ${props => props.theme.breakpoints.vl}) {        
        flex-wrap: wrap;
    }
`;

const Item = styled.div`
    padding: 0 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
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
            <Item>
                <FontAwesomeIcon icon={['far', 'file-code']} size="1x" />
                {tags && tags.map((tag, index) => (
                    <span key={index} className="label">{tag}</span>
                ))}
            </Item>
            <Item>
                <span>
                    <FontAwesomeIcon icon={['far', 'user']} size="1x" />
                    <span className="label">{`${config.author}`}</span>
                </span>
            </Item>
            <Item>
                <span>
                    <FontAwesomeIcon icon={['far', 'clock']} size="1x" />
                    <span className="label">{date}</span>
                </span>
            </Item>
            <Item>
                <span>
                    <FontAwesomeIcon icon={['far', 'eye']} size="1x" />
                    <span className="label">0浏览</span>
                </span>
            </Item>
            <Item>
                <span>
                    <FontAwesomeIcon icon={['far', 'comment-dots']} size="1x" />
                    <span className="label">&nbsp;0评论</span>
                </span>
            </Item>
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