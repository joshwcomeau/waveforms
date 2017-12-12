// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

const Header = () => {
  return (
    <HeaderElem>
      <TitleIntro>Let's Learn About</TitleIntro>
      <Title>Waveforms</Title>
    </HeaderElem>
  );
};

const HeaderElem = styled.header`
  position: relative;
  height: 164px;
  margin-top: 222px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleIntro = styled.h3`
  margin-left: -18px;
  font-size: 50px;
  font-weight: 200;
  color: ${COLORS.gray[700]};
  letter-spacing: 0px;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
`;

const Title = styled.h1`
  margin-left: -18px;
  font-size: 90px;
  font-weight: 700;
  color: ${COLORS.gray[900]};
  letter-spacing: -3px;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
`;

export default Header;
