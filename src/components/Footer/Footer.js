// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import MaxWidthWrapper from '../MaxWidthWrapper';

const Footer = () => {
  return (
    <Wrapper>
      <TextWrapper>
        © Josh Comeau, 2018 and beyond. Use, share, and embed information as you
        see fit, just please do link back to this page :)
      </TextWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  background-color: ${COLORS.gray[900]};
  color: ${COLORS.white};
`;

const TextWrapper = styled(MaxWidthWrapper)`
  padding-top: 40px;
  padding-bottom: 40px;
`;

export default Footer;
