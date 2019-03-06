import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';


const ContentHead = styled.div`
    display: block;
    align-items: center;
    padding: 1rem 2rem;
    h1,h2,h3,h4,h5,h6{
      padding: 1rem 0rem;
    }
`;

const HeadNav = styled.div`
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 0.5rem 0rem;
    box-shadow: ${props => props.theme.shadow.feature.title.bottom};
    .title{
      color:  ${props => props.theme.colors.label.green};
      &:hover {
        color: ${props => props.theme.colors.hot.red};
      }
    }
`;

const ContentNav = ( { path, title, keyword } ) => {
    var uri = [];
    var str = "";
    if(path){
        uri = path.split("/");
    }
return (
    <ContentHead>
        <HeadNav>
            <Link className="title" to="/">
                <i className="fa fa-home fa-fw" aria-hidden="true"></i><i className="fa fa-angle-right fa-fw" aria-hidden="true">&nbsp;</i>
            </Link>
            {uri && uri.map((ur, index) => {
                if(ur){
                    str += "/"+ur;  
                    if(++index == uri.length){                    
                        return (
                            <span>{keyword}</span>
                        )
                    } else {
                        return (
                            <Link key={index} className="title"  to={str}>{ur}<i className="fa fa-angle-right fa-fw" aria-hidden="true">&nbsp;</i></Link>
                        )
                    }}
                }
            )}
        </HeadNav>
    </ContentHead>
)};

export default ContentNav;

ContentNav.propTypes = {
    title: PropTypes.string.isRequired,
    keyword: PropTypes.string.isRequired,
    path: PropTypes.string,
  };