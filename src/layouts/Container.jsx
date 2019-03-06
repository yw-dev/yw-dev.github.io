import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Wrapper = styled.section`
  margin: 1rem 6rem;
  text-align: ${props => (props.center ? 'center' : '')};
  min-height: 20rem;
  color: ${props => props.theme.colors.black.base};
  box-shadow: ${props => props.theme.shadow.feature.small.little};
  max-width: ${props => props.theme.layout[props.type]};
  flex: 1;
  @media (max-width: ${props => props.theme.breakpoints.m}) {
    margin: 1rem 3rem;
    width: 90%;
  }

  @media (max-width: ${props => props.theme.breakpoints.s}) {
    margin: 1rem 1rem;
    width: 95%;
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
