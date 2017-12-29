// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS, BREAKPOINTS } from '../../constants';

import FitText from '../FitText';

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
  margin-top: 196px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${BREAKPOINTS.lgMin} {
    margin-top: 222px;
  }
`;

const TitleIntro = styled.h3`
  font-weight: 200;
  color: ${COLORS.gray[700]};
  letter-spacing: 0px;
  line-height: 1;
  -webkit-font-smoothing: antialiased;

  @media (orientation: portrait) {
    font-size: 8.5vw;
  }

  @media (orientation: landscape) {
    font-size: 3.5vw;
    /*
      On desktop, the alignment looks off, since the title starts with a W.
      By outdenting it a bit, it gives the illusion of alignment.
      (on mobile/portrait, though, there's an edge-of-screen there, so it looks
      funny with this outdent.)
    */
    margin-left: -9px;
  }

  @media ${BREAKPOINTS.lgMin} {
    /*
      At a certain point, the 'vw' solution looks a little obnoxiously large.
      There is a clever way to do this using 'calc', but the simple way is
      clearer.
    */
    font-size: 50px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  color: ${COLORS.gray[900]};
  letter-spacing: -3px;
  line-height: 1;
  -webkit-font-smoothing: antialiased;

  @media (orientation: portrait) {
    font-size: 16vw;
  }

  @media (orientation: landscape) {
    font-size: 7vw;
    /* See note in TitleIntro for explanation about this negative margin */
    margin-left: -9px;
  }

  @media ${BREAKPOINTS.lgMin} {
    /*
      At a certain point, the 'vw' solution looks a little obnoxiously large.
      There is a clever way to do this using 'calc', but the simple way is
      clearer.
    */
    font-size: 92px;
  }
`;

export default Header;
