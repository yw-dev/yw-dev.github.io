import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Img from 'gatsby-image';
import { CardHeader } from 'components';
import config from '../../config/site';
import theme from '../../config/theme';


const Container = styled.div`
  width: 100%;
  font-size: 14px;
  margin: 0rem 0rem 1rem 0rem;
`;

const Wrapper = styled.div`
  position: relative;
  max-width: 100%;
  width: 100%;
`;

const List = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  width: 50%;
  display: flex;
  flex-direction: row;
  padding: 0 1rem 0 1rem;
  background: ${props => props.theme.colors.background.light};
  transition: ${props => props.theme.transitions.boom.transition};
  box-shadow: ${props => props.theme.shadow.feature.small.l_little};
  &:hover{
    transform: scale(1.02);
    box-shadow: ${props => props.theme.shadow.feature.small.little};
  }
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    width: 20%;
  }
`;

const Item = styled.div`
  width: 100%;
  padding: 1rem 0;
  position: relative;
  .title{
    width: auto;
    text-align: left;
    @media (max-width: ${props => props.theme.breakpoints.m}) {
      width: auto;
      text-align: center;
    }
  }
`;

const Card = ({title, other, path, list, data }) => (
    <Container>
      <Wrapper>
        <CardHeader title={title} other={other} path=""></CardHeader>
        <List>
            {list && list.map((item, index) => (
            <StyledLink key={index} to={`${path}/${item}`}>
              <Item>
                <div className="title">{item}</div>
              </Item>
            </StyledLink>
            ))}
        </List>
      </Wrapper>
   </Container>
);

export default Card;

Card.propTypes = {
  title: PropTypes.string,
  other: PropTypes.string,
  path: PropTypes.string,
  list: PropTypes.array,
};
