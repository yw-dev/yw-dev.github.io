import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Wrapper = styled.section`
  margin: 1rem 6rem;
  text-align: ${props => (props.center ? 'center' : '')};
  min-height: 22rem;
  //color: ${props => props.theme.colors.black.base};
  //background: ${props => props.theme.colors.background.light};
  box-shadow: ${props => props.theme.shadow.feature.small.little};
  max-width: ${props => props.theme.layout[props.type]};
  flex: 1;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    margin: 0 0 1rem 0;
  }
`;

const Container = ({ children, type, className, center }) => (
  <Wrapper className={className} type={type} center={center}>
    {children}
  </Wrapper>
);

export default Container;

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
  center: PropTypes.object,
};
