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
  margin: 140px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleIntro = styled.h3`
  margin-left: -18px;
  font-size: 56px;
  font-weight: 200;
  color: ${COLORS.gray[700]};
  letter-spacing: 0px;
  -webkit-font-smoothing: antialiased;
`;

const Title = styled.h1`
  margin-left: -18px;
  font-size: 96px;
  font-weight: 700;
  color: ${COLORS.gray[900]};
  letter-spacing: -3px;
  -webkit-font-smoothing: antialiased;
`;

export default Header;
