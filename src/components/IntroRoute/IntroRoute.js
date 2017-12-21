// @flow
import React, { PureComponent } from 'react';
import styled from 'styled-components';

import { INTRO_STEPS, WAVEFORM_ASPECT_RATIO } from '../../constants';
import { debounce } from '../../utils';

import AvailableWidth from '../AvailableWidth';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Aux from '../Aux';
import WaveformPlayer from '../WaveformPlayer';
import IntroRouteWaveform from '../IntroRouteWaveform';
import IntroRouteAirGrid from '../IntroRouteAirGrid';
import AirGrid from '../AirGrid';
import IntroRouteSection from '../IntroRouteSection';

import { steps, stepsArray } from './IntroRoute.steps';

import type { IntroStep } from '../../constants';
import type { WaveformShape } from '../../types';

type Props = {};
type State = {
  currentStep: IntroStep,
  windowHeight: number,
  amplitude: number,
  frequency: number,
  shape: WaveformShape,
};

type Section = {
  id: IntroStep,
  getMargin?: (windowHeight: number) => number,
  children: React$Node,
};

const marginFunctions = {
  none: windowHeight => 0,
  small: windowHeight => windowHeight * 0.35,
  large: windowHeight => windowHeight * 0.45,
};

class IntroRoute extends PureComponent<Props, State> {
  state = {
    currentStep: INTRO_STEPS[0],
    windowHeight: window.innerHeight,
    amplitude: 1,
    frequency: 1,
    shape: 'sine',
  };

  sectionRefs: Array<HTMLElement> = [];

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleUpdateAmplitude = (val: number) => {
    this.setState({ amplitude: val });
  };

  handleUpdateFrequency = (val: number) => {
    this.setState({ frequency: val });
  };

  handleResize = debounce(() => {
    this.setState({ windowHeight: window.innerHeight });
  }, 500);

  handleScroll = debounce(() => {
    // We rely on the IntersectionObserver API within each IntroRouteSection
    // to update the current section, in the `handleIntersect` method.
    //
    // Unfortunately, when scrolling quickly, the IntersectionObserver API has
    // the bad habit of "missing" intersections sometimes.
    //
    // This method handles those edge-cases, by scanning through the sections
    // and finding the first one in the viewport.
    const activeSectionIndex = this.sectionRefs.findIndex(
      section => section.getBoundingClientRect().bottom >= 0
    );

    if (activeSectionIndex !== this.state.currentStep) {
      this.setState({ currentStep: INTRO_STEPS[activeSectionIndex] });
    }
  }, 500);

  handleIntersect = (id: IntroStep, entry: IntersectionObserverEntry) => {
    const currentStepIndex = INTRO_STEPS.indexOf(this.state.currentStep);
    const intersectStepIndex = INTRO_STEPS.indexOf(id);

    // We don't yet know which direction they're scrolling in, but we can work
    // it out; when an item leaves through the top of the viewport, its index
    // matches the current step (after all, the current step is on the way out).
    // When scrolling back up, the item enters the viewport, which means the
    // item's step number will be less than the current one.
    const direction = id === this.state.currentStep ? 'forwards' : 'backwards';

    const nextStep =
      direction === 'forwards'
        ? INTRO_STEPS[intersectStepIndex + 1]
        : INTRO_STEPS[intersectStepIndex];

    this.setState({ currentStep: nextStep });
  };

  render() {
    const {
      currentStep,
      windowHeight,
      shape,
      amplitude,
      frequency,
    } = this.state;

    const stepData = steps[currentStep];

    return (
      <MaxWidthWrapper>
        <MainContent>
          <LeftColumnWrapper>
            <WaveformPlayer
              isPlaying={stepData.isPlaying}
              amplitude={
                typeof stepData.amplitudeOverride === 'number'
                  ? stepData.amplitudeOverride
                  : amplitude
              }
              frequency={
                typeof stepData.frequencyOverride === 'number'
                  ? stepData.frequencyOverride
                  : frequency
              }
            >
              {({ amplitude, frequency, progress }) => (
                <Aux>
                  <IntroRouteWaveform
                    amplitude={amplitude}
                    frequency={frequency}
                    progress={progress}
                    handleUpdateAmplitude={this.handleUpdateAmplitude}
                    handleUpdateFrequency={this.handleUpdateFrequency}
                    stepData={stepData}
                  />
                  <IntroRouteAirGrid
                    numOfRows={26}
                    numOfCols={26}
                    amplitude={amplitude}
                    frequency={frequency}
                    progress={progress}
                    stepData={stepData}
                  />
                </Aux>
              )}
            </WaveformPlayer>
          </LeftColumnWrapper>

          <RightColumnWrapper>
            {stepsArray.map((section, index) => (
              <IntroRouteSection
                key={section.id}
                id={section.id}
                margin={
                  section.getMargin
                    ? section.getMargin(windowHeight)
                    : marginFunctions.large(windowHeight)
                }
                onIntersect={this.handleIntersect}
                isSelected={currentStep === section.id}
                innerRef={elem => (this.sectionRefs[index] = elem)}
              >
                {section.children}
              </IntroRouteSection>
            ))}
            <BottomTextSpacer height={window.innerHeight} />
          </RightColumnWrapper>
        </MainContent>
      </MaxWidthWrapper>
    );
  }
}

const MainContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const LeftColumnWrapper = styled.div`
  flex: 1;
  margin-right: 65px;
`;

const RightColumnWrapper = styled.div`
  margin-left: 50px;
  flex: 1;
`;

const BottomTextSpacer = styled.div`
  height: ${props => props.height + 'px'};
`;

export default IntroRoute;
