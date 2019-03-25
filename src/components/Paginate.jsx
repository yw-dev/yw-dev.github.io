import React from 'react'
import Link from 'gatsby-link'
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons';
library.add(fas, fab, far)


const Wrapper = styled.div`
  width: auto;
  padding: 1.5rem;
  font-size: 14px;
  div{
    display: flex;
    flex-direction: row;
  }
  ul {
    margin: 0 auto;
    padding: 0;
    align-item: center;
  }
  ul li{
    margin: 0;
    width:100%
    list-style: none;
    list-style-type: none;
    float: left;
    &:hover{
      transform: scale(1.04);
    }
  }
  ul li a {
    padding: 0.85rem;
    &:hover{
      color: ${props => props.theme.colors.label.blue};
    }
  }
`;

const isFirst = (first, pathPrefix)=>{
  if(!first){
    const firstUrl = pathPrefix + "/";
    return(
      <li>
        <Link to={firstUrl}>首页</Link>
      </li>
    );
  }
}

const upper = (index, pathPrefix)=>{
  if(index>1){
    var upperUrl = index - 1 == 1 ? pathPrefix : pathPrefix + "/" + (index - 1).toString();
    return( <li> <Link to={upperUrl}><FontAwesomeIcon icon={['fas', 'chevron-left']} size="1x"/></Link> </li>)
  }
}

const end = (last, pageCount, pathPrefix)=>{
  if(!last){
    const endUrl = pathPrefix + "/" + pageCount;
    return( <li> <Link to={endUrl}>尾页</Link> </li> )
  }
}

const next = (index, pathPrefix, pageCount)=>{
  if(index < pageCount){
    const nextUrl = pathPrefix + "/" + (index + 1).toString();
    return(
      <li>
        <Link to={nextUrl}><FontAwesomeIcon icon={['fas', 'chevron-right']} size="1x" /></Link>
      </li>
    )
  }
}

const Paginate = ({ index, first, last, pageCount, pathPrefix  }) => {
    var urls = [];    
    for(var i=0; i< 5; i++){
      if(index+i <= pageCount){
        urls[index+i] = pathPrefix + "/" + (index+i);
      }
    }

    return (
      <Wrapper>
        <div>
          <ul>
            {
              isFirst(first, pathPrefix)
            }
            {
              upper(index, pathPrefix)
            }
            {urls&&urls.map((element, index)=>{
              return(
                <li>
                  <Link to={element}>{index}</Link>
                </li>
                )
              })
            }
            {
              next(index, pathPrefix, pageCount)
            }
            {
              end(last, pageCount, pathPrefix)
            }
          </ul>
          <span>{index}/{pageCount} 页</span>        
        </div>
      </Wrapper>
    )
}

export default Paginate