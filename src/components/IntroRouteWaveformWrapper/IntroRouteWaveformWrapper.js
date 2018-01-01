// @flow
import React from 'react';
import styled from 'styled-components';

import { COLORS } from '../../constants';

import Aux from '../Aux';
import AvailableWidth from '../AvailableWidth';

type Props = {
  children: (width: number) => React$Node,
};

const IntroRouteWaveformWrapper = ({ children }: Props) => (
  <Aux>
    {/*
      InitialSpacer is used on desktop to align the waveform with the
      title. position: sticky takes over but we need this to offset it
      initially
    */}
    <InitialSpacer />

    <Wrapper>
      <AvailableWidth>{children}</AvailableWidth>
    </Wrapper>
  </Aux>
);

const InitialSpacer = styled.div`
  @media (orientation: landscape) {
    height: 175px;
  }
`;

const Wrapper = styled.div`
  @media (orientation: landscape) {
    position: sticky;
    top: 50px;
  }

  @media (orientation: portrait) {
    position: fixed;
    z-index: 5;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.25rem 1rem 2rem 1rem;
    background: ${COLORS.gray[50]};
  }
`;

export default IntroRouteWaveformWrapper;
