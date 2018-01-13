// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

const Footer = () => {
  return (
    <Wrapper>
      <TextWrapper>
        <strong>© Josh Comeau, 2018 and beyond.</strong>
        <br />
        <br />
        Feel free to do whatever you want with the content on this page, just
        please attribute it with a link back here.
      </TextWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  background-color: ${COLORS.primary[700]};
  color: ${COLORS.white};
`;

const TextWrapper = styled.div`
  max-width: 500px;
  margin: auto;
  padding: 40px;
  text-align: center;
`;

export default Footer;
