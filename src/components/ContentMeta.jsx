import React, { Component } from 'react';
import md5 from 'md5'
import { axiosGithub } from '../util/util'
import styled from '@emotion/styled';
import config from '../../config/site';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const HeadMeta = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0.25rem 0rem;
    flex-wrap: wrap;
    color: ${props => props.theme.colors.black.base};
    .label{
        padding: 3px;
        color:  ${props => props.theme.colors.label.green};
      &:hover {
        color: ${props => props.theme.colors.hot.red};
      }
    }
    .item {        
        padding: 0 5px;
    }
`;

class ContentMeta extends Component{
    constructor(props){
        super(props)
        this.mounted = true
        this.state = {
            commentNum: 0,
            labels: ['Gitalk'],
            isLoading: true,
            isError: false,
        }
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
            this.setState({ commentNum: res.data[0].comments, mounted:false })
          })
        .catch(err => {
            this.setState({ isError: true })
            console.log(`Something bad happened while fetching the data\n${err}`)
        })
    }

    componentWillUnmount(){
        //this.cancelable.cancel()
        if(this.unmount) return  // 已经卸载的话就不执行
        this.setState = (state, callback) => {
            return
        }         
    }

    
    render() {
        
        const { name, tags, date, path } = this.state
        var tas = [name];
        {this.props.tags.forEach((element) => {
            if (!name&&name!=element) {
                tas.push(element);
            }
        })};
        return(
        <HeadMeta>
            <span className="item">
                <FontAwesomeIcon icon={['far', 'file-code']} size="1x" />
                {this.props.tags && this.props.tags.map((tag, index) => (
                    <span key={index} className="label">{tag}</span>
                ))}
            </span>
            <span className="item">
                <FontAwesomeIcon icon={['far', 'user']} size="1x" />
                <span className="label">{`${config.author}`}</span>
            </span>
            <span className="item">
                <FontAwesomeIcon icon={['far', 'clock']} size="1x" />
                <span className="label">{this.props.date}</span>
            </span>
            <span className="item">
                <FontAwesomeIcon icon={['far', 'eye']} size="1x" />
                <span className="label">0浏览</span>
            </span>
            <span className="item">
                <FontAwesomeIcon icon={['far', 'comment-dots']} size="1x" />
                <span className="label">&nbsp;{this.state.commentNum}评论</span>
            </span>
        </HeadMeta>
        )
    }
}

export default ContentMeta
