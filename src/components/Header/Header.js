// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import FitText from '../FitText';

const Header = () => {
  return (
    <HeaderElem>
      <TitleIntro>
        <FitText compressor={1.2}>Let's Learn About</FitText>
      </TitleIntro>
      <Title>
        <FitText compressor={0.55}>Waveforms</FitText>
      </Title>
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
  margin-left: -9px;
  font-size: 50px;
  font-weight: 200;
  color: ${COLORS.gray[700]};
  letter-spacing: 0px;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
`;

const Title = styled.h1`
  margin-left: -9px;
  font-size: 90px;
  font-weight: 700;
  color: ${COLORS.gray[900]};
  letter-spacing: -3px;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
`;

export default Header;
