// @flow
import React from 'react';
import styled from 'styled-components';

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
  text-align: center;
  padding: 10rem 0;
`;

const TitleIntro = styled.h3`
  font-size: 24px;
  margin-bottom: 0.5rem;
`;

const Title = styled.h1`
  font-size: 96px;
  letter-spacing: -3px;
  font-weight: bold;
`;

export default Header;
