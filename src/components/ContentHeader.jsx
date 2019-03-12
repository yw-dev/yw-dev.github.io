import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import config from '../../config/site';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const ContentHead = styled.div`
    width:100%;
    display: block;
    align-items: center;
    margin: 0.5rem 0;
    box-shadow: ${props => props.theme.shadow.feature.title.bottom};
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
    align-items: center;
    font-size: 14px;
    padding: 0.25rem 0rem;
    color: ${props => props.theme.colors.black.base};
`;

const Item = styled.div`
    padding: 0 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
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
            <Item>
                <FontAwesomeIcon icon={['far', 'file-code']} size="1x" />
                {tags && tags.map((tag, index) => (
                    <span key={index}>
                        <Link className="label" to={`${stype}/${tag}`}>&nbsp;{tag}&nbsp;</Link>
                    </span>
                ))}
            </Item>
            <Item>
                <span>
                <FontAwesomeIcon icon={['far', 'user']} size="1x" />
                    <Link className="label" to={path}>&nbsp;{`${config.author}`}</Link>
                </span>
            </Item>
            <Item>
                <span>
                    <FontAwesomeIcon icon={['far', 'clock']} size="1x" />
                    &nbsp;{date}
                </span>
            </Item>
            <Item>
                <span>
                    <FontAwesomeIcon icon={['far', 'eye']} size="1x" />
                    &nbsp;0浏览
                </span>
            </Item>
            <Item>
                <span>
                    <FontAwesomeIcon icon={['far', 'comment-dots']} size="1x" />
                    <Link className="label" to={path}>&nbsp;0评论</Link>
                </span>
            </Item>
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