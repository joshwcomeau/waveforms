// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { INTRO_STEPS } from '../../constants';

import Header from '../Header';
import Paragraph from '../Paragraph';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Aux from '../Aux';
import IntroRouteWaveform from '../IntroRouteWaveform';
import IntroRouteSection from '../IntroRouteSection';

import type { IntroStep } from '../../types';

type Props = {};
type State = {
  currentStep: IntroStep,
};

const sections = [
  { id: '0-title', margin: 0, children: <Header /> },
  {
    id: '1-about-this-thing',
    margin: 300,
    children: (
      <Aux>
        <Paragraph>Hi there!</Paragraph>
        <Paragraph>
          This interactive guide introduces waveforms. We'll go over the
          fundamental physics of sound, learn how it relates to music and
          harmony, and discover how to build complex tones from simple ones.
        </Paragraph>
        <Paragraph>
          This guide is primarily geared towards folks who produce music, but no
          prior knowledge is required. Even if you don't have any interest in
          music production, this guide may still interest you!
        </Paragraph>
      </Aux>
    ),
  },
  {
    id: '2-intro-with-labels',
    margin: 500,
    children: (
      <Aux>
        First, a quick definition: A waveform is a graph of pressure changes
        over time.
      </Aux>
    ),
  },
];

class IntroRoute extends PureComponent<Props, State> {
  state = {
    currentStep: 0,
  };

  onIntersect = (id: IntroStep, entry: IntersectionObserverEntry) => {
    const newStep = INTRO_STEPS.indexOf(id);

    // We don't yet know which direction they're scrolling in, but we can work
    // it out; when an item leaves through the top of the viewport, its index
    // matches the current step (after all, the current step is on the way out).
    // When scrolling back up, the item enters the viewport, which means the
    // item's step number will be less than the current one.
    const direction =
      newStep === this.state.currentStep ? 'forwards' : 'backwards';

    this.setState(({ currentStep }) => ({
      currentStep: direction === 'forwards' ? newStep + 1 : newStep,
    }));
  };

  render() {
    const { currentStep } = this.state;

    return (
      <MaxWidthWrapper>
        <MainContent>
          <WaveformWrapper>
            <IntroRouteWaveform currentStep={currentStep} />
          </WaveformWrapper>
          <ScrollableTextWrapper>
            {sections.map((section, index) => (
              <IntroRouteSection
                key={section.id}
                id={section.id}
                margin={section.margin}
                onIntersect={this.onIntersect}
                isSelected={currentStep === index}
              >
                {section.children}
              </IntroRouteSection>
            ))}
            <BottomTextSpacer height={window.innerHeight} />
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
  margin-right: 65px;
`;

const ScrollableTextWrapper = styled.div`
  margin-left: 50px;
  flex: 1;
`;

const BottomTextSpacer = styled.div`
  height: ${props => props.height + 'px'};
`;

export default IntroRoute;
