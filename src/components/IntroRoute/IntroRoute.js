// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import Header from '../Header';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Aux from '../Aux';
import IntroRouteWaveform from '../IntroRouteWaveform';
import IntroRouteSection from '../IntroRouteSection';

import type { IntroStep } from '../../types';

type Props = {};
type State = {
  currentStep: IntroStep,
};

class IntroRoute extends PureComponent<Props, State> {
  state = {
    currentStep: '1-introduction',
  };

  onIntersect = (id: IntroStep) => {
    this.setState({ currentStep: id });
  };

  render() {
    return (
      <MaxWidthWrapper>
        <MainContent>
          <WaveformWrapper>
            <IntroRouteWaveform />
          </WaveformWrapper>
          <ScrollableTextWrapper>
            <Header />
            <IntroRouteSection
              id="1-introduction"
              onIntersect={this.onIntersect}
              margin={50}
            >
              <Aux>
                <p>Hi there!</p>
                <p>Today we'll be looking at waveforms.</p>
              </Aux>
            </IntroRouteSection>

            <IntroRouteSection
              id="2-intro-with-labels"
              onIntersect={this.onIntersect}
              margin={50}
            >
              First, a quick definition: A waveform is a graph of pressure
              changes over time.
            </IntroRouteSection>
          </ScrollableTextWrapper>
        </MainContent>
      </MaxWidthWrapper>
    );
  }
}

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const WaveformWrapper = styled.div`
  flex: 1;
  margin-right: 50px;
  margin-top: 150px;
`;

const ScrollableTextWrapper = styled.div`
  margin-left: 35px;
  flex: 1;
`;

export default IntroRoute;
