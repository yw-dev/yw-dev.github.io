import React, { Component } from 'react';
import md5 from 'md5'
import { axiosGithub, inject_unmount } from '../util/util'
import styled from '@emotion/styled';
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

    render() {
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
        if(this.unmount) return;
        axiosGithub.get(process.env.GATSBY_GIT_ISSUS, {
            params: {
              client_id: process.env.GATSBY_GIT_CLIENT_ID,
              client_secret: process.env.GATSBY_GIT_CLIENT_SECRET,
              labels: this.state.labels.concat(md5(this.props.path)).join(','),
              t: Date.now()
            }
          }).then(res => {
            this.setState({ commentNum: res.data[0].comments ,mounted:false })
          })
        .catch(err => {
            this.setState({ isError: true })
            console.log(`Something bad happened while fetching the data\n${err}`)
        })
        //this.getComments(this.state.labels.concat(md5(this.props.path)).join(','));
    }
/*
    componentWillMount(){
        const miniFetch = (resolve, reject) => {
            setTimeout(()=>{
                resolve('Vectory')
            }, 1000)
        }
        const promise = new Promise(miniFetch)

        this.cancelable = makeCancelable(promise)
        this.cancelable.promise.then(name=>{
            this.setState({
                name
            })
        }, (e) => {
            console.log(e)
        })
    }
*/ 
    componentWillUnmount(){
        //this.cancelable.cancel()
        if(this.unmount) return  // 已经卸载的话就不执行
        this.setState = (state, callback) => {
            return
        }         
    }

    makeCancelable = (promise)=>{
        let hasCanceled_ = false;

        const wrappedPromise = new Promise((resolve, reject)=>{
            promise.then((val) => hasCanceled_ ? reject({ isCanceled: true}) : resolve(val));
            promise.catch((error) => hasCanceled_ ? reject({ isCanceled: true}) : resolve(error));
        });

        return {
            promise: wrappedPromise,
            cancel(){
                hasCanceled_ = true;
            },
        }
    };
}

export default GuessLikeMeta

