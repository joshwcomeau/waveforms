// @flow
import React from 'react';
import styled from 'styled-components';

import Header from '../Header';
import MaxWidthWrapper from '../MaxWidthWrapper';
import IntroRouteWaveform from '../IntroRouteWaveform';

const IntroRoute = () => {
  return (
    <MaxWidthWrapper>
      <Header />
      <MainContent>
        <WaveformWrapper>
          <IntroRouteWaveform />
        </WaveformWrapper>
        <ScrollableTextWrapper />
      </MainContent>
    </MaxWidthWrapper>
  );
};

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const WaveformWrapper = styled.div`
  flex: 1;
`;

const ScrollableTextWrapper = styled.div`
  flex: 1;
`;

export default IntroRoute;
