// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import HitCounter from '../HitCounter';

const Footer = () => {
  return (
    <Wrapper>
      <Copyright>
        <strong>© Josh Comeau, 2018 and beyond.</strong>
      </Copyright>
      <License>
        Feel free to do whatever you want with the content on this page, just
        please attribute it with a link back here :).
      </License>

      <CounterWrapper>
        <HitCounter />
      </CounterWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  text-align: center;
  background-color: ${COLORS.primary[700]};
  color: ${COLORS.white};
`;

const CounterWrapper = styled.div`
  padding-bottom: 40px;
`;

const Copyright = styled.div`
  max-width: 450px;
  margin: auto;
  padding: 40px;

  line-height: 1.5;
`;

const License = styled(Copyright)`
  padding-top: 0;
  font-size: 13px;
`;

export default Footer;
