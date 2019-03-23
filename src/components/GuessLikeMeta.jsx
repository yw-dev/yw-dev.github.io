import React, { Component } from 'react';
import md5 from 'md5'
import {
  queryParse,
  queryStringify,
  axiosJSON,
  axiosGithub,
  getMetaContent,
  formatErrorMsg,
  hasClassInParent
} from '../util/util'
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
    align-items: center;
    flex-wrap: wrap;
    font-size: 15px;
    padding: 0.25rem 0rem;
    color: ${props => props.theme.colors.black.base};
`;

const Item = styled.div`
    padding: 0 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;


class GuessLikeMeta extends Component{
    
    state = {
        commentNum: 0,
        labels: ['Gitalk'],
        isLoading: true,
        isError: false,
    }

    render() {        
        const { name, tags, date, path, stype, title, blog } = this.state
        var tas = [name];
        return(  
        <ContentHead>
            <HeadMeta>
                <Item>
                    <span>
                        <FontAwesomeIcon icon={['far', 'clock']} size="1x" />
                        <span className="label">&nbsp;{this.props.date}</span>
                    </span>
                </Item>
                <Item>
                    <span>
                        <FontAwesomeIcon icon={['far', 'comment-dots']} size="1x" />
                        <span className="label">&nbsp;{this.state.commentNum}评论</span>
                    </span>
                </Item>
            </HeadMeta>
        </ContentHead>
        )
    }
    /**
     * React lifecycle method to fetch the data
     */
    async componentDidMount() {
        axiosGithub.get(process.env.GATSBY_GIT_ISSUS, {
            params: {
              client_id: process.env.GATSBY_GIT_CLIENT_ID,
              client_secret: process.env.GATSBY_GIT_CLIENT_SECRET,
              labels: this.state.labels.concat(md5(this.props.path)).join(','),
              t: Date.now()
            }
          }).then(res => {
            this.setState({ commentNum: res.data[0].comments })
          })
        .catch(err => {
            this.setState({ isError: true })
            console.log(`Something bad happened while fetching the data\n${err}`)
        })
        //this.getComments(this.state.labels.concat(md5(this.props.path)).join(','));
    }
}

export default GuessLikeMeta

